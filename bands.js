.pragma library
.import "allocations.js" as Allocations

// Pure-JS rules over the allocation dataset. No Qt types, so tools/test-bands.mjs
// runs this exact file under node.
// The dataset shape (see allocations.js):
//   DATA.countries[] = {
//     id: "US", name: "United States", ituRegion: 2,
//     regulator: { name, url, document, retrieved },
//     classes: [ { id: "extra", name: "Amateur Extra" }, ... ]   // most→least privileged
//     bands: [ { band: "80m", from: 3500, to: 3525, classes: ["extra"],
//   }
// permitted classes and the mode list are uniform. `classes` lists every class
// allowed in the segment. A class not listed may not transmit there. `modes`
// is the regulator's restriction (e.g. CW only); when absent, the regulator
// states no mode restriction for the segment.

var DATA = Allocations.DATA

var _byId = null

function countries() {
  return DATA.countries.slice()
}

function country(id) {
  var want = String(id || "").trim().toUpperCase()
  if (want === "") return null
  if (!_byId) {
    _byId = {}
    for (var i = 0; i < DATA.countries.length; i++) _byId[DATA.countries[i].id] = DATA.countries[i]
  }
  return _byId[want] || null
}

function classesOf(cty) {
  return cty ? cty.classes.slice() : []
}

function className(cty, classId) {
  var want = String(classId || "").toLowerCase()
  for (var i = 0; i < cty.classes.length; i++) {
    if (cty.classes[i].id === want) return cty.classes[i].name
  }
  return ""
}

// Segments a given class may transmit in. A blank classId means "no privilege
// filter" — every segment, which is what the full table view shows.
function segmentsFor(cty, classId) {
  var want = String(classId || "").toLowerCase()
  if (want === "") return cty.bands.slice()
  var out = []
  for (var i = 0; i < cty.bands.length; i++) {
    var s = cty.bands[i]
    if (s.classes && s.classes.indexOf(want) >= 0) out.push(s)
  }
  return out
}

// Segments whose frequency range covers khz. Normally one; overlapping
// dataset rows would make this more than one, which the tests treat as a bug.
function segmentsAt(cty, khz) {
  var out = []
  if (!isFinite(khz)) return out
  for (var i = 0; i < cty.bands.length; i++) {
    var s = cty.bands[i]
    if (khz >= s.from && khz <= s.to) out.push(s)
  }
  return out
}

// The band name at a frequency, e.g. "40m", or "" when nothing is allocated
// there. A blank answer is the honest answer: amateurs transmit nowhere near
// 700.5 MHz, and saying so beats borrowing a neighbour's row.
function bandAt(cty, khz) {
  var hits = segmentsAt(cty, khz)
  return hits.length ? hits[0].band : ""
}

// Class names allowed at a frequency, most privileged first, in dataset order.
function classesAt(cty, khz) {
  var hits = segmentsAt(cty, khz)
  if (!hits.length) return []
  var allow = {}
  for (var i = 0; i < hits[0].classes.length; i++) allow[hits[0].classes[i]] = true
  var out = []
  for (var j = 0; j < cty.classes.length; j++) {
    if (allow[cty.classes[j].id]) out.push(cty.classes[j].name)
  }
  return out
}

// Group a flat segment list by band, dataset order preserved. The popup and
// the tests both want this: rows render band by band, and the integrity check
// wants to see a band's segments as one ordered run.
function groupByBand(segments) {
  var order = []
  var groups = {}
  for (var i = 0; i < segments.length; i++) {
    var b = segments[i].band
    if (!groups[b]) { groups[b] = []; order.push(b) }
    groups[b].push(segments[i])
  }
  var out = []
  for (var j = 0; j < order.length; j++) out.push({ band: order[j], segments: groups[order[j]] })
  return out
}

// Highest frequency a class may use on a band, or null. Used by the bar pill
// ("80m — up to 4000") and by tests checking class privileges read sensibly.
function topOfBand(cty, band, classId) {
  var segs = groupByBand(segmentsFor(cty, classId))
  for (var i = 0; i < segs.length; i++) {
    if (String(segs[i].band) === String(band)) {
      var top = segs[i].segments[segs[i].segments.length - 1]
      return top ? top.to : null
    }
  }
  return null
}

// Human frequency formatting: kHz below 100 MHz, MHz to 1 GHz, GHz above.
function fmtKhz(khz) {
  if (!isFinite(khz)) return "--"
  if (khz >= 1000000) return (khz / 1000000).toFixed(khz % 1000000 === 0 ? 0 : 1) + " GHz"
  if (khz >= 100000) return (khz / 1000).toFixed(khz % 1000 === 0 ? 0 : 1) + " MHz"
  return String(Math.round(khz)) + " kHz"
}

// A range with one unit: "21000 – 21025 kHz", "144 – 146 MHz".
function fmtRange(from, to) {
  if (!isFinite(from) || !isFinite(to)) return "--"
  var left = fmtKhz(from)
  return left.replace(/ (kHz|MHz|GHz)$/, "") + " – " + fmtKhz(to)
}

if (typeof module !== "undefined" && module.exports) module.exports = {
  countries: countries, country: country, classesOf: classesOf, className: className,
  segmentsFor: segmentsFor, segmentsAt: segmentsAt, bandAt: bandAt, classesAt: classesAt,
  groupByBand: groupByBand, topOfBand: topOfBand, fmtKhz: fmtKhz, fmtRange: fmtRange
}

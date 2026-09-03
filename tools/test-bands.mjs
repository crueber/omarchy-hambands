// Integrity checks over the allocation dataset. Run: node tools/test-bands.mjs
// These check the dataset, not the code — the code's behaviour is covered by
// the behaviour section, which exercises bands.js against the dataset.
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

// allocations.js and bands.js are QML library files: the .pragma directive is
// not JavaScript, so load them the way Quickshell does — with it stripped.
function loadQmlJs(rel, expr, inject) {
  const src = readFileSync(join(root, rel), "utf8")
    .replace(/^\.pragma library\s*/, "")
    .replace(/^\.import .*$/m, "")
  const prelude = inject
    ? Object.keys(inject).map(k => `const ${k} = __INJECT__[${JSON.stringify(k)}]`).join("\n")
    : ""
  return new Function("__INJECT__", `${prelude}\n${src}\nreturn ${expr}`)(inject || {})
}

const DATA = loadQmlJs("allocations.js", "DATA")
// bands.js reaches the dataset through QML's .import, which node does not
// have — the loader hands it the same DATA under the same namespace.
const bands = loadQmlJs("bands.js", "({countries, country, classesOf, className, segmentsFor, segmentsAt, bandAt, classesAt, groupByBand, topOfBand, fmtKhz})",
  { Allocations: { DATA: DATA } })

let failures = 0
function check(name, ok, detail) {
  if (ok) { console.log("ok   " + name); return }
  failures++
  console.log("FAIL " + name + (detail !== undefined ? " — " + detail : ""))
}

const cty = DATA.countries

// --- Structural checks -----------------------------------------------------
check("countries exist", Array.isArray(cty) && cty.length > 0, cty.length)

const ids = new Set()
const bandNameOk = /^[0-9]+(\.[0-9]+)?\s?(m|cm|mm|GHz)$/

for (const c of cty) {
  const tag = c.id
  check(`${tag}: id unique`, !ids.has(c.id))
  ids.add(c.id)
  check(`${tag}: has name + ITU region`, typeof c.name === "string" && c.name.length > 0
    && [1, 2, 3].includes(c.ituRegion), JSON.stringify(c.name) + " region " + c.ituRegion)
  check(`${tag}: regulator cited`, c.regulator && typeof c.regulator.url === "string"
    && c.regulator.url.startsWith("https://") && c.regulator.document && c.regulator.retrieved)

  const classIds = new Set((c.classes || []).map(k => k.id))
  check(`${tag}: classes non-empty`, classIds.size > 0)

  const used = new Set()
  let prev = null
  for (const s of c.bands || []) {
    const t = `${tag} ${s.band} ${s.from}-${s.to}`
    check(`${t}: numeric ordered range`, isFinite(s.from) && isFinite(s.to)
      && s.from < s.to && s.from > 0)
    check(`${t}: has classes`, Array.isArray(s.classes) && s.classes.length > 0)
    for (const k of s.classes || []) {
      check(`${t}: class ${k} declared`, classIds.has(k))
      used.add(k)
    }
    check(`${t}: modes array or absent`, s.modes === undefined
      || (Array.isArray(s.modes) && s.modes.length > 0))
    check(`${t}: note is string`, s.note === undefined || typeof s.note === "string")
    // A frequency belongs to one row per class: a segment may touch its
    // neighbour's range only with a class set disjoint from its own —
    // identical class sets may tile but never intersect.
    if (prev) {
      const shared = s.classes.some(k => prev.classes.includes(k))
      check(`${t}: no shared-class range overlap`, s.from >= prev.to || !shared,
        `previous was ${prev.band} ${prev.from}-${prev.to} [${prev.classes}]`)
    }
    check(`${t}: band name shaped`, bandNameOk.test(s.band), s.band)
    prev = s
  }
  const pending = new Set(c.classesPendingUse || [])
  for (const k of classIds) {
    // A class with no segments is a licence that can go nowhere — unless the
    // country documents it (e.g. Italy's classe N, authorised in name but
    // awaiting the implementing decree that assigns its bands).
    check(`${tag}: class ${k} used or documented pending`, used.has(k) || pending.has(k))
  }
}

// --- Behaviour checks (bands.js against the dataset) ------------------------
const us = bands.country("us")
check("country lookup is case-insensitive", us && us.id === "US")
check("unknown country is null", bands.country("XX") === null)

if (us) {
  // The FCC's oldest landmark: 80 m CW starts at 3500, and no licence class
  // reaches below 135.7 kHz.
  check("US: nothing allocated below 135.7 kHz",
    us.bands.every(s => s.from >= 135.7))
  check("US: 7000 kHz is allocated to exactly one class set",
    bands.segmentsAt(us, 7000).length === 1, bands.segmentsAt(us, 7000).length)
  check("US: bandAt(7000) is 40m", bands.bandAt(us, 7000) === "40m")
  check("US: 700.5 MHz is nobody's", bands.bandAt(us, 700500) === "")
  // §97.301(e): Technician has 80 m CW from 3525.
  const tech80 = bands.segmentsFor(us, "technician").filter(s => s.band === "80m")
  check("US: technician 80 m starts at 3525", tech80.some(s => s.from === 3525))
  const extra80 = bands.segmentsFor(us, "extra").filter(s => s.band === "80m")
  check("US: extra reaches 3500", extra80.some(s => s.from === 3500))
  const byBand = bands.groupByBand(bands.segmentsFor(us, ""))
  check("US: bands group in order", byBand.length > 3
    && byBand[0].segments[0].from < byBand[byBand.length - 1].segments[0].from)
}

// Every country: format helpers stay sane on real and impossible input.
check("fmtKhz(7000)", bands.fmtKhz(7000) === "7000 kHz")
check("fmtKhz(144500)", bands.fmtKhz(144500) === "144.5 MHz")
check("fmtKhz(NaN)", bands.fmtKhz(NaN) === "--")

console.log(failures === 0 ? "\nall checks passed" : `\n${failures} check(s) failed`)
process.exit(failures === 0 ? 0 : 1)

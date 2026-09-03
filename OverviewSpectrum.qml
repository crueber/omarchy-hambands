import QtQuick

// True-scale overview: every allocation segment at its real place on one
// log-frequency axis, ~100 kHz to ~300 GHz. The per-band rows below are
// normalised per band (legible like a paper chart); this strip is the
// honest map — it shows how slim 2200m really is next to 10m, where the
// channelised 60m sliver sits, and how the microwaves stack up top.
//
// Colour is by mode (phone / data / CW, same as the rows); the class
// filter drives dimming, not colour. Hover reports the fine print,
// click opens the band's propagation story.
Item {
  id: root

  property var bandGroups: []
  property string selectedClass: ""
  property var colorFor: function (segment) { return "#4caf7d" }
  property var describe: function (segment) { return "" }
  property color inkColor: "#e6e6e6"
  property color mutedColor: "#8b949e"
  property string fontFamily: "monospace"
  property real labelSize: 10

  signal segmentHovered(string text)
  signal bandClicked(string band)

  implicitHeight: barHeight + tickH + labelH + 8
  readonly property real barHeight: 40
  readonly property real tickH: 8
  readonly property real labelH: labelSize + 6

  // Dataset extremes with breathing room on each side.
  readonly property real loKhz: 100
  readonly property real hiKhz: 300000000
  readonly property real logLo: Math.log(loKhz) / Math.LN10
  readonly property real logSpan: Math.log(hiKhz) / Math.LN10 - logLo

  function xFor(khz) {
    var k = Number(khz)
    if (!isFinite(k) || k <= 0) return -1
    var t = (Math.log(Math.max(k, loKhz)) / Math.LN10 - logLo) / logSpan
    return Math.max(0, Math.min(1, t)) * width
  }

  readonly property var flat: {
    var out = []
    for (var i = 0; i < bandGroups.length; i++) {
      var g = bandGroups[i]
      for (var j = 0; j < g.segments.length; j++) {
        var s = g.segments[j]
        out.push({ seg: s, band: g.band })
      }
    }
    return out
  }

  // Decade ticks with labels.
  readonly property var ticks: [
    { khz: 1000, t: "1M" },
    { khz: 10000, t: "10M" },
    { khz: 100000, t: "100M" },
    { khz: 1000000, t: "1G" },
    { khz: 10000000, t: "10G" },
    { khz: 100000000, t: "100G" }
  ]

  // Band labels that clear their predecessor (log axis crowds them).
  readonly property var labelled: {
    var seen = {}
    var bands = []
    for (var i = 0; i < bandGroups.length; i++) {
      var g = bandGroups[i]
      if (seen[g.band]) continue
      seen[g.band] = true
      var first = g.segments[0]
      var last = g.segments[g.segments.length - 1]
      if (!first || !last) continue
      var cx = (xFor(first.from) + xFor(last.to)) / 2
      bands.push({ band: g.band, x: cx })
    }
    var out = []
    var lastRight = -1e9
    var approx = labelSize * 0.62
    for (var k = 0; k < bands.length; k++) {
      var b = bands[k]
      var w = String(b.band).length * approx
      var x = b.x - w / 2
      if (x < 0) x = 0
      if (x > root.width - w) x = Math.max(0, root.width - w)
      if (x < lastRight + 4) continue
      lastRight = x + w
      out.push({ band: b.band, x: x })
    }
    return out
  }

  // Track.
  Rectangle {
    id: track
    width: parent.width
    height: root.barHeight
    radius: 8
    color: Qt.rgba(1, 1, 1, 0.045)
    border.width: 1
    border.color: Qt.rgba(1, 1, 1, 0.07)
  }

  // Segments at true scale.
  Repeater {
    model: root.flat
    delegate: Rectangle {
      required property var modelData
      readonly property var seg: modelData.seg
      readonly property bool allowed: root.selectedClass === ""
        || (seg.classes && seg.classes.indexOf(root.selectedClass) >= 0)
      readonly property real x0: root.xFor(seg.from)
      readonly property real x1: root.xFor(seg.to)
      x: Math.max(0, x0)
      y: 3
      width: Math.max(2, Math.min(root.width - x, x1 - x0))
      height: track.height - 6
      radius: 3
      color: root.colorFor(seg)
      opacity: allowed ? 0.92 : 0.22
      Behavior on opacity { NumberAnimation { duration: 180; easing.type: Easing.OutCubic } }

      MouseArea {
        anchors.fill: parent
        hoverEnabled: true
        cursorShape: Qt.PointingHandCursor
        onEntered: root.segmentHovered(root.describe(seg))
        onExited: root.segmentHovered("")
        onClicked: root.bandClicked(seg.band)
      }
    }
  }

  // Shine: a faint top highlight so the strip reads as one instrument.
  Rectangle {
    width: parent.width
    height: root.barHeight / 2
    radius: 8
    color: Qt.rgba(1, 1, 1, 0.05)
    Rectangle {
      anchors.left: parent.left
      anchors.right: parent.right
      anchors.bottom: parent.bottom
      height: parent.radius
      color: parent.color
    }
  }

  // Ticks.
  Repeater {
    model: root.ticks
    delegate: Item {
      required property var modelData
      readonly property real px: root.xFor(modelData.khz)
      width: 1
      height: root.tickH
      x: px
      y: root.barHeight + 3
      Rectangle {
        anchors.fill: parent
        color: root.mutedColor
        opacity: 0.55
      }
      Text {
        textFormat: Text.PlainText
        y: root.tickH + 1
        x: -12
        width: 25
        horizontalAlignment: Text.AlignHCenter
        text: modelData.t
        color: root.mutedColor
        font.family: root.fontFamily
        font.pixelSize: root.labelSize * 0.85
      }
    }
  }

  // Band labels.
  Repeater {
    model: root.labelled
    delegate: Text {
      required property var modelData
      textFormat: Text.PlainText
      x: modelData.x
      y: root.barHeight + root.tickH + 3
      text: modelData.band
      color: root.inkColor
      opacity: 0.55
      font.family: root.fontFamily
      font.pixelSize: root.labelSize * 0.85
      MouseArea {
        anchors.fill: parent
        cursorShape: Qt.PointingHandCursor
        hoverEnabled: true
        onClicked: root.bandClicked(parent.text)
      }
    }
  }
}

import QtQuick

// The band chart. One row per band, and every band gets the full width —
// the bar shows THAT band's spectrum, subdivided into its segments, the
// way the paper charts every operator grew up with. A log axis across all
// bands was tried: each band shrank to a sliver and nothing was legible.
//
// Segments are coloured by what they are FOR, in the priority a licence
// reads: if you may talk on it, it is phone; if you may only send data, it
// is data; if only Morse, it is CW. The class filter decides opacity, not
// colour — a dimmed green segment still reads as phone.
//
// Interior boundaries are marked with a background-coloured TICK that runs
// the full row height, a couple of pixels proud of the bar on each side —
// a drawn rule, not a gap between rectangles (1px inline gaps were tried
// and are invisible at bar scale). Channelised bands (60 m) have real
// gaps, and those keep their true width: the silence is the truth.
//
// Bands above 1.3 GHz collapse into one "µwaves" row of equal slices, one
// slice per band, so the microwave allocations stay reachable without
// giving nine of them their own scrolling page.
Column {
  id: root

  property var bandGroups: []            // [{band, segments:[...]}] from Bands.groupByBand
  property string selectedClass: ""
  property var colorFor: function (segment) { return "#5a9e6f" }
  property var describe: function (segment) { return "" }
  property string dividerColor: "#111111"
  property real labelWidth: 66
  property real rowHeight: 21
  property real fontSize: 11
  property real rightPad: 12
  property string inkColor: "#e6e6e6"
  property string mutedColor: "#8b949e"

  signal segmentHovered(string text)
  signal bandClicked(string band)

  spacing: 3

  // Rows: bands in spectrum order; above 1.3 GHz merged into one row of
  // equal slices, one slice per band.
  property var rows: {
    var out = []
    var micro = null
    for (var i = 0; i < bandGroups.length; i++) {
      var g = bandGroups[i]
      var first = g.segments[0]
      if (first && first.from > 1300000) {
        if (!micro) micro = { band: "\u00b5w", micro: [] }
        micro.micro.push({ band: g.band, segments: g.segments })
      } else if (first) {
        out.push({ band: g.band, micro: null, min: first.from,
                   max: g.segments[g.segments.length - 1].to, segments: g.segments })
      }
    }
    if (micro) out.push(micro)
    return out
  }

  Repeater {
    model: root.rows

    Row {
      id: bandRow
      required property var modelData
      width: root.width
      height: root.rowHeight
      spacing: 10

      Text {
        textFormat: Text.PlainText
        width: root.labelWidth
        anchors.verticalCenter: parent.verticalCenter
        text: bandRow.modelData.band
        color: root.inkColor
        font.pixelSize: root.fontSize
        font.bold: true
        horizontalAlignment: Text.AlignRight

        MouseArea {
          anchors.fill: parent
          cursorShape: Qt.PointingHandCursor
          onClicked: root.bandClicked(bandRow.modelData.band)
        }
      }

      Item {
        id: track
        width: parent.width - root.labelWidth - root.rightPad
        height: parent.height

        // Track hairline: closed ranges read against it.
        Rectangle {
          anchors.verticalCenter: parent.verticalCenter
          width: parent.width
          height: 1
          color: root.mutedColor
          opacity: 0.25
        }

        // ---- Ordinary band: segments across the band's own range ----
        Repeater {
          model: bandRow.modelData.micro ? [] : bandRow.modelData.segments

          Rectangle {
            id: seg
            required property var modelData
            readonly property bool allowed: root.selectedClass === ""
              || (modelData.classes && modelData.classes.indexOf(root.selectedClass) >= 0)

            x: (modelData.from - bandRow.modelData.min)
               / (bandRow.modelData.max - bandRow.modelData.min) * track.width
            width: Math.max(2, (modelData.to - modelData.from)
                      / (bandRow.modelData.max - bandRow.modelData.min) * track.width)
            anchors.verticalCenter: parent.verticalCenter
            height: parent.height - 5
            color: root.colorFor(seg.modelData)
            opacity: seg.allowed ? 0.9 : 0.28

            MouseArea {
              anchors.fill: parent
              hoverEnabled: true
              cursorShape: Qt.PointingHandCursor
              onEntered: root.segmentHovered(root.describe(seg.modelData))
              onExited: root.segmentHovered("")
              onClicked: root.bandClicked(seg.modelData.band)
            }
          }
        }

        // Interior boundary ticks, drawn over the segments.
        Repeater {
          model: bandRow.modelData.micro ? [] : bandRow.modelData.segments

          Rectangle {
            required property int index
            required property var modelData

            x: (modelData.from - bandRow.modelData.min)
               / (bandRow.modelData.max - bandRow.modelData.min) * track.width - 1
            width: 2
            height: parent.height
            color: root.dividerColor
            visible: index > 0
          }
        }

        // ---- Microwave row: one equal slice per band ----
        Row {
          visible: bandRow.modelData.micro !== null
          width: parent.width
          height: parent.height
          spacing: 3

          Repeater {
            model: bandRow.modelData.micro || []

            Item {
              id: slice
              required property var modelData
              width: (parent.width - (parent.spacing * (parent.count - 1))) / parent.count
              height: parent.height

              property var firstSeg: slice.modelData.segments[0]
              property var lastSeg: slice.modelData.segments[slice.modelData.segments.length - 1]
              readonly property real bandSpan: slice.lastSeg.to - slice.firstSeg.from

              Repeater {
                model: slice.modelData.segments

                Rectangle {
                  id: mseg
                  required property var modelData
                  readonly property bool allowed: root.selectedClass === ""
                    || (modelData.classes && modelData.classes.indexOf(root.selectedClass) >= 0)

                  x: (modelData.from - slice.firstSeg.from) / slice.bandSpan * slice.width
                  width: Math.max(2, (modelData.to - modelData.from) / slice.bandSpan * slice.width)
                  anchors.verticalCenter: parent.verticalCenter
                  height: parent.height - 5
                  color: root.colorFor(mseg.modelData)
                  opacity: mseg.allowed ? 0.9 : 0.28

                  MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onEntered: root.segmentHovered(root.describe(mseg.modelData))
                    onExited: root.segmentHovered("")
                    onClicked: root.bandClicked(mseg.modelData.band)
                  }
                }
              }

              Repeater {
                model: slice.modelData.segments

                Rectangle {
                  required property int index
                  required property var modelData

                  x: (modelData.from - slice.firstSeg.from) / slice.bandSpan * slice.width - 1
                  width: 2
                  height: parent.height
                  color: root.dividerColor
                  visible: index > 0
                }
              }
            }
          }
        }
      }
    }
  }
}

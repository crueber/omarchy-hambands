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
// Channelised bands (60 m) are the reason gaps between segments are left
// as gaps rather than bridged: the silence in the bar is the truth.
//
// Bands above 1.3 GHz collapse into one "µwaves" row of equal slices, one
// slice per band, so the microwave allocations stay reachable without
// giving nine of them their own scrolling page.
Column {
  id: root

  property var bandGroups: []            // [{band, segments:[...]}] from Bands.groupByBand
  property string selectedClass: ""
  property var colorFor: function (segment) { return "#3fb950" }
  property var describe: function (segment) { return "" }
  property real labelWidth: 66
  property real rowHeight: 21
  property real fontSize: 11
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
        height: parent.height
        verticalAlignment: Text.AlignVCenter
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
        width: parent.width - root.labelWidth
        height: parent.height

        // Track hairline: closed ranges read against it.
        Rectangle {
          anchors.verticalCenter: parent.verticalCenter
          width: parent.width
          height: 1
          color: root.mutedColor
          opacity: 0.25
        }

        // Rounded caps under the band's far edges. Segments are square
        // and tile the band on top of them, so the only place a cap shows
        property var firstSeg: bandRow.modelData.segments ? bandRow.modelData.segments[0] : null
        property var lastSeg: bandRow.modelData.segments
          ? bandRow.modelData.segments[bandRow.modelData.segments.length - 1] : null

        Rectangle {
          visible: track.firstSeg !== null
          x: 0
          width: 6
          anchors.verticalCenter: parent.verticalCenter
          height: parent.height - 5
          radius: 3
          color: track.firstSeg ? root.colorFor(track.firstSeg) : "transparent"
          opacity: track.firstSeg && (root.selectedClass === ""
            || (track.firstSeg.classes && track.firstSeg.classes.indexOf(root.selectedClass) >= 0))
            ? 0.9 : 0.28
        }
        Rectangle {
          visible: track.lastSeg !== null
          x: parent.width - 6
          width: 6
          anchors.verticalCenter: parent.verticalCenter
          height: parent.height - 5
          radius: 3
          color: track.lastSeg ? root.colorFor(track.lastSeg) : "transparent"
          opacity: track.lastSeg && (root.selectedClass === ""
            || (track.lastSeg.classes && track.lastSeg.classes.indexOf(root.selectedClass) >= 0))
            ? 0.9 : 0.28
        }

        Repeater {
          model: bandRow.modelData.micro ? [] : bandRow.modelData.segments

          Rectangle {
            id: seg
            required property var modelData
            readonly property bool allowed: root.selectedClass === ""
              || (modelData.classes && modelData.classes.indexOf(root.selectedClass) >= 0)

            x: (modelData.from - bandRow.modelData.min)
               / (bandRow.modelData.max - bandRow.modelData.min) * track.width
            width: Math.max(3, (modelData.to - modelData.from)
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

              // Edge caps under the slice's ends, same as normal bands.
              property var firstSeg: slice.modelData.segments[0]
              property var lastSeg: slice.modelData.segments[slice.modelData.segments.length - 1]

              Rectangle {
                x: 0
                width: 4
                anchors.verticalCenter: parent.verticalCenter
                height: parent.height - 5
                radius: 2
                color: root.colorFor(slice.firstSeg)
                opacity: root.selectedClass === ""
                  || (slice.firstSeg.classes && slice.firstSeg.classes.indexOf(root.selectedClass) >= 0)
                  ? 0.9 : 0.28
              }
              Rectangle {
                x: parent.width - 4
                width: 4
                anchors.verticalCenter: parent.verticalCenter
                height: parent.height - 5
                radius: 2
                color: root.colorFor(slice.lastSeg)
                opacity: root.selectedClass === ""
                  || (slice.lastSeg.classes && slice.lastSeg.classes.indexOf(root.selectedClass) >= 0)
                  ? 0.9 : 0.28
              }

              Repeater {
                model: slice.modelData.segments

                Rectangle {
                  id: mseg
                  required property var modelData
                  readonly property bool allowed: root.selectedClass === ""
                    || (modelData.classes && modelData.classes.indexOf(root.selectedClass) >= 0)

                  x: (modelData.from - slice.modelData.segments[0].from)
                     / (slice.modelData.segments[slice.modelData.segments.length - 1].to
                        - slice.modelData.segments[0].from) * slice.width
                  width: Math.max(2, (modelData.to - modelData.from)
                            / (slice.modelData.segments[slice.modelData.segments.length - 1].to
                               - slice.modelData.segments[0].from) * slice.width)
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
            }
          }
        }
      }
    }
  }
}

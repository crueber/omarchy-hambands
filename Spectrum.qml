import QtQuick

// The band chart, restyled. One row per band, each band given the full
// width — the bar shows THAT band's spectrum subdivided into its
// segments, the way the paper charts every operator grew up with. (A log
// axis across all bands lives one screen up in OverviewSpectrum.qml;
// each band normalised here keeps every segment legible.)
//
// Segments are coloured by what they are FOR, in the priority a licence
// reads: if you may talk on it, it is phone; if you may only send data,
// it is data; if only Morse, it is CW. The class filter decides dimming,
// not colour — a dimmed green segment still reads as phone.
//
// Each row is a pill track with a faint fill; segments carry a top
// highlight and round their outer ends. Hover lifts the segment (border
// + full opacity) and reports the fine print; click opens the band's
// propagation story. Channelised bands (60 m) keep their true gaps:
// the silence is the truth.
//
// Bands above 1.3 GHz collapse into one "µwaves" row of equal slices, one
// slice per band, so the microwave allocations stay reachable without
// giving nine of them their own scrolling page.
Column {
  id: root

  property var bandGroups: []            // [{band, segments:[...]}] from Bands.groupByBand
  property string selectedClass: ""
  property var colorFor: function (segment) { return "#4caf7d" }
  property var describe: function (segment) { return "" }
  property var rangeFor: function (from, to) { return "" }
  property string dividerColor: "#111111"
  property real labelWidth: 58
  property real rangeWidth: 118
  property real rowHeight: 24
  property real fontSize: 11
  property string fontFamily: "monospace"
  property real rightPad: 4
  property string inkColor: "#e6e6e6"
  property string mutedColor: "#8b949e"

  signal segmentHovered(string text)
  signal bandClicked(string band)

  spacing: 4

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
      spacing: 8

      Text {
        id: bandLabel
        textFormat: Text.PlainText
        width: root.labelWidth
        anchors.verticalCenter: parent.verticalCenter
        text: bandRow.modelData.band
        color: root.inkColor
        font.family: root.fontFamily
        font.pixelSize: root.fontSize
        font.bold: true
        horizontalAlignment: Text.AlignRight

        MouseArea {
          anchors.fill: parent
          hoverEnabled: true
          cursorShape: Qt.PointingHandCursor
          onEntered: bandLabel.color = "#ffffff"
          onExited: bandLabel.color = root.inkColor
          onClicked: root.bandClicked(bandRow.modelData.band)
        }
      }

      Item {
        id: track
        width: parent.width - root.labelWidth - root.rangeWidth - 16 - root.rightPad
        height: parent.height

        // Pill track: faint fill so empty (channelised) ranges read.
        Rectangle {
          anchors.fill: parent
          radius: height / 2
          color: Qt.rgba(1, 1, 1, 0.05)
          border.width: 1
          border.color: Qt.rgba(1, 1, 1, 0.06)
        }

        // ---- Ordinary band: segments across the band's own range ----
        Repeater {
          model: bandRow.modelData.micro ? [] : bandRow.modelData.segments

          Rectangle {
            id: seg
            required property var modelData
            readonly property bool allowed: root.selectedClass === ""
              || (modelData.classes && modelData.classes.indexOf(root.selectedClass) >= 0)
            readonly property bool first: index === 0
            readonly property bool last: index === (bandRow.modelData.segments.length - 1)

            x: (modelData.from - bandRow.modelData.min)
               / (bandRow.modelData.max - bandRow.modelData.min) * track.width
            width: Math.max(3, (modelData.to - modelData.from)
                      / (bandRow.modelData.max - bandRow.modelData.min) * track.width)
            anchors.verticalCenter: parent.verticalCenter
            height: parent.height - 6
            radius: 5
            color: root.colorFor(seg.modelData)
            opacity: segMouse.containsMouse ? 1.0 : (seg.allowed ? 0.92 : 0.26)
            border.width: segMouse.containsMouse ? 1 : 0
            border.color: Qt.rgba(1, 1, 1, 0.85)
            Behavior on opacity { NumberAnimation { duration: 140; easing.type: Easing.OutCubic } }

            gradient: Gradient {
              GradientStop { position: 0.0; color: Qt.rgba(1, 1, 1, 0.22) }
              GradientStop { position: 0.45; color: Qt.rgba(1, 1, 1, 0.0) }
            }

            MouseArea {
              id: segMouse
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
            height: parent.height - 2
            anchors.verticalCenter: parent.verticalCenter
            color: root.dividerColor
            visible: index > 0
          }
        }

        // ---- Microwave row: one equal slice per band ----
        Row {
          visible: bandRow.modelData.micro !== null
          anchors.fill: parent
          anchors.margins: 3
          spacing: 3

          Repeater {
            model: bandRow.modelData.micro || []

            Item {
              id: slice
              required property var modelData
              width: (parent.width - (parent.spacing * (bandRow.modelData.micro.length - 1))) / bandRow.modelData.micro.length
              height: parent.height

              property var firstSeg: slice.modelData.segments[0]
              property var lastSeg: slice.modelData.segments[slice.modelData.segments.length - 1]
              readonly property real bandSpan: slice.lastSeg.to - slice.firstSeg.from

              Rectangle {
                anchors.fill: parent
                radius: 4
                color: Qt.rgba(1, 1, 1, 0.05)
              }

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
                  height: parent.height
                  radius: 3
                  color: root.colorFor(mseg.modelData)
                  opacity: msegMouse.containsMouse ? 1.0 : (mseg.allowed ? 0.92 : 0.26)
                  border.width: msegMouse.containsMouse ? 1 : 0
                  border.color: Qt.rgba(1, 1, 1, 0.85)
                  Behavior on opacity { NumberAnimation { duration: 140; easing.type: Easing.OutCubic } }

                  gradient: Gradient {
                    GradientStop { position: 0.0; color: Qt.rgba(1, 1, 1, 0.22) }
                    GradientStop { position: 0.45; color: Qt.rgba(1, 1, 1, 0.0) }
                  }

                  MouseArea {
                    id: msegMouse
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

      // True range of the row, so normalised bars can't mislead.
      Text {
        textFormat: Text.PlainText
        width: root.rangeWidth
        anchors.verticalCenter: parent.verticalCenter
        text: {
          if (bandRow.modelData.micro) return "1.3G – 250G"
          var r = root.rangeFor(bandRow.modelData.min, bandRow.modelData.max)
          return r !== "" ? r : ""
        }
        color: root.mutedColor
        font.family: root.fontFamily
        font.pixelSize: root.fontSize - 1
        horizontalAlignment: Text.AlignRight
        elide: Text.ElideRight
      }
    }
  }
}

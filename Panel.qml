import QtQuick
import Quickshell
import qs.Commons
import qs.Ui
import "bands.js" as Bands
import "bandnotes.js" as Notes

// Renders the bundled allocation dataset (allocations.js + bands.js). No
// network, no processes: the only hygiene question is what the dataset
// itself contains, and the tests answer that.
//
// The bar pill is an antenna glyph plus the country code. The popup is a
// two-tab panel: the spectrum tab opens with a true-scale log overview
// (every allocation at its real place from ~100 kHz to ~300 GHz), then
// the per-band detail rows the paper charts every operator grew up with
// — each segment coloured by what it is for (phone, data, CW), with
// hover for the fine print and a click for the band's propagation story;
// and the country picker.
Panel {
  id: root
  moduleName: "crueber.hambands"
  ipcTarget: "crueber.hambands"
  manageIpc: false

  property var anchorItem: null
  property var hostWidget: null
  readonly property var barIdentity: hostWidget || root

  property string chosenView: ""
  property string detailBand: ""
  property string hoverText: ""
  readonly property string view: chosenView !== "" ? chosenView : "bands"

  // nf-fa-broadcast-tower: the antenna the band plan belongs to. Written as
  // an escape because private-use characters get stripped in transit.
  readonly property string glyph: "\uf519"

  // ---- Country and class selection ---------------------------------------
  // The picker writes `chosenCountry`; the setting makes it survive restarts.
  property string chosenCountry: ""
  readonly property string countryCode: {
    var want = chosenCountry !== "" ? chosenCountry
             : String(setting("country", "US")).trim().toUpperCase()
    return want === "" ? "US" : want
  }
  readonly property var cty: Bands.country(countryCode)
    || (Bands.countries().length ? Bands.countries()[0] : null)

  // Blank myClass means "no filter": the full table, every class lit.
  property string chosenClass: ""
  readonly property string myClass: {
    var want = chosenClass !== ""
      ? chosenClass
      : String(setting("myClass", "")).trim().toLowerCase()
    return want === "" ? "" : want
  }
  readonly property bool classKnown: myClass !== "" && cty
    && Bands.className(cty, myClass) !== ""

  function openFromHotkey() { open() }
  function refresh() { /* static dataset — nothing to refetch */ }

  // ---- Bar pill ----------------------------------------------------------
  readonly property string label: glyph
  readonly property string tooltip: {
    if (!cty) return "Ham bands"
    var lines = ["Ham bands — " + cty.name]
    if (classKnown) lines.push(Bands.className(cty, myClass))
    if (cty.regulator) lines.push(cty.regulator.name + " · " + cty.regulator.document)
    return lines.join("\n")
  }

  // The pill renders in a Text element the shell owns, where textFormat is
  // not ours to set — strip markup and controls before it gets there.
  function safe(v, limit) {
    var text = String(v === null || v === undefined ? "" : v)
    text = text.replace(/[\u0000-\u001F\u007F\u0080-\u009F]+/g, " ")
               .replace(/[\u061C\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF]/g, "")
               .replace(/^\s+|\s+$/g, "")
    var cap = limit || 64
    return text.length > cap ? text.slice(0, cap) + "…" : text
  }
  function safeLines(v, perLine, maxLines) {
    var lines = String(v === null || v === undefined ? "" : v).split("\n")
    var out = []
    for (var i = 0; i < lines.length && out.length < (maxLines || 8); i++) out.push(safe(lines[i], perLine || 80))
    return out.join("\n")
  }

  // ---- Data shaping ------------------------------------------------------
  readonly property var bandGroups: cty ? Bands.groupByBand(Bands.segmentsFor(cty, "")) : []
  readonly property var countryRows: {
    var list = Bands.countries()
    var out = []
    for (var i = 0; i < list.length; i++) {
      out.push({ id: list[i].id, name: list[i].name,
                 bands: list[i].bands ? list[i].bands.length : 0 })
    }
    return out
  }
  readonly property var classRows: cty ? Bands.classesOf(cty) : []

  // Headline numbers for the stats strip.
  readonly property int segCount: {
    var n = 0
    for (var i = 0; i < bandGroups.length; i++) n += bandGroups[i].segments.length
    return n
  }
  readonly property int mineCount: {
    if (myClass === "") return segCount
    var n = 0
    for (var i = 0; i < bandGroups.length; i++) {
      var segs = bandGroups[i].segments
      for (var j = 0; j < segs.length; j++) {
        if (segs[j].classes && segs[j].classes.indexOf(myClass) >= 0) n++
      }
    }
    return n
  }
  readonly property var modeCounts: {
    var phone = 0, data = 0, cw = 0
    for (var i = 0; i < bandGroups.length; i++) {
      var segs = bandGroups[i].segments
      for (var j = 0; j < segs.length; j++) {
        var c = modeColor(segs[j])
        if (c === phoneColor) phone++
        else if (c === dataColor) data++
        else if (c === cwColor) cw++
      }
    }
    return { phone: phone, data: data, cw: cw }
  }

  readonly property string phoneColor: "#4caf7d"
  readonly property string dataColor: "#5b9bd5"
  readonly property string cwColor: "#d9a441"

  function classLabel(ids) {
    if (!cty) return ""
    var out = []
    for (var i = 0; i < ids.length; i++) {
      var n = Bands.className(cty, ids[i])
      out.push(n !== "" ? n : ids[i])
    }
    return out.join(", ")
  }

  // Segment colour = what the segment is for, in the priority a licence
  // reads: talk first, then send data, then Morse. No stated restriction
  // means full privilege, so it shares phone's colour.
  function modeColor(s) {
    var m = s.modes
    if (!m || !m.length) return phoneColor
    if (m.indexOf("phone") >= 0 || m.indexOf("image") >= 0) return phoneColor
    if (m.indexOf("data") >= 0) return dataColor
    if (m.indexOf("cw") >= 0) return cwColor
    return "#8b949e"
  }

  function describe(s) {
    var parts = [s.band + "  ·  " + Bands.fmtRange(s.from, s.to)]
    parts.push(classLabel(s.classes || []))
    parts.push(s.modes && s.modes.length ? s.modes.join(", ") : "all modes")
    var text = parts.join("  ·  ")
    if (s.note) text += "\n" + s.note
    return text
  }

  function pickCountry(id) {
    root.chosenCountry = String(id || "").toUpperCase()
    root.chosenView = "bands"
  }
  function pickClass(id) {
    root.chosenClass = root.chosenClass === id ? "" : id
  }
  function openBand(band) {
    root.detailBand = String(band || "")
    root.chosenView = "detail"
  }
  readonly property var detailSegments: {
    var out = []
    if (!cty || detailBand === "") return out
    var groups = bandGroups
    for (var i = 0; i < groups.length; i++) {
      // The µwaves row aggregates every band above 1.3 GHz; its detail
      // page is the sum of those, each row tagged with its band name.
      var wanted = detailBand === "\u00b5w" ? groups[i].segments[0].from > 1300000
                 : String(groups[i].band) === detailBand
      if (wanted) {
        for (var j = 0; j < groups[i].segments.length; j++) out.push(groups[i].segments[j])
      }
    }
    return out
  }
  readonly property var detailModes: {
    var seen = {}
    var out = []
    for (var i = 0; i < detailSegments.length; i++) {
      var modes = detailSegments[i].modes && detailSegments[i].modes.length
        ? detailSegments[i].modes : ["all modes"]
      for (var j = 0; j < modes.length; j++) {
        if (!seen[modes[j]]) { seen[modes[j]] = true; out.push(modes[j]) }
      }
    }
    return out
  }
  function modeDotColor(mode) {
    if (mode === "phone" || mode === "image" || mode === "all modes") return phoneColor
    if (mode === "data") return dataColor
    if (mode === "cw") return cwColor
    return "#8b949e"
  }
  function makePermanentHint() {
    var parts = ["omarchy bar set " + root.moduleName + " country " + root.countryCode]
    if (myClass !== "") parts.push("omarchy bar set " + root.moduleName + " myClass " + myClass)
    return parts.join("  ·  ")
  }

  // ---- Popup -------------------------------------------------------------
  KeyboardPanel {
    id: panel
    anchorItem: root.anchorItem
    owner: root.barIdentity
    bar: root.bar
    open: root.opened
    centerOnBar: String(root.setting("popupPosition", "icon")) === "center"
    focusTarget: keyCatcher
    contentWidth: panel.fittedContentWidth(Style.space(680))
    contentHeight: panel.fittedContentHeight(content.implicitHeight)

    PanelKeyCatcher {
      id: keyCatcher
      anchors.fill: parent
      onCloseRequested: root.close()
      onTabRequested: function (direction) { root.switchPanel(direction) }

      Column {
        id: content
        width: parent.width
        spacing: Style.space(10)

        // Masthead: who and where.
        PanelHero {
          width: parent.width
          foreground: Color.popups.text
          iconComponent: Component {
            Rectangle {
              width: Style.space(34)
              height: Style.space(34)
              radius: Style.space(10)
              color: Util.alpha(Color.accent, 0.16)
              Text {
                anchors.centerIn: parent
                textFormat: Text.PlainText
                text: root.glyph
                color: Color.accent
                font.family: Style.font.family
                font.pixelSize: Style.space(16)
              }
            }
          }
          title: root.cty ? root.cty.name : "Ham bands"
          meta: {
            if (!root.cty) return ""
            var m = root.cty.regulator ? root.cty.regulator.name.toUpperCase() : ""
            if (root.classKnown) m += "  ·  " + Bands.className(root.cty, root.myClass).toUpperCase()
            else m += "  ·  ALL CLASSES"
            return m
          }
          detail: root.countryCode
        }

        // Stats strip: the shape of this country's table at a glance.
        Row {
          width: parent.width
          spacing: Style.space(18)
          Repeater {
            model: [
              { v: String(root.bandGroups.length), l: "BANDS" },
              { v: String(root.segCount), l: "SEGMENTS" },
              { v: root.myClass === "" ? "ALL" : (String(root.mineCount) + " / " + String(root.segCount)), l: root.classKnown ? "YOUR SEGMENTS" : "PRIVILEGES" }
            ]
            delegate: Column {
              required property var modelData
              spacing: 0
              Text {
                textFormat: Text.PlainText
                text: modelData.v
                color: Color.popups.text
                font.family: Style.font.family
                font.pixelSize: Style.space(17)
                font.bold: true
              }
              Text {
                textFormat: Text.PlainText
                text: modelData.l
                color: Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(9)
                font.bold: true
                font.letterSpacing: 1.4
              }
            }
          }
          Item { width: 1; height: 1 }
        }

        // ---- Band detail (opened by clicking a band) ----
        Column {
          visible: root.view === "detail"
          width: parent.width
          spacing: Style.space(8)

          Row {
            width: parent.width
            Text {
              textFormat: Text.PlainText
              text: "‹ all bands"
              color: Color.accent
              font.family: Style.font.family
              font.pixelSize: Style.space(12)
              MouseArea {
                anchors.fill: parent
                cursorShape: Qt.PointingHandCursor
                onClicked: root.chosenView = "bands"
              }
            }
          }

          Text {
            width: parent.width
            text: {
              if (root.detailSegments.length === 0) return root.detailBand
              var first = root.detailSegments[0]
              var last = root.detailSegments[root.detailSegments.length - 1]
              return root.detailBand + "   ·   " + Bands.fmtKhz(first.from) + " to " + Bands.fmtKhz(last.to)
            }
            color: Color.popups.text
            font.family: Style.font.family
            font.pixelSize: Style.space(22)
            font.bold: true
          }

          // Mode pills: what lives on this band.
          Flow {
            width: parent.width
            spacing: Style.space(6)
            Repeater {
              model: root.detailModes
              delegate: Row {
                required property var modelData
                spacing: Style.space(5)
                Rectangle {
                  width: Style.space(9)
                  height: Style.space(9)
                  radius: Style.space(5)
                  color: root.modeDotColor(modelData)
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  text: modelData
                  color: Color.popups.text
                  font.family: Style.font.family
                  font.pixelSize: Style.space(11)
                  anchors.verticalCenter: parent.verticalCenter
                }
              }
            }
          }

          BorderSurface {
            id: propCard
            width: parent.width
            radius: Style.cornerRadius
            padding: Style.space(10)
            color: Qt.rgba(1, 1, 1, 0.04)
            borderSpec: Border.controlSpec("normal", Color.popups.text, Color.accent)
            height: propCol.implicitHeight + propCard.contentTopInset + propCard.contentBottomInset
            Column {
              id: propCol
              width: parent.width - propCard.contentLeftInset - propCard.contentRightInset
              x: propCard.contentLeftInset
              y: propCard.contentTopInset
              spacing: 0
              Text {
                textFormat: Text.PlainText
                width: parent.width
                text: Notes.forBand(root.detailBand) !== "" ? Notes.forBand(root.detailBand)
                      : "No propagation notes for this band yet."
                color: Color.popups.text
                font.family: Style.font.family
                font.pixelSize: Style.space(12)
                wrapMode: Text.WordWrap
                lineHeight: 1.25
              }
            }
          }

          PanelSeparator { foreground: Color.popups.text }

          // The band's segments, fine print included: ranges, who may use
          // them, which modes, and the power or caveat notes.
          Repeater {
            model: root.detailSegments
            delegate: Column {
              id: detSeg
              required property var modelData
              width: parent ? parent.width : 0
              spacing: Style.space(3)

              Row {
                width: detSeg.width
                spacing: Style.space(7)

                Rectangle {
                  width: Style.space(8)
                  height: Style.space(8)
                  radius: Style.space(4)
                  color: root.modeColor(detSeg.modelData)
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  width: Style.space(150)
                  text: Bands.fmtRange(detSeg.modelData.from, detSeg.modelData.to)
                  color: Color.popups.text
                  font.family: Style.font.family
                  font.pixelSize: Style.space(12)
                  elide: Text.ElideRight
                }
                Text {
                  textFormat: Text.PlainText
                  width: detSeg.width - Style.space(150 + 24)
                  text: detSeg.modelData.modes && detSeg.modelData.modes.length
                          ? detSeg.modelData.modes.join(", ") : "all modes"
                  color: root.modeColor(detSeg.modelData)
                  font.family: Style.font.family
                  font.pixelSize: Style.space(12)
                  elide: Text.ElideRight
                }
              }
              Text {
                textFormat: Text.PlainText
                width: detSeg.width - Style.space(10)
                x: Style.space(10)
                text: (root.detailBand === "\u00b5w" ? detSeg.modelData.band + "  ·  " : "")
                      + root.classLabel(detSeg.modelData.classes || [])
                      + (detSeg.modelData.note ? "  ·  " + detSeg.modelData.note : "")
                color: Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(11)
                wrapMode: Text.WordWrap
              }
            }
          }
        }

        // ---- Bands / Country switch (hidden while reading a band) ----
        ButtonGroup {
          visible: root.view !== "detail"
          options: [
            { value: "bands", label: "Bands" },
            { value: "country", label: "Country" }
          ]
          value: root.view === "country" ? "country" : "bands"
          focusable: false
          foreground: Color.popups.text
          background: Color.popups.background
          accent: Color.accent
          fontSize: Style.space(12)
          onChanged: function (v) { root.chosenView = v }
        }

        // ---- Bands tab ----
        Column {
          visible: root.view === "bands"
          width: parent.width
          spacing: Style.space(8)

          // Class chips: tap to light up your privileges on the spectrum.
          Flow {
            width: parent.width
            spacing: Style.space(6)

            Repeater {
              model: root.classRows
              delegate: Rectangle {
                id: chip
                required property var modelData
                readonly property bool active: root.myClass === modelData.id
                radius: Style.space(9)
                color: active ? Color.accent : (chipMouse.containsMouse ? Qt.rgba(1, 1, 1, 0.09) : Qt.rgba(1, 1, 1, 0.04))
                border.color: active ? Color.accent : Color.muted
                border.width: 1
                height: classText.implicitHeight + Style.space(9)
                width: classText.implicitWidth + Style.space(16)
                Behavior on color { ColorAnimation { duration: 140 } }
                Text {
                  id: classText
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: chip.modelData.name
                  color: chip.active ? Color.popups.background : Color.popups.text
                  font.family: Style.font.family
                  font.pixelSize: Style.space(11)
                  font.bold: chip.active
                }
                MouseArea {
                  id: chipMouse
                  anchors.fill: parent
                  hoverEnabled: true
                  cursorShape: Qt.PointingHandCursor
                  onClicked: root.pickClass(chip.modelData.id)
                }
              }
            }
          }

          PanelSectionHeader {
            text: "TRUE SCALE  ·  100 KHZ – 300 GHZ"
            foreground: Color.popups.text
            font.letterSpacing: Style.space(2)
          }

          // The whole allocation at its real share of the spectrum.
          OverviewSpectrum {
            width: parent.width
            bandGroups: root.bandGroups
            selectedClass: root.myClass
            colorFor: root.modeColor
            describe: root.describe
            inkColor: Color.popups.text
            mutedColor: Color.muted
            fontFamily: Style.font.family
            labelSize: Style.space(11)
            onSegmentHovered: function (text) { root.hoverText = text }
            onBandClicked: function (band) { root.openBand(band) }
          }

          PanelSectionHeader {
            text: {
              if (!root.cty) return "NO COUNTRY"
              var head = "PER-BAND DETAIL"
              if (root.classKnown) head += "  ·  " + Bands.className(root.cty, root.myClass).toUpperCase()
              return head
            }
            foreground: Color.popups.text
            font.letterSpacing: Style.space(2)
          }

          // The spectrum, band by band. Every band at full width so each
          // segment stays legible; true ranges printed at right.
          Spectrum {
            width: parent.width
            bandGroups: root.bandGroups
            dividerColor: Color.popups.background
            selectedClass: root.myClass
            colorFor: root.modeColor
            describe: root.describe
            rangeFor: Bands.fmtRange
            inkColor: Color.popups.text
            mutedColor: Color.muted
            fontFamily: Style.font.family
            onSegmentHovered: function (text) { root.hoverText = text }
            onBandClicked: function (band) { root.openBand(band) }
          }

          // Mode legend, with segment counts.
          Row {
            spacing: Style.space(12)
            anchors.right: parent.right

            Repeater {
              model: [
                { c: root.phoneColor, t: "phone · " + root.modeCounts.phone },
                { c: root.dataColor, t: "data · " + root.modeCounts.data },
                { c: root.cwColor, t: "cw · " + root.modeCounts.cw }
              ]
              delegate: Row {
                required property var modelData
                spacing: Style.space(5)
                Rectangle {
                  width: Style.space(9)
                  height: Style.space(9)
                  radius: Style.space(3)
                  color: modelData.c
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  text: modelData.t
                  color: Color.muted
                  font.family: Style.font.family
                  font.pixelSize: Style.space(10)
                  anchors.verticalCenter: parent.verticalCenter
                }
              }
            }
          }

          // Hover inspector: the fine print of whatever the pointer is over.
          BorderSurface {
            id: inspCard
            width: parent.width
            radius: Style.cornerRadius
            padding: Style.space(10)
            color: root.hoverText !== "" ? Qt.rgba(1, 1, 1, 0.05) : "transparent"
            borderSpec: Border.controlSpec("normal", Color.popups.text, Color.accent)
            height: inspCol.implicitHeight + inspCard.contentTopInset + inspCard.contentBottomInset
            Column {
              id: inspCol
              width: parent.width - inspCard.contentLeftInset - inspCard.contentRightInset
              x: inspCard.contentLeftInset
              y: inspCard.contentTopInset
              spacing: Style.space(4)
              Text {
                textFormat: Text.PlainText
                width: parent.width
                text: {
                  var lines = String(root.hoverText !== "" ? root.hoverText
                    : "Hover any stretch for the fine print — range, who may use it, modes, power.").split("\n")
                  return lines[0]
                }
                color: root.hoverText !== "" ? Color.popups.text : Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(12)
                font.bold: root.hoverText !== ""
                wrapMode: Text.WordWrap
              }
              Text {
                textFormat: Text.PlainText
                visible: root.hoverText !== "" && root.hoverText.indexOf("\n") >= 0
                width: parent.width
                text: {
                  var i = root.hoverText.indexOf("\n")
                  return i >= 0 ? root.hoverText.slice(i + 1) : ""
                }
                color: Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(11)
                wrapMode: Text.WordWrap
              }
              Text {
                textFormat: Text.PlainText
                visible: root.hoverText === ""
                width: parent.width
                text: "Click any band for its propagation story."
                color: Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(11)
              }
            }
          }

          Text {
            textFormat: Text.PlainText
            visible: root.classKnown
            width: parent.width
            text: "Full colour is yours — " + Bands.className(root.cty, root.myClass)
                  + " (" + root.mineCount + " of " + root.segCount + " segments). Dimmed stretches belong to higher licences."
            color: Color.muted
            font.family: Style.font.family
            font.pixelSize: Style.space(12)
            wrapMode: Text.WordWrap
          }
        }

        // ---- Country tab ----
        Column {
          visible: root.view === "country"
          width: parent.width
          spacing: Style.space(8)

          PanelSectionHeader {
            text: "COUNTRY"
            foreground: Color.popups.text
            font.letterSpacing: Style.space(2)
          }

          TextField {
            id: countryFilter
            width: parent.width
            placeholderText: "Filter countries…"
            foreground: Color.popups.text
            accent: Color.accent
          }

          Repeater {
            model: {
              var q = countryFilter.text.toLowerCase()
              var out = []
              for (var i = 0; i < root.countryRows.length; i++) {
                var c = root.countryRows[i]
                if (q === "" || c.name.toLowerCase().indexOf(q) >= 0
                    || c.id.toLowerCase().indexOf(q) >= 0) out.push(c)
              }
              return out.slice(0, 40)
            }
            delegate: Item {
              id: countryRow
              required property var modelData
              readonly property bool current: root.countryCode === modelData.id
              width: parent ? parent.width : 0
              height: Style.space(26)

              Rectangle {
                anchors.fill: parent
                radius: Style.cornerRadius
                color: countryRow.current ? Qt.rgba(1, 1, 1, 0.07)
                      : (rowMouse.containsMouse ? Qt.rgba(1, 1, 1, 0.045) : "transparent")
              }

              // The Row is a positioner: it force-places every child,
              // so the click target lives OUTSIDE it, filling this Item.
              Row {
                anchors.fill: parent
                anchors.leftMargin: Style.space(8)
                anchors.rightMargin: Style.space(8)
                spacing: Style.space(7)

                Rectangle {
                  width: Style.space(3)
                  height: Style.space(14)
                  radius: Style.space(2)
                  color: countryRow.current ? Color.accent : Color.muted
                  opacity: countryRow.current ? 0.95 : 0.4
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  width: Style.space(30)
                  text: countryRow.modelData.id
                  color: Color.popups.text
                  font.family: Style.font.family
                  font.pixelSize: Style.space(12)
                  font.bold: countryRow.current
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  width: countryRow.width - Style.space(30 + 54 + 40)
                  text: countryRow.modelData.name
                  color: countryRow.current ? Color.popups.text : Color.muted
                  font.family: Style.font.family
                  font.pixelSize: Style.space(12)
                  elide: Text.ElideRight
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  width: Style.space(54)
                  text: countryRow.modelData.bands + " rows"
                  color: Color.muted
                  font.family: Style.font.family
                  font.pixelSize: Style.space(11)
                  horizontalAlignment: Text.AlignRight
                  anchors.verticalCenter: parent.verticalCenter
                }
              }

              MouseArea {
                id: rowMouse
                anchors.fill: parent
                hoverEnabled: true
                cursorShape: Qt.PointingHandCursor
                onClicked: root.pickCountry(countryRow.modelData.id)
              }
            }
          }

          Text {
            textFormat: Text.PlainText
            width: parent.width
            text: "Choice lasts until restart. Make it permanent:\n" + root.makePermanentHint()
            color: Color.muted
            font.family: Style.font.family
            font.pixelSize: Style.space(10)
            wrapMode: Text.WordWrap
          }
        }

        Text {
          textFormat: Text.PlainText
          width: parent.width
          visible: root.cty && root.cty.regulator
          text: root.cty ? root.safeLines(root.cty.name + " — " + root.cty.regulator.document
                + " (" + root.cty.regulator.name + ", checked " + root.cty.regulator.retrieved
                + "). " + (root.cty.note || ""), 90, 6) : ""
          color: Color.muted
          font.family: Style.font.family
          font.pixelSize: Style.space(10)
          wrapMode: Text.WordWrap
        }
      }
    }
  }
}

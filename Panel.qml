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
// The bar pill is a single antenna glyph. The popup is a two-tab panel —
// the spectrum, where every band is a bar at its real place on a log
// frequency axis and each segment is coloured by what it is for (phone,
// data, CW), with hover for the fine print and a click for the band's
// propagation story; and the country picker.
Panel {
  id: root
  moduleName: "com.leafbox.hambands"
  ipcTarget: "com.leafbox.hambands"
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
    if (!m || !m.length) return "#3fb950"                      // phone
    if (m.indexOf("phone") >= 0 || m.indexOf("image") >= 0) return "#3fb950"
    if (m.indexOf("data") >= 0) return "#58a6ff"               // data
    if (m.indexOf("cw") >= 0) return "#d29922"                 // cw
    return "#8b949e"
  }

  function describe(s) {
    var parts = [Bands.fmtKhz(s.from) + " – " + Bands.fmtKhz(s.to)]
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
      if (String(groups[i].band) === detailBand) {
        for (var j = 0; j < groups[i].segments.length; j++) out.push(groups[i].segments[j])
      }
    }
    return out
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
    contentWidth: panel.fittedContentWidth(Style.space(660))
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

        // Masthead.
        Item {
          width: parent.width
          height: brandRow.implicitHeight

          Row {
            id: brandRow
            anchors.left: parent.left
            Text {
              textFormat: Text.PlainText
              text: root.glyph
              color: Color.accent
              font.family: Style.font.family
              font.pixelSize: Style.space(14)
              anchors.verticalCenter: parent.verticalCenter
            }
            Text {
              textFormat: Text.PlainText
              text: "HAM BANDS"
              color: Color.muted
              font.family: Style.font.family
              font.pixelSize: Style.space(11)
              font.bold: true
              font.letterSpacing: Style.space(3)
              anchors.verticalCenter: parent.verticalCenter
            }
          }

          Text {
            textFormat: Text.PlainText
            anchors.right: parent.right
            anchors.verticalCenter: parent.verticalCenter
            text: root.cty
              ? root.cty.name + (root.classKnown ? " · " + Bands.className(root.cty, root.myClass) : "")
              : ""
            color: Color.popups.text
            font.family: Style.font.family
            font.pixelSize: Style.space(11)
          }
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
            font.pixelSize: Style.space(20)
            font.bold: true
          }

          PanelSectionHeader {
            text: root.cty ? root.cty.regulator.name.toUpperCase() : ""
            foreground: Color.popups.text
            font.letterSpacing: Style.space(2)
          }

          Text {
            textFormat: Text.PlainText
            width: parent.width
            text: Notes.forBand(root.detailBand)
            color: Color.popups.text
            font.family: Style.font.family
            font.pixelSize: Style.space(12)
            wrapMode: Text.WordWrap
            lineHeight: 1.15
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
              spacing: Style.space(1)

              Row {
                width: detSeg.width
                spacing: Style.space(7)

                Rectangle {
                  width: Style.space(3)
                  height: Style.space(13)
                  radius: Style.space(2)
                  color: root.modeColor(detSeg.modelData)
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  width: Style.space(130)
                  text: Bands.fmtKhz(detSeg.modelData.from) + " – " + Bands.fmtKhz(detSeg.modelData.to)
                  color: Color.popups.text
                  font.family: Style.font.family
                  font.pixelSize: Style.space(12)
                }
                Text {
                  textFormat: Text.PlainText
                  width: detSeg.width - Style.space(130 + 24)
                  text: detSeg.modelData.modes && detSeg.modelData.modes.length
                          ? detSeg.modelData.modes.join(", ") : "all modes"
                  color: root.modeColor(detSeg.modelData)
                  font.family: Style.font.family
                  font.pixelSize: Style.space(11)
                  elide: Text.ElideRight
                }
              }
              Text {
                textFormat: Text.PlainText
                width: detSeg.width - Style.space(10)
                x: Style.space(10)
                text: root.classLabel(detSeg.modelData.classes || [])
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

          PanelSectionHeader {
            text: {
              if (!root.cty) return "NO COUNTRY"
              var head = root.cty.regulator.name.toUpperCase()
              if (root.classKnown) head += "  ·  " + Bands.className(root.cty, root.myClass).toUpperCase()
              return head
            }
            foreground: Color.popups.text
            font.letterSpacing: Style.space(2)
          }

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
                radius: Style.space(8)
                color: active ? Color.accent : "transparent"
                border.color: active ? Color.accent : Color.muted
                border.width: 1
                height: classText.implicitHeight + Style.space(8)
                width: classText.implicitWidth + Style.space(14)
                Text {
                  id: classText
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: chip.modelData.name
                  color: chip.active ? Color.popups.background : Color.popups.text
                  font.family: Style.font.family
                  font.pixelSize: Style.space(11)
                }
                MouseArea {
                  anchors.fill: parent
                  cursorShape: Qt.PointingHandCursor
                  onClicked: root.pickClass(chip.modelData.id)
                }
              }
            }
          }

          // The spectrum. Every band at its real share of the decades.
          Spectrum {
            width: parent.width
            bandGroups: root.bandGroups
            selectedClass: root.myClass
            colorFor: root.modeColor
            describe: root.describe
            inkColor: Color.popups.text
            mutedColor: Color.muted
            onSegmentHovered: function (text) { root.hoverText = text }
            onBandClicked: function (band) { root.openBand(band) }
          }

          // Mode legend.
          Row {
            spacing: Style.space(10)
            anchors.right: parent.right

            Repeater {
              model: [
                { c: "#3fb950", t: "phone" },
                { c: "#58a6ff", t: "data" },
                { c: "#d29922", t: "cw" }
              ]
              delegate: Row {
                required property var modelData
                spacing: Style.space(4)
                Rectangle {
                  width: Style.space(8)
                  height: Style.space(8)
                  radius: Style.space(2)
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

          PanelSeparator { foreground: Color.popups.text }

          // Hover inspector: the fine print of whatever the pointer is over.
          Text {
            textFormat: Text.PlainText
            width: parent.width
            height: Style.space(54)
            text: root.hoverText !== "" ? root.hoverText
              : "Hover a band for the fine print. Click it for the propagation story."
            color: root.hoverText !== "" ? Color.popups.text : Color.muted
            font.family: Style.font.family
            font.pixelSize: Style.space(12)
            wrapMode: Text.WordWrap
            lineHeight: 1.1
          }

          Text {
            textFormat: Text.PlainText
            visible: root.classKnown
            width: parent.width
            text: "Full colour is yours — " + Bands.className(root.cty, root.myClass)
                  + ". Dimmed segments belong to higher licences; click any band to read what it does."
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

          Rectangle {
            width: parent.width
            height: search.implicitHeight + Style.space(12)
            radius: Style.space(8)
            color: Color.popups.background
            border.color: Color.muted
            border.width: 1

            TextInput {
              id: search
              anchors.fill: parent
              anchors.margins: Style.space(6)
              color: Color.popups.text
              font.family: Style.font.family
              font.pixelSize: Style.space(13)
              clip: true
              Text {
                visible: search.text === "" && !search.activeFocus
                anchors.fill: parent
                verticalAlignment: Text.AlignVCenter
                textFormat: Text.PlainText
                text: "Filter countries…"
                color: Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(13)
              }
            }
          }

          Repeater {
            model: {
              var q = search.text.toLowerCase()
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
              width: parent ? parent.width : 0
              height: Style.space(20)

              // The Row is a positioner: it force-places every child,
              // so the click target lives OUTSIDE it, filling this Item.
              Row {
                anchors.fill: parent
                spacing: Style.space(7)

                Rectangle {
                  width: Style.space(3)
                  height: Style.space(14)
                  radius: Style.space(2)
                  color: root.countryCode === countryRow.modelData.id ? Color.accent : Color.muted
                  opacity: root.countryCode === countryRow.modelData.id ? 0.95 : 0.4
                  anchors.verticalCenter: parent.verticalCenter
                }
                Text {
                  textFormat: Text.PlainText
                  width: Style.space(30)
                  text: countryRow.modelData.id
                  color: Color.popups.text
                  font.family: Style.font.family
                  font.pixelSize: Style.space(12)
                  font.bold: root.countryCode === countryRow.modelData.id
                }
                Text {
                  textFormat: Text.PlainText
                  width: countryRow.width - Style.space(30 + 54 + 24)
                  text: countryRow.modelData.name
                  color: Color.muted
                  font.family: Style.font.family
                  font.pixelSize: Style.space(12)
                  elide: Text.ElideRight
                }
                Text {
                  textFormat: Text.PlainText
                  width: Style.space(54)
                  text: countryRow.modelData.bands + " rows"
                  color: Color.muted
                  font.family: Style.font.family
                  font.pixelSize: Style.space(11)
                  horizontalAlignment: Text.AlignRight
                }
              }

              MouseArea {
                anchors.fill: parent
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

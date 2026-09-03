import QtQuick
import Quickshell
import qs.Commons
import qs.Ui
import "bands.js" as Bands

// Renders the bundled allocation dataset (allocations.js + bands.js). No
// network, no processes: the only hygiene question is what the dataset
// itself contains, and the tests answer that. The bar pill shows the country
// whose table is on display; the popup is a two-tab panel — the band table
// for the chosen country and license class, and the country picker.
Panel {
  id: root
  moduleName: "com.leafbox.hambands"
  ipcTarget: "com.leafbox.hambands"
  manageIpc: false

  property var anchorItem: null
  property var hostWidget: null
  readonly property var barIdentity: hostWidget || root

  property string chosenView: ""
  readonly property string view: chosenView !== "" ? chosenView : "bands"

  // nf-fa-microphone-alt... no: the same transceiver glyph the sibling
  // hamradio plugin uses, written as an escape because private-use
  // characters get stripped in transit.
  readonly property string glyph: "\uf2db"

  // ---- Country and class selection ---------------------------------------
  // The picker writes `chosenCountry`; the setting makes it survive restarts.
  // Until Omarchy ships a settings UI the panel says which command makes the
  // choice permanent, exactly the way the reference plugin documents its keys.
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
  readonly property string label: cty ? glyph + "  " + cty.id : glyph
  readonly property string tooltip: {
    if (!cty) return "Ham Bands"
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

  // ---- Table data --------------------------------------------------------
  // The full set for the country, then the class filter decides which rows
  // light up. Rows the class may not use stay visible but dim — the reason
  // to look at a table that only says yes is to learn what is around you.
  readonly property var rows: {
    if (!cty) return []
    var segs = Bands.segmentsFor(cty, "")
    var groups = Bands.groupByBand(segs)
    var out = []
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i]
      for (var j = 0; j < g.segments.length; j++) {
        var s = g.segments[j]
        var allowed = myClass === "" || (s.classes && s.classes.indexOf(myClass) >= 0)
        out.push({
          band: g.band, from: s.from, to: s.to,
          first: j === 0, count: g.segments.length,
          classes: s.classes || [],
          modes: s.modes ? s.modes.join(", ") : "all modes",
          note: s.note || "",
          allowed: allowed
        })
      }
    }
    return out
  }
  readonly property var bandNames: {
    var out = []
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].first) out.push(rows[i].band)
    }
    return out
  }
  readonly property var countryRows: {
    var list = Bands.countries()
    var out = []
    for (var i = 0; i < list.length; i++) {
      out.push({
        id: list[i].id, name: list[i].name,
        bands: list[i].bands ? list[i].bands.length : 0,
        regulator: list[i].regulator ? list[i].regulator.name : ""
      })
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

  function pickCountry(id) {
    root.chosenCountry = String(id || "").toUpperCase()
    root.chosenView = "bands"
  }
  function pickClass(id) {
    root.chosenClass = root.chosenClass === id ? "" : id
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
    contentWidth: panel.fittedContentWidth(Style.space(440))
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
            spacing: Style.space(7)
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
              text: "BAND ALLOCATIONS"
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
            text: root.cty ? root.cty.name + (root.classKnown ? " · " + Bands.className(root.cty, root.myClass) : "") : ""
            color: Color.popups.text
            font.family: Style.font.family
            font.pixelSize: Style.space(11)
          }
        }

        ButtonGroup {
          options: [
            { value: "bands", label: "Bands" },
            { value: "country", label: "Country" }
          ]
          value: root.view
          focusable: false
          foreground: Color.popups.text
          background: Color.popups.background
          accent: Color.accent
          fontSize: Style.space(12)
          onChanged: function (v) { root.chosenView = v }
        }

        // ---- Bands ----
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

          // Class chips: tap to filter the table to one license.
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

          PanelSeparator { foreground: Color.popups.text }

          // The table: one row per uniform segment, band name only on the
          // first row of each band.
          Repeater {
            model: root.rows.slice(0, 160)
            delegate: Row {
              id: segRow
              required property var modelData
              width: parent ? parent.width : 0
              spacing: Style.space(7)

              Rectangle {
                width: Style.space(3)
                height: Style.space(14)
                radius: Style.space(2)
                color: segRow.modelData.allowed ? Color.accent : Color.muted
                opacity: segRow.modelData.allowed ? 0.95 : 0.4
                anchors.verticalCenter: parent.verticalCenter
              }
              Text {
                textFormat: Text.PlainText
                width: Style.space(46)
                text: segRow.modelData.first ? segRow.modelData.band : ""
                color: Color.popups.text
                font.family: Style.font.family
                font.pixelSize: Style.space(12)
                font.bold: true
              }
              Text {
                textFormat: Text.PlainText
                width: Style.space(120)
                text: Bands.fmtKhz(segRow.modelData.from) + " – " + Bands.fmtKhz(segRow.modelData.to)
                color: segRow.modelData.allowed ? Color.popups.text : Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(11)
              }
              Text {
                textFormat: Text.PlainText
                width: segRow.width - Style.space(46 + 120 + 24)
                text: segRow.modelData.allowed && segRow.modelData.classes.length
                        ? root.classLabel(segRow.modelData.classes)
                        : segRow.modelData.modes
                color: Color.muted
                font.family: Style.font.family
                font.pixelSize: Style.space(11)
                elide: Text.ElideRight
              }
            }
          }

          PanelSeparator { foreground: Color.popups.text }

          Text {
            textFormat: Text.PlainText
            visible: root.classKnown
            width: parent.width
            text: "Rows lit in the accent colour are yours. Untick your class chip to see every license again."
            color: Color.muted
            font.family: Style.font.family
            font.pixelSize: Style.space(11)
            wrapMode: Text.WordWrap
          }
        }

        // ---- Country ----
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
            delegate: Row {
              id: countryRow
              required property var modelData
              width: parent ? parent.width : 0
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

              // anchors.fill is not allowed inside a Row (the shell warns
              // and ignores it), so size the click target by hand.
              MouseArea {
                width: countryRow.width
                height: countryRow.height
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

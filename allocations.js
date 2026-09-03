.pragma library
// The allocation dataset. One entry per contiguous frequency segment on which
// the set of permitted license classes and the mode list are uniform, in kHz,
// inclusive bounds. Where two segments share a range with different mode
// lists, their class sets are disjoint (the tests check this).
//
// `modes` uses the regulator's own vocabulary: cw, data (RTTY/data), phone,
// image. A segment without `modes` has no mode restriction stated by the
// regulator. `note` carries the caveats that shape the segment: geographic
// limits, power ceilings, channelisation.

var DATA = {
  "meta": {
    "version": "0.1.0",
    "updated": "2026-09",
    "units": "kHz",
    "bounds": "inclusive",
    "note": "Curated from national regulator documents. Each country names its source; the retrieved stamp is when the table was last checked against it. National tables are the ground truth — IARU band plans are a harmonised baseline, not law."
  },
  "sources": [
    {
      "id": "ecfr-97",
      "name": "47 CFR Part 97 (eCFR)",
      "url": "https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-97",
      "retrieved": "2026-09"
    },
    {
      "id": "afuv-anlage1",
      "name": "Amateurfunkverordnung (AFuV), Anlage 1",
      "url": "https://www.gesetze-im-internet.de/afuv_2005/anlage_1.html",
      "retrieved": "2026-09"
    },
    {
      "id": "rbr-4",
      "name": "ISED RBR-4 — Standards for the Operation of Radio Stations in the Amateur Radio Service",
      "url": "https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/regulations-reference-rbr/rbr-4-standards-operation-radio-stations-amateur-radio-service",
      "retrieved": "2026-09"
    },
    {
      "id": "au-acma-class-licence-2023",
      "name": "Radiocommunications (Amateur Stations) Class Licence 2023 - Federal Register of Legislation",
      "url": "https://www.legislation.gov.au/F2023L01648/latest/text",
      "retrieved": "2026-09"
    },
    {
      "id": "anatel-cartilha-2026",
      "name": "Cartilha do Servico Radioamador (official ANATEL guidebook, June 2026) - used as the cross-check for class gating, powers and the 60 m / EIRP special conditions; the LABRE/LIGA de Amadores society charts were not needed",
      "url": "https://www.gov.br/anatel/pt-br/assuntos/noticias/anatel-simplifica-regras-e-fortalece-o-radioamadorismo-no-brasil/cartilha_radioamador.pdf/@@display-file/file",
      "retrieved": "2026-09"
    },
    {
      "id": "ised-rbr4",
      "name": "ISED RBR-4 Issue 3 (July 2022) — Schedule I, frequency bands and bandwidths for amateur stations operating in Canada",
      "url": "https://ised-isde.canada.ca/site/spectrum-management-telecommunications/sites/default/files/attachments/2022/RBR-4-i3-2022-07EN.pdf",
      "retrieved": "2026-09"
    },
    {
      "id": "gesetze-im-internet-afuv",
      "name": "gesetze-im-internet.de — AFuV Anlage 1 (official consolidated text)",
      "url": "https://www.gesetze-im-internet.de/afuv_2005/anlage_1.html",
      "retrieved": "2026-09"
    },
    {
      "id": "iaru-r1",
      "name": "IARU Region 1 band plan (HF effective 16 Oct 2020; VHF/UHF Dec 2020) used as working table for mode segmentation",
      "url": "http://www.iaru-r1.org/wp-content/uploads/2021/06/hf_r1_bandplan.pdf",
      "retrieved": "2026-09"
    },
    {
      "id": "rsgb-bandplans",
      "name": "RSGB Band Plans (January 2026 edition)",
      "url": "https://rsgb.services/public/bandplans/docs/260125_rsgb_band_plan_2026.pdf",
      "retrieved": "2026-09"
    },
    {
      "id": "arsi",
      "name": "Amateur Radio Society of India (ARSI) - intended cross-check only; wpc.gov.in was unreachable, so the regulator document itself was retrieved from the Internet Archive snapshot of 5 Dec 2017 (ARSI site is reachable but exposes no band-plan page)",
      "url": "https://web.archive.org/web/20171205004205/http://wpc.gov.in/WriteReadData/userfiles/file/amateur_new_guidelines.pdf",
      "retrieved": "2026-09"
    },
    {
      "id": "it-pnrf",
      "name": "Piano Nazionale di Ripartizione delle Frequenze (DM 5 ottobre 2018) - Tabella di attribuzione",
      "url": "https://www.gazzettaufficiale.it/eli/gu/2018/10/19/244/so/49/sg/pdf",
      "retrieved": "2026-09"
    },
    {
      "id": "jp-rei",
      "name": "電波法施行令 (Cabinet Order 245 of 2001), Article 3(3), e-Gov XML",
      "url": "https://elaws.e-gov.go.jp/document?lawid=413CO0000000245",
      "retrieved": "2026-09"
    },
    {
      "id": "nl-bijlage1",
      "name": "Regeling gebruik van frequentieruimte met meldingsplicht 2015, Bijlage 1 (Radiozendamateurs)",
      "url": "https://wetten.overheid.nl/BWBR0036375/2026-06-19",
      "retrieved": "2026-09"
    },
    {
      "id": "nzart",
      "name": "NZART band plan (maintained by the New Zealand Association of Radio Transmitters on top of the GURL band limits; IARU Region 3-aligned with Region 1-style HF plans)",
      "url": "https://www.nzart.org.nz/",
      "retrieved": "2026-09"
    },
    {
      "id": "nrfp-2026",
      "name": "ICASA National Radio Frequency Plan 2026 (cross-check of statuses, band edges and national footnotes NF0/NF1/NF2/NF8)",
      "url": "https://www.icasa.org.za/uploads/files/Published-National-Radio-Frequency-Plan-2026.pdf",
      "retrieved": "2026-09"
    }
  ],
  "countries": [
    {
      "id": "US",
      "name": "United States",
      "ituRegion": 2,
      "regulator": {
        "name": "FCC",
        "document": "47 CFR Part 97, §97.301 (bands by operator class) and §97.305/97.307 (emission types and standards)",
        "url": "https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-97",
        "retrieved": "2026-09",
        "sourceId": "ecfr-97"
      },
      "classes": [
        {
          "id": "extra",
          "name": "Amateur Extra"
        },
        {
          "id": "advanced",
          "name": "Advanced"
        },
        {
          "id": "general",
          "name": "General"
        },
        {
          "id": "technician",
          "name": "Technician"
        },
        {
          "id": "novice",
          "name": "Novice"
        }
      ],
      "note": "Ranges below are the ITU Region 2 columns of §97.301. General holds Advanced's pre-2000 privileges; Advanced remains a live (grandfathered) class. CW is lawful everywhere a class is authorized (§97.305(a)).",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "5 W EIRP"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "5 W EIRP"
        },
        {
          "band": "160m",
          "from": 1800,
          "to": 2000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ]
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3525,
          "classes": [
            "extra"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "80m",
          "from": 3525,
          "to": 3600,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "80m",
          "from": 3525,
          "to": 3600,
          "classes": [
            "technician",
            "novice"
          ],
          "modes": [
            "cw"
          ],
          "note": "200 W PEP"
        },
        {
          "band": "80m",
          "from": 3600,
          "to": 4000,
          "classes": [
            "extra"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "80m",
          "from": 3700,
          "to": 4000,
          "classes": [
            "advanced"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "80m",
          "from": 3800,
          "to": 4000,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "60m",
          "from": 5330.6,
          "to": 5333.4,
          "classes": ["extra", "advanced", "general"],
          "modes": ["cw", "data", "phone"],
          "note": "Discrete channel, centre 5332.0 kHz"
        },
        {
          "band": "60m",
          "from": 5346.6,
          "to": 5349.4,
          "classes": ["extra", "advanced", "general"],
          "modes": ["cw", "data", "phone"],
          "note": "Discrete channel, centre 5348.0 kHz"
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5366.5,
          "classes": ["extra", "advanced", "general"],
          "modes": ["cw", "data", "phone"],
          "note": "Continuous WRC-15 allocation; 100 W ERP, 2.8 kHz bandwidth"
        },
        {
          "band": "60m",
          "from": 5371.6,
          "to": 5374.4,
          "classes": ["extra", "advanced", "general"],
          "modes": ["cw", "data", "phone"],
          "note": "Discrete channel, centre 5373.0 kHz"
        },
        {
          "band": "60m",
          "from": 5403.6,
          "to": 5406.4,
          "classes": ["extra", "advanced", "general"],
          "modes": ["cw", "data", "phone"],
          "note": "Discrete channel, centre 5405.0 kHz"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7025,
          "classes": [
            "extra"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "40m",
          "from": 7025,
          "to": 7100,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "40m",
          "from": 7025,
          "to": 7100,
          "classes": [
            "technician",
            "novice"
          ],
          "modes": [
            "cw"
          ],
          "note": "200 W PEP"
        },
        {
          "band": "40m",
          "from": 7075,
          "to": 7100,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "phone",
            "image"
          ],
          "note": "Region 2 only west of 130° W or south of 20° N"
        },
        {
          "band": "40m",
          "from": 7100,
          "to": 7125,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "40m",
          "from": 7100,
          "to": 7125,
          "classes": [
            "technician",
            "novice"
          ],
          "modes": [
            "cw"
          ],
          "note": "200 W PEP"
        },
        {
          "band": "40m",
          "from": 7125,
          "to": 7175,
          "classes": [
            "extra",
            "advanced"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "40m",
          "from": 7175,
          "to": 7300,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14025,
          "classes": [
            "extra"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "20m",
          "from": 14025,
          "to": 14150,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "20m",
          "from": 14150,
          "to": 14175,
          "classes": [
            "extra"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "20m",
          "from": 14175,
          "to": 14225,
          "classes": [
            "extra",
            "advanced"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "20m",
          "from": 14225,
          "to": 14350,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18110,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "17m",
          "from": 18110,
          "to": 18168,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21025,
          "classes": [
            "extra"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "15m",
          "from": 21025,
          "to": 21200,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "15m",
          "from": 21025,
          "to": 21200,
          "classes": [
            "technician",
            "novice"
          ],
          "modes": [
            "cw"
          ],
          "note": "200 W PEP"
        },
        {
          "band": "15m",
          "from": 21200,
          "to": 21225,
          "classes": [
            "extra"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "15m",
          "from": 21225,
          "to": 21275,
          "classes": [
            "extra",
            "advanced"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "15m",
          "from": 21275,
          "to": 21450,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24930,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "12m",
          "from": 24930,
          "to": 24990,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 28300,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "data"
          ]
        },
        {
          "band": "10m",
          "from": 28300,
          "to": 28500,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone"
          ],
          "note": "Novice/Technician: J3E and R3E phone only"
        },
        {
          "band": "10m",
          "from": 28500,
          "to": 29700,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image"
          ]
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 50100,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw"
          ]
        },
        {
          "band": "6m",
          "from": 50100,
          "to": 51000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "6m",
          "from": 51000,
          "to": 54000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ],
          "note": "Test emissions also authorized"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 144100,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw"
          ]
        },
        {
          "band": "2m",
          "from": 144100,
          "to": 148000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ],
          "note": "Test emissions also authorized"
        },
        {
          "band": "1.25m",
          "from": 219000,
          "to": 220000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "data"
          ]
        },
        {
          "band": "1.25m",
          "from": 222000,
          "to": 225000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ],
          "note": "Test emissions also authorized"
        },
        {
          "band": "70cm",
          "from": 420000,
          "to": 450000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ],
          "note": "Spread spectrum and test emissions also authorized"
        },
        {
          "band": "33cm",
          "from": 902000,
          "to": 928000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ],
          "note": "Spread spectrum, pulse and test emissions also authorized"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1270000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "23cm",
          "from": 1270000,
          "to": 1295000,
          "classes": [
            "extra",
            "advanced",
            "general",
            "technician",
            "novice"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "23cm",
          "from": 1295000,
          "to": 1300000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "13cm",
          "from": 2300000,
          "to": 2310000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "13cm",
          "from": 2390000,
          "to": 2450000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "5cm",
          "from": 5650000,
          "to": 5925000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ],
          "note": "5725–5850 kHz shared"
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10500000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "1.2cm",
          "from": 24000000,
          "to": 24250000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "4mm",
          "from": 76000000,
          "to": 81000000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "2.5mm",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "2mm",
          "from": 134000000,
          "to": 141000000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        },
        {
          "band": "1mm",
          "from": 241000000,
          "to": 250000000,
          "classes": [
            "extra",
            "advanced",
            "general"
          ],
          "modes": [
            "cw",
            "phone",
            "image",
            "data"
          ]
        }
      ]
    },
    {
      "id": "DE",
      "name": "Germany",
      "ituRegion": 1,
      "regulator": {
        "name": "Bundesnetzagentur für Elektrizität, Gas, Telekommunikation, Post und Eisenbahnen (BNetzA)",
        "document": "Amateurfunkverordnung (AFuV) 2005, Anlage 1 — Nutzungsbedingungen für die im Frequenzplan für den Amateurfunkdienst ausgewiesenen Frequenzbereiche (BGBl. 2024 I Nr. 175, S. 1–4)",
        "url": "https://www.gesetze-im-internet.de/afuv_2005/anlage_1.html",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "a",
          "name": "Klasse A"
        },
        {
          "id": "e",
          "name": "Klasse E"
        },
        {
          "id": "n",
          "name": "Klasse N"
        }
      ],
      "note": "Access is gated by three licence classes defined in AFuV Anlage 1: Klasse A (full privileges, up to 750 W PEP on primary HF/VHF/UHF allocations), Klasse E (entry class added 2020, 100 W PEP on 160m/80m/15m/10m and 75 W PEP on 2m/70cm/23cm), and Klasse N (added 2024 for young entrants without full examination: 10 W ERP on 10m and 6.1 W ERP on 2m/70cm). The AFuV restricts maximum occupied bandwidth per band (800 Hz on 2200m/630m, 2.7 kHz on 160m–12m HF, 7 kHz below 29 MHz on 10m, 12 kHz on 6m, 40 kHz on 2m, 2 MHz on 70cm/23cm, 10 MHz above 2.3 GHz) rather than naming modes; the 'modes' fields below are derived from those bandwidth limits. Key deviations: on 160m (1810–2000 kHz) weekend power is raised to 750 W PEP (A) / 100 W PEP (E) and contests are permitted on weekends only (NB 15); the 1850–2000 kHz sub-bands, 30m and 2200m bar remote-controlled stations and contests; 6m (50–52 MHz) is restricted to fixed stations with horizontal polarisation and no interference to wind-profiler radars; 1247–1263 MHz (23cm, Galileo/radio-navigation protection) is capped at 3.05 W ERP; remote-controlled and automatically operating stations above 30 MHz are limited to 50 W ERP (except remote operation); 2200m and 630m are available to Klasse A only at 1 W ERP. Status column: P = primary, S = secondary (several segments are shared primary with other services).",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Klasse A only: 1 W ERP. Secondary. Max occupied bandwidth 800 Hz (NB 1). Remote-controlled stations and contests not permitted (NB 2, 10)."
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Klasse A only: 1 W ERP. Secondary. Max occupied bandwidth 800 Hz (NB 1)."
        },
        {
          "band": "160m",
          "from": 1810,
          "to": 1850,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 100 W PEP. Primary. Max occupied bandwidth 2.7 kHz (NB 3)."
        },
        {
          "band": "160m",
          "from": 1850,
          "to": 1890,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary. A: 75 W PEP; E: 75 W PEP; weekends 750 W PEP (A) / 100 W PEP (E) (NB 15). No remote-controlled stations, no contests (NB 10). Max bandwidth 2.7 kHz."
        },
        {
          "band": "160m",
          "from": 1890,
          "to": 2000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary. A: 10 W PEP; E: 10 W PEP; weekends 750 W PEP (A) / 100 W PEP (E) (NB 15). No remote-controlled stations, no contests (NB 10). Max bandwidth 2.7 kHz."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3800,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 100 W PEP. Primary. Max occupied bandwidth 2.7 kHz."
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5366.5,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Klasse A only: 9.14 W ERP. Secondary. Max occupied bandwidth 2.7 kHz."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Klasse A only: 750 W PEP. Primary; 7000–7100 kHz also primary for amateur satellite. Max occupied bandwidth 2.7 kHz."
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Klasse A only: 150 W PEP. Secondary. No remote-controlled stations, no contests (NB 10). Max occupied bandwidth 2.7 kHz (2.7 kHz and the small segment effectively confine operation to CW/data)."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Klasse A only: 750 W PEP. Primary; 14000–14250 kHz also primary for amateur satellite. Max occupied bandwidth 2.7 kHz."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Klasse A only: 750 W PEP. Primary; also primary for amateur satellite. Max occupied bandwidth 2.7 kHz."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 100 W PEP. Primary; also primary for amateur satellite. Max occupied bandwidth 2.7 kHz."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Klasse A only: 750 W PEP. Primary; also primary for amateur satellite. Max occupied bandwidth 2.7 kHz."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "a",
            "e",
            "n"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 100 W PEP; N: 10 W ERP. Primary; also primary for amateur satellite. Max occupied bandwidth 7 kHz below 29 MHz, 40 kHz above 29 MHz (NB 4)."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 50400,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Klasse A only: 750 W PEP. Secondary. Fixed stations only, horizontal polarisation exclusively; no interference to wind-profiler radars, no protection from them (NB 5). Max occupied bandwidth 12 kHz."
        },
        {
          "band": "6m",
          "from": 50400,
          "to": 52000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Klasse A only: 25 W PEP. Secondary. Same 50 MHz restrictions as 50–50.4 MHz: fixed stations, horizontal polarisation, no wind-profiler interference (NB 5). Max occupied bandwidth 12 kHz."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "a",
            "e",
            "n"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 75 W PEP; N: 6.1 W ERP. Primary; also primary for amateur satellite. Max occupied bandwidth 40 kHz."
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 440000,
          "classes": [
            "a",
            "e",
            "n"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 75 W PEP; N: 6.1 W ERP. Primary. Amateur satellite secondary in 435–438 MHz. Max occupied bandwidth 2 MHz (7 MHz for amplitude-modulated television)."
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1250000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 75 W PEP. Secondary. Max occupied bandwidth 2 MHz (18 MHz FM TV). Cap of 3.05 W ERP applies in the 1247–1263 MHz sub-range (NB 11)."
        },
        {
          "band": "23cm",
          "from": 1250000,
          "to": 1260000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 75 W PEP. Secondary. Max occupied bandwidth 2 MHz. Cap of 3.05 W ERP applies in the 1247–1263 MHz sub-range (NB 11)."
        },
        {
          "band": "23cm",
          "from": 1260000,
          "to": 1300000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 750 W PEP; E: 75 W PEP. Secondary. Max occupied bandwidth 2 MHz. Cap of 3.05 W ERP applies in the 1247–1263 MHz sub-range (NB 11); 1260–1270 MHz usable for amateur satellite (earth-to-space only), other secondary services preferred in satellite use."
        },
        {
          "band": "13cm",
          "from": 2320000,
          "to": 2400000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz (20 MHz TV)."
        },
        {
          "band": "13cm",
          "from": 2400000,
          "to": 2450000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 2400–2450 MHz also secondary for amateur satellite (other secondary services preferred in satellite use). Max occupied bandwidth 10 MHz."
        },
        {
          "band": "9cm",
          "from": 3400000,
          "to": 3475000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "6cm",
          "from": 5650000,
          "to": 5670000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 5650–5670 MHz also secondary for amateur satellite, earth-to-space only, other secondary services preferred (NB 13). Max occupied bandwidth 10 MHz."
        },
        {
          "band": "6cm",
          "from": 5670000,
          "to": 5725000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "6cm",
          "from": 5725000,
          "to": 5755000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "6cm",
          "from": 5755000,
          "to": 5830000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "6cm",
          "from": 5830000,
          "to": 5850000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 5830–5850 MHz also secondary for amateur satellite, space-to-earth only. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10400000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "3cm",
          "from": 10400000,
          "to": 10450000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "3cm",
          "from": 10450000,
          "to": 10500000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 10450–10500 MHz also secondary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "12mm",
          "from": 24000000,
          "to": 24050000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Primary; also primary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "12mm",
          "from": 24050000,
          "to": 24250000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Primary; also primary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "4mm",
          "from": 76000000,
          "to": 77500000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 76–81 GHz also secondary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "4mm",
          "from": 77500000,
          "to": 78000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 76–81 GHz also secondary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "4mm",
          "from": 78000000,
          "to": 79000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 76–81 GHz also secondary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "4mm",
          "from": 79000000,
          "to": 81000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 76–81 GHz also secondary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "2.5mm",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "2mm",
          "from": 134000000,
          "to": 136000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Primary; also primary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "2mm",
          "from": 136000000,
          "to": 141000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 136–141 GHz also secondary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "1mm",
          "from": 241000000,
          "to": 248000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Secondary; 241–248 GHz also secondary for amateur satellite. Max occupied bandwidth 10 MHz."
        },
        {
          "band": "1mm",
          "from": 248000000,
          "to": 250000000,
          "classes": [
            "a",
            "e"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "A: 75 W PEP; E: 5 W PEP. Primary; also primary for amateur satellite. Max occupied bandwidth 10 MHz."
        }
      ]
    },
    {
      "id": "CA",
      "name": "Canada",
      "ituRegion": 2,
      "regulator": {
        "name": "Innovation, Science and Economic Development Canada (ISED)",
        "document": "RBR-4 — Standards for the Operation of Radio Stations in the Amateur Radio Service, Issue 3 (July 2022), Schedule I",
        "url": "https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/regulations-reference-rbr/rbr-4-standards-operation-radio-stations-amateur-radio-service",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "advanced",
          "name": "Amateur Radio Operator Certificate with Advanced Qualification"
        },
        {
          "id": "basic-honours",
          "name": "Amateur Radio Operator Certificate with Basic Qualification with Honours (score of 80% or above)"
        },
        {
          "id": "basic",
          "name": "Amateur Radio Operator Certificate with Basic Qualification"
        }
      ],
      "note": "Operator certification is governed by ISED; RBR-4 (formerly RIC-2, reclassified as RBR-4 in 2007; current Issue 3, July 2022) sets frequency privileges per qualification. A Basic Qualification alone is limited to bands above 30 MHz; all access below 30 MHz requires Basic with Honours (80%+ on the Basic exam) or the Advanced Qualification — a Basic holder with the 5 w.p.m. Morse Code qualification also has full HF access, though RBR-4 lists it as a separate qualification. RBR-4 does not grant Basic holders any sub-30 MHz segment; §11 only requires that signals automatically retransmitted below 29.5 MHz originate from an operator qualified below 30 MHz. Power caps: Basic — 560 W PEP (SSB), 190 W carrier (other emissions), or 250 W DC input; Advanced — 2250 W PEP (SSB), 750 W carrier, or 1000 W DC input; an external amplifier must not be capable of exceeding the applicable limit by more than 3 dB. Key deviations from the international table: 60 m operation is channelized (five fixed channels, 2.8 kHz max bandwidth, 100 W PEP e.r.p., CW/data/phone emissions only, no interference protection, C21); 30 m is a non-conforming Canadian allocation with no interference protection (C6); 40 m 7200–7300 kHz must not constrain broadcasting (5.142); 219–220 MHz is secondary and 220–222 MHz only in exceptional circumstances such as disaster relief (C11). 2200 m and 630 m are capped at 1 W e.i.r.p. Authorized foreign amateurs receive Basic + Advanced privileges, capped by their home licence.",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "Maximum radiated power 1 W e.i.r.p. (footnote 5.67A); 100 Hz max bandwidth; must not interfere with radionavigation service."
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "Maximum 1 W e.i.r.p. (footnote 5.80A); 1 kHz max bandwidth; no protection from, and no harmful interference to, aeronautical radionavigation."
        },
        {
          "band": "160m",
          "from": 1800,
          "to": 2000,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "6 kHz max bandwidth."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 4000,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "6 kHz max bandwidth."
        },
        {
          "band": "60m",
          "from": 5330.6,
          "to": 5333.4,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Discrete channel centre frequency (C21); 2.8 kHz max bandwidth. Encoded here as the 2.8 kHz channel width around the centre."
        },
        {
          "band": "60m",
          "from": 5346.6,
          "to": 5349.4,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Discrete channel centre frequency (C21); 2.8 kHz max bandwidth. Encoded here as the 2.8 kHz channel width around the centre."
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5366.5,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "C21: 100 W PEP e.r.p. per channel; emissions limited to telephony (2K80J3E), data (2K80J2D), RTTY (60H0J2B) and CW (150HA1A); 2.8 kHz max bandwidth; non-conforming allocation — no interference protection, may be ordered off if fixed/mobile operations are affected."
        },
        {
          "band": "60m",
          "from": 5371.6,
          "to": 5374.4,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Discrete channel centre frequency (C21); 2.8 kHz max bandwidth. Encoded here as the 2.8 kHz channel width around the centre."
        },
        {
          "band": "60m",
          "from": 5403.6,
          "to": 5406.4,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Discrete channel centre frequency (C21); 2.8 kHz max bandwidth. Encoded here as the 2.8 kHz channel width around the centre."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7300,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "6 kHz max bandwidth; amateur use of 7200–7300 kHz shall not constrain broadcasting (footnote 5.142)."
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "1 kHz max bandwidth; non-conforming Canadian allocation (C6) — no interference protection and may be required to cease if fixed service of other administrations is affected."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "6 kHz max bandwidth."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "6 kHz max bandwidth."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "6 kHz max bandwidth."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "6 kHz max bandwidth."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "advanced",
            "basic-honours"
          ],
          "note": "20 kHz max bandwidth; automatic retransmission below 29.5 MHz only of signals from an operator qualified below 30 MHz."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 54000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "30 kHz max bandwidth."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 148000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "30 kHz max bandwidth."
        },
        {
          "band": "1.25m",
          "from": 219000,
          "to": 220000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "Secondary basis (C11); 100 kHz max bandwidth."
        },
        {
          "band": "1.25m",
          "from": 220000,
          "to": 222000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "Secondary basis; exceptional circumstances only, e.g. disaster-relief assistance (C11); 100 kHz max bandwidth."
        },
        {
          "band": "1.25m",
          "from": 222000,
          "to": 225000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "100 kHz max bandwidth."
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 450000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "12 MHz max bandwidth; transmissions shall neither cause nor receive protection from interference by other services."
        },
        {
          "band": "33cm",
          "from": 902000,
          "to": 928000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "12 MHz max bandwidth; no interference to or protection from other services."
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "13cm",
          "from": 2300000,
          "to": 2450000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "9cm",
          "from": 3300000,
          "to": 3500000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "5cm",
          "from": 5650000,
          "to": 5925000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10500000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "1.2cm",
          "from": 24000000,
          "to": 24050000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ]
        },
        {
          "band": "1.2cm",
          "from": 24050000,
          "to": 24250000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ]
        },
        {
          "band": "4mm",
          "from": 76000000,
          "to": 77500000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "4mm",
          "from": 77500000,
          "to": 78000000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ]
        },
        {
          "band": "4mm",
          "from": 78000000,
          "to": 81000000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "4mm",
          "from": 81000000,
          "to": 81500000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "Secondary basis (footnote 5.561A)."
        },
        {
          "band": "2.5mm",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "2mm",
          "from": 134000000,
          "to": 136000000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ]
        },
        {
          "band": "2mm",
          "from": 136000000,
          "to": 141000000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "1.2mm",
          "from": 241000000,
          "to": 248000000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ],
          "note": "No interference to or protection from other services."
        },
        {
          "band": "1.2mm",
          "from": 248000000,
          "to": 250000000,
          "classes": [
            "advanced",
            "basic-honours",
            "basic"
          ]
        }
      ]
    },
    {
      "id": "AU",
      "name": "Australia",
      "ituRegion": 3,
      "regulator": {
        "name": "Australian Communications and Media Authority (ACMA)",
        "document": "Radiocommunications (Amateur Stations) Class Licence 2023 (F2023L01648), in force 19 Feb 2024; Schedules 2 (Tables A/B/C) give bands, power and limitations per qualification",
        "url": "https://www.legislation.gov.au/F2023L01648/latest/text",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "advanced",
          "name": "Amateur Advanced (ACMA recognition certificate or recognised qualification, Advanced)"
        },
        {
          "id": "standard",
          "name": "Amateur Standard (ACMA recognition certificate or recognised qualification, Standard)"
        },
        {
          "id": "foundation",
          "name": "Amateur Foundation (ACMA recognition certificate or recognised qualification, Foundation)"
        }
      ],
      "note": "Operation is authorised by the ACMA class licence (which replaced individual amateur apparatus licences from 19 Feb 2024); a person must hold an ACMA recognition certificate or a recognised qualification (Foundation, Standard or Advanced) and use an assigned VK call sign. Power is tiered per qualification: Foundation 10 W PEP (pX) on all its bands; Standard 100 W PEP for J3E/R3E (SSB) or 30 W mean power (pY) otherwise; Advanced 400 W PEP for C3F/J3E/R3E (incl. analogue TV and SSB) or 120 W mean power otherwise (on 2200 m/630 m the caps are 1 W and 5 W PEP EIRP). Verified September 2026: the Advanced cap remains 400 W PEP - the rumoured/considered rise to 1 kW PEP was NOT made in the current instrument, and the 2025 Licence Conditions (Amateur Licence) Determination only changed apparatus-licence conditions (e.g. removing a 472-479 kHz Timor NDB restriction). Foundation holders are limited to 80/40/15/10 m, 2 m and 70 cm; Standard adds 20 m, 6 m (50-54 MHz), 23 cm, 13 cm (2.40-2.45 GHz) and 5.8 GHz; Advanced adds 2200 m, 630 m, 160 m, 30 m, 17 m, 12 m, 2.30-2.302 GHz, 9 cm (3.3-3.4 GHz), 3.4 GHz and all higher amateur bands. There is no 60 m allocation for any class. Bandwidth restrictions: segments marked ≤ 8 kHz or ≤ 2.1/3 kHz prohibit wider emissions; segments with the PSD cap allow wider emissions only at ≤ 1 W per 100 kHz power spectral density. Additional geographic limits: 3.4-3.6 GHz is excluded in the listed remote Schedule 3 areas, and all operation is prohibited in the Australian Radio Quiet Zone (WA). Repeaters and beacons require separate transmitter licences and are not authorised under this class licence. WIA band plan (wia.org.au) used only as a cross-check; it is consistent with the licence (e.g. 6 m split 50-52 secondary / 52-54 primary, no Foundation access, 10 W/100 W PEP for Foundation/Standard).",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "advanced"
          ],
          "note": "1 W PEP EIRP; necessary bandwidth must not exceed 2.1 kHz"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "advanced"
          ],
          "note": "5 W PEP EIRP; necessary bandwidth must not exceed 3 kHz"
        },
        {
          "band": "160m",
          "from": 1800,
          "to": 1875,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 8 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3700,
          "classes": [
            "advanced",
            "standard",
            "foundation"
          ],
          "note": "F 10 W PEP; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 8 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "80m",
          "from": 3776,
          "to": 3800,
          "classes": [
            "advanced"
          ],
          "note": "Advanced only; 400 W PEP (C3F/J3E/R3E) or 120 W mean; necessary bandwidth must not exceed 8 kHz"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7100,
          "classes": [
            "advanced",
            "standard",
            "foundation"
          ],
          "note": "F 10 W PEP; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 8 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "40m",
          "from": 7100,
          "to": 7300,
          "classes": [
            "advanced",
            "standard",
            "foundation"
          ],
          "note": "F 10 W PEP; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; necessary bandwidth must not exceed 8 kHz"
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "advanced"
          ],
          "note": "Advanced only; 400 W PEP (C3F/J3E/R3E) or 120 W mean; necessary bandwidth must not exceed 8 kHz"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "advanced",
            "standard"
          ],
          "note": "S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 8 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 8 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "advanced",
            "standard",
            "foundation"
          ],
          "note": "F 10 W PEP; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 8 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 8 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "advanced",
            "standard",
            "foundation"
          ],
          "note": "F 10 W PEP; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; emissions wider than 16 kHz limited to <= 1 W/100 kHz PSD"
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 52000,
          "classes": [
            "advanced",
            "standard"
          ],
          "note": "Secondary amateur allocation; S 100 W PEP (C3F/J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; necessary bandwidth must not exceed 100 kHz"
        },
        {
          "band": "6m",
          "from": 52000,
          "to": 54000,
          "classes": [
            "advanced",
            "standard"
          ],
          "note": "Primary amateur allocation; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean; no further limitation"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 148000,
          "classes": [
            "advanced",
            "standard",
            "foundation"
          ],
          "note": "F 10 W PEP; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 450000,
          "classes": [
            "advanced",
            "standard",
            "foundation"
          ],
          "note": "F 10 W PEP; S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "advanced",
            "standard"
          ],
          "note": "S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "13cm",
          "from": 2300000,
          "to": 2302000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced only; 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "13cm",
          "from": 2400000,
          "to": 2450000,
          "classes": [
            "advanced",
            "standard"
          ],
          "note": "S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "9cm",
          "from": 3300000,
          "to": 3400000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "3.4GHz",
          "from": 3400000,
          "to": 3600000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean; operation prohibited in the remote areas listed in Schedule 3 of the class licence (3.4-3.6 GHz)"
        },
        {
          "band": "5cm",
          "from": 5650000,
          "to": 5850000,
          "classes": [
            "advanced",
            "standard"
          ],
          "note": "S 100 W PEP (J3E/R3E) or 30 W mean; A 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10500000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "1.2cm",
          "from": 24000000,
          "to": 24250000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "4mm",
          "from": 76000000,
          "to": 81000000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "122GHz",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "134GHz",
          "from": 134000000,
          "to": 141000000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        },
        {
          "band": "241GHz",
          "from": 241000000,
          "to": 250000000,
          "classes": [
            "advanced"
          ],
          "note": "Advanced 400 W PEP (C3F/J3E/R3E) or 120 W mean"
        }
      ]
    },
    {
      "id": "BR",
      "name": "Brazil",
      "ituRegion": 2,
      "regulator": {
        "name": "Agencia Nacional de Telecomunicacoes (ANATEL)",
        "document": "Ato n. 926, de 1 de fevereiro de 2024 - Requisitos Tecnicos e Operacionais do Servico de Radioamador (Tabela I: COER classes per band; Tabelas II-XXIX: per-band mode segmentation), read together with Ato n. 3.448, de 11 de marco de 2026 - Requisitos Operacionais do Servico de Radioamador",
        "url": "https://informacoes.anatel.gov.br/legislacao/atos-de-requisitos-tecnicos-de-gestao-do-espectro/2024/1919-ato-926",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "a",
          "name": "Classe A"
        },
        {
          "id": "b",
          "name": "Classe B"
        },
        {
          "id": "c",
          "name": "Classe C"
        }
      ],
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1 W EIRP; ACDS (automatic digital stations) allowed provided no interference to point-to-point and DX communication."
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 5 W EIRP; no protection from (nor interference to) the aeronautical radionavigation service; ACDS conditions apply."
        },
        {
          "band": "160m",
          "from": 1800,
          "to": 1850,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Modes segmented per sub-band by Ato 926/2024."
        },
        {
          "band": "160m",
          "from": 1850,
          "to": 2000,
          "classes": [
            "a"
          ],
          "note": "Class A only."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3800,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Modes segmented per sub-band (e.g. 3500-3510 CW/DX, 3600-3600 ACDS, 3775-3800 DX)."
        },
        {
          "band": "80m",
          "from": 3800,
          "to": 4000,
          "classes": [
            "a"
          ],
          "note": "Class A only (Region 2 80 m extension)."
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5354,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Class A only; max 25 W EIRP."
        },
        {
          "band": "60m",
          "from": 5354,
          "to": 5366,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Class A only; DX segment; max 25 W EIRP."
        },
        {
          "band": "60m",
          "from": 5366,
          "to": 5366.5,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Class A only; ACDS segment; max 25 W EIRP."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7047,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Modes segmented per sub-band by Ato 926/2024."
        },
        {
          "band": "40m",
          "from": 7047,
          "to": 7300,
          "classes": [
            "a",
            "b"
          ],
          "note": "Class A and B (Region 2 40 m up to 7300 kHz)."
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "a"
          ],
          "note": "Class A only."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "a"
          ],
          "note": "Class A only; modes segmented per sub-band."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "a"
          ],
          "note": "Class A only."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21150,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Modes segmented per sub-band."
        },
        {
          "band": "15m",
          "from": 21150,
          "to": 21300,
          "classes": [
            "a",
            "b"
          ],
          "note": "Class A and B."
        },
        {
          "band": "15m",
          "from": 21300,
          "to": 21450,
          "classes": [
            "a"
          ],
          "note": "Class A only."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "All classes."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Modes segmented per sub-band by Ato 926/2024."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 54000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "DX calling on 50.110 MHz; modes segmented per sub-band."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 148000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "National calling frequency 146.520 MHz; satellite sub-segments per Tabela XV."
        },
        {
          "band": "1.3m",
          "from": 220000,
          "to": 225000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "'Faixa de 1,3 metro' (220-225 MHz)."
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 440000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Satellite sub-band 435-438 MHz per Tabela XVII."
        },
        {
          "band": "33cm",
          "from": 902000,
          "to": 907500,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "907.5-915 MHz is not allocated to amateurs."
        },
        {
          "band": "33cm",
          "from": 915000,
          "to": 928000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "13cm",
          "from": 2300000,
          "to": 2450000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Max 100 W EIRP for terrestrial links; ISM sharing."
        },
        {
          "band": "9cm",
          "from": 3300000,
          "to": 3500000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "5cm",
          "from": 5650000,
          "to": 5925000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10500000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "1.2cm",
          "from": 24000000,
          "to": 24050000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "1.2cm",
          "from": 24050000,
          "to": 24250000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Max 100 W EIRP for terrestrial links."
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": "Max 100 W EIRP for terrestrial links."
        },
        {
          "band": "4mm",
          "from": 76000000,
          "to": 77500000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "4mm",
          "from": 77500000,
          "to": 78000000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "4mm",
          "from": 78000000,
          "to": 81500000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "2.5mm",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "2mm",
          "from": 134000000,
          "to": 136000000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "2mm",
          "from": 136000000,
          "to": 141000000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "1mm",
          "from": 241000000,
          "to": 248000000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        },
        {
          "band": "1mm",
          "from": 248000000,
          "to": 250000000,
          "classes": [
            "a",
            "b",
            "c"
          ],
          "note": ""
        }
      ],
      "note": "ANATEL gates the service by COER operator class: Classe C (entry, minimum age 10) is limited to the 'todas as classes' segments of Tabela I of Ato 926/2024 (1800-1850, 3500-3800, 7000-7047, 21000-21150, 24890-24990, 28-29.7, 50-54, 144-148, 220-225, 430-440 MHz and the 33 cm-and-above UHF/SHF bands); Classe B adds the 7047-7300 and 21150-21300 kHz segments; Classe A (advanced exam, or one year as B) alone gets 1850-2000, 3800-4000, 60 m, 30 m, 20 m and 17 m. General power caps are average transmitter output: 1500 W (A), 1000 W (B), 100 W (C), with EIRP caps of 1 W on 2200 m, 5 W on 630 m, 25 W on 60 m and 100 W EIRP on the microwave terrestrial-link bands. Modes are regulated per sub-band segment (Ato 926/2024 Tabelas II-XXIX: CW, Fonia SSB/AM/FM/DV, Modos Digitais, Demais Modos incl. Fac-simile/SSTV/FSTV/Teste); that fine-grained mode map is not transcribed here, so 'modes' are given only where a segment is uniform (2200 m, 630 m, 60 m). Ground truth is Ato 926/2024 Tabela I plus Ato 3.448/2026 (operational requirements) on the ANATEL legislation portal, cross-checked against ANATEL's official June 2026 Cartilha; the society fallback (LABRE/LIGA de Amadores) was not needed."
    },
    {
      "id": "ES",
      "name": "Spain",
      "ituRegion": 1,
      "regulator": {
        "name": "Secretaría de Estado de Telecomunicaciones (Ministerio para la Transformación Digital)",
        "document": "Cuadro Nacional de Atribución de Frecuencias (CNAF, Orden TDF/732/2026, replacing Orden ETD/1449/2021); Reglamento de uso del dominio público radioeléctrico por radioaficionados (Orden IET/1311/2013)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2013-7624",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "full",
          "name": "Full / HAREC (autorización de radioaficionado)"
        }
      ],
      "note": "Spain issues a single HAREC-based amateur authorisation (the harmonised exam certificate under CEPT T/R 61-02); there are no operator sub-categories with different frequency access, so privileges are uniform. The frequency table is the CNAF; the cw/data/phone/image mode segmentation is the IARU Region 1 band plan used as the working table (the Spanish regulation itself defers to the IARU R1 band plan as general practice). Power limits (Orden IET/1311/2013 annex 3.1): 1000 W PEP on 160-10 m, 600 W PEP on 6 m/4 m/2 m, 300 W PEP on 70 cm, 1000 W e.i.r.p. from 23 cm up; emissions in secondary-status bands are limited to 50% of those values; 1 W e.i.r.p. on 2200 m and 630 m (up to 5 W e.i.r.p. on 630 m more than 800 km from African borders). EME/meteor-scatter stations may run up to 1000 W PEP in the IARU-recommended sub-bands outside urban areas. Unattended stations: max 50 W on HF and 50 W on VHF/UHF outside urban areas (10 W inside). No 60 m allocation. Special authorisations from the Secretaría de Estado are required for temporary/experimental uses outside the CNAF (e.g. the historic 40.65-40.75 MHz experimental grant).",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1 W e.i.r.p.; secondary"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1 W e.i.r.p. (up to 5 W e.i.r.p. >800 km from African borders); secondary"
        },
        {
          "band": "160m",
          "from": 1810,
          "to": 1838,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP; 1810-1830 kHz is fixed/mobile primary in Spain (RR 5.98)"
        },
        {
          "band": "160m",
          "from": 1838,
          "to": 1843,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "160m",
          "from": 1843,
          "to": 1850,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3510,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "80m",
          "from": 3510,
          "to": 3560,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "80m",
          "from": 3560,
          "to": 3600,
          "classes": [
            "full"
          ],
          "modes": [
            "data"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "80m",
          "from": 3600,
          "to": 3800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7040,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "40m",
          "from": 7040,
          "to": 7047,
          "classes": [
            "full"
          ],
          "modes": [
            "data"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "40m",
          "from": 7047,
          "to": 7060,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "40m",
          "from": 7060,
          "to": 7200,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10130,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP; secondary"
        },
        {
          "band": "30m",
          "from": 10130,
          "to": 10150,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP; secondary"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14060,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "20m",
          "from": 14060,
          "to": 14125,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP; 14099-14101 kHz reserved for IBP beacons"
        },
        {
          "band": "20m",
          "from": 14125,
          "to": 14350,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18095,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "17m",
          "from": 18095,
          "to": 18111,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP; 18109-18111 kHz reserved for IBP beacons"
        },
        {
          "band": "17m",
          "from": 18111,
          "to": 18168,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21070,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "15m",
          "from": 21070,
          "to": 21151,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP; 21149-21151 kHz reserved for IBP beacons"
        },
        {
          "band": "15m",
          "from": 21151,
          "to": 21450,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24915,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "12m",
          "from": 24915,
          "to": 24931,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP; 24929-24931 kHz reserved for IBP beacons"
        },
        {
          "band": "12m",
          "from": 24931,
          "to": 24990,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 28070,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "10m",
          "from": 28070,
          "to": 28199,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP"
        },
        {
          "band": "10m",
          "from": 28199,
          "to": 28225,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1000 W PEP; beacon segments 28199-28225 kHz"
        },
        {
          "band": "10m",
          "from": 28225,
          "to": 29700,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W PEP; 29300-29510 kHz satellite segment"
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 50100,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 600 W PEP; 50-50.5 MHz primary in Spain (RR 5.166A), 50.5-52 MHz secondary"
        },
        {
          "band": "6m",
          "from": 50100,
          "to": 50400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 600 W PEP"
        },
        {
          "band": "6m",
          "from": 50400,
          "to": 50500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 600 W PEP; beacons 50400-50470 kHz"
        },
        {
          "band": "6m",
          "from": 50500,
          "to": 52000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 600 W PEP; 50.5-52 MHz secondary (RR 5.166B)"
        },
        {
          "band": "4m",
          "from": 70000,
          "to": 70500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 600 W PEP; secondary"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 144025,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 600 W PEP"
        },
        {
          "band": "2m",
          "from": 144025,
          "to": 144400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 600 W PEP; SSB centre of activity 144300 kHz"
        },
        {
          "band": "2m",
          "from": 144400,
          "to": 144500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 600 W PEP; beacons 144400-144490 kHz"
        },
        {
          "band": "2m",
          "from": 144500,
          "to": 144800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 600 W PEP"
        },
        {
          "band": "2m",
          "from": 144800,
          "to": 145800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 600 W PEP; APRS 144800 kHz, FM calling 145500 kHz, repeater channels"
        },
        {
          "band": "2m",
          "from": 145800,
          "to": 146000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 600 W PEP; satellite segment"
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 432000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 300 W PEP; secondary"
        },
        {
          "band": "70cm",
          "from": 432000,
          "to": 432100,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 300 W PEP; secondary"
        },
        {
          "band": "70cm",
          "from": 432100,
          "to": 432400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 300 W PEP; SSB centre of activity 432200 kHz; secondary"
        },
        {
          "band": "70cm",
          "from": 432400,
          "to": 432500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 300 W PEP; beacons 432400-432490 kHz; secondary"
        },
        {
          "band": "70cm",
          "from": 432500,
          "to": 440000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 300 W PEP; satellite 435000-438000 kHz; secondary"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 1000 W e.i.r.p.; protect GNSS receivers (RR 5.332A); 1260000-1270000 kHz satellite segment"
        }
      ]
    },
    {
      "id": "FR",
      "name": "France",
      "ituRegion": 1,
      "regulator": {
        "name": "ANFR (Agence nationale des fréquences)",
        "document": "Tableau National de Répartition des Bandes de fréquences (TNRBF); certificat d'opérateur du service amateur (HAREC)",
        "url": "https://www.anfr.fr/gerer/radioamateurs/nos-missions",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "full",
          "name": "Full / HAREC (certificat d'opérateur du service amateur)"
        }
      ],
      "note": "Since the April 2012 reform France issues a single HAREC amateur operator certificate (former classes 1 and 3 are no longer issued; existing holders keep grandfathered rights), so all frequency privileges are uniform across operators. The national frequency table is the TNRBF published by ANFR (open data); band edges below follow the TNRBF/amateur allocations while the cw/data/phone/image mode segmentation is the IARU Region 1 band plan used as the working table. Power limits: 500 W PEP below 28 MHz, 250 W PEP between 28 and 30 MHz, 120 W PEP above 30 MHz; 1 W e.i.r.p. on 2200 m and 630 m; 15 W e.i.r.p. on 60 m. The 6 m band (50-52 MHz) and 70 cm band are secondary allocations with no protection; 60 m is secondary (RR 5.133B).",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1 W e.i.r.p.; secondary; protect radionavigation (RR 5.67A)"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1 W e.i.r.p.; secondary; watch for NDBs (RR 5.80A)"
        },
        {
          "band": "160m",
          "from": 1810,
          "to": 1838,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "160m",
          "from": 1838,
          "to": 1843,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "160m",
          "from": 1843,
          "to": 2000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 500 W PEP; LSB below 1843 kHz"
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3510,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "80m",
          "from": 3510,
          "to": 3560,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "80m",
          "from": 3560,
          "to": 3600,
          "classes": [
            "full"
          ],
          "modes": [
            "data"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "80m",
          "from": 3600,
          "to": 3800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5354,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 15 W e.i.r.p.; secondary (RR 5.133B)"
        },
        {
          "band": "60m",
          "from": 5354,
          "to": 5366.5,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 15 W e.i.r.p.; USB recommended for voice"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7040,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "40m",
          "from": 7040,
          "to": 7047,
          "classes": [
            "full"
          ],
          "modes": [
            "data"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "40m",
          "from": 7047,
          "to": 7060,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "40m",
          "from": 7060,
          "to": 7200,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10130,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP; secondary"
        },
        {
          "band": "30m",
          "from": 10130,
          "to": 10150,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP; secondary"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14060,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "20m",
          "from": 14060,
          "to": 14125,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP; 14099-14101 kHz reserved for IBP beacons"
        },
        {
          "band": "20m",
          "from": 14125,
          "to": 14350,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18095,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "17m",
          "from": 18095,
          "to": 18111,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP; 18109-18111 kHz reserved for IBP beacons"
        },
        {
          "band": "17m",
          "from": 18111,
          "to": 18168,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21070,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "15m",
          "from": 21070,
          "to": 21151,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP; 21149-21151 kHz reserved for IBP beacons"
        },
        {
          "band": "15m",
          "from": 21151,
          "to": 21450,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24915,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "12m",
          "from": 24915,
          "to": 24931,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 500 W PEP; 24929-24931 kHz reserved for IBP beacons"
        },
        {
          "band": "12m",
          "from": 24931,
          "to": 24990,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 500 W PEP"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 28070,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 250 W PEP (28-30 MHz)"
        },
        {
          "band": "10m",
          "from": 28070,
          "to": 28199,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 250 W PEP (28-30 MHz)"
        },
        {
          "band": "10m",
          "from": 28199,
          "to": 28225,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 250 W PEP; beacon segments 28199-28225 kHz"
        },
        {
          "band": "10m",
          "from": 28225,
          "to": 29700,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 250 W PEP (28-30 MHz); 29300-29510 kHz satellite segment"
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 50100,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 120 W PEP; secondary (RR 5.166B)"
        },
        {
          "band": "6m",
          "from": 50100,
          "to": 50400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 120 W PEP; secondary"
        },
        {
          "band": "6m",
          "from": 50400,
          "to": 50500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 120 W PEP; beacons 50400-50470 kHz; secondary"
        },
        {
          "band": "6m",
          "from": 50500,
          "to": 52000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 120 W PEP; secondary; FM calling 51510 kHz"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 144025,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 120 W PEP"
        },
        {
          "band": "2m",
          "from": 144025,
          "to": 144400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 120 W PEP; SSB centre of activity 144300 kHz"
        },
        {
          "band": "2m",
          "from": 144400,
          "to": 144500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 120 W PEP; beacons 144400-144490 kHz"
        },
        {
          "band": "2m",
          "from": 144500,
          "to": 144800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 120 W PEP"
        },
        {
          "band": "2m",
          "from": 144800,
          "to": 145800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 120 W PEP; APRS 144800 kHz, FM calling 145500 kHz, repeater channels"
        },
        {
          "band": "2m",
          "from": 145800,
          "to": 146000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 120 W PEP; satellite segment"
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 432000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 120 W PEP; secondary"
        },
        {
          "band": "70cm",
          "from": 432000,
          "to": 432100,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 120 W PEP; secondary"
        },
        {
          "band": "70cm",
          "from": 432100,
          "to": 432400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 120 W PEP; SSB centre of activity 432200 kHz; secondary"
        },
        {
          "band": "70cm",
          "from": 432400,
          "to": 432500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 120 W PEP; beacons 432400-432490 kHz; secondary"
        },
        {
          "band": "70cm",
          "from": 432500,
          "to": 440000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 120 W PEP; satellite 435000-438000 kHz; secondary"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 120 W PEP; protect GNSS receivers (RR 5.332A); 1260000-1270000 kHz satellite segment"
        }
      ]
    },
    {
      "id": "GB",
      "name": "United Kingdom",
      "ituRegion": 1,
      "regulator": {
        "name": "Ofcom",
        "document": "Amateur Radio Wireless Telegraphy Licence Conditions Booklet OFW611 (published 21 February 2024), Schedule 1 Tables A/B/C",
        "url": "https://www.ofcom.org.uk/siteassets/resources/documents/spectrum/emf/emf-amateur-licence-terms-and-conditions.pdf",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "full",
          "name": "Full"
        },
        {
          "id": "intermediate",
          "name": "Intermediate"
        },
        {
          "id": "foundation",
          "name": "Foundation"
        }
      ],
      "note": "Ofcom issues a single licence in three classes - Foundation, Intermediate and Full - each with its own frequency/power table in Schedule 1 of licence booklet OFW611 (published 21 February 2024; the 2024 reform, announced/rolled out Feb-Apr 2024, gave Foundation and Intermediate access to nearly all bands previously Full-only). Peak envelope power limits: Foundation 25 W, Intermediate 100 W, Full 1000 W on primary allocations and 400 W on secondary allocations; band-specific caps override class caps (160 m above 1850 kHz 32 W, 6 m above 51 MHz 100 W, 4 m 160 W, 70 cm 430-432 MHz 40 W ERP, 630 m 5 W EIRP, 2200 m 1 W ERP, Foundation on 10 GHz 1 W, Foundation on 2.4/5.7 GHz bands 2 W). Band privileges differ as follows: 630 m (472-479 kHz) and the channelised 60 m band (5258.5-5406.5 kHz, 11 discrete channels, 100 W PEP but not exceeding 200 W EIRP, licence note G conditions) are Full-only; Foundation additionally lacks 23 cm (1240-1325 MHz) and the 2.3 GHz/3.4 GHz/5.83-5.85 GHz segments. All three classes share 2200 m, 160 m-10 m, 6 m, 4 m, 2 m and 70 cm. The licence imposes no mode restrictions, only power/status limits; geographic or coordination conditions exist on 70 cm (431-432 MHz excluded within 100 km of Charing Cross, London), 10 m (within 50 km of Waddington) and 2 m (within 50 km of Scarborough). Airborne operation is limited to 500 mW EIRP where stated. The 4 m band is 70.0-70.5 MHz (69.9-70.5 is not a UK allocation; 70.5-71.5 MHz is a separate Full-only NoV 'innovation band'). NoV-only Full bands 146-147 MHz, 2300-2302 MHz and >275 GHz are excluded here.",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Secondary; 1 W ERP for all classes; non-interference basis."
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "full"
          ],
          "note": "Full only; secondary; 5 W EIRP maximum."
        },
        {
          "band": "160m",
          "from": 1810,
          "to": 1850,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary; 1810-1830 kHz on a non-interference basis to services outside the UK/Crown Dependencies; 500 mW EIRP airborne limit."
        },
        {
          "band": "160m",
          "from": 1850,
          "to": 2000,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Secondary; 32 W PEP cap for all classes."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3800,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary; 25 W (Foundation) / 100 W (Intermediate) / 1000 W (Full)."
        },
        {
          "band": "60m",
          "from": 5258.5,
          "to": 5264,
          "classes": [
            "full"
          ],
          "note": "Channelised 5 MHz band, Full only; secondary; 100 W PEP but not exceeding 200 W EIRP; licence note G conditions apply (6 kHz max DSB bandwidth, no interference to MoD, no out-of-channel radiation)."
        },
        {
          "band": "60m",
          "from": 5276,
          "to": 5284,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5288.5,
          "to": 5292,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5298,
          "to": 5307,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5313,
          "to": 5323,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5333,
          "to": 5338,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5354,
          "to": 5358,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set within the WRC-15 allocation (5351.5-5366.5 kHz); no transmissions above 5358 kHz when operating digital modes in this channel; otherwise same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5362,
          "to": 5374.5,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set partly within the WRC-15 allocation (5351.5-5366.5 kHz); same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5378,
          "to": 5382,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5395,
          "to": 5401.5,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "60m",
          "from": 5403.5,
          "to": 5406.5,
          "classes": [
            "full"
          ],
          "note": "5 MHz channel set; same conditions as 5258.5-5264 kHz."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary; 25 W (Foundation) / 100 W (Intermediate) / 1000 W (Full)."
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Secondary; Full limited to 400 W (secondary-band cap); narrowband-only usage by convention (IARU)."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary; 25 W (Foundation) / 100 W (Intermediate) / 1000 W (Full)."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary; specific conditions apply within 50 km of Waddington (NGR SK985640)."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 51000,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary; 25 W (Foundation) / 100 W (Intermediate) / 1000 W (Full)."
        },
        {
          "band": "6m",
          "from": 51000,
          "to": 52000,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Secondary; 100 W PEP cap for all classes (caps Full); non-interference basis."
        },
        {
          "band": "4m",
          "from": 70000,
          "to": 70500,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Secondary; 160 W PEP cap (caps Full to 160 W); non-interference basis."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Primary; specific conditions apply within 50 km of Scarborough (TA 012869)."
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 432000,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Secondary; 40 W ERP cap; 431-432 MHz not available within 100 km of Charing Cross, London."
        },
        {
          "band": "70cm",
          "from": 432000,
          "to": 440000,
          "classes": [
            "full",
            "intermediate",
            "foundation"
          ],
          "note": "Secondary; 25 W (Foundation) / 100 W (Intermediate) / 400 W (Full); 435-438 MHz is the amateur satellite service segment."
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1325000,
          "classes": [
            "full",
            "intermediate"
          ],
          "note": "Secondary; not allocated to Foundation; 1260-1270 MHz satellite uplink (Earth-to-space) only; Full 400 W / Intermediate 100 W."
        }
      ]
    },
    {
      "id": "IN",
      "name": "India",
      "ituRegion": 3,
      "regulator": {
        "name": "Wireless Planning and Coordination (WPC) Wing, Department of Telecommunications (DoT), Ministry of Communications",
        "document": "Office Memorandum No. L-14011/255/2004-AMT dated 13-08-2010, Annexure-I (frequency bands, emissions and power) issued under the Indian Wireless Telegraphs (Amateur Service) Rules, 1978, as amended (2005, 2009/2010)",
        "url": "https://wpc.gov.in/WriteReadData/userfiles/file/amateur_new_guidelines.pdf",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "general",
          "name": "General Grade"
        },
        {
          "id": "restricted",
          "name": "Restricted Grade"
        }
      ],
      "bands": [
        {
          "band": "160m",
          "from": 1820,
          "to": 1860,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input to final stage 400 W. Shared primary basis. Same segment open to Restricted Grade on phone only (50 W DC input)."
        },
        {
          "band": "160m",
          "from": 1820,
          "to": 1860,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W. Emissions A3E/H3E/J3E/R3E; CW (A1A) only for legacy pre-2009 'Grade II' licensees."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3700,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input 400 W. Same segment open to Restricted Grade on phone only (50 W DC input)."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3700,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W; A3E/H3E/J3E/R3E; CW only for legacy Grade II licensees."
        },
        {
          "band": "80m",
          "from": 3890,
          "to": 3900,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Single shared-phone segment per Annexure-I; max DC input 400 W."
        },
        {
          "band": "80m",
          "from": 3890,
          "to": 3900,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input 400 W. Same segment open to Restricted Grade on phone only."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input 400 W. Same segment open to Restricted Grade on phone only."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input 400 W. Same segment open to Restricted Grade on phone only."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input 400 W. Same segment open to Restricted Grade on phone only."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input 400 W."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Edges as per the General-Grade row of the same Annexure (24890-24990 kHz; Restricted row in source shows 24800-24990, consistent with 24890-24990 allocation) - unverified to glyph level. Max DC input 50 W."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "general"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max DC input 400 W. Same segment open to Restricted Grade on phone only."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "restricted"
          ],
          "modes": [
            "phone"
          ],
          "note": "Max DC input 50 W."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 54000,
          "classes": [
            "general"
          ],
          "modes": [
            "data",
            "phone",
            "image"
          ],
          "note": "Max 25 W. Emissions F1B/F2B (data), F3E (phone), F3C (image)."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 54000,
          "classes": [
            "restricted"
          ],
          "modes": [
            "data",
            "phone",
            "image"
          ],
          "note": "Max 10 W."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "general"
          ],
          "modes": [
            "data",
            "phone",
            "image"
          ],
          "note": "Max 25 W."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "restricted"
          ],
          "modes": [
            "data",
            "phone",
            "image"
          ],
          "note": "Max 10 W."
        },
        {
          "band": "70cm",
          "from": 434000,
          "to": 438000,
          "classes": [
            "general"
          ],
          "modes": [
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary basis. Max 25 W. Amateur satellite permitted for General Grade (30 dBW EIRP) in appropriate sub-bands."
        },
        {
          "band": "70cm",
          "from": 434000,
          "to": 438000,
          "classes": [
            "restricted"
          ],
          "modes": [
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary basis. Max 10 W."
        },
        {
          "band": "5cm",
          "from": 5725000,
          "to": 5840000,
          "classes": [
            "general"
          ],
          "modes": [
            "data",
            "phone",
            "image"
          ],
          "note": "5.725-5.84 GHz, secondary basis. Max 25 W. General Grade only."
        }
      ],
      "note": "Two licence grades (Advanced and older Grades I/II were consolidated in the 2009/2010 amendment): the Restricted Grade (entry exam, VU3 call block) gets 50 W DC-input on a limited set of HF segments phone-only (A3E/H3E/J3E/R3E; CW A1A survives only for legacy pre-2009 Grade II licensees) plus VHF/UHF at 10 W; the General Grade (VU2 call block) gets the same HF segments plus CW/digital/image modes at 400 W DC input, 25 W on VHF/UHF, amateur satellite (30 dBW EIRP) and the secondary 5.7 GHz SHF segment. Key deviations: India has no 2200 m, 630 m, 30 m or 60 m amateur allocations in the WPC table (those bands are simply absent, so they are omitted here); 70 cm is secondary and listed as 434-438 MHz; A3F fast-scan TV is restricted to identification/test transmissions. Ground truth is the WPC O.M. Annexure-I; wpc.gov.in was unreachable from this network so the regulator PDF was taken from the Internet Archive snapshot of 5 Dec 2017, and ARSI (arsi.info) was checked as the society cross-check but publishes no band-plan page."
    },
    {
      "id": "IT",
      "name": "Italy",
      "ituRegion": 1,
      "regulator": {
        "name": "Ministero delle Imprese e del Made in Italy (MIMIT) - Direzione generale per i servizi territoriali",
        "document": "Decreto 5 ottobre 2018, Piano nazionale di ripartizione delle frequenze tra 0 e 3.000 GHz (G.U. Serie Generale n. 244 del 19/10/2018, Supplemento ordinario n. 49) plus Allegato 26 al Codice delle comunicazioni elettroniche; DM 26 gennaio 2026 introduces the classe N patent (G.U. n. 51 del 3/3/2026)",
        "url": "https://www.gazzettaufficiale.it/eli/gu/2018/10/19/244/so/49/sg/pdf",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "a",
          "name": "Classe A (full HAREC privileges)"
        },
        {
          "id": "n",
          "name": "Classe N (novizio / novice)"
        }
      ],
      "note": "The old classe B was unified into the single classe A by DM 21 July 2005 (G.U. n. 196 del 24/8/2005), which holds full HAREC privileges: all amateur and amateur-satellite bands attributed in the PNRF, with up to 500 W PEP under Allegato 26 (less on LF and 60 m: 1 W EIRP on 2200 m/630 m, 15 W EIRP on 60 m, per PNRF footnotes 8/16/32B). The classe N patent (radioamatore novizio, CEPT ECC/REC (05)06 level) was introduced by DM 26 January 2026 (G.U. n. 51 del 3/3/2026), which fixes the exam criteria (written or oral test, 60% pass mark); the operating privileges (band segments and power) for classe N are left to a decreto direttoriale amending Allegato 26 that was still pending as of retrieval, with MIMIT stating that 'fino all'adozione dei decreti direttoriali ... continuano ad applicarsi le disposizioni vigenti'. Consequently no band segment is assigned to classe N here, and none of the segments below are available to N holders until that decree lands. Band edges and status below are transcribed from the PNRF allocation table (class A / general authorisation); rows where 'Radioamatore' appears only as a utilisation of another service are marked secondary. Notable deviations from the IARU R1 baseline: 160 m is 1830-1850 kHz only (1810-1830 kHz is not attributed to the amateur service in the PNRF 2018; earlier temporary experimental authorisations for 1810-1830 kHz have lapsed pending renewal); 2 m is exclusive amateur 144.0-145.8 MHz and exclusive amateur-satellite 145.8-146.0 MHz (PNRF footnote 69); on 70 cm the amateur service is listed 430-436 MHz (secondary, shared with military radiolocation, with 435-436 MHz the named RADIOAMATORE row) plus 436-438 MHz amateur-satellite only, while 438-440 MHz is not attributed to amateurs; on 23 cm the amateur service appears at 1240-1245 MHz and 1270-1298 MHz (secondary) with 1260-1270 MHz amateur-satellite, while 1245-1260 MHz and 1298-1300 MHz are not attributed.",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "a"
          ],
          "note": "secondary; max 1 W EIRP (RR 5.67A / PNRF footnote 8)"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "a"
          ],
          "note": "secondary; max 1 W EIRP (RR 5.80A as adopted in PNRF footnote 16)"
        },
        {
          "band": "160m",
          "from": 1830,
          "to": 1850,
          "classes": [
            "a"
          ],
          "note": "primary; 1810-1830 kHz not attributed to amateurs in the PNRF 2018 (former temporary experimental authorisations lapsed)"
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3800,
          "classes": [
            "a"
          ],
          "note": "primary (listed as utilisation of the 3500-3800 kHz FISSO row)"
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5366.5,
          "classes": [
            "a"
          ],
          "note": "secondary; max 15 W EIRP (RR 5.133B / PNRF footnote 32B)"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "a"
          ],
          "note": "primary; 7000-7100 kHz also amateur-satellite"
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "a"
          ],
          "note": "secondary (utilisation of the 10100-10150 kHz FISSO row)"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14250,
          "classes": [
            "a"
          ],
          "note": "primary; also amateur-satellite"
        },
        {
          "band": "20m",
          "from": 14250,
          "to": 14350,
          "classes": [
            "a"
          ],
          "note": "primary"
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "a"
          ],
          "note": "primary; also amateur-satellite"
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "a"
          ],
          "note": "primary; also amateur-satellite"
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "a"
          ],
          "note": "primary; also amateur-satellite"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "a"
          ],
          "note": "primary; also amateur-satellite"
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 52000,
          "classes": [
            "a"
          ],
          "note": "secondary within the 47-52.5 MHz MOBILE TERRESTRE (Min. difesa) row; PNRF footnote 57, based on RR 4.4"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 145800,
          "classes": [
            "a"
          ],
          "note": "exclusive amateur use (PNRF footnote 69)"
        },
        {
          "band": "2m",
          "from": 145800,
          "to": 146000,
          "classes": [
            "a"
          ],
          "note": "exclusive amateur-satellite use, limited to links with ITU-compliant amateur satellites (PNRF footnote 69)"
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 435000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation in the FISSO/radiolocation rows); shared with military radiolocation"
        },
        {
          "band": "70cm",
          "from": 435000,
          "to": 436000,
          "classes": [
            "a"
          ],
          "note": "RADIOAMATORE service row (with amateur-satellite); shared with military radiolocation"
        },
        {
          "band": "70cm",
          "from": 436000,
          "to": 438000,
          "classes": [
            "a"
          ],
          "note": "amateur-satellite only (secondary); terrestrial amateur use not attributed; 438-440 MHz not attributed to amateurs at all"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1245000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore, PNRF footnote 116) among primary services"
        },
        {
          "band": "23cm",
          "from": 1260000,
          "to": 1270000,
          "classes": [
            "a"
          ],
          "note": "amateur-satellite only (Earth-to-space, secondary); 1245-1260 MHz not attributed to amateurs"
        },
        {
          "band": "23cm",
          "from": 1270000,
          "to": 1298000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore, PNRF footnote 116A); 1298-1300 MHz not attributed to amateurs"
        },
        {
          "band": "13cm",
          "from": 2400000,
          "to": 2450000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation 2400-2440 and 2440-2450 MHz rows); shared with ISM/SRD"
        },
        {
          "band": "5cm",
          "from": 5760000,
          "to": 5770000,
          "classes": [
            "a"
          ],
          "note": "RADIOAMATORE service row, shared with radiolocation; no protection vs foreign satellite Earth stations (PNRF footnote 193)"
        },
        {
          "band": "5cm",
          "from": 5830000,
          "to": 5850000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation, incl. amateur-satellite Earth-to-space)"
        },
        {
          "band": "3cm",
          "from": 10300000,
          "to": 10450000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation)"
        },
        {
          "band": "3cm",
          "from": 10450000,
          "to": 10500000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation, incl. amateur-satellite)"
        },
        {
          "band": "1.2cm",
          "from": 24000000,
          "to": 24050000,
          "classes": [
            "a"
          ],
          "note": "RADIOAMATORE service row (also amateur-satellite); shared with ISM/SRD"
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "a"
          ],
          "note": "RADIOAMATORE service row (also amateur-satellite)"
        },
        {
          "band": "4mm",
          "from": 77500000,
          "to": 78000000,
          "classes": [
            "a"
          ],
          "note": "RADIOAMATORE service row (also amateur-satellite)"
        },
        {
          "band": "4mm",
          "from": 78000000,
          "to": 81000000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation in 78-79 and 79-81 GHz radiolocation rows)"
        },
        {
          "band": "4mm",
          "from": 81000000,
          "to": 81500000,
          "classes": [
            "a"
          ],
          "note": "secondary (RR 5.561A / PNRF footnote 279)"
        },
        {
          "band": "2.5mm",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation)"
        },
        {
          "band": "2mm",
          "from": 134000000,
          "to": 136000000,
          "classes": [
            "a"
          ],
          "note": "RADIOAMATORE service row (also amateur-satellite); shared with radio astronomy"
        },
        {
          "band": "2mm",
          "from": 136000000,
          "to": 141000000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation in the radioastronomy/radiolocation row)"
        },
        {
          "band": "1.2mm",
          "from": 241000000,
          "to": 248000000,
          "classes": [
            "a"
          ],
          "note": "secondary (Radioamatore utilisation)"
        },
        {
          "band": "1.2mm",
          "from": 248000000,
          "to": 250000000,
          "classes": [
            "a"
          ],
          "note": "RADIOAMATORE service row (also amateur-satellite); shared with radio astronomy"
        }
      ],
      "classesPendingUse": [
        "n"
      ]
    },
    {
      "id": "JP",
      "name": "Japan",
      "ituRegion": 3,
      "regulator": {
        "name": "Ministry of Internal Affairs and Communications (総務省)",
        "document": "電波法施行令 (Radio Law Enforcement Order, Cabinet Order No. 245 of 2001) Article 3 (operator privileges); 電波法施行規則 Article 13-2 and 平成21年総務省告示第126号 (bands)",
        "url": "https://laws.e-gov.go.jp/law/413CO0000000245",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "first",
          "name": "第一級アマチュア無線技士 (Amateur First-Class Radio Operator)"
        },
        {
          "id": "second",
          "name": "第二級アマチュア無線技士 (Amateur Second-Class Radio Operator)"
        },
        {
          "id": "third",
          "name": "第三級アマチュア無線技士 (Amateur Third-Class Radio Operator)"
        },
        {
          "id": "fourth",
          "name": "第四級アマチュア無線技士 (Amateur Fourth-Class Radio Operator)"
        }
      ],
      "note": "Japan gates amateur operation by four operator licence grades (第1級–第4級アマチュア無線技士) defined in Cabinet Order (電波法施行令) Art. 3: first class may operate all amateur station equipment with no statutory frequency or power limit (station licence may authorise up to 1 kW); second class adds a 200 W aerial-power cap but no frequency limit; third class is capped at 50 W and may only use frequencies of 18 MHz and above or 8 MHz and below — which excludes the 30 m (10.1–10.5 MHz) and 20 m (14 MHz) bands; fourth class is capped at 10 W on 21–30 MHz and on 8 MHz and below, 20 W above 30 MHz, and is barred from all Morse-code (CW) operation, which in practice also excludes the 30 m band where only telegraphy/narrow-band data is permitted. Several higher-class marine/land/satellite qualifications (総合無線通信士 etc.) carry equivalent amateur privileges by the same order. Actual band edges are set by MIC public notice 平成21年総務省告示第126号 (「アマチュア局が動作することを許される周波数帯」), which could not be machine-fetched from e-Gov; band edges below are transcribed from the Japanese Wikipedia band-allocation table that reproduces that notice, so those edges carry an unverified mark, while the grade frequency/power rules above are verified verbatim from the official e-Gov XML. 135 kHz and 472 kHz allocations are secondary-service with EIRP ≤ 1 W; most bands above 420 MHz are secondary allocations.",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "EIRP <= 1 W; secondary service; data limited to emissions <= 200 Hz occupied bandwidth; fourth class capped at 10 W (<= 8 MHz scope); edge unverified (secondary source only)."
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "EIRP <= 1 W; secondary service, must not interfere with aeronautical radio-navigation; fourth class capped at 10 W (<= 8 MHz scope); edge unverified (secondary source only)."
        },
        {
          "band": "160m",
          "from": 1800,
          "to": 1875,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; 1810-1825 kHz mainly used for international contacts; edge unverified (secondary source only)."
        },
        {
          "band": "160m",
          "from": 1907.5,
          "to": 1912.5,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; domestic-phone segment centred on 1910 kHz; edge unverified (secondary source only)."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3580,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; edge unverified (secondary source only)."
        },
        {
          "band": "80m",
          "from": 3599,
          "to": 3612,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; edge unverified (secondary source only)."
        },
        {
          "band": "80m",
          "from": 3662,
          "to": 3687,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; edge unverified (secondary source only)."
        },
        {
          "band": "75m",
          "from": 3702,
          "to": 3716,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; edge unverified (secondary source only)."
        },
        {
          "band": "75m",
          "from": 3745,
          "to": 3777,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; edge unverified (secondary source only)."
        },
        {
          "band": "75m",
          "from": 3791,
          "to": 3805,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; edge unverified (secondary source only)."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "<= 8 MHz scope: third class <= 50 W, fourth class <= 10 W; extended from 7000-7100 kHz in 2009; edge unverified (secondary source only)."
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "first",
            "second"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Telegraphy and narrow-band data only; third and fourth class excluded because 10.1-10.5 MHz is neither >= 18 MHz nor <= 8 MHz in their licence scopes; secondary service; edge unverified (secondary source only)."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "first",
            "second"
          ],
          "note": "Third and fourth class excluded (14 MHz outside their licence scopes); edge unverified (secondary source only)."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "first",
            "second",
            "third"
          ],
          "note": "Fourth class excluded (18 MHz band outside its 21-30 MHz / <= 8 MHz scope); third class <= 50 W; edge unverified (secondary source only)."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Fourth class <= 10 W (21-30 MHz scope); third class <= 50 W (>= 18 MHz scope); edge unverified (secondary source only)."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Fourth class <= 10 W (21-30 MHz scope); third class <= 50 W; edge unverified (secondary source only)."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Only HF band where FM is permitted; repeaters and amateur satellites allowed; fourth class <= 10 W (21-30 MHz scope); third class <= 50 W; edge unverified (secondary source only)."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 54000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Fourth class <= 20 W (> 30 MHz scope); third class <= 50 W; EME permitted; edge unverified (secondary source only)."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Fourth class <= 20 W (> 30 MHz scope); third class <= 50 W; repeaters, satellites and EME permitted; edge unverified (secondary source only)."
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 440000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Fourth class <= 20 W (> 30 MHz scope); third class <= 50 W; 430-440 MHz secondary service; repeaters, satellites and EME permitted; edge unverified (secondary source only)."
        },
        {
          "band": "23cm",
          "from": 1260000,
          "to": 1300000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Secondary service; fourth class <= 20 W; third class <= 50 W; repeaters, satellites, EME and ATV permitted; edge unverified (secondary source only)."
        },
        {
          "band": "13cm",
          "from": 2400000,
          "to": 2450000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Secondary service inside ISM band (must tolerate ISM interference); fourth class <= 20 W; third class <= 50 W; edge unverified (secondary source only)."
        },
        {
          "band": "5cm",
          "from": 5650000,
          "to": 5850000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Secondary service; fourth class <= 20 W; third class <= 50 W; 5725-5850 MHz inside ISM band; edge unverified (secondary source only)."
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10250000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Secondary service (radar primary); fourth class <= 20 W; third class <= 50 W; edge unverified (secondary source only)."
        },
        {
          "band": "3cm",
          "from": 10450000,
          "to": 10500000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Secondary service (radar primary); fourth class <= 20 W; third class <= 50 W; edge unverified (secondary source only)."
        },
        {
          "band": "12mm",
          "from": 24000000,
          "to": 24050000,
          "classes": [
            "first",
            "second",
            "third",
            "fourth"
          ],
          "note": "Inside ISM band; fourth class <= 20 W; third class <= 50 W; edge unverified (secondary source only)."
        }
      ]
    },
    {
      "id": "NL",
      "name": "Netherlands",
      "ituRegion": 1,
      "regulator": {
        "name": "Rijksinspectie Digitale Infrastructuur (RDI, formerly Agentschap Telecom)",
        "document": "Bijlage 1 'Radiozendamateurs' of the Regeling gebruik van frequentieruimte met meldingsplicht 2015 (implementing the Nationaal Frequentieplan 2018) - the frequency/power table the RDI amateur pages link to",
        "url": "https://wetten.overheid.nl/BWBR0036375/2026-06-19",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "f",
          "name": "F (Full / HAREC)"
        },
        {
          "id": "n",
          "name": "N (Novice)"
        }
      ],
      "note": "Registration is licence-free but requires passing a CBR-run exam for category F (full, HAREC-equivalent) or N (novice, CEPT ECC/REC (05)06 level). The per-band assignments, power caps (W PEP) and primary/secondary status below are transcribed from Bijlage 1 of the Regeling gebruik van frequentieruimte met meldingsplicht 2015, the table the RDI (ex-Agentschap Telecom) amateur pages designate as the official frequency table implementing the Nationaal Frequentieplan 2018; the VERON band plan was kept as a cross-check fallback but was not needed since the primary table was retrievable. Class N is restricted to 40 m, 20 m and 10 m plus 2 m and 70 cm with 100 W PEP on HF and 25 W PEP on VHF/UHF; class F has full access: 400 W PEP on HF through 70 cm, 120 W on 50.0-50.5 MHz and all bands from 23 cm upward, 30 W on 50.5-52 MHz and 50 W on 4 m. 2200 m (emission class A1A only) and 630 m (A1A/F1A/G1A/J2A; contests not allowed) are F-only; 60 m is F-only at 15 W EIRP; duplex links are not allowed on 50.5-52 MHz and 4 m. In the 30 m band the regulation prints two overlapping rows (10.100-10.150 kHz, contests not allowed; and 10.140-10.150 kHz, max 500 Hz bandwidth); they are encoded here as two tiled segments with both restrictions applying to 10.140-10.150 kHz. Amateurs are secondary users in several segments and must additionally respect RDI-published temporary primary-user notches (e.g. around major events).",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "f"
          ],
          "modes": [
            "cw"
          ],
          "note": "secondary; 400 W PEP; emission class A1A only"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "f"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "secondary; 100 W PEP; classes A1A/F1A/G1A/J2A only; contests not allowed"
        },
        {
          "band": "160m",
          "from": 1810,
          "to": 1850,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "160m",
          "from": 1850,
          "to": 1880,
          "classes": [
            "f"
          ],
          "note": "secondary; 400 W PEP"
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3800,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5366.5,
          "classes": [
            "f"
          ],
          "note": "secondary; 15 W EIRP"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "n"
          ],
          "note": "primary; 100 W PEP"
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10140,
          "classes": [
            "f"
          ],
          "note": "secondary; 400 W PEP; contests not allowed"
        },
        {
          "band": "30m",
          "from": 10140,
          "to": 10150,
          "classes": [
            "f"
          ],
          "note": "secondary; 400 W PEP; contests not allowed; bandwidth max 500 Hz"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "n"
          ],
          "note": "primary; 100 W PEP"
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "n"
          ],
          "note": "primary; 100 W PEP"
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 50500,
          "classes": [
            "f"
          ],
          "note": "primary; 120 W PEP"
        },
        {
          "band": "6m",
          "from": 50500,
          "to": 52000,
          "classes": [
            "f"
          ],
          "note": "secondary; 30 W PEP; duplex links not allowed"
        },
        {
          "band": "4m",
          "from": 70000,
          "to": 70500,
          "classes": [
            "f"
          ],
          "note": "secondary; 50 W PEP; duplex links not allowed"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "n"
          ],
          "note": "primary; 25 W PEP"
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 436000,
          "classes": [
            "f"
          ],
          "note": "primary; 400 W PEP"
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 436000,
          "classes": [
            "n"
          ],
          "note": "primary; 25 W PEP"
        },
        {
          "band": "70cm",
          "from": 436000,
          "to": 440000,
          "classes": [
            "f"
          ],
          "note": "secondary; 400 W PEP"
        },
        {
          "band": "70cm",
          "from": 436000,
          "to": 440000,
          "classes": [
            "n"
          ],
          "note": "secondary; 25 W PEP"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "13cm",
          "from": 2320000,
          "to": 2400000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP; temporarily unavailable around published events"
        },
        {
          "band": "12cm",
          "from": 2400000,
          "to": 2450000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP; satellite traffic (Earth-to-space) only"
        },
        {
          "band": "9cm",
          "from": 3400000,
          "to": 3410000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "5cm",
          "from": 5650000,
          "to": 5850000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10500000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "1.2cm",
          "from": 24000000,
          "to": 24050000,
          "classes": [
            "f"
          ],
          "note": "primary; 120 W PEP"
        },
        {
          "band": "1.2cm",
          "from": 24050000,
          "to": 24250000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "f"
          ],
          "note": "primary; 120 W PEP"
        },
        {
          "band": "4mm",
          "from": 75500000,
          "to": 76000000,
          "classes": [
            "f"
          ],
          "note": "primary; 120 W PEP"
        },
        {
          "band": "4mm",
          "from": 76000000,
          "to": 77500000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "4mm",
          "from": 77500000,
          "to": 78000000,
          "classes": [
            "f"
          ],
          "note": "primary; 120 W PEP"
        },
        {
          "band": "4mm",
          "from": 78000000,
          "to": 81500000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "2.5mm",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "2mm",
          "from": 134000000,
          "to": 136000000,
          "classes": [
            "f"
          ],
          "note": "primary; 120 W PEP"
        },
        {
          "band": "2mm",
          "from": 136000000,
          "to": 141000000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "1.2mm",
          "from": 241000000,
          "to": 248000000,
          "classes": [
            "f"
          ],
          "note": "secondary; 120 W PEP"
        },
        {
          "band": "1.2mm",
          "from": 248000000,
          "to": 250000000,
          "classes": [
            "f"
          ],
          "note": "primary; 120 W PEP"
        }
      ]
    },
    {
      "id": "NZ",
      "name": "New Zealand",
      "ituRegion": 3,
      "regulator": {
        "name": "Radio Spectrum Management (RSM), Ministry of Business, Innovation and Employment (MBIE)",
        "document": "Radiocommunications Regulations (General User Radio Licence for Amateur Radio Operators) Notice 2025 (GURL, licence 409957); PIB 39 covers the General Amateur Operator's Certificate of Competency",
        "url": "https://gazette.govt.nz/notice/id/2025-go3272",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "general",
          "name": "General Amateur Operator (General Amateur Operator's Certificate of Competency, GAOC)"
        }
      ],
      "note": "All NZ amateur operators hold the single General Amateur Operator's Certificate of Competency and operate under the blanket GURL for Amateur Radio Operators (current notice 2025, successor to the 2023 notice), so frequency privileges are uniform; the GURL lists band edges and power but imposes no mode restrictions, so the mode-segmented operating practice comes from the NZART band plan (NZART is the band plan maintainer, aligned with IARU Region 3 and Region 1-style HF plans). Maximum power is 30 dBW (1000 W PEP) on all bands except those expressed as e.i.r.p.: 7 dBW (about 5 W e.i.r.p.) on 2200 m, 14 dBW (about 25 W e.i.r.p.) on 630 m, and 11.8 dBW (about 15.1 W e.i.r.p.) on 60 m. Most allocations are shared with other services (secondary in practice: operators must accept interference and not cause it); the GURL excludes beacons, repeaters and fixed links, which are individually licensed. New GAOC holders may not operate between 5 and 25 MHz for their first three months unless they have logged 50 contacts. Visiting operators under CEPT T/R 61-01 or 61-02 may operate for up to 90 days. 80 m extends to 3900 kHz and 40 m to 7300 kHz (Region 3 allocations); the 26.95-27.3 MHz telemetry and 915-928 MHz ISM GURL entries are not normal amateur bands and are omitted.",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "general"
          ],
          "note": "Max 7 dBW e.i.r.p. (about 5 W e.i.r.p.); secondary and temporary allocation (GURL conditions 1, 3, 8)"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "general"
          ],
          "note": "Max 14 dBW e.i.r.p. (about 25 W e.i.r.p.); secondary (conditions 1, 8)"
        },
        {
          "band": "160m",
          "from": 1800,
          "to": 1950,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); shared, must accept interference (condition 1)"
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3900,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); band extends to 3900 kHz (Region 3); condition 1"
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5366.5,
          "classes": [
            "general"
          ],
          "note": "Max 11.8 dBW e.i.r.p. (about 15.1 W e.i.r.p.); secondary (conditions 1, 8)"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7300,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); band extends to 7300 kHz (Region 3); 7100-7300 kHz shared (condition 1); satellite earth-to-space/space-to-earth on parts (conditions 5, 6)"
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); condition 1"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); satellite use on parts (conditions 5, 6)"
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); satellite use on parts (conditions 5, 6)"
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); satellite use on parts (conditions 5, 6)"
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); satellite use on parts (conditions 5, 6)"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 29700,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); satellite use on parts (conditions 5, 6)"
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 51000,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP)"
        },
        {
          "band": "6m",
          "from": 51000,
          "to": 54000,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); shared with other services (condition 1)"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); satellite earth-to-space/space-to-earth on parts (conditions 5, 6)"
        },
        {
          "band": "2m",
          "from": 146000,
          "to": 148000,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); shared with other services (condition 1)"
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 440000,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); shared (condition 1); 435000-438000 kHz also satellite space-to-earth (conditions 5, 6)"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "general"
          ],
          "note": "Max 30 dBW (1000 W PEP); shared (condition 1); 1260000-1270000 kHz also satellite earth-to-space (condition 5)"
        }
      ]
    },
    {
      "id": "SE",
      "name": "Sweden",
      "ituRegion": 1,
      "regulator": {
        "name": "Post- och telestyrelsen (PTS)",
        "document": "PTSFS 2022:19 Föreskrifter om undantag från tillståndsplikt för användning av vissa radiosändare (amatörradio §§ 26-238)",
        "url": "https://pts.se/contentassets/475c0285823d4966b321ca4ef4a6b4de/ptsfs-2022-19-undantag-fran-tillstandsplikt-for-anvandning-av-vissa-radiosandare.pdf",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "full",
          "name": "Full / HAREC (amatörradiocertifikat)"
        }
      ],
      "note": "The full Swedish amateur certificate (amatörradiocertifikat, HAREC T/R 61-02) gives access to all amateur bands listed by PTS, so frequency privileges are uniform; the table below follows the IARU Region 1 band plan as the working baseline (national society SSA maintains the Swedish band plan). PTS also issues an entry-level instegscertifikat with a reduced band/power set and factory-built equipment only, which is not reflected in this table. Per-band power limits from PTSFS 2022:19: 200 W PEP into the antenna system on 160-10 m, 6 m, 2 m, 70 cm and 23 cm; 150 W PEP on 30 m; on 160 m 10 W PEP for 1850-1900 and 1950-2000 kHz and 100 W PEP for 1900-1950 kHz; 1 W e.r.p. on 2200 m; 1 W e.i.r.p. on 630 m; 15 W e.i.r.p. on 60 m. Sweden's 70 cm allocation is 432-438 MHz (narrower than 430-440 MHz) and there is no 4 m allocation. Certified amateurs are exempt from individual transmitter licensing but remain subject to the PTSFS conditions (callsign identification, automatic-station rules).",
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1 W e.r.p.; secondary; adapt transmissions to avoid interference"
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 1 W e.i.r.p.; secondary"
        },
        {
          "band": "160m",
          "from": 1810,
          "to": 1838,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "160m",
          "from": 1838,
          "to": 1843,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "160m",
          "from": 1843,
          "to": 1850,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "160m",
          "from": 1850,
          "to": 1900,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 10 W PEP"
        },
        {
          "band": "160m",
          "from": 1900,
          "to": 1950,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 100 W PEP"
        },
        {
          "band": "160m",
          "from": 1950,
          "to": 2000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 10 W PEP"
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3510,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "80m",
          "from": 3510,
          "to": 3560,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "80m",
          "from": 3560,
          "to": 3600,
          "classes": [
            "full"
          ],
          "modes": [
            "data"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "80m",
          "from": 3600,
          "to": 3800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "60m",
          "from": 5351.5,
          "to": 5354,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 15 W e.i.r.p.; secondary"
        },
        {
          "band": "60m",
          "from": 5354,
          "to": 5366.5,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 15 W e.i.r.p.; USB recommended for voice"
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7040,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "40m",
          "from": 7040,
          "to": 7047,
          "classes": [
            "full"
          ],
          "modes": [
            "data"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "40m",
          "from": 7047,
          "to": 7060,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "40m",
          "from": 7060,
          "to": 7200,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10130,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 150 W PEP; secondary"
        },
        {
          "band": "30m",
          "from": 10130,
          "to": 10150,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 150 W PEP; secondary"
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14060,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "20m",
          "from": 14060,
          "to": 14125,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; 14099-14101 kHz reserved for IBP beacons"
        },
        {
          "band": "20m",
          "from": 14125,
          "to": 14350,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18095,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "17m",
          "from": 18095,
          "to": 18111,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; 18109-18111 kHz reserved for IBP beacons"
        },
        {
          "band": "17m",
          "from": 18111,
          "to": 18168,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21070,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "15m",
          "from": 21070,
          "to": 21151,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; 21149-21151 kHz reserved for IBP beacons"
        },
        {
          "band": "15m",
          "from": 21151,
          "to": 21450,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24915,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "12m",
          "from": 24915,
          "to": 24931,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; 24929-24931 kHz reserved for IBP beacons"
        },
        {
          "band": "12m",
          "from": 24931,
          "to": 24990,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 28070,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "10m",
          "from": 28070,
          "to": 28199,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "10m",
          "from": 28199,
          "to": 28225,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; beacon segments 28199-28225 kHz"
        },
        {
          "band": "10m",
          "from": 28225,
          "to": 29700,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP; 29300-29510 kHz satellite segment"
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 50100,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP; secondary (RR 5.166B)"
        },
        {
          "band": "6m",
          "from": 50100,
          "to": 50400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 200 W PEP; secondary"
        },
        {
          "band": "6m",
          "from": 50400,
          "to": 50500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; beacons 50400-50470 kHz; secondary"
        },
        {
          "band": "6m",
          "from": 50500,
          "to": 52000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP; secondary; FM calling 51510 kHz"
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 144025,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "2m",
          "from": 144025,
          "to": 144400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 200 W PEP; SSB centre of activity 144300 kHz"
        },
        {
          "band": "2m",
          "from": 144400,
          "to": 144500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; beacons 144400-144490 kHz"
        },
        {
          "band": "2m",
          "from": 144500,
          "to": 144800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP"
        },
        {
          "band": "2m",
          "from": 144800,
          "to": 145800,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 200 W PEP; APRS 144800 kHz, FM calling 145500 kHz, repeater channels"
        },
        {
          "band": "2m",
          "from": 145800,
          "to": 146000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP; satellite segment"
        },
        {
          "band": "70cm",
          "from": 432000,
          "to": 432100,
          "classes": [
            "full"
          ],
          "modes": [
            "cw"
          ],
          "note": "Max 200 W PEP; Swedish allocation is 432-438 MHz; secondary"
        },
        {
          "band": "70cm",
          "from": 432100,
          "to": 432400,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone"
          ],
          "note": "Max 200 W PEP; SSB centre of activity 432200 kHz; secondary"
        },
        {
          "band": "70cm",
          "from": 432400,
          "to": 432500,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data"
          ],
          "note": "Max 200 W PEP; beacons 432400-432490 kHz; secondary"
        },
        {
          "band": "70cm",
          "from": 432500,
          "to": 438000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP; satellite 435000-438000 kHz; secondary"
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "full"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Max 200 W PEP; protect GNSS receivers (RR 5.332A); 1260000-1270000 kHz satellite segment"
        }
      ]
    },
    {
      "id": "ZA",
      "name": "South Africa",
      "ituRegion": 1,
      "regulator": {
        "name": "Independent Communications Authority of South Africa (ICASA)",
        "document": "Radio Frequency Spectrum Regulations, 2015 - Government Gazette No. 38641, 30 March 2015: Section 23 (Class A / Class B amateur licences), Annexure H (modes of emission) and Annexure I (amateur radio frequency bands)",
        "url": "https://www.icasa.org.za/uploads/files/Radio-Frequency-Spectrum-Regulations-2015.pdf",
        "retrieved": "2026-09"
      },
      "classes": [
        {
          "id": "a",
          "name": "Class A (ZS) - HAREC / CEPT Class 1"
        },
        {
          "id": "b",
          "name": "Class B (ZU) - novice"
        }
      ],
      "bands": [
        {
          "band": "2200m",
          "from": 135.7,
          "to": 137.8,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary; max 1 W EIRP (ITU 5.67A)."
        },
        {
          "band": "630m",
          "from": 472,
          "to": 479,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary; 5 W EIRP per Annexure I (WRC-12 band, GG 354 of 2013); no protection from aeronautical radionavigation (5.80A/5.80B)."
        },
        {
          "band": "160m",
          "from": 1810,
          "to": 2000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 30 dBW (1 kW PEP); Annexure I states 'No Class B operation'."
        },
        {
          "band": "80m",
          "from": 3500,
          "to": 3800,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Co-primary; Class A 30 dBW, Class B 20 dBW (100 W PEP); music transmission permitted."
        },
        {
          "band": "60m",
          "from": 5350,
          "to": 5450,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary under NRFP 2026 footnote NF0 (ITU Art. 4.4); the channel 5290 kHz is also authorized. Neither NRFP 2026 nor RFSR 2015 Annexure I states class gating or a maximum power for this band - unverified."
        },
        {
          "band": "40m",
          "from": 7000,
          "to": 7200,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 30 dBW, Class B 20 dBW; amateur-satellite allocated."
        },
        {
          "band": "30m",
          "from": 10100,
          "to": 10150,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary; Class A 26 dBW (400 W PEP); 'No Class B operation'."
        },
        {
          "band": "20m",
          "from": 14000,
          "to": 14350,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 30 dBW; amateur-satellite allocated; no Class B."
        },
        {
          "band": "17m",
          "from": 18068,
          "to": 18168,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 30 dBW; no Class B."
        },
        {
          "band": "15m",
          "from": 21000,
          "to": 21450,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 30 dBW; satellite allocated; no Class B."
        },
        {
          "band": "12m",
          "from": 24890,
          "to": 24990,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 30 dBW; no Class B."
        },
        {
          "band": "10m",
          "from": 28000,
          "to": 28050,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Part of the primary 28.000-29.700 MHz allocation; Class A 30 dBW."
        },
        {
          "band": "10m",
          "from": 28050,
          "to": 28150,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Class B segment (20 dBW) inside the primary 28-29.7 MHz band; Class A 30 dBW."
        },
        {
          "band": "10m",
          "from": 28150,
          "to": 28300,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Class A 30 dBW."
        },
        {
          "band": "10m",
          "from": 28300,
          "to": 28500,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Class B segment (20 dBW); Class A 30 dBW."
        },
        {
          "band": "10m",
          "from": 28500,
          "to": 29700,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Class A 30 dBW."
        },
        {
          "band": "10m",
          "from": 29700,
          "to": 30000,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary (footnote NF1); disaster exercises and emergency use only; 26 dBW; 'All' emission types."
        },
        {
          "band": "8m",
          "from": 40675,
          "to": 40685,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; 26 dBW; propagation studies / beacons only."
        },
        {
          "band": "6m",
          "from": 50000,
          "to": 54000,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary in South Africa (5.169); 50-52 MHz 30 dBW, 53-54 MHz 26 dBW; music transmission permitted."
        },
        {
          "band": "4m",
          "from": 70000,
          "to": 70300,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary (footnote NF2); explicitly marked Class A, 26 dBW; experimental propagation; channels 70.025-70.150 MHz reserved for civil defence."
        },
        {
          "band": "2m",
          "from": 144000,
          "to": 146000,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 30 dBW, Class B 20 dBW; satellite allocated."
        },
        {
          "band": "70cm",
          "from": 430000,
          "to": 440000,
          "classes": [
            "a",
            "b"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Co-primary; Class A 30 dBW, Class B 20 dBW; satellite sub-band 435-438 MHz (B 20 dBW); 433.05-434.79 MHz is ISM/SRD - amateurs neither claim nor grant protection (footnote NF8)."
        },
        {
          "band": "23cm",
          "from": 1240000,
          "to": 1300000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary; Class A 30 dBW; music permitted; amateur-satellite 1260-1270 MHz (5.282)."
        },
        {
          "band": "13cm",
          "from": 2300000,
          "to": 2450000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary, ISM sharing (must accept interference); Class A 26 dBW."
        },
        {
          "band": "9cm",
          "from": 3300000,
          "to": 3500000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary, ISM sharing; Class A 26 dBW."
        },
        {
          "band": "5cm",
          "from": 5650000,
          "to": 5925000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary, ISM sharing; Class A 26 dBW; satellite allocated."
        },
        {
          "band": "3cm",
          "from": 10000000,
          "to": 10450000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary; Class A 26 dBW; all modes including pulse."
        },
        {
          "band": "3cm",
          "from": 10450000,
          "to": 10500000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary; Class A 26 dBW; all modes including pulse."
        },
        {
          "band": "1.2cm",
          "from": 24000000,
          "to": 24050000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 26 dBW; satellite allocated; pulse permitted."
        },
        {
          "band": "1.2cm",
          "from": 24050000,
          "to": 24250000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary, ISM sharing; Class A 26 dBW; pulse permitted."
        },
        {
          "band": "6mm",
          "from": 47000000,
          "to": 47200000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 26 dBW; satellite allocated; pulse permitted."
        },
        {
          "band": "4mm",
          "from": 75500000,
          "to": 76000000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 26 dBW; pulse permitted."
        },
        {
          "band": "4mm",
          "from": 76000000,
          "to": 81000000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary, ISM sharing; Class A 26 dBW; pulse permitted."
        },
        {
          "band": "2.5mm",
          "from": 122250000,
          "to": 123000000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary, ISM sharing; Class A 26 dBW; pulse permitted."
        },
        {
          "band": "2mm",
          "from": 134000000,
          "to": 136000000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Primary; Class A 26 dBW; pulse permitted."
        },
        {
          "band": "2mm",
          "from": 136000000,
          "to": 141000000,
          "classes": [
            "a"
          ],
          "modes": [
            "cw",
            "data",
            "phone",
            "image"
          ],
          "note": "Secondary; Class A 26 dBW; pulse permitted."
        }
      ],
      "note": "ICASA issues Class-A (ZS, requires HAREC/CEPT Class 1) and Class-B (ZU novice, issued to persons up to age 20 who must pass the Class-A exam before their 25th birthday or lose the licence) amateur licences; Class A may use every band of Annexure I, while Class B is limited to the rows explicitly marked 'B' (80 m, 40 m, 10 m sub-segments 28.050-28.150/28.300-28.500, 2 m and 70 cm at 20 dBW) plus the rows carrying no per-class power label (2200 m, 630 m, 60 m, 29.7-30 MHz, 8 m, 6 m), which the ICASA radio-amateur examination syllabus likewise lists as Class-B must-know allocations; Class B has no access to 160 m, 30 m, 20 m, 17 m, 15 m, 12 m, 4 m or any 23 cm-and-above band. Modes: 'All except pulse or fast scan TV' (Annexure H) on every band except 29.7-30 MHz where 'All' applies; pulse emissions appear only on the microwave rows. Powers above are PEP expressed in dBW relative to 1 W (30 dBW = 1 kW, 26 dBW = 400 W, 20 dBW = 100 W). Ground truth is the regulator's own Radio Frequency Spectrum Regulations 2015 (GG 38641) Annexure I, cross-checked against the National Radio Frequency Plan 2026 (which defers to Annexure I for amateur conditions); the SARL band-plan pages (sarl.org.za) were down during retrieval (default-webpage/404) so the society fallback could not be used."
    }
  ]
}

if (typeof module !== "undefined" && module.exports) module.exports = { DATA: DATA }

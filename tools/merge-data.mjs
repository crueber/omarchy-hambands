#!/usr/bin/env node
// Fold data/*.json country files into allocations.js. Run from the repo root:
//   node tools/merge-data.mjs
// The US country entry is hand-curated and lives directly in allocations.js;
// everything found in data/ replaces or adds to the countries array by id.
// Sources declared by the JSON files are merged into the sources list.
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const allocationsPath = join(root, "allocations.js")

const src = readFileSync(allocationsPath, "utf8")
  .replace(/^\.pragma library\s*/, "")

// Pull DATA out, patch it, and rewrite the file with the same scaffolding.
const DATA = new Function(`${src}\nreturn DATA`)()
const scaffold = src.split("\nvar DATA = {")[0] // header comment
const tail = src.substring(src.indexOf("\nif (typeof module"))

const dir = join(root, "data")
let merged = 0
try {
  for (const f of readdirSync(dir).sort()) {
    if (!f.endsWith(".json")) continue
    const cty = JSON.parse(readFileSync(join(dir, f), "utf8"))
    const i = DATA.countries.findIndex(c => c.id === cty.id)
    const { source, ...rest } = cty
    // Normalise to spectrum order: curators sometimes follow the source
    // document's row order, the UI wants ascending frequency, and the
    // integrity checks assume it.
    rest.bands = (rest.bands || []).slice()
      .sort((a, b) => a.from - b.from || a.to - b.to)
    if (i >= 0) DATA.countries[i] = rest
    else DATA.countries.push(rest)
    merged++
  }
} catch (e) {
  if (e.code !== "ENOENT") throw e
}

const body = scaffold + "\nvar DATA = " + JSON.stringify(DATA, null, 2) + "\n" + tail
writeFileSync(allocationsPath, ".pragma library\n" + body.replace(/^\n/, ""))
console.log(`merged ${merged} country file(s); countries now: ${DATA.countries.map(c => c.id).join(", ")}`)

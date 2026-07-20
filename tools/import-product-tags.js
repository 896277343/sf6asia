const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const csvPath = path.join(root, "exports", "product-tags.csv");
const dataPath = path.join(root, "lib", "catalogue-data.ts");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

function quote(value) {
  return `"${String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function arrayLiteral(values) {
  return `[${values.map(quote).join(", ")}]`;
}

function replaceArrayExport(source, exportName, values) {
  const body = values.map((value) => `  ${quote(value)},`).join("\n");
  const pattern = new RegExp(`export const ${exportName} = \\[[\\s\\S]*?\\];`);
  return source.replace(pattern, `export const ${exportName} = [\n${body}\n];`);
}

function updateField(block, fieldName, value) {
  const pattern = new RegExp(`(\\n\\s*${fieldName}: )"[^"]*",`);
  return block.replace(pattern, `$1${quote(value)},`);
}

function updateBadges(block, badges) {
  return block.replace(/(\n\s*badges: )\[[^\]]*\],/, `$1${arrayLiteral(badges)},`);
}

const csvText = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
const [headers, ...records] = parseCsv(csvText);
const index = Object.fromEntries(headers.map((header, i) => [header.trim(), i]));
const requiredHeaders = ["Slug", "Range", "Product Group", "Application", "Badges"];

for (const header of requiredHeaders) {
  if (!(header in index)) {
    throw new Error(`Missing required CSV column: ${header}`);
  }
}

const edits = records
  .map((record) => {
    const badges = record[index.Badges]
      .split("|")
      .map((badge) => badge.trim())
      .filter(Boolean);

    return {
      slug: record[index.Slug].trim(),
      range: record[index.Range].trim(),
      group: record[index["Product Group"]].trim(),
      application: record[index.Application].trim(),
      badges,
    };
  })
  .filter((edit) => edit.slug);

let source = fs.readFileSync(dataPath, "utf8");
const updatedRanges = [...new Set(edits.map((edit) => edit.range).filter(Boolean))];
const updatedGroups = [...new Set(edits.map((edit) => edit.group).filter(Boolean))];

source = replaceArrayExport(source, "productRanges", updatedRanges);
source = replaceArrayExport(source, "productGroups", updatedGroups);

const notFound = [];

for (const edit of edits) {
  const slugPattern = new RegExp(`(\\{\\r?\\n\\s*slug: ${quote(edit.slug)},[\\s\\S]*?\\r?\\n\\s*badges: \\[[^\\]]*\\],)`);
  const match = source.match(slugPattern);

  if (!match) {
    notFound.push(edit.slug);
    continue;
  }

  let block = match[1];
  block = updateField(block, "range", edit.range);
  block = updateField(block, "group", edit.group);
  block = updateField(block, "application", edit.application);
  block = updateBadges(block, edit.badges);
  source = source.replace(match[1], block);
}

fs.writeFileSync(dataPath, source, "utf8");

if (notFound.length) {
  console.warn(`Skipped ${notFound.length} missing products: ${notFound.join(", ")}`);
}

console.log(`Imported tags for ${edits.length - notFound.length} products`);
console.log(`Product ranges: ${updatedRanges.length}`);
console.log(`Product groups: ${updatedGroups.length}`);

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "lib", "catalogue-data.ts");
const outDir = path.join(root, "exports");
const outPath = path.join(outDir, "product-tags.csv");

const source = fs.readFileSync(dataPath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const sandbox = {
  exports: {},
  require,
  module: { exports: {} },
};

vm.runInNewContext(compiled, sandbox, { filename: dataPath });

const products = sandbox.module.exports.products ?? sandbox.exports.products;

if (!Array.isArray(products)) {
  throw new Error("Unable to read products from catalogue-data.ts");
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

const rows = [
  [
    "Product Name",
    "Product Tags",
    "Range",
    "Product Group",
    "Application",
    "Badges",
    "Slug",
    "Product No.",
  ],
];

for (const product of products) {
  const tags = [
    product.range,
    product.group,
    product.application,
    ...(product.badges ?? []),
  ].filter(Boolean);

  rows.push([
    product.name,
    tags,
    product.range,
    product.group,
    product.application,
    product.badges ?? [],
    product.slug,
    product.article,
  ]);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`, "utf8");

console.log(`Exported ${products.length} products to ${outPath}`);

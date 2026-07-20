import type { Product } from "@/lib/catalogue-data";

const measurementPriority = [
  "Detection range",
  "Measurement range",
  "Purity range",
  "Humidity range",
  "Oxygen range",
  "Residual hydrogen range",
  "Dew point range",
  "Range",
  "Gas dew point measurement range",
  "Hydrogen concentration",
  "Accuracy",
  "Measurement accuracy",
  "Measurement error",
  "Purity error",
  "Humidity error",
  "Oxygen error",
  "Response time",
  "Purity response",
  "H2 response time",
  "CO2 response time",
  "Resolution",
  "Output",
  "Signal output",
  "Explosion-proof rating",
];

const handlingPriority = [
  "Gas",
  "Gas type",
  "Application range",
  "Model options",
  "Control modes",
  "Module combination",
  "Recommended gas quantity",
  "Vacuum pump options",
  "Storage tank options",
  "Vacuum compressor options",
  "Roots pump options",
  "Recovery speed",
  "Recovery speed range",
  "Recovery rate",
  "Recovery final vacuum",
  "Recovery vacuum compressor",
  "Oil-free compressor",
  "Oil-free vacuum compressor",
  "Vacuum compressor",
  "Vacuum pump",
  "Evacuation speed",
  "Final vacuum",
  "Output final pressure",
  "Vacuum level",
  "Pump speed",
  "Compressor",
  "Capacity",
  "Capacity range",
  "Regenerated purity",
  "Air content after treatment",
  "Moisture after treatment",
  "CF4 after treatment",
  "Flow rate",
  "Feed gas flow",
  "Hydrogen generation flow",
  "Hydrogen treatment capacity",
  "Sample gas flow",
  "Storage tank",
  "Bottle filling speed",
  "Outlet pressure",
  "Inlet pressure",
  "Working pressure",
  "Filling pressure",
  "Power",
  "Power supply",
  "Rated power",
];

const generalPriority = [
  "Model",
  "Gas",
  "Gas type",
  "Detected gas",
  "Type",
  "Product type",
  "Function",
  "Functions",
  "Operation",
  "Principle",
  "Detection principle",
  "Sampling method",
  "Installation",
  "Output",
  "Signal output",
  "Power",
  "Power supply",
  "Working voltage",
  "Dimensions",
  "Size",
  "Weight",
];

export function getKeySpecEntries(product: Product, limit?: number) {
  const all = Object.entries(product.specs).filter(([, value]) => value);
  const priority = getPriority(product);
  const sorted = [...all].sort(([a], [b]) => {
    const ai = priority.indexOf(a);
    const bi = priority.indexOf(b);

    if (ai === -1 && bi === -1) {
      return 0;
    }

    if (ai === -1) {
      return 1;
    }

    if (bi === -1) {
      return -1;
    }

    return ai - bi;
  });

  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getFeaturedSpecEntries(product: Product, limit = 6) {
  return getKeySpecEntries(product, limit);
}

function getPriority(product: Product) {
  const haystack = `${product.group} ${product.application} ${product.name} ${product.summary}`.toLowerCase();
  const isHandling =
    haystack.includes("service cart") ||
    haystack.includes("recovery") ||
    haystack.includes("vacuum") ||
    haystack.includes("filling") ||
    haystack.includes("regeneration") ||
    haystack.includes("purification") ||
    haystack.includes("dryer") ||
    haystack.includes("generation") ||
    haystack.includes("storage") ||
    haystack.includes("process control");

  const isMeasurement =
    haystack.includes("analyzer") ||
    haystack.includes("monitor") ||
    haystack.includes("detector") ||
    haystack.includes("sensor") ||
    haystack.includes("measuring") ||
    haystack.includes("leak");

  if (isHandling && !isMeasurement) {
    return [...handlingPriority, ...measurementPriority, ...generalPriority];
  }

  if (isMeasurement && !isHandling) {
    return [...measurementPriority, ...handlingPriority, ...generalPriority];
  }

  return [...measurementPriority, ...handlingPriority, ...generalPriority];
}

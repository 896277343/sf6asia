import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { ProductDetailActions } from "@/components/catalogue/product-detail-actions";
import { ProductImageGallery } from "@/components/catalogue/product-image-gallery";
import { getProduct, products } from "@/lib/catalogue-data";
import { getFeaturedSpecEntries, getKeySpecEntries } from "@/lib/catalogue-specs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const productManualCopy: Record<
  string,
  {
    intro: string[];
    advantages?: string[];
    selectionGuide?: {
      notes?: string[];
      tables: Array<{
        title: string;
        columns: string[];
        rows: string[][];
      }>;
    };
  }
> = {
  "sf6-regeneration": {
    intro: [
      "The RF-300J SF6 Regeneration System is a medium to large SF6 recovery and purification unit. It supports vacuum evacuation, SF6 recovery, gas purification, circulation purification, and gas refilling.",
      "The system uses PLC intelligent control and touch screen operation. It is designed for power utilities, electrical equipment manufacturers, metallurgy, petrochemical plants, gas suppliers, and SF6 filling stations.",
      "Recovered SF6 gas can be regenerated and purified for reuse. After treatment, the gas can reach new-gas quality requirements according to GB12022-2014.",
    ],
    advantages: [
      "PLC intelligent control with touch screen operation makes operation simple and safe",
      "Molecular sieve regeneration and refrigeration circulation purification improve gas purity",
      "Treated SF6 gas purity can reach 99.9% and meet GB12022-2014 new-gas standard",
      "Oil-free compressor and independent recovery/refilling pipelines help avoid cross contamination",
      "Negative-pressure deep recovery starts automatically when recovery pressure drops to 0.08 MPa",
      "Two refilling ports support direct filling and pressure-boosted filling",
      "Tank weighing sensor shows gas weight changes in real time for easier gas management",
      "Suitable for -10 C to +40 C site environments with relative humidity below 90% RH",
    ],
  },
  "rf391-mega-sf6-gas-handling": {
    intro: [
      "The RF-391 Series is a Mega SF6 gas handling unit for large-volume SF6 gas service. It is designed for 50 to 400 kg SF6 gas recovery, evacuation, refilling, and maintenance work.",
      "This large RF Series recovery unit is suitable for 110 kV to 500 kV GIS equipment. It is a practical choice for utility-scale gas maintenance, large substations, high-voltage switchgear factories, and SF6 filling stations.",
      "The system offers rich configuration options, including one-button or touch screen control, different vacuum compressor stages, several vacuum pump and Roots pump choices, and storage tank options up to 600 L.",
    ],
    advantages: [
      "Designed for 50 to 400 kg large-volume SF6 gas handling in GIS equipment",
      "Up to 72 standard configuration combinations support complex field requirements",
      "Oil-free compressor and oil-free vacuum compressor help keep recovered gas clean",
      "Final recovery vacuum can reach below 1 mbar and meets IEC 62271-4 requirements",
      "Gas booster system can fill a 40 L cylinder with liquid SF6 in about 5 minutes",
      "Built-in filter removes moisture and impurities, and the molecular sieve supports online regeneration",
      "Touch screen one-button operation and built-in SF6 gas cooling system improve automation",
      "Optional storage tanks from no tank to 600 L allow flexible project matching",
    ],
    selectionGuide: {
      notes: [
        "RF-391 can be configured by control mode, vacuum compressor, vacuum pump or Roots pump, and storage tank volume. This makes the unit suitable for different GIS sizes and maintenance workflows.",
      ],
      tables: [
        {
          title: "Model Selection Rule",
          columns: ["Code", "Meaning", "Available options"],
          rows: [
            ["K / T", "Control mode", "K = one-button control; T = touch screen control"],
            ["A1 / A2 / A3", "Vacuum compressor", "A1 15 m3/h <= 5000 Pa; A2 20 m3/h <= 5 Pa; A3 40 m3/h <= 5 Pa"],
            ["B1-B4", "Vacuum pump", "B1 64 m3/h, B2 100 m3/h, B3 200 m3/h, B4 300 m3/h; final vacuum <= 10 Pa"],
            ["B5 / B6", "Roots pump", "B5 251 m3/h, B6 505 m3/h; final vacuum <= 10 Pa"],
            ["C1-C6", "Storage tank", "C1 no tank, C2 220 L, C3 300 L, C4 400 L, C5 500 L, C6 600 L"],
          ],
        },
        {
          title: "Typical Model Examples",
          columns: ["Model", "Control mode", "Vacuum compressor", "Vacuum pump / Roots pump", "Storage tank", "Typical use"],
          rows: [
            ["RF-391KA1B1C3", "One-button", "15 m3/h", "64 m3/h vacuum pump", "300 L", "Standard configuration"],
            ["RF-391TA1B4C6", "Touch screen", "15 m3/h", "300 m3/h vacuum pump", "600 L", "Large pump and large tank configuration"],
            ["RF-391KA1B6C2", "One-button", "15 m3/h", "505 m3/h Roots pump", "220 L", "Roots pump configuration"],
          ],
        },
        {
          title: "Standard Equipment Description",
          columns: ["Component", "Specification"],
          rows: [
            ["Oil-free recovery compressor", "15 m3/h"],
            ["Oil-free vacuum compressor", "15 m3/h, final vacuum < 1 mbar"],
            ["Vacuum pump", "64 m3/h, final vacuum < 10 Pa"],
            ["Cooling system", "3P refrigeration system"],
            ["Gas booster", "Fills a 40 L cylinder in about 5 minutes"],
            ["Built-in storage tank", "300 L with weighing function"],
            ["Filter", "SF6 dehydration and impurity removal"],
            ["Molecular sieve", "Online regeneration supported"],
            ["Touch screen", "Chinese / English operation"],
            ["Hoses", "10 m DN20 braided hose and 3 m cylinder hose"],
          ],
        },
      ],
    },
  },
  "rfa-modular-sf6-gas-cart": {
    intro: [
      "The RFA Mini Series is a modular SF6 gas recovery cart. Users can combine 2 to 6 functional modules according to the actual service requirement.",
      "It is designed for small SF6 gas compartments with a gas quantity of 0 to 50 kg. The system supports flexible SF6 gas recovery, evacuation, refilling, and field maintenance work.",
      "Each module is compact and easy to move. The modular structure helps service teams transport the equipment, assemble it on site, and adapt it to different working conditions.",
    ],
    advantages: [
      "Flexible modular configuration with 2 to 6 modules for different field applications",
      "Oil-free compressor and oil-free vacuum compressor help keep SF6 gas clean and avoid oil contamination",
      "Patented gas cooling system improves recovery efficiency during operation",
      "Deep SF6 recovery down to 1 mbar for high recovery performance",
      "Compact module size makes transportation and quick site assembly easier",
      "Quick self-locking couplings support fast connection and reliable sealing",
    ],
    selectionGuide: {
      notes: [
        "RFA Mini Series modules can be combined according to site requirements. The optional voltage version is available for projects that require AC 220 V power.",
      ],
      tables: [
        {
          title: "Standard Configuration",
          columns: ["Item", "Specification"],
          rows: [
            ["Oil-free compressor", "1 unit, 4 m3/h"],
            ["Oil-free vacuum compressor", "1 unit, 7.2 m3/h, final vacuum < 1 mbar"],
            ["Vacuum pump", "1 unit, 16 m3/h, final vacuum < 10 Pa or < 100 Pa by configuration"],
            ["SF6 gas cooling system", "1 set"],
            ["Filtering device", "1 set for SF6 dehydration and impurity removal"],
            ["Main control panel", "1 unit"],
            ["Wheels", "2 fixed wheels and 2 universal wheels per module"],
            ["Connection hose", "5 m braided hose with DN20 / DN8 self-sealing couplings"],
            ["Cylinder hose", "3 m braided hose with DN8 self-sealing coupling / China cylinder connector"],
            ["Power cable", "10 m"],
          ],
        },
        {
          title: "Optional Configuration",
          columns: ["Option", "Description"],
          rows: [
            ["RFA8", "2 x 4 m3/h compressors, 1 x 16 m3/h vacuum compressor, 1 gas cooling system, 1 main control panel"],
            ["RFAV", "AC 220 V, 50 Hz, two-phase power supply"],
          ],
        },
      ],
    },
  },
  "rf051-compact-sf6-gas-recovery": {
    intro: [
      "The RF-051 Series is a compact SF6 gas recovery unit for vacuum evacuation, gas recovery, gas refilling, and cylinder pressurizing service.",
      "It is designed for on-site operation and maintenance of SF6 electrical equipment. The compact structure makes it suitable for substations, repair work, and limited-space field environments.",
      "The equipment is designed and manufactured according to DL/T662 requirements. Different control modes, vacuum pump sizes, and tank options are available for different service tasks.",
    ],
    advantages: [
      "12 standard configurations are available for different control, vacuum pump, and storage tank requirements",
      "Compact and mobile design makes the unit easy to move and operate in substations or field sites",
      "Manual, one-button, and touch screen control options are available for different operating habits",
      "Safety valves and anti-oil-return protection help reduce gas leakage and oil contamination risk",
      "Molecular sieve filtering and drying technology removes moisture, decomposition products, and solid particles",
      "Oil-free recovery compressor and automatic negative-pressure recovery support clean and efficient gas recovery",
      "Suitable for 72.5 kV to 110 kV SF6 electrical equipment and 220 kV / 500 kV porcelain column circuit breakers",
    ],
    selectionGuide: {
      notes: [
        "RF-051 has 12 standard configurations. The model code combines control mode, vacuum pump size, and storage tank option.",
      ],
      tables: [
        {
          title: "Model Selection Rule",
          columns: ["Code", "Meaning", "Available options"],
          rows: [
            ["H / K / T", "Control mode", "H = manual, K = one-button, T = touch screen"],
            ["B1 / B2", "Vacuum pump", "B1 = 17 m3/h, B2 = 64 m3/h; final vacuum <= 10 Pa"],
            ["C1 / C2", "Storage tank", "C1 = no tank, C2 = 70 L tank"],
          ],
        },
        {
          title: "Available RF-051 Models",
          columns: ["Model", "Control mode", "Vacuum pump", "Storage tank"],
          rows: [
            ["RF-051HB1C1", "Manual", "17 m3/h", "No tank"],
            ["RF-051HB1C2", "Manual", "17 m3/h", "70 L"],
            ["RF-051HB2C1", "Manual", "64 m3/h", "No tank"],
            ["RF-051HB2C2", "Manual", "64 m3/h", "70 L"],
            ["RF-051KB1C1", "One-button", "17 m3/h", "No tank"],
            ["RF-051KB1C2", "One-button", "17 m3/h", "70 L"],
            ["RF-051KB2C1", "One-button", "64 m3/h", "No tank"],
            ["RF-051KB2C2", "One-button", "64 m3/h", "70 L"],
            ["RF-051TB1C1", "Touch screen", "17 m3/h", "No tank"],
            ["RF-051TB1C2", "Touch screen", "17 m3/h", "70 L"],
            ["RF-051TB2C1", "Touch screen", "64 m3/h", "No tank"],
            ["RF-051TB2C2", "Touch screen", "64 m3/h", "70 L"],
          ],
        },
        {
          title: "Standard Accessories",
          columns: ["Accessory", "Specification", "Use"],
          rows: [
            ["Recovery hose", "DN19 x 10 m, DN20 self-sealing coupling on one end, ball valve and cylinder connector on the other end", "Gas recovery"],
            ["Refilling hose", "DN13 x 3 m, DN20 self-sealing coupling on one end, ball valve and cylinder connector on the other end", "Gas refilling"],
            ["Power cable", "10 m", "Power connection"],
            ["Auxiliary recovery cooling", "Water cooling", "Improves recovery efficiency"],
          ],
        },
      ],
    },
  },
  "rf151-mid-sf6-gas-handling": {
    intro: [
      "The RF-151 Series is a medium SF6 gas handling unit. It is a PLC-controlled semi-intelligent system for SF6 gas recovery, evacuation, refilling, cylinder pressurizing, and vaporized gas output.",
      "The unit is designed for comprehensive gas service on SF6 electrical equipment and switchgear. It is suitable for power utilities, metallurgy, petrochemical plants, high-voltage switchgear factories, research institutes, and training applications.",
      "RF-151 is built for 110 kV GIS, 220 kV GIS, and 500 kV porcelain column circuit breakers. The design and manufacturing follow DL/T662 requirements.",
    ],
    advantages: [
      "10 standard configurations cover one-button or touch screen control, vacuum compressor options, vacuum pump options, and storage tank options",
      "PLC control and touch screen operation show vacuum changes during evacuation and make operation simple",
      "Four refilling modes are available: direct filling, regulated pressure output, gas-phase pressurizing, and liquid-phase pressurizing",
      "Oil-free recovery compressor and refrigeration liquefaction system improve recovery speed and reduce residual gas",
      "Molecular sieve filtering and drying removes moisture, decomposition products, and other impurities",
      "Suitable for 110 kV GIS, 220 kV GIS, and 500 kV porcelain column circuit breaker service",
      "Compact semi-closed protective structure makes operation and maintenance convenient",
      "Real-time inlet and outlet pressure indication supports safer operation",
    ],
    selectionGuide: {
      notes: [
        "RF-151 can be configured by control mode, vacuum compressor, vacuum pump, and storage tank volume. The listed models are the basic one-button configurations with A1 vacuum compressor. Touch screen control and A2 vacuum compressor options can be customized.",
      ],
      tables: [
        {
          title: "Model Selection Rule",
          columns: ["Code", "Meaning", "Available options"],
          rows: [
            ["K / T", "Control mode", "K = one-button control; T = touch screen control"],
            ["A1 / A2", "Vacuum compressor", "A1 = 15 m3/h <= 5000 Pa; A2 = 20 m3/h <= 5 Pa"],
            ["B1 / B2", "Vacuum pump", "B1 = 17 m3/h <= 10 Pa; B2 = 64 m3/h <= 10 Pa"],
            ["C1-C5", "Storage tank", "C1 no tank, C2 120 L, C3 300 L, C4 600 L, C5 1000 L external tank"],
          ],
        },
        {
          title: "Available RF-151 Models",
          columns: ["Model", "Control mode", "Vacuum compressor", "Vacuum pump", "Storage tank"],
          rows: [
            ["RF-151KA1B1C1", "One-button", "15 m3/h", "17 m3/h", "No tank"],
            ["RF-151KA1B1C2", "One-button", "15 m3/h", "17 m3/h", "120 L"],
            ["RF-151KA1B1C3", "One-button", "15 m3/h", "17 m3/h", "300 L"],
            ["RF-151KA1B1C4", "One-button", "15 m3/h", "17 m3/h", "600 L"],
            ["RF-151KA1B1C5", "One-button", "15 m3/h", "17 m3/h", "1000 L external"],
            ["RF-151KA1B2C1", "One-button", "15 m3/h", "64 m3/h", "No tank"],
            ["RF-151KA1B2C2", "One-button", "15 m3/h", "64 m3/h", "120 L"],
            ["RF-151KA1B2C3", "One-button", "15 m3/h", "64 m3/h", "300 L"],
            ["RF-151KA1B2C4", "One-button", "15 m3/h", "64 m3/h", "600 L"],
            ["RF-151KA1B2C5", "One-button", "15 m3/h", "64 m3/h", "1000 L external"],
          ],
        },
        {
          title: "Standard Accessories",
          columns: ["Accessory", "Specification", "Use"],
          rows: [
            ["Recovery hose", "DN19 x 10 m, DN20 self-sealing coupling on one end, ball valve and cylinder connector on the other end", "Gas recovery"],
            ["Refilling hose", "DN13 x 3 m, DN20 self-sealing coupling on one end, ball valve and cylinder connector on the other end", "Gas refilling"],
            ["Power cable", "10 m", "Power connection"],
            ["Auxiliary recovery cooling", "Water cooling", "Improves recovery efficiency"],
          ],
        },
      ],
    },
  },
  "rf151m-mixed-gas-recovery-separation": {
    intro: [
      "RF-151M is a recovery and separation unit for SF6/N2 mixed insulating gas. As environmental requirements increase, SF6/N2 mixed gas is used more often in modern power equipment.",
      "The unit can separate mixed gas online. The separated SF6 can be recovered into the equipment or an external cylinder, while the separated N2 can be discharged to the atmosphere.",
      "RF-151M is suitable for GIS, GIL, transformers, environmentally friendly substations, power equipment manufacturers, and research applications using SF6/N2 mixed gas insulation.",
    ],
    advantages: [
      "Specially designed for SF6/N2 mixed insulating gas recovery and separation",
      "Membrane separation technology separates SF6 and N2 efficiently",
      "Separated SF6 can be recovered and reused to reduce new gas purchase cost",
      "Separated N2 can be discharged to the atmosphere after separation",
      "Oil-free compressor keeps the separated gas clean and free from oil pollution",
      "Vacuum compressor supports deep recovery of residual mixed gas",
      "PLC automatic control and touch screen operation make the process clear and easy to use",
    ],
  },
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | Product E-Catalogue | SF6 Relations`,
    description: `${product.summary} View product overview, advantages, technical specifications, and inquiry information for ${product.article}.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const allSpecs = getKeySpecEntries(product);
  const heroSpecs = getFeaturedSpecEntries(product, 8);
  const manualCopy = productManualCopy[product.slug];
  const introParagraphs = manualCopy?.intro ?? [product.summary];
  const advantages = manualCopy?.advantages ?? product.highlights;
  const selectionGuide = manualCopy?.selectionGuide;
  const productImages = product.images?.length ? product.images : [product.image];
  const rangeBadge = getRangeBadge(product.range);

  return (
    <main className="bg-white">
      <section className="border-b border-[#d8dde0] bg-[#f1f3f4]">
        <div className="mx-auto max-w-[1580px] px-4 py-5 sm:px-6 lg:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#4d565b]">
            <Link href="/" className="hover:text-[#eb690b]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-[#9aa5ab]" />
            <Link href="/productcatalogue/finder" className="hover:text-[#eb690b]">
              Product catalogue
            </Link>
            <ChevronRight className="h-4 w-4 text-[#9aa5ab]" />
            <span className="border-l-4 border-[#eb690b] pl-3 font-black text-[#20282d]">
              {product.article}
            </span>
          </nav>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-[1580px] px-4 sm:px-6 lg:px-10">
          <Link
            href="/productcatalogue/finder"
            className="mb-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#4d565b] hover:text-[#eb690b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to finder
          </Link>

          <div className="grid min-w-0 overflow-hidden rounded-[6px] border border-[#d8dde0] bg-[#f1f3f4] shadow-[0_12px_36px_rgba(32,40,45,0.08)] lg:grid-cols-[minmax(420px,0.92fr)_minmax(0,1.08fr)]">
            <div className="min-w-0 border-b border-[#d8dde0] bg-[#eef2f4] p-4 lg:border-b-0 lg:border-r lg:p-6">
              <div className="relative flex min-h-[360px] items-center justify-center rounded-[4px] bg-white p-4 shadow-inner md:min-h-[520px] lg:min-h-[620px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="h-full max-h-[560px] w-full object-contain" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-[3px] px-3 py-1.5 text-xs font-black uppercase text-white ${rangeBadge.className}`}
                  >
                    {rangeBadge.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="min-w-0 bg-white p-5 md:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-[3px] border border-[#d8dde0] bg-[#f1f3f4] px-2.5 py-1 text-xs font-black uppercase text-[#4d565b]"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-[#eb690b]">
                Product no. {product.article}
              </p>
              <h1 className="mt-3 max-w-4xl break-words text-4xl font-black leading-tight text-[#20282d] md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-3xl break-words text-lg leading-8 text-[#4d565b]">{product.summary}</p>

              <div className="mt-7 grid gap-3 border-y border-[#d8dde0] py-5 sm:grid-cols-3">
                <InfoCell label="Gas type" value={product.range} />
                <InfoCell label="Product group" value={product.group} />
                <InfoCell label="Application" value={product.application} />
              </div>

              <div className="mt-7 rounded-[6px] border border-[#d8dde0] bg-[#f8fafb]">
                <div className="border-b border-[#d8dde0] px-4 py-3">
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#20282d]">
                    Key Product Data
                  </h2>
                </div>
                <dl className="grid sm:grid-cols-2">
                  {heroSpecs.map(([key, value]) => (
                    <div key={key} className="min-w-0 break-words border-b border-r border-[#e5e9eb] bg-white px-4 py-3">
                      <dt className="text-xs font-black uppercase tracking-wide text-[#4d565b]">{key}</dt>
                      <dd className="mt-1 text-base font-black leading-6 text-[#20282d]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-4 grid gap-2">
                {advantages.slice(0, 3).map((advantage) => (
                  <div key={advantage} className="flex gap-2 text-sm font-semibold leading-6 text-[#20282d]">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#a2c037]" />
                    <span>{advantage}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <ProductDetailActions
                  article={product.article}
                  name={product.name}
                  slug={product.slug}
                  sourceUrl={product.sourceUrl}
                />
              </div>

            </div>
          </div>

          <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0 space-y-8">
              <section className="min-w-0 rounded-[6px] border border-[#d8dde0] bg-white">
                <div className="border-b border-[#d8dde0] bg-[#f1f3f4] px-5 py-4 md:px-6">
                  <h2 className="text-2xl font-black text-[#20282d]">Product Overview</h2>
                </div>
                <div className="space-y-4 p-5 text-base leading-8 text-[#4d565b] md:p-6">
                  {introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section className="min-w-0 rounded-[6px] border border-[#d8dde0] bg-white">
                <div className="border-b border-[#d8dde0] bg-[#f1f3f4] px-5 py-4 md:px-6">
                  <h2 className="text-2xl font-black text-[#20282d]">Product Advantages</h2>
                </div>
                <ul className="grid gap-3 p-5 md:grid-cols-2 md:p-6">
                  {advantages.map((advantage) => (
                    <li key={advantage} className="flex min-w-0 gap-3 rounded-[4px] border border-[#d8dde0] bg-[#fbfcfc] p-4 text-sm leading-6 text-[#20282d]">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#a2c037]" />
                      <span className="min-w-0 break-words">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="min-w-0 rounded-[6px] border border-[#d8dde0] bg-white">
                <div className="flex flex-col gap-3 border-b border-[#d8dde0] bg-[#f1f3f4] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                  <h2 className="text-2xl font-black text-[#20282d]">Technical Specifications</h2>
                  <span className="w-fit rounded-[3px] bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-[#4d565b]">
                    {Object.keys(product.specs).length} parameters
                  </span>
                </div>
                {allSpecs.length ? (
                  <SpecGrid entries={allSpecs} columns="md:grid-cols-2 xl:grid-cols-3" flush />
                ) : (
                  <p className="p-6 text-sm leading-6 text-[#4d565b]">Technical parameters are available on request.</p>
                )}
              </section>

              {selectionGuide ? (
                <section className="min-w-0 rounded-[6px] border border-[#d8dde0] bg-white">
                  <div className="border-b border-[#d8dde0] bg-[#f1f3f4] px-5 py-4 md:px-6">
                    <h2 className="text-2xl font-black text-[#20282d]">Selection Guide</h2>
                  </div>
                  <div className="space-y-6 p-5 md:p-6">
                    {selectionGuide.notes?.length ? (
                      <div className="min-w-0 break-words rounded-[4px] border border-[#d8dde0] bg-[#fbfcfc] p-4 text-sm leading-6 text-[#4d565b]">
                        {selectionGuide.notes.map((note) => (
                          <p key={note}>{note}</p>
                        ))}
                      </div>
                    ) : null}
                    {selectionGuide.tables.map((table) => (
                      <SelectionTable
                        key={table.title}
                        title={table.title}
                        columns={table.columns}
                        rows={table.rows}
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="min-w-0 overflow-hidden rounded-[6px] border border-[#d8dde0] bg-white">
                <div className="flex flex-col gap-2 border-b border-[#d8dde0] bg-[#f1f3f4] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                  <h2 className="text-2xl font-black text-[#20282d]">Product Images</h2>
                  <span className="w-fit rounded-[3px] bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-[#4d565b]">
                    {productImages.length} image
                  </span>
                </div>
                <div className="p-4 md:p-5">
                  <ProductImageGallery images={productImages} productName={product.name} />
                </div>
              </section>
            </div>

            <aside className="min-w-0 rounded-[6px] bg-[#20282d] p-6 text-white lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#eb690b]">Product support</p>
              <h2 className="mt-2 text-2xl font-black">Engineering inquiry</h2>
              <p className="mt-3 leading-7 text-[#d8dde0]">
                Send the product number, application scenario, gas conditions, and quantity to receive a matching
                recommendation.
              </p>
              <ul className="mt-5 grid gap-3">
                {advantages.slice(0, 4).map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-white">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#a2c037]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:sales@sf6relations.com?subject=${encodeURIComponent(`Inquiry ${product.article}`)}`}
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-[#eb690b] px-5 text-sm font-black uppercase tracking-wide text-white hover:bg-[#c95608]"
              >
                Contact sales
              </a>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-black uppercase tracking-wide text-[#4d565b]">{label}</dt>
      <dd className="mt-1 break-words text-sm font-black leading-5 text-[#20282d]">{value}</dd>
    </div>
  );
}

function getRangeBadge(range: string) {
  const normalized = range.toLowerCase();

  if (normalized.includes("hydrogen") || normalized.includes("h2")) {
    return { label: "H2", className: "bg-[#38bdf8]" };
  }

  if (normalized.includes("sf6")) {
    return { label: "SF6", className: "bg-[#eb690b]" };
  }

  if (normalized.includes("accessor") || normalized.includes("valves") || normalized.includes("couplings")) {
    return { label: "Accessories", className: "bg-[#20282d]" };
  }

  return { label: range, className: "bg-[#20282d]" };
}

function SpecGrid({
  entries,
  columns,
  flush = false,
}: {
  entries: Array<[string, string]>;
  columns: string;
  flush?: boolean;
}) {
  return (
    <dl className={`grid min-w-0 overflow-hidden ${flush ? "" : "rounded-[4px] border border-[#d8dde0]"} ${columns}`}>
      {entries.map(([key, value]) => (
        <div key={key} className="min-w-0 break-words border-b border-r border-[#e5e9eb] bg-white p-4">
          <dt className="text-xs font-black uppercase tracking-wide text-[#4d565b]">{key}</dt>
          <dd className="mt-2 text-sm font-black leading-6 text-[#20282d]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SelectionTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-3 break-words text-lg font-black text-[#20282d]">{title}</h3>
      <div className="max-w-full overflow-x-auto rounded-[4px] border border-[#d8dde0]">
        <table className="min-w-full border-collapse bg-white text-left text-sm">
          <thead className="bg-[#20282d] text-white">
            <tr>
              {columns.map((column) => (
                <th key={column} className="whitespace-nowrap border-r border-[#4d565b] px-4 py-3 font-black">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("|")} className="border-t border-[#e5e9eb] odd:bg-white even:bg-[#fbfcfc]">
                {row.map((cell, index) => (
                  <td key={`${row.join("|")}-${index}`} className="min-w-[150px] break-words border-r border-[#e5e9eb] px-4 py-3 leading-6 text-[#20282d]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

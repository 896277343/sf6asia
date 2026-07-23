import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Headphones,
  LifeBuoy,
  Wrench,
} from "lucide-react";
import { products } from "@/lib/catalogue-data";

const productAreas = [
  {
    title: "SF6 gas",
    href: "/productcatalogue/finder?productrange=SF6%20gas",
    image: "/pic/sf6-service-carts.webp",
  },
  {
    title: "Alternative arc quenching and insulating gases",
    href: "/productcatalogue/finder?productrange=Alternative%20arc%20quenching%20and%20insulating%20gases",
    image: "/pic/rf151m-mixed-gas-recovery-separation-1.webp",
  },
  {
    title: "H2 gas",
    href: "/productcatalogue/finder?productrange=H2%20gas",
    image: "/pic/hydrogen-sensor-instrumentation-and-equipment.webp",
  },
  {
    title: "Valves and couplings",
    href: "/productcatalogue/finder?productrange=Valves%20and%20couplings",
    image: "/pic/sf6-gas-fittings.webp",
  },
];

const productWorld = [
  {
    title: "Gas refilling and evacuation devices",
    body: "Vacuum pump units, filling carts, evacuation devices, and field equipment for commissioning and gas transfer work.",
    href: "/productcatalogue/finder?productgroup=Gas%20refilling%20and%20evacuation%20devices",
    image: "/pic/mobile-sf6-vacuum-pump-unit.webp",
  },
  {
    title: "Measuring devices",
    body: "Gas analyzers, leakage detection, density supervision, hydrogen sensors, and online monitoring instruments.",
    href: "/productcatalogue/finder?productgroup=Measuring%20devices",
    image: "/pic/sf6-gas-analyzer.webp",
  },
  {
    title: "Service carts",
    body: "Compact, medium, modular, and high-capacity gas handling carts for recovery, refilling, purification, and maintenance.",
    href: "/productcatalogue/finder?productgroup=Service%20carts",
    image: "/pic/rf391-mega-sf6-gas-handling.webp",
  },
  {
    title: "Accessories",
    body: "Couplings, fittings, hoses, adapters, and supporting connection parts for reliable field gas operations.",
    href: "/productcatalogue/finder?productgroup=Accessories",
    image: "/pic/sf6-gas-fittings.webp",
  },
];

const services = [
  {
    title: "Documentation",
    body: "Product brochures, manuals, and technical information for daily engineering use.",
    href: "mailto:sales@sf6relations.com?subject=Documentation%20request",
    icon: FileText,
  },
  {
    title: "Service and Maintenance",
    body: "Support for equipment maintenance planning, servicing requests, and operating questions.",
    href: "mailto:sales@sf6relations.com?subject=Service%20and%20Maintenance",
    icon: Wrench,
  },
  {
    title: "Application Support",
    body: "Discuss switchgear, utility, GIS manufacturing, or hydrogen generator use cases with our team.",
    href: "mailto:sales@sf6relations.com?subject=Application%20Support",
    icon: Headphones,
  },
  {
    title: "Direct Contact",
    body: "Reach sales and engineering support directly for product matching, quotations, and lead time checks.",
    href: "mailto:sales@sf6relations.com?subject=Direct%20Contact",
    icon: LifeBuoy,
  },
];

export default function Home() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#262f33]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.sf6relations.com/wp-content/uploads/2023/02/SF6-Gas-Maintenance-Equipment-Manufacturer-2s.jpg"
            alt="SF6 Relations gas equipment"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,47,51,0.92)_0%,rgba(38,47,51,0.82)_48%,rgba(38,47,51,0.58)_100%)]" />
        </div>

        <div className="relative mx-auto grid max-w-[1600px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.7fr] lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#eb690b]">
              SF6 Gas Equipment Catalogue and Inquiry Application
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">
              Gas handling, monitoring, and analysis solutions for SF6 and hydrogen systems
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#e4e8ec]">
              Built around your own product portfolio, this application helps customers move from product discovery to
              technical comparison and inquiry submission in one clear industrial workflow.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/productcatalogue/finder"
                className="inline-flex h-14 items-center gap-3 rounded-sm bg-[#eb690b] px-6 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-[#c95608]"
              >
                Find product
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#product-areas"
                className="inline-flex h-14 items-center gap-3 rounded-sm border border-white/35 bg-white/10 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/15"
              >
                Explore product areas
              </a>
            </div>
          </div>

          <div className="grid gap-3 self-end sm:grid-cols-3 lg:grid-cols-1">
            <MetricCard value={`${products.length}+`} label="Catalogue products" />
            <MetricCard value="SF6 + H2" label="Integrated product scope" />
            <MetricCard value="Inquiry ready" label="Selection to quotation path" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 border-l-4 border-[#eb690b] pl-5 md:max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#eb690b]">Our product world</p>
            <h2 className="text-3xl font-black text-[#262f33] md:text-4xl">
              Find equipment by the way customers work on gas systems
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#495156]">
              Four practical product families guide buyers from the first maintenance task to the correct equipment
              type.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-4">
            {productWorld.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-full flex-col overflow-hidden rounded-sm border border-[#d2d3d5] bg-[#f1f3f4] transition hover:-translate-y-1 hover:border-[#eb690b] hover:shadow-xl"
              >
                <div className="aspect-[1.08/1] overflow-hidden bg-white sm:aspect-[1.2/1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <h3 className="text-base font-black leading-tight text-[#262f33] group-hover:text-[#eb690b] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-[#495156] sm:mt-4 sm:text-sm sm:leading-7">{item.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-black uppercase tracking-wide text-[#262f33] sm:pt-6 sm:text-sm">
                    Explore category
                    <ArrowRight className="h-4 w-4 text-[#eb690b]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1f3f4] py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-10">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#eb690b]">
                25 years of gas handling experience
              </p>
              <h2 className="mt-4 text-3xl font-black text-[#262f33] md:text-4xl">
                Practical equipment knowledge for utilities, switchgear service, and hydrogen process applications
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#495156]">
                Our product line is presented with the details industrial buyers actually compare: measuring range,
                recovery speed, vacuum level, flow capacity, response time, and configuration suitability for field or
                fixed installation.
              </p>
            </div>
          </div>

          <div className="rounded-sm bg-white p-6 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <ExperiencePoint
                title="Field-oriented product selection"
                body="Service carts, analyzers, monitors, and accessories mapped to practical use scenarios."
              />
              <ExperiencePoint
                title="Visible technical parameters"
                body="Important specifications stay readable in both catalogue lists and detailed product pages."
              />
              <ExperiencePoint
                title="Multi-industry coverage"
                body="Suitable for substations, GIS manufacturing, hydrogen-cooled generators, and gas rooms."
              />
              <ExperiencePoint
                title="Inquiry conversion path"
                body="Catalogue browsing, comparison, product selection, and direct contact work as one continuous flow."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="product-areas" className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-[0.75fr_1fr] md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#eb690b]">Product areas</p>
              <h2 className="mt-4 text-3xl font-black text-[#262f33] md:text-4xl">Gas application areas</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#495156] md:justify-self-end">
              Browse by gas type and connection scope: SF6, alternative insulation gases, hydrogen gas, and valves or
              couplings.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {productAreas.map((area) => (
              <Link
                key={area.title}
                href={area.href}
                className="group overflow-hidden rounded-sm border border-[#d2d3d5] bg-[#f1f3f4] transition hover:-translate-y-1 hover:border-[#eb690b] hover:shadow-xl"
              >
                <div className="flex aspect-[1.25/1] items-center justify-center bg-white p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={area.image} alt={area.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex min-h-[126px] items-center justify-between gap-4 border-t border-[#d2d3d5] bg-white p-5">
                  <h3 className="break-words text-xl font-black leading-tight text-[#262f33] group-hover:text-[#eb690b]">
                    {area.title}
                  </h3>
                  <ArrowRight className="h-6 w-6 shrink-0 text-[#eb690b]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f1f3f4] py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <h2 className="text-center text-3xl font-black text-[#262f33] md:text-4xl">Services for our customers</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <a
                  key={service.title}
                  href={service.href}
                  className="rounded-sm bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <Icon className="h-10 w-10 text-[#eb690b]" />
                  <h3 className="mt-6 text-2xl font-black text-[#262f33]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#495156]">{service.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#262f33]">
                    Open
                    <ArrowRight className="h-4 w-4 text-[#eb690b]" />
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="mailto:sales@sf6relations.com?subject=Catalogue%20Support"
              className="inline-flex h-14 items-center gap-3 rounded-sm bg-[#262f33] px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#495156]"
            >
              Contact SF6 Relations
              <BookOpen className="h-5 w-5 text-[#eb690b]" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-sm border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.18em] text-[#e4e8ec]">{label}</div>
    </div>
  );
}

function ExperiencePoint({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-[#e4e8ec] p-5">
      <h3 className="text-lg font-black text-[#262f33]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#495156]">{body}</p>
    </div>
  );
}

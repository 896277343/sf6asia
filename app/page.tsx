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
    title: "SF6 Gas Handling",
    href: "/productcatalogue/finder?productrange=SF6%20gas",
    image: "https://www.sf6relations.com/wp-content/uploads/2022/09/SF6-Handling-Unit.jpg",
  },
  {
    title: "Hydrogen Equipment",
    href: "/productcatalogue/finder?productrange=Hydrogen",
    image:
      "https://www.sf6relations.com/wp-content/uploads/2024/03/h2-sensor-instrumentation-and-Equipment-1024x589.webp",
  },
  {
    title: "Detection and Monitoring",
    href: "/productcatalogue/finder?productrange=Detection%20and%20monitoring",
    image: "https://www.sf6relations.com/wp-content/uploads/2022/09/PGAS32.png",
  },
  {
    title: "Valves and Couplings",
    href: "/productcatalogue/finder?productrange=Valves%20and%20couplings",
    image:
      "https://www.sf6relations.com/wp-content/uploads/2022/09/refilling-couplings-1-766x1024.jpg",
  },
];

const productWorld = [
  {
    title: "SF6 Gas Equipment",
    body: "Service carts, filling devices, recovery systems, vacuum pump units, and regeneration equipment for switchgear gas handling.",
    href: "/productcatalogue/finder?productrange=SF6%20gas",
    image:
      "https://www.sf6relations.com/wp-content/uploads/2023/02/SF6-Gas-Maintenance-Equipment-Manufacturer-2s.jpg",
  },
  {
    title: "Hydrogen Detection and Analysis",
    body: "Hydrogen sensors, leak detection instruments, purity analyzers, dew point monitoring, and online safety supervision products.",
    href: "/productcatalogue/finder?productrange=Hydrogen",
    image:
      "https://www.sf6relations.com/wp-content/uploads/2024/03/hydrogen-leakage-monitoring-system-and-portable-hydrogen-leak-detector.webp",
  },
  {
    title: "Valves and Couplings",
    body: "Gas connections, refilling couplings, adapters, and supporting accessories for reliable SF6 and industrial gas operations.",
    href: "/productcatalogue/finder?productrange=Valves%20and%20couplings",
    image:
      "https://www.sf6relations.com/wp-content/uploads/2022/09/refilling-couplings-1-766x1024.jpg",
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
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#eb690b]">Our product world</p>
            <h2 className="mt-4 text-3xl font-black text-[#262f33] md:text-4xl">
              Product categories built around your SF6 and hydrogen equipment portfolio
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {productWorld.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-sm border border-[#d2d3d5] bg-[#f1f3f4] transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[1.15/1] overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-[#262f33] group-hover:text-[#eb690b]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#495156]">{item.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#262f33]">
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
          <h2 className="text-center text-3xl font-black text-[#262f33] md:text-4xl">Product areas</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {productAreas.map((area) => (
              <Link
                key={area.title}
                href={area.href}
                className="group rounded-sm border border-[#d2d3d5] bg-[#f1f3f4] p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex aspect-square items-center justify-center bg-white p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={area.image} alt={area.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-black text-[#262f33] group-hover:text-[#eb690b]">{area.title}</h3>
                  <ArrowRight className="h-6 w-6 text-[#eb690b]" />
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

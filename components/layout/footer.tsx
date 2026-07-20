import { Section, Container } from "@/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <Section className="bg-[#262f33] text-white">
        <Container className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">{siteConfig.site_name}</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.sf6relations.com/wp-content/uploads/2022/09/logo-1.ico"
                alt="SF6 Relations Logo"
                className="h-14 w-14"
              />
            </Link>
            <p className="max-w-sm text-[#e4e8ec]">{siteConfig.site_description}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="text-base font-black">Product groups</h5>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Gas%20refilling%20and%20evacuating%20devices">
              Gas refilling and evacuating devices
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Measuring%20devices">
              Measuring devices
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Service%20carts">
              Service carts
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Accessories">
              Accessories
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Hydrogen%20analyzers">
              Hydrogen analyzers
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Hydrogen%20sensors">
              Hydrogen sensors
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Hydrogen%20leakage%20monitoring">
              Hydrogen leakage monitoring
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Hydrogen%20process%20control">
              Hydrogen process control
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Hydrogen%20drying">
              Hydrogen drying
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Hydrogen%20generation">
              Hydrogen generation
            </Link>
            <Link className="text-[#e4e8ec] hover:text-white" href="/productcatalogue/finder?productgroup=Hydrogen%20energy%20storage">
              Hydrogen energy storage
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="text-base font-black">Product range</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="text-[#e4e8ec] hover:text-white"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="text-base font-black">Content</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="text-[#e4e8ec] hover:text-white"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="not-prose flex flex-col justify-between gap-6 border-t border-white/10 text-sm text-[#e4e8ec] md:flex-row md:items-center">
          <p>
            SF6 Relations - No. 101 Yulan Str. High-new Tech Zone Zhengzhou, Henan, China
          </p>
          <p>
            &copy; 2026 {siteConfig.site_name}. All rights reserved.
          </p>
        </Container>
      </Section>
    </footer>
  );
}

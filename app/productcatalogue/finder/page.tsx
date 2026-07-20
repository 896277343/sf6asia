import type { Metadata } from "next";
import { CatalogueApp } from "@/components/catalogue/catalogue-app";

export const metadata: Metadata = {
  title: "Find SF6 and Hydrogen Products | SF6 Relations",
  description:
    "Search and filter SF6 gas handling, hydrogen sensors, hydrogen analyzers, monitoring, regeneration, fittings, and gas safety products.",
};

export default function FinderPage() {
  return (
    <main>
      <section className="bg-[#f1f3f4] py-10">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <nav className="text-sm text-[#495156]">
            <a href="/" className="hover:text-[#eb690b]">Home</a>
            <span className="mx-2 text-[#cbd3da]">/</span>
            <b className="border-l-4 border-[#cbd3da] pl-3 text-[#262f33]">Find product</b>
          </nav>
        </div>
      </section>
      <CatalogueApp />
    </main>
  );
}

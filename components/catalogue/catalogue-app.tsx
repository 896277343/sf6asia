"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  RotateCcw,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import {
  products,
  productGroups,
  productRanges,
  type Product,
} from "@/lib/catalogue-data";
import { getKeySpecEntries } from "@/lib/catalogue-specs";
import { cn } from "@/lib/utils";

type CatalogueAppProps = {
  compact?: boolean;
};

const STORAGE_FAVORITES = "sf6relations:favorites";
const STORAGE_INQUIRY = "sf6relations:inquiry";

export function CatalogueApp({ compact = false }: CatalogueAppProps) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [range, setRange] = useState("All");
  const [group, setGroup] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [inquiry, setInquiry] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readStoredList(STORAGE_FAVORITES));
    setInquiry(readStoredList(STORAGE_INQUIRY));

    const params = new URLSearchParams(window.location.search);
    const productRange = params.get("productrange");
    const productGroup = params.get("productgroup");

    if (productRange && productRanges.includes(productRange)) {
      setRange(productRange);
    }

    if (productGroup && productGroups.includes(productGroup)) {
      setGroup(productGroup);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_INQUIRY, JSON.stringify(inquiry));
  }, [inquiry]);

  const filteredProducts = useMemo(() => {
    const normalized = submittedQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !normalized ||
        [
          product.name,
          product.article,
          product.summary,
          product.range,
          product.group,
          product.application,
          product.badges.join(" "),
          Object.entries(product.specs)
            .map(([key, value]) => `${key} ${value}`)
            .join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      return (
        matchesQuery &&
        (range === "All" || product.range === range) &&
        (group === "All" || product.group === group)
      );
    });
  }, [group, range, submittedQuery]);

  function resetFilters() {
    setQuery("");
    setSubmittedQuery("");
    setRange("All");
    setGroup("All");
  }

  function toggleFavorite(slug: string) {
    setFavorites((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  function toggleInquiry(slug: string) {
    setInquiry((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  const inquiryProducts = products.filter((product) => inquiry.includes(product.slug));

  return (
    <section id="catalogue" className={cn("bg-white", compact ? "py-8" : "py-10 lg:py-14")}>
      <div className="mx-auto max-w-[1580px] px-4 sm:px-6 lg:px-10">
        <div className="border border-[#d8dde0] bg-[#f1f3f4]">
          <div className="grid gap-8 border-b border-[#d8dde0] px-4 py-6 md:px-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#eb690b]">
                Product catalogue
              </p>
              <h1 className="mt-2 text-3xl font-black leading-tight text-[#20282d] md:text-5xl">
                Find product
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4d565b] md:text-base">
                Search SF6 gas handling equipment, hydrogen detection, measuring devices, fittings, and complete
                inquiry-ready product data.
              </p>
            </div>

            <div className="grid grid-cols-3 border border-[#d8dde0] bg-white text-center">
              <Counter label="Found" value={filteredProducts.length} strong />
              <Counter label="Saved" value={favorites.length} />
              <Counter label="Inquiry" value={inquiry.length} />
            </div>
          </div>

          <form
            className="grid gap-3 border-b border-[#d8dde0] bg-white px-4 py-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:px-7"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmittedQuery(query);
            }}
          >
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-wide text-[#4d565b]">
                Search term
              </span>
              <span className="flex h-12 items-center gap-3 border border-[#bfc8ce] bg-white px-4 focus-within:border-[#eb690b]">
                <Search className="h-5 w-5 shrink-0 text-[#4d565b]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-full w-full bg-transparent text-base font-semibold text-[#20282d] outline-none"
                  placeholder="Product number, product name, application, parameter"
                />
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 self-end bg-[#eb690b] px-7 text-sm font-black uppercase text-white transition hover:bg-[#c95608]"
            >
              <Search className="h-4 w-4" />
              Search
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-12 items-center justify-center gap-2 self-end border border-[#20282d] bg-white px-5 text-sm font-black uppercase text-[#20282d] transition hover:bg-[#eef1f2]"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </form>

          <div className="grid gap-4 border-b border-[#d8dde0] px-4 py-4 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end md:px-7">
            <div className="flex items-center gap-2 pb-1 text-sm font-black uppercase tracking-wide text-[#20282d]">
              <SlidersHorizontal className="h-5 w-5 text-[#eb690b]" />
              Filter
            </div>
            <FilterSelect label="Product range" value={range} values={productRanges} onChange={setRange} />
            <FilterSelect label="Product group" value={group} values={productGroups} onChange={setGroup} />
            <InquiryButton inquiryProducts={inquiryProducts} />
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-b border-[#d8dde0] pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#eb690b]">Product overview</p>
            <h2 className="mt-1 text-2xl font-black text-[#20282d]">Products matching your selection</h2>
          </div>
          <p className="text-sm font-semibold text-[#4d565b]">
            {filteredProducts.length} products with visible key parameters
          </p>
        </div>

        <div className="mt-5 grid snap-y snap-mandatory gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              favorite={favorites.includes(product.slug)}
              inInquiry={inquiry.includes(product.slug)}
              onFavorite={() => toggleFavorite(product.slug)}
              onInquiry={() => toggleInquiry(product.slug)}
            />
          ))}
        </div>

        {!filteredProducts.length ? (
          <div className="mt-6 border border-[#d8dde0] bg-[#f1f3f4] p-8 text-center">
            <h3 className="text-xl font-black text-[#20282d]">No matching product found</h3>
            <p className="mt-2 text-sm leading-6 text-[#4d565b]">
              Try a broader product range or search by parameter such as recovery speed, evacuation speed, measuring
              range, accuracy, or pressure.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function readStoredList(key: string) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

function FilterSelect({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wide text-[#4d565b]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full border border-[#bfc8ce] bg-white px-3 text-sm font-bold text-[#20282d] outline-none focus:border-[#eb690b]"
      >
        <option>All</option>
        {values.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}

function Counter({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className="border-r border-[#d8dde0] px-3 py-4 last:border-r-0">
      <div className={cn("text-2xl font-black", strong ? "text-[#eb690b]" : "text-[#20282d]")}>{value}</div>
      <div className="mt-1 text-[11px] font-black uppercase tracking-wide text-[#4d565b]">{label}</div>
    </div>
  );
}

function InquiryButton({ inquiryProducts }: { inquiryProducts: Product[] }) {
  return (
    <a
      href={`mailto:sales@sf6relations.com?subject=SF6%20and%20hydrogen%20equipment%20inquiry&body=${encodeURIComponent(
        inquiryProducts.map((product) => `${product.article} - ${product.name}`).join("\n"),
      )}`}
      className="inline-flex h-12 items-center justify-center gap-2 bg-[#20282d] px-5 text-sm font-black uppercase text-white transition hover:bg-[#4d565b]"
    >
      <ShoppingBag className="h-4 w-4" />
      Inquiry list ({inquiryProducts.length})
    </a>
  );
}

function ProductCard({
  product,
  favorite,
  inInquiry,
  onFavorite,
  onInquiry,
}: {
  product: Product;
  favorite: boolean;
  inInquiry: boolean;
  onFavorite: () => void;
  onInquiry: () => void;
}) {
  const specs = getKeySpecEntries(product, 5);
  const router = useRouter();
  const productHref = `/productcatalogue/article/${product.slug}`;

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => router.push(productHref)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(productHref);
        }
      }}
      className="snap-start cursor-pointer overflow-hidden rounded-[6px] border border-[#d8dde0] bg-white shadow-[0_8px_22px_rgba(32,40,45,0.06)] transition hover:-translate-y-0.5 hover:border-[#eb690b] hover:shadow-[0_14px_30px_rgba(32,40,45,0.12)] focus:outline-none focus:ring-2 focus:ring-[#eb690b] focus:ring-offset-2 md:min-h-0 min-h-[calc(100svh-86px)]"
    >
      <div className="flex h-full flex-col">
        <div className="relative border-b border-[#d8dde0] bg-[#eef2f4] p-2.5">
          <div className="flex h-[29svh] min-h-[176px] max-h-[238px] items-center justify-center rounded-[4px] bg-white p-2 shadow-inner md:h-48 md:max-h-none xl:h-44 2xl:h-[168px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
          </div>
          <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-1.5">
            <span className="rounded-[3px] bg-[#20282d] px-2 py-1 text-[10px] font-black uppercase text-white shadow-sm">
              {product.range}
            </span>
            <span className="rounded-[3px] bg-[#eb690b] px-2 py-1 text-[10px] font-black uppercase text-white shadow-sm">
              {product.article}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="min-h-[90px]">
            <p className="text-xs font-black uppercase tracking-wide text-[#4d565b]">{product.group}</p>
            <h3 className="mt-1 line-clamp-2 text-lg font-black leading-tight text-[#20282d] md:text-xl">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#4d565b]">{product.summary}</p>
          </div>

          <SpecGrid product={product} specs={specs} />

          <ul className="mt-4 grid gap-2">
            {product.highlights.slice(0, 2).map((highlight) => (
              <li key={highlight} className="flex gap-2 text-xs font-semibold leading-5 text-[#20282d]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a2c037]" />
                <span className="line-clamp-2">{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid grid-cols-[42px_42px_minmax(0,1fr)] gap-2 pt-4">
            <IconButton active={favorite} onClick={onFavorite} label="Favorite">
              <Heart className="h-4 w-4" />
            </IconButton>
            <IconButton active={inInquiry} onClick={onInquiry} label="Inquiry">
              <ShoppingBag className="h-4 w-4" />
            </IconButton>
            <Link
              href={productHref}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#20282d] px-4 text-sm font-black text-white transition hover:bg-[#4d565b]"
            >
              Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function SpecGrid({
  product,
  specs,
}: {
  product: Product;
  specs: Array<[string, string]>;
}) {
  if (!specs.length) {
    return (
      <div className="mt-3 rounded-[4px] border border-[#d8dde0] bg-[#f1f3f4] p-3 text-sm font-semibold text-[#4d565b]">
        Technical parameters are available on request.
      </div>
    );
  }

  return (
    <dl className="mt-3 grid grid-cols-2 overflow-hidden rounded-[4px] border border-[#d8dde0]">
      {specs.map(([key, value]) => (
        <div key={`${product.slug}-${key}`} className="min-h-[58px] border-b border-r border-[#e5e9eb] bg-[#fbfcfc] p-2 odd:border-r last:border-b-0">
          <dt className="line-clamp-1 text-[10px] font-black uppercase tracking-wide text-[#4d565b]">{key}</dt>
          <dd className="mt-1 line-clamp-2 text-xs font-black leading-4 text-[#20282d]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function IconButton({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-[4px] border text-[#20282d] transition",
        active
          ? "border-[#eb690b] bg-[#eb690b] text-white"
          : "border-[#bfc8ce] bg-white hover:bg-[#f1f3f4]",
      )}
    >
      {children}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Download, Mail, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductDetailActionsProps = {
  article: string;
  name: string;
  slug: string;
  sourceUrl: string;
};

const STORAGE_INQUIRY = "sf6relations:inquiry";

export function ProductDetailActions({ article, name, slug, sourceUrl }: ProductDetailActionsProps) {
  const [inquiry, setInquiry] = useState<string[]>([]);

  useEffect(() => {
    setInquiry(readStoredList(STORAGE_INQUIRY));
  }, []);

  useEffect(() => {
    writeStoredList(STORAGE_INQUIRY, inquiry);
  }, [inquiry]);

  const inInquiry = inquiry.includes(slug);
  const mailBody = encodeURIComponent(`Product no. ${article} - ${name}\n\nApplication:\nQuantity:\nGas conditions:\n`);

  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-3">
      <button
        type="button"
        onClick={() => setInquiry((current) => toggleStoredItem(current, slug))}
        className={cn(
          "inline-flex h-[52px] min-w-0 items-center justify-center gap-2 rounded-[4px] px-3 text-center text-sm font-black uppercase leading-tight tracking-wide text-white transition",
          inInquiry ? "bg-[#4d565b] hover:bg-[#20282d]" : "bg-[#eb690b] hover:bg-[#c95608]",
        )}
      >
        <ShoppingBag className="h-5 w-5" />
        {inInquiry ? "In inquiry list" : "Add to inquiry"}
      </button>

      <a
        href={sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-[52px] min-w-0 items-center justify-center gap-2 rounded-[4px] border border-[#bfc8ce] bg-white px-3 text-center text-sm font-black uppercase leading-tight tracking-wide text-[#20282d] transition hover:bg-[#eef2f4]"
      >
        <Download className="h-5 w-5" />
        Download data
      </a>

      <a
        href={`mailto:sales@sf6relations.com?subject=${encodeURIComponent(`Product inquiry ${article}`)}&body=${mailBody}`}
        className="inline-flex h-[52px] min-w-0 items-center justify-center gap-2 rounded-[4px] bg-[#20282d] px-3 text-center text-sm font-black uppercase leading-tight tracking-wide text-white transition hover:bg-[#4d565b]"
      >
        <Mail className="h-5 w-5" />
        Contact sales
      </a>
    </div>
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

function writeStoredList(key: string, value: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Some mobile browsers block localStorage in strict privacy modes.
  }
}

function toggleStoredItem(current: string[], slug: string) {
  return current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
}

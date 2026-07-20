"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-[4px] border border-[#d8dde0] bg-[#f8fafb] p-3">
      <div className="flex h-[220px] min-w-0 items-center justify-center rounded-[4px] bg-white p-3 shadow-inner md:h-[260px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt={`${productName} product image ${activeIndex + 1}`}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mt-3 flex max-w-full snap-x gap-3 overflow-x-auto overscroll-x-contain pb-1">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "shrink-0 snap-start rounded-[4px] border bg-white p-2 text-left transition",
              activeIndex === index
                ? "border-[#eb690b] shadow-[0_0_0_2px_rgba(235,105,11,0.18)]"
                : "border-[#d8dde0] hover:border-[#eb690b]",
            )}
          >
            <span className="flex h-20 w-28 items-center justify-center bg-[#f1f3f4] p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="mt-1 block text-center text-[10px] font-black uppercase tracking-wide text-[#4d565b]">
              Image {index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

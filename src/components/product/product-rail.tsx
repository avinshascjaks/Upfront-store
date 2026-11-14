"use client";

import { useRef } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui";
import type { Product } from "@/lib/catalog";

/** Horizontally scrolling product row: swipe on touch, arrows on pointer devices. */
export function ProductRail({ products, label }: { products: Product[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={label}
        className="scrollbar-none flex snap-x snap-mandatory gap-grid overflow-x-auto scroll-px-gutter px-gutter"
      >
        {products.map((p) => (
          <li
            key={p.id}
            className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((100%-3*var(--grid-gap))/4)]"
          >
            <ProductCard product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 42vw, 72vw" />
          </li>
        ))}
      </ul>
      <div className="container-page mt-8 hidden justify-end gap-2 md:flex">
        <Button variant="secondary" size="icon" aria-label="Previous" onClick={() => scroll(-1)}>
          <ArrowRightIcon className="rotate-180" />
        </Button>
        <Button variant="secondary" size="icon" aria-label="Next" onClick={() => scroll(1)}>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}

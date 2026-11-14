"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui";
import type { Size } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductPurchaseProps = {
  productName: string;
  sizes: Size[];
  soldOut: boolean;
};

/** Size selection and add-to-bag. The bag itself is not built yet. */
export function ProductPurchase({ productName, sizes, soldOut }: ProductPurchaseProps) {
  const [size, setSize] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "error" | "info"; text: string } | null>(null);
  const groupId = useId();
  const hasSizes = sizes.length > 0;

  const onAdd = () => {
    if (hasSizes && !size) {
      setStatus({ type: "error", text: "Please select a size." });
      return;
    }
    // TODO: connect to the shopping bag once cart is implemented.
    setStatus({
      type: "info",
      text: `${productName}${size ? `, size ${size}` : ""} selected. The shopping bag is coming soon.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {hasSizes ? (
        <fieldset disabled={soldOut}>
          <legend className="mb-3 type-label">
            Size{size && <span className="ml-2 text-muted">{size}</span>}
          </legend>
          <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-6 md:grid-cols-5 xl:grid-cols-6">
            {sizes.map((s) => {
              const id = `${groupId}-${s.label}`;
              return (
                <div key={s.label}>
                  <input
                    type="radio"
                    id={id}
                    name={groupId}
                    value={s.label}
                    disabled={!s.available}
                    checked={size === s.label}
                    onChange={() => {
                      setSize(s.label);
                      setStatus(null);
                    }}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={id}
                    className={cn(
                      "flex h-11 cursor-pointer items-center justify-center border text-xs transition-colors",
                      "hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper",
                      "peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                      "peer-disabled:cursor-not-allowed peer-disabled:border-line peer-disabled:text-subtle peer-disabled:line-through",
                    )}
                  >
                    {s.label}
                    {!s.available && <span className="sr-only"> (unavailable)</span>}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <p className="type-label">One size</p>
      )}

      <div className="flex flex-col gap-3">
        <Button size="lg" block disabled={soldOut} onClick={onAdd}>
          {soldOut ? "Sold out" : "Add to bag"}
        </Button>
        <p
          role="status"
          className={cn("min-h-5 type-body", status?.type === "error" ? "text-danger" : "text-muted")}
        >
          {status?.text}
        </p>
      </div>
    </div>
  );
}

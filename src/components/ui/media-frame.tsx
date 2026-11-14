import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const ratios = {
  portrait: "aspect-portrait", // product cards (3:4)
  editorial: "aspect-editorial", // campaign tiles (4:5)
  square: "aspect-square",
  hero: "aspect-editorial md:aspect-hero", // tall on mobile, wide on desktop
} as const;

type MediaFrameProps = ComponentPropsWithoutRef<"div"> & {
  ratio?: keyof typeof ratios;
};

/**
 * Fixed-ratio box with a neutral backdrop. Place a `next/image` with
 * `fill` and `className="object-cover"` (or `object-contain` for cut-out
 * product shots) inside.
 */
export function MediaFrame({
  ratio = "portrait",
  className,
  ...props
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface",
        ratios[ratio],
        className,
      )}
      {...props}
    />
  );
}

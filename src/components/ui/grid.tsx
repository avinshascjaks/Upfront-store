import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const layouts = {
  /** Product listing: 2 cols mobile, 3 tablet, 4 desktop, near edge-to-edge */
  products: "grid-cols-2 gap-x-grid gap-y-10 md:grid-cols-3 xl:grid-cols-4 md:gap-y-14",
  /** Editorial tiles: stacked on mobile, side by side from tablet */
  editorial: "grid-cols-1 gap-grid md:grid-cols-2",
  /** Even content columns (footer, feature lists) */
  columns: "grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4",
} as const;

type GridProps = ComponentPropsWithoutRef<"div"> & {
  layout?: keyof typeof layouts;
};

export function Grid({ layout = "products", className, ...props }: GridProps) {
  return <div className={cn("grid", layouts[layout], className)} {...props} />;
}

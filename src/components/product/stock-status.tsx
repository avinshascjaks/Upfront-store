import type { StockState } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const states: Record<StockState, { dot: string; label: (n: number) => string }> = {
  in_stock: { dot: "bg-success", label: () => "In stock" },
  low_stock: { dot: "bg-danger", label: (n) => `Only ${n} left` },
  out_of_stock: { dot: "bg-subtle", label: () => "Sold out" },
};

export function StockStatus({
  state,
  quantity,
  className,
}: {
  state: StockState;
  quantity: number;
  className?: string;
}) {
  const s = states[state];
  return (
    <p className={cn("flex items-center gap-2 type-body", className)}>
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", s.dot)} />
      {s.label(quantity)}
    </p>
  );
}

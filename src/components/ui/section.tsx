import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const spacing = {
  default: "py-section",
  tight: "py-[calc(var(--section)/2)]",
  none: "",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: keyof typeof spacing;
  /** Hairline between stacked sections */
  divided?: boolean;
};

export function Section({
  spacing: s = "default",
  divided = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacing[s], divided && "border-t", className)}
      {...props}
    />
  );
}

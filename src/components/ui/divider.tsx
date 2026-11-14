import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type DividerProps = ComponentPropsWithoutRef<"hr"> & {
  strong?: boolean;
};

export function Divider({ strong = false, className, ...props }: DividerProps) {
  return (
    <hr
      className={cn("border-0 border-t", strong && "border-line-strong", className)}
      {...props}
    />
  );
}

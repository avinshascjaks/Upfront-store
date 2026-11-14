import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  page: "container-page", // 1920px max, product grids / full layouts
  content: "container-content", // 1280px max, general content
  narrow: "container-narrow", // 720px max, copy and forms
  full: "w-full px-gutter", // edge to edge with gutters
  bleed: "w-full", // no gutters, for full-bleed imagery
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizes;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Container<T extends ElementType = "div">({
  as,
  size = "page",
  className,
  ...props
}: ContainerProps<T>) {
  const Comp = as ?? "div";
  return <Comp className={cn(sizes[size], className)} {...props} />;
}

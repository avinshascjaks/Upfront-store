import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const headingSizes = {
  "display-lg": "text-display-lg", // campaign / hero statements
  display: "text-display", // page titles
  "display-sm": "text-display-sm", // section titles
  title: "text-xl leading-tight md:text-2xl", // panels, modals
  label: "type-label", // small uppercase headings (filters, footer columns)
} as const;

type HeadingProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof headingSizes;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Heading<T extends ElementType = "h2">({
  as,
  size = "display-sm",
  className,
  ...props
}: HeadingProps<T>) {
  const Comp = as ?? "h2";
  return <Comp className={cn(headingSizes[size], className)} {...props} />;
}

const textVariants = {
  body: "type-body",
  lead: "type-lead",
  muted: "type-body text-muted",
  label: "type-label",
  caption: "type-caption text-muted",
} as const;

type TextProps<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof textVariants;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: TextProps<T>) {
  const Comp = as ?? "p";
  return <Comp className={cn(textVariants[variant], className)} {...props} />;
}

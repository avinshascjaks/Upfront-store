import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  /** Inline copy: underlined, underline fades on hover */
  inline: "link-underline",
  /** Nav, footer, card titles: underline appears on hover */
  reveal: "link-reveal",
  /** Primary navigation: uppercase tracked label */
  nav: "link-reveal type-label",
  /** Secondary text link that darkens on hover */
  muted: "text-muted transition-colors hover:text-ink",
} as const;

type TextLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: keyof typeof variants;
};

export function TextLink({
  variant = "inline",
  className,
  ...props
}: TextLinkProps) {
  return <Link className={cn(variants[variant], className)} {...props} />;
}

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width (common on mobile and in checkout flows) */
  block?: boolean;
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
  icon: "btn-icon",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  block = false,
}: ButtonStyleProps = {}) {
  return cn(
    "btn",
    `btn-${variant}`,
    // ghost buttons are text-only; size only affects height
    variant === "ghost" && size !== "icon" ? "" : sizeClass[size],
    block && "w-full",
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & ButtonStyleProps;

export function Button({
  variant,
  size,
  block,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, block }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & ButtonStyleProps;

export function ButtonLink({
  variant,
  size,
  block,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonClasses({ variant, size, block }), className)}
      {...props}
    />
  );
}

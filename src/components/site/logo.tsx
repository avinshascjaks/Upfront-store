import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Upfront Store home"
      className={cn(
        "text-base font-medium uppercase tracking-[0.32em] md:text-lg",
        className,
      )}
    >
      Upfront
    </Link>
  );
}

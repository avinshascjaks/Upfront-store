import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom tokens in globals.css so that
// e.g. `text-display` vs `text-sm` and `px-gutter` vs `px-4` dedupe correctly.
const twMerge = extendTailwindMerge<
  "type-style" | "container-style" | "link-style"
>({
  extend: {
    theme: {
      text: ["2xs", "display-sm", "display", "display-lg"],
      spacing: ["gutter", "grid", "section", "header"],
      color: [
        "ink",
        "ink-soft",
        "paper",
        "surface",
        "surface-strong",
        "muted",
        "subtle",
        "line",
        "line-strong",
        "danger",
        "success",
      ],
    },
    classGroups: {
      "type-style": ["type-label", "type-caption", "type-body", "type-lead"],
      "container-style": [
        "container-page",
        "container-content",
        "container-narrow",
        "full-bleed",
      ],
      "link-style": ["link-underline", "link-reveal"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { ReactNode } from "react";
import { PlusIcon } from "@/components/icons";

export type AccordionItem = { title: string; content: ReactNode; defaultOpen?: boolean };

/** Native <details> accordion: no JS, keyboard accessible, one open at a time. */
export function ProductAccordion({ items, name }: { items: AccordionItem[]; name: string }) {
  return (
    <div className="border-t">
      {items.map((item) => (
        <details key={item.title} name={name} open={item.defaultOpen} className="group border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 type-label [&::-webkit-details-marker]:hidden">
            {item.title}
            <PlusIcon className="size-4 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="pb-6 type-body text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

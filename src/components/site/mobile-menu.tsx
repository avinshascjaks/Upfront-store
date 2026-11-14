"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { navigation } from "@/lib/sample-data";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="btn btn-ghost btn-icon -ml-2.5"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav
        id={panelId}
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t bg-paper"
      >
        <ul className="container-page divide-y py-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-4 text-display-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="container-page flex flex-col gap-4 pb-10 pt-6">
          <Link href="/account" className="type-label link-reveal" onClick={() => setOpen(false)}>
            Sign in / Register
          </Link>
          <Link href="/stores" className="type-label link-reveal" onClick={() => setOpen(false)}>
            Find a store
          </Link>
        </div>
      </nav>
    </div>
  );
}

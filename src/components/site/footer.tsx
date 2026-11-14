import Link from "next/link";
import { footerColumns } from "@/lib/sample-data";
import { Logo } from "./logo";

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-section md:grid-cols-4">
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h2 className="type-label mb-5">{col.title}</h2>
            <ul className="space-y-3">
              {col.links.map((label) => (
                <li key={label}>
                  <Link href={`/${slug(label)}`} className="text-muted transition-colors hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="type-label mb-5">Follow</h2>
          <ul className="space-y-3">
            {["Instagram", "Pinterest", "YouTube"].map((label) => (
              <li key={label}>
                <a href="#" className="text-muted transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
          <Logo />
          <p className="type-caption text-muted">United States · USD $</p>
          <p className="type-caption text-muted">© 2026 Upfront Store</p>
        </div>
      </div>
    </footer>
  );
}

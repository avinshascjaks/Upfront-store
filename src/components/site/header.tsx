import Link from "next/link";
import { BagIcon, SearchIcon, UserIcon } from "@/components/icons";
import { navigation } from "@/lib/sample-data";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <>
      <p className="bg-ink px-gutter py-2 text-center type-caption text-paper">
        Complimentary shipping and returns on all orders
      </p>
      <header className="sticky top-0 z-50 border-b bg-paper/95 backdrop-blur-sm">
        <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <MobileMenu />
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex gap-6 xl:gap-8">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-reveal type-label">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Logo />

          <div className="-mr-2.5 flex items-center justify-end">
            <Link href="/search" aria-label="Search" className="btn btn-ghost btn-icon">
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="btn btn-ghost btn-icon hidden sm:inline-flex"
            >
              <UserIcon />
            </Link>
            <Link href="/bag" aria-label="Shopping bag, 0 items" className="btn btn-ghost btn-icon">
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

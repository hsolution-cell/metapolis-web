"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EN_NAV } from "@/data/en/navigation";

export default function EnHeader() {
  const pathname = usePathname();

  const isCurrent = (href: string) =>
    href === "/en" ? pathname === "/en" : pathname?.startsWith(href);

  return (
    <header className="en-header">
      <div className="en-header__inner">
        <Link href="/en" className="en-header__logo" aria-label="METAPOLIS">
          <img src="/img/logo_metapolis.svg" alt="METAPOLIS" />
        </Link>

        <nav className="en-nav" aria-label="Main menu">
          {EN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isCurrent(item.href) ? "is-current" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="en-header__right">
          <div className="en-lang">
            {/* KOR로 전환 시 국문 홈으로 이동 */}
            <Link href="/" data-lang="kor">
              KOR
            </Link>
            <span className="en-lang__sep" aria-hidden="true">
              |
            </span>
            <button type="button" className="is-active" aria-current="true" data-lang="eng">
              ENG
            </button>
          </div>
          <button type="button" className="en-search-btn" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className="en-menu-btn" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

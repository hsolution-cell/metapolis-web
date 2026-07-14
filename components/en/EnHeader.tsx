"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EN_NAV, EN_SEARCH_TAGS } from "@/data/en/navigation";
import { useHeaderMenu } from "@/hooks/useHeaderMenu";
import HeaderSearchResults from "@/components/layout/HeaderSearchResults";

export default function EnHeader() {
  const router = useRouter();
  const {
    headerClass,
    mobileOpen,
    searchOpen,
    searchQuery,
    searchInputRef,
    openMobileMenu,
    closeMobileMenu,
    toggleSearch,
    handleSearchSubmit,
    handleSearchTag,
    closeSearch,
    setSearchQuery,
    isCurrentLink,
  } = useHeaderMenu();

  return (
    <>
      <div className={`hidden_bg${mobileOpen ? " on" : ""}`}>
        <div className="hidden_menu">
          <div className="hidden_top">
            <div className="hidden_top_bar">
              <button
                type="button"
                className="close_menu"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <span />
                <span />
              </button>
            </div>
            <ul className="hidden_gnb hidden_gnb--en">
              {EN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isCurrentLink(item.href) ? "is-current" : undefined}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <header className={headerClass || undefined}>
        <div className="header_bar">
          <div className="header_inner">
            <div className="h_logo">
              <Link href="/en">
                <img src="/img/logo_metapolis.svg" alt="METAPOLIS MALL" className="h_logo_icon" />
              </Link>
            </div>

            <nav className="header_menu en-gnb" aria-label="Main menu">
              <ul className="gnb">
                {EN_NAV.map((item) => (
                  <li key={item.href} className={isCurrentLink(item.href) ? "is-active" : undefined}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="h_right">
              <div className="h_lang">
                <button type="button" data-lang="kor" onClick={() => router.push("/")}>
                  KOR
                </button>
                <span className="h_lang_sep" aria-hidden="true">
                  |
                </span>
                <button type="button" className="is-active" aria-current="true" data-lang="eng">
                  ENG
                </button>
              </div>
              <button
                type="button"
                className="h_search_btn"
                aria-label="Search"
                aria-expanded={searchOpen}
                aria-controls="enHeaderSearchPanel"
                onClick={toggleSearch}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <button
                className="open_menu"
                type="button"
                aria-label="Open menu"
                onClick={openMobileMenu}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        <div
          className="header_search_wrap"
          id="enHeaderSearchPanel"
          hidden={!searchOpen ? true : undefined}
        >
          <div className="header_search_inner">
            <form className="header_search_form" role="search" onSubmit={handleSearchSubmit}>
              <label className="sr_only" htmlFor="enHeaderSearchInput">
                Store search
              </label>
              <input
                ref={searchInputRef}
                type="search"
                id="enHeaderSearchInput"
                name="q"
                className="header_search_input"
                placeholder="Looking for a store?"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="header_search_submit" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </form>
            <HeaderSearchResults query={searchQuery} onSelect={closeSearch} />
            <ul className="header_search_tags" aria-label="Suggested keywords">
              {EN_SEARCH_TAGS.map((keyword) => (
                <li key={keyword}>
                  <button
                    type="button"
                    className="header_search_tag"
                    onClick={() => handleSearchTag(keyword)}
                  >
                    #{keyword}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

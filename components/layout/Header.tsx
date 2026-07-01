"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SEARCH_TAGS } from "@/data/navigation";
import { useHeaderMenu } from "@/hooks/useHeaderMenu";
import HeaderSearchResults from "@/components/layout/HeaderSearchResults";
import EnHeader from "@/components/en/EnHeader";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    GNB_GROUPS,
    activeGnbIndex,
    headerClass,
    mobileOpen,
    mobileAccordion,
    searchOpen,
    hoverIndex,
    searchQuery,
    searchInputRef,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileAccordion,
    toggleSearch,
    handleGnbEnter,
    handleMegaColEnter,
    handleMenuEnter,
    closeMega,
    cancelCloseMega,
    handleSearchSubmit,
    handleSearchTag,
    closeSearch,
    setSearchQuery,
    isCurrentLink,
  } = useHeaderMenu();

  // 영문 경로에서는 EN 전용 헤더를 렌더
  if (pathname?.startsWith("/en")) {
    return <EnHeader />;
  }

  return (
    <>
      <div className={`hidden_bg${mobileOpen ? " on" : ""}`}>
        <div className="hidden_menu">
          <div className="hidden_top">
            <div className="hidden_top_bar">
              <button
                type="button"
                className="close_menu"
                aria-label="메뉴 닫기"
                onClick={closeMobileMenu}
              >
                <span />
                <span />
              </button>
            </div>
            <ul className="hidden_gnb">
              {GNB_GROUPS.map((group, gi) => (
                <li key={group.label} className={mobileAccordion === gi ? "on" : undefined}>
                  <a
                    href="#"
                    className={mobileAccordion === gi ? "on" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMobileAccordion(gi);
                    }}
                  >
                    {group.label}
                  </a>
                  <ul className="top_0">
                    {group.items.map((item) => (
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
              <Link href="/">
                <img
                  src="/img/logo_metapolis.svg"
                  alt="METAPOLIS"
                  className="h_logo_icon"
                />
              </Link>
            </div>

            <nav
              className="header_menu"
              aria-label="주요 메뉴"
              onMouseEnter={handleMenuEnter}
              onMouseLeave={closeMega}
            >
              <ul className="gnb">
                {GNB_GROUPS.map((group, index) => (
                  <li
                    key={group.label}
                    className={[
                      activeGnbIndex === index ? "is-active" : "",
                      hoverIndex === index ? "is-hover" : "",
                    ]
                      .filter(Boolean)
                      .join(" ") || undefined}
                    onMouseEnter={() => handleGnbEnter(index)}
                  >
                    <Link href={group.href}>{group.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="h_right">
              <div className="h_lang">
                <button type="button" className="is-active" aria-current="true" data-lang="kor">
                  KOR
                </button>
                <span className="h_lang_sep" aria-hidden="true">
                  |
                </span>
                <button type="button" data-lang="eng" onClick={() => router.push("/en")}>
                  ENG
                </button>
              </div>
              <button
                type="button"
                className="h_search_btn"
                aria-label="검색"
                aria-expanded={searchOpen}
                aria-controls="headerSearchPanel"
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
                aria-label="메뉴 열기"
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
          className="gnb_mega_wrap"
          onMouseEnter={cancelCloseMega}
          onMouseLeave={closeMega}
        >
          <div className="gnb_mega_bg" aria-hidden="true" />
          <div className="gnb_mega_inner">
            <div className="gnb_mega_panel">
              {GNB_GROUPS.map((group, index) => (
                <div
                  key={group.label}
                  className="mega_col"
                  data-col={index + 1}
                  onMouseEnter={() => handleMegaColEnter(index)}
                >
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={isCurrentLink(item.href) ? "is-current" : undefined}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="header_search_wrap"
          id="headerSearchPanel"
          hidden={!searchOpen ? true : undefined}
        >
          <div className="header_search_inner">
            <form className="header_search_form" role="search" onSubmit={handleSearchSubmit}>
              <label className="sr_only" htmlFor="headerSearchInput">
                매장 검색
              </label>
              <input
                ref={searchInputRef}
                type="search"
                id="headerSearchInput"
                name="q"
                className="header_search_input"
                placeholder="찾으시는 매장이 있으신가요?"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="header_search_submit" aria-label="검색">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </form>
            <HeaderSearchResults query={searchQuery} onSelect={closeSearch} />
            <ul className="header_search_tags" aria-label="추천 검색어">
              {SEARCH_TAGS.map((keyword) => (
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

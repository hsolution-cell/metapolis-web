"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function QuickMenu() {
  const pathname = usePathname();

  // 관리자 페이지에서는 퀵메뉴 미노출
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // 영문 페이지에서는 영문 문구·링크 사용
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");
  const t = isEn
    ? {
        searchTitle: "Store Search",
        searchDesc: "Find a store",
        // 영문 검색 페이지가 없어 검색바가 있는 층별안내로 연결
        searchHref: "/en/floors",
        inquiryTitle: "Contact Us",
        locationTitle: "Location",
        locationDesc: "METAPOLIS MALL",
        locationHref: "/en/location",
        topLabel: "Back to top",
      }
    : {
        searchTitle: "매장검색",
        searchDesc: "찾으시는 매장 검색",
        searchHref: "/stores/search",
        inquiryTitle: "빠른 문의",
        locationTitle: "위치 안내",
        locationDesc: "동탄중앙로 220·200",
        locationHref: "/location",
        topLabel: "맨 위로",
      };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside className="quick">
      <ul className="quick_list">
        <li className="quick_item quick_item--expand">
          <Link href={t.searchHref} className="quick_link">
            <span className="quick_icon quick_icon--gold" aria-hidden="true">
              <img src="/img/quick_icon_search.svg" alt="" />
            </span>
            <span className="quick_body">
              <span className="quick_title">{t.searchTitle}</span>
              <span className="quick_desc">{t.searchDesc}</span>
            </span>
            <span className="quick_arrow" aria-hidden="true">
              <img src="/img/quick_icon_arrow.svg" alt="" />
            </span>
          </Link>
        </li>
        <li className="quick_item quick_item--expand">
          <a href="tel:031-371-7000" className="quick_link">
            <span className="quick_icon quick_icon--gold" aria-hidden="true">
              <img src="/img/quick_icon_inquiry.svg" alt="" />
            </span>
            <span className="quick_body">
              <span className="quick_title">{t.inquiryTitle}</span>
              <span className="quick_desc">031-371-7000</span>
            </span>
            <span className="quick_arrow" aria-hidden="true">
              <img src="/img/quick_icon_arrow.svg" alt="" />
            </span>
          </a>
        </li>
        <li className="quick_item quick_item--expand">
          <Link href={t.locationHref} className="quick_link">
            <span className="quick_icon quick_icon--gold" aria-hidden="true">
              <img src="/img/quick_icon_location.svg" alt="" />
            </span>
            <span className="quick_body">
              <span className="quick_title">{t.locationTitle}</span>
              <span className="quick_desc">{t.locationDesc}</span>
            </span>
            <span className="quick_arrow" aria-hidden="true">
              <img src="/img/quick_icon_arrow.svg" alt="" />
            </span>
          </Link>
        </li>
        <li className="quick_item quick_item--top">
          <a href="#" className="quick_link totop" aria-label={t.topLabel} onClick={scrollToTop}>
            <span className="quick_icon quick_icon--dark" aria-hidden="true">
              <img src="/img/quick_icon_top.svg" alt="" />
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

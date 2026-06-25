"use client";

import Link from "next/link";

export default function QuickMenu() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside className="quick">
      <ul className="quick_list">
        <li className="quick_item quick_item--expand">
          <a href="tel:031-371-7000" className="quick_link">
            <span className="quick_icon quick_icon--gold" aria-hidden="true">
              <img src="/img/quick_icon_inquiry.svg" alt="" />
            </span>
            <span className="quick_body">
              <span className="quick_title">빠른 문의</span>
              <span className="quick_desc">031-371-7000</span>
            </span>
            <span className="quick_arrow" aria-hidden="true">
              <img src="/img/quick_icon_arrow.svg" alt="" />
            </span>
          </a>
        </li>
        <li className="quick_item quick_item--expand">
          <Link href="/location" className="quick_link">
            <span className="quick_icon quick_icon--gold" aria-hidden="true">
              <img src="/img/quick_icon_location.svg" alt="" />
            </span>
            <span className="quick_body">
              <span className="quick_title">위치 안내</span>
              <span className="quick_desc">동탄중앙로 220</span>
            </span>
            <span className="quick_arrow" aria-hidden="true">
              <img src="/img/quick_icon_arrow.svg" alt="" />
            </span>
          </Link>
        </li>
        <li className="quick_item quick_item--top">
          <a href="#" className="quick_link totop" aria-label="맨 위로" onClick={scrollToTop}>
            <span className="quick_icon quick_icon--dark" aria-hidden="true">
              <img src="/img/quick_icon_top.svg" alt="" />
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

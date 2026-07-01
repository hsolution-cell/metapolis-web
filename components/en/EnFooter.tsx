"use client";

import Link from "next/link";
import { EN_FOOTER_LINKS } from "@/data/en/navigation";

export default function EnFooter() {
  return (
    <footer className="en-footer">
      <div className="en-footer__inner">
        <Link href="/en" className="en-footer__logo" aria-label="METAPOLIS">
          <img src="/img/logo_footer.svg" alt="METAPOLIS" />
        </Link>

        <div className="en-footer__mid">
          <ul className="en-footer__nav">
            {EN_FOOTER_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <p className="en-footer__copy">&copy; 2026 METAPOLIS. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="en-footer__divider" />

        <div className="en-footer__bottom">
          <p className="en-footer__info">
            220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do
            <span className="sep">|</span>TEL 031-371-7000
            <span className="sep">|</span>FAX 031-613-2891
          </p>
          <div className="en-footer__lang">
            <Link href="/" data-lang="kor">
              KOR
            </Link>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <button type="button" className="is-active" aria-current="true" data-lang="eng">
              ENG
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useToast } from "@/contexts/ToastContext";

export default function Footer() {
  const { showToast } = useToast();

  return (
    <footer>
      <div className="content_inner">
        <div className="f_top">
          <Link href="/" className="f_logo">
            <img src="/img/logo_footer.svg" alt="METAPOLIS" />
          </Link>
        </div>

        <div className="f_mid">
          <ul className="f_nav">
            <li>
              <Link href="/support/inquiry">입점문의</Link>
            </li>
            <li>
              <Link href="/support/inquiry">대관문의</Link>
            </li>
            <li>
              <Link href="/terms">이용약관</Link>
            </li>
            <li>
              <Link href="/privacy">개인정보처리방침</Link>
            </li>
            <li>
              <Link href="/sitemap">사이트맵</Link>
            </li>
          </ul>
          <div className="f_lang">
            <button type="button" className="is-active" aria-current="true" data-lang="kor">
              KOR
            </button>
            <span className="f_dot" aria-hidden="true">
              ·
            </span>
            <button
              type="button"
              data-lang="eng"
              onClick={(e) => {
                e.preventDefault();
                showToast("영문 버전은 준비 중입니다.");
              }}
            >
              ENG
            </button>
          </div>
        </div>

        <div className="f_divider" />

        <div className="f_bottom">
          <p className="f_info">
            경기 화성시 동탄중앙로 220 <span className="f_sep">|</span>
            TEL 031-371-7000 <span className="f_sep">|</span>
            FAX 031-613-2891
          </p>
          <p className="f_copy">&copy; 2026 METAPOLIS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}

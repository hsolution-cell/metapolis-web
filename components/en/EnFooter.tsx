"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EnFooter() {
  const router = useRouter();

  return (
    <footer className="en-footer">
      <div className="content_inner">
        <div className="f_top">
          <Link href="/en" className="f_logo">
            <img src="/img/logo_footer.svg" alt="METAPOLIS MALL" />
          </Link>
        </div>

        {/* 1행: 주소(좌) ↔ FAX · TEL(우) */}
        <div className="f_mid">
          <p className="f_info">
            220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do
          </p>
          <p className="f_contact">
            FAX 031-613-2891 <span className="f_sep">|</span> TEL 031-371-7000
          </p>
        </div>

        <div className="f_divider" />

        {/* 2행: 저작권(좌) ↔ KOR · ENG(우) */}
        <div className="f_bottom">
          <p className="f_copy">&copy; 2026 METAPOLIS MALL. ALL RIGHTS RESERVED.</p>
          <div className="f_lang">
            <button type="button" data-lang="kor" onClick={() => router.push("/")}>
              KOR
            </button>
            <span className="f_dot" aria-hidden="true">
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

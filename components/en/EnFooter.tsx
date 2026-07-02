"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EnFooter() {
  const router = useRouter();

  return (
    <footer>
      <div className="content_inner">
        <div className="f_top">
          <Link href="/en" className="f_logo">
            <img src="/img/logo_footer.svg" alt="METAPOLIS" />
          </Link>
        </div>

        <div className="f_mid">
          {/* 영문 푸터에서는 링크(입점문의·대관문의·이용약관·개인정보처리방침·사이트맵) 미노출.
              레이아웃은 국문과 동일하게 유지하기 위해 빈 자리(ul)만 둠 → KOR·ENG는 우측 정렬 */}
          <ul className="f_nav" aria-hidden="true" />
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

        <div className="f_divider" />

        <div className="f_bottom">
          <p className="f_info">
            220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do <span className="f_sep">|</span>
            TEL 031-371-7000 <span className="f_sep">|</span>
            FAX 031-613-2891
          </p>
          <p className="f_copy">&copy; 2026 METAPOLIS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}

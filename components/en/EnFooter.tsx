"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EN_FOOTER_LINKS } from "@/data/en/navigation";

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
          <ul className="f_nav">
            {EN_FOOTER_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
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

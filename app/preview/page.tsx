import Link from "next/link";
import type { Metadata } from "next";
import { MOCKUP_PAGES, getPageMeta } from "@/data/siteMeta";

const meta = getPageMeta("/preview");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: { index: false, follow: false },
};

type PreviewLink = {
  href: string;
  label: string;
  legacy: string;
};

const GROUPS: { title: string; links: PreviewLink[] }[] = [
  { title: "메인", links: [{ href: "/", label: "메인 페이지", legacy: "index.html" }] },
  {
    title: "메타폴리스",
    links: MOCKUP_PAGES.slice(0, 4).map((p) => ({ href: p.path, label: p.label, legacy: `${p.legacy}.html` })),
  },
  {
    title: "매장안내",
    links: MOCKUP_PAGES.slice(4, 8).map((p) => ({ href: p.path, label: p.label, legacy: `${p.legacy}.html` })),
  },
  {
    title: "이벤트",
    links: MOCKUP_PAGES.slice(8, 11).map((p) => ({ href: p.path, label: p.label, legacy: `${p.legacy}.html` })),
  },
  {
    title: "고객센터",
    links: MOCKUP_PAGES.slice(11, 14).map((p) => ({ href: p.path, label: p.label, legacy: `${p.legacy}.html` })),
  },
];

export default function PreviewPage() {
  return (
    <div className="preview_wrap">
      <div className="preview_head">
        <h1>METAPOLIS 페이지 시안 미리보기</h1>
        <p>
          각 링크는 헤더·푸터가 적용된 상태에서 해당 페이지 통이미지 시안을 확인할 수 있습니다. 시안
          이미지는 <code>public/img/sub/</code> 폴더에 넣어 주세요.
        </p>
      </div>

      {GROUPS.map((group) => (
        <section key={group.title} className="preview_group">
          <h2>{group.title}</h2>
          <ul className="preview_list">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.label}
                  <span>{link.legacy}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

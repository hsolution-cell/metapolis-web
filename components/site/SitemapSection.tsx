import Link from "next/link";
import { GNB_GROUPS } from "@/data/navigation";

const EXTRA_LINKS: Record<string, { label: string; href: string }[]> = {
  매장안내: [{ label: "매장 검색", href: "/stores/search" }],
};

const LEGAL_LINKS = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
];

export default function SitemapSection() {
  return (
    <>
      <div className="header_container" />
      <section className="site_page page site_sitemap">
        <div className="content_inner innerTop innerBot">
          <div className="site_sitemap_head">
            <h2 className="site_page_title">사이트맵</h2>
            <p className="site_sitemap_desc">
              메타폴리스 홈페이지의 전체 메뉴를 한눈에 확인하실 수 있습니다.
            </p>
          </div>

          <div className="site_sitemap_main">
            <Link href="/" className="site_sitemap_home">
              <span className="site_sitemap_home_label">메인 페이지</span>
              <span className="site_sitemap_home_path">/</span>
            </Link>
          </div>

          <div className="site_sitemap_grid">
            {GNB_GROUPS.map((group) => {
              const items = [...group.items, ...(EXTRA_LINKS[group.label] ?? [])];

              return (
                <article key={group.label} className="site_sitemap_group">
                  <h3 className="site_sitemap_group_title">
                    <Link href={group.href}>{group.label}</Link>
                  </h3>
                  <ul className="site_sitemap_list">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="site_sitemap_legal">
            <h3 className="site_sitemap_legal_title">정책 및 약관</h3>
            <ul className="site_sitemap_legal_list">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

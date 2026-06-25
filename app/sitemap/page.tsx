import Link from "next/link";
import type { Metadata } from "next";
import { GNB_GROUPS } from "@/data/navigation";
import { getPageMeta } from "@/data/siteMeta";

const meta = getPageMeta("/sitemap");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function SitemapPage() {
  return (
    <>
      <div className="header_container" />
      <section className="site_page page">
        <div className="content_inner innerTop innerBot">
          <h2 className="site_page_title">사이트맵</h2>
          <div className="sub_placeholder">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "1rem" }}>
                <Link href="/">메인 페이지</Link>
              </li>
              {GNB_GROUPS.map((group) => (
                <li key={group.label} style={{ marginBottom: "1.5rem" }}>
                  <strong>{group.label}</strong>
                  <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
                    {group.items.map((item) => (
                      <li key={item.href} style={{ marginBottom: "0.25rem" }}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li style={{ marginTop: "1.5rem" }}>
                <Link href="/privacy">개인정보처리방침</Link>
                {" · "}
                <Link href="/terms">이용약관</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

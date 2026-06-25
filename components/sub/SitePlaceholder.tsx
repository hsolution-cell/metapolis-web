import type { Metadata } from "next";
import { getPageMeta } from "@/data/siteMeta";

type SitePlaceholderProps = {
  title: string;
  path: string;
};

export function buildSiteMetadata({ path, title }: SitePlaceholderProps): Metadata {
  const meta = getPageMeta(path);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description },
  };
}

export default function SitePlaceholder({ title }: Pick<SitePlaceholderProps, "title">) {
  return (
    <>
      <div className="header_container" />
      <section className="site_page page">
        <div className="content_inner innerTop innerBot">
          <h2 className="site_page_title">{title}</h2>
          <div className="sub_placeholder">
            <p>콘텐츠 준비 중입니다.</p>
          </div>
        </div>
      </section>
    </>
  );
}

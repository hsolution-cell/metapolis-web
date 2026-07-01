import SitemapSection from "@/components/site/SitemapSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/sitemap" });

export default function SitemapPage() {
  return <SitemapSection />;
}

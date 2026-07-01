import TermsSection from "@/components/site/TermsSection";
import { buildSiteMetadata } from "@/components/sub/SitePlaceholder";

export const metadata = buildSiteMetadata({ path: "/terms", title: "이용약관" });

export default function TermsPage() {
  return <TermsSection />;
}

import SitePlaceholder, { buildSiteMetadata } from "@/components/sub/SitePlaceholder";

export const metadata = buildSiteMetadata({ path: "/privacy", title: "개인정보처리방침" });

export default function PrivacyPage() {
  return <SitePlaceholder title="개인정보처리방침" />;
}

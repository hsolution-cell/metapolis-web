import TermsSection from "@/components/site/TermsSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/terms" });

export default function TermsPage() {
  return <TermsSection />;
}

import PrivacySection from "@/components/site/PrivacySection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/privacy" });

export default function PrivacyPage() {
  return <PrivacySection />;
}

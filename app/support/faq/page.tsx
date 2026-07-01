import SubPageLayout from "@/components/sub/SubPageLayout";
import FaqSection from "@/components/sub/faq/FaqSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/support/faq" });

export default function Page() {
  return (
    <SubPageLayout path="/support/faq" className="faq">
      <FaqSection />
    </SubPageLayout>
  );
}

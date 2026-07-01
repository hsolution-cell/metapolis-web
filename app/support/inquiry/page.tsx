import SubPageLayout from "@/components/sub/SubPageLayout";
import InquirySection from "@/components/sub/inquiry/InquirySection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/support/inquiry" });

export default function Page() {
  return (
    <SubPageLayout path="/support/inquiry" className="inquiry">
      <InquirySection />
    </SubPageLayout>
  );
}

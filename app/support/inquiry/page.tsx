import SubPageLayout from "@/components/sub/SubPageLayout";
import InquirySection from "@/components/sub/inquiry/InquirySection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({
  path: "/support/inquiry",
  label: "문의하기",
});

export default function Page() {
  return (
    <SubPageLayout path="/support/inquiry" className="inquiry">
      <InquirySection />
    </SubPageLayout>
  );
}

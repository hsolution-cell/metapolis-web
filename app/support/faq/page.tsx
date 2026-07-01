import SubPageLayout from "@/components/sub/SubPageLayout";
import FaqSection from "@/components/sub/faq/FaqSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({
  path: "/support/faq",
  label: "자주 묻는 질문",
});

export default function Page() {
  return (
    <SubPageLayout path="/support/faq" className="faq">
      <FaqSection />
    </SubPageLayout>
  );
}

import SubPageLayout from "@/components/sub/SubPageLayout";
import NoticesSection from "@/components/sub/notices/NoticesSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({
  path: "/support/notices",
  label: "고객알림",
});

export default function Page() {
  return (
    <SubPageLayout path="/support/notices" className="notices">
      <NoticesSection />
    </SubPageLayout>
  );
}

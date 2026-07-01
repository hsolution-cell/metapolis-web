import SubPageLayout from "@/components/sub/SubPageLayout";
import NoticesSection from "@/components/sub/notices/NoticesSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/support/notices" });

export default function Page() {
  return (
    <SubPageLayout path="/support/notices" className="notices">
      <NoticesSection />
    </SubPageLayout>
  );
}

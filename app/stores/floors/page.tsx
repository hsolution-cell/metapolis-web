import SubPageLayout from "@/components/sub/SubPageLayout";
import FloorsSection from "@/components/sub/floors/FloorsSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores/floors", label: "층별안내" });

export default function Page() {
  return (
    <SubPageLayout path="/stores/floors" className="floors">
      <FloorsSection />
    </SubPageLayout>
  );
}

import SubPageLayout from "@/components/sub/SubPageLayout";
import StoresSection from "@/components/sub/stores/StoresSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores", label: "주요매장" });

export default function Page() {
  return (
    <SubPageLayout path="/stores" className="stores">
      <StoresSection />
    </SubPageLayout>
  );
}

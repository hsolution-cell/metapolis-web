import SubPageLayout from "@/components/sub/SubPageLayout";
import FacilitiesSection from "@/components/sub/facilities/FacilitiesSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores/facilities", label: "편의시설" });

export default function Page() {
  return (
    <SubPageLayout path="/stores/facilities" className="facilities">
      <FacilitiesSection />
    </SubPageLayout>
  );
}

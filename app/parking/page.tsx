import SubPageLayout from "@/components/sub/SubPageLayout";
import ParkingSection from "@/components/sub/parking/ParkingSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/parking", label: "주차안내" });

export default function Page() {
  return (
    <SubPageLayout path="/parking" className="parking">
      <ParkingSection />
    </SubPageLayout>
  );
}

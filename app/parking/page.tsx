import SubPageLayout from "@/components/sub/SubPageLayout";
import ParkingSection from "@/components/sub/parking/ParkingSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/parking" });

export default function Page() {
  return (
    <SubPageLayout path="/parking" className="parking">
      <ParkingSection />
    </SubPageLayout>
  );
}

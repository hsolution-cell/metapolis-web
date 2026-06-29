import SubPageLayout from "@/components/sub/SubPageLayout";
import LocationSection from "@/components/sub/location/LocationSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/location", label: "오시는 길" });

export default function Page() {
  return (
    <SubPageLayout path="/location" className="location">
      <LocationSection />
    </SubPageLayout>
  );
}

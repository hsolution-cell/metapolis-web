import SubPageLayout from "@/components/sub/SubPageLayout";
import LocationSection from "@/components/sub/location/LocationSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/location" });

export default function Page() {
  return (
    <SubPageLayout path="/location" className="location">
      <LocationSection />
    </SubPageLayout>
  );
}

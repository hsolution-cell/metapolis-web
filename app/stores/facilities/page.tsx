import SubPageLayout from "@/components/sub/SubPageLayout";
import FacilitiesSection from "@/components/sub/facilities/FacilitiesSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/stores/facilities" });

export default function Page() {
  return (
    <SubPageLayout path="/stores/facilities" className="facilities">
      <FacilitiesSection />
    </SubPageLayout>
  );
}

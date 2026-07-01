import SubPageLayout from "@/components/sub/SubPageLayout";
import HoursSection from "@/components/sub/hours/HoursSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/hours" });

export default function Page() {
  return (
    <SubPageLayout path="/hours" className="hours">
      <HoursSection />
    </SubPageLayout>
  );
}

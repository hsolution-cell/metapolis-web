import SubPageLayout from "@/components/sub/SubPageLayout";
import HoursSection from "@/components/sub/hours/HoursSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/hours", label: "영업시간" });

export default function Page() {
  return (
    <SubPageLayout path="/hours" className="hours">
      <HoursSection />
    </SubPageLayout>
  );
}

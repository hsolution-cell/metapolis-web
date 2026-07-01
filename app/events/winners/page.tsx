import SubPageLayout from "@/components/sub/SubPageLayout";
import WinnersSection from "@/components/sub/winners/WinnersSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({
  path: "/events/winners",
  label: "당첨자 발표",
});

export default function Page() {
  return (
    <SubPageLayout path="/events/winners" className="winners">
      <WinnersSection />
    </SubPageLayout>
  );
}

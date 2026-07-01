import SubPageLayout from "@/components/sub/SubPageLayout";
import WinnersSection from "@/components/sub/winners/WinnersSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/events/winners" });

export default function Page() {
  return (
    <SubPageLayout path="/events/winners" className="winners">
      <WinnersSection />
    </SubPageLayout>
  );
}

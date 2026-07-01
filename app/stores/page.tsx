import SubPageLayout from "@/components/sub/SubPageLayout";
import StoresSection from "@/components/sub/stores/StoresSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/stores" });

export default function Page() {
  return (
    <SubPageLayout path="/stores" className="stores">
      <StoresSection />
    </SubPageLayout>
  );
}

import { Suspense } from "react";
import SubPageLayout from "@/components/sub/SubPageLayout";
import StoreSearchSection from "@/components/sub/stores/StoreSearchSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({
  path: "/stores/floors",
  label: "매장 검색",
});

export default function Page() {
  return (
    <SubPageLayout path="/stores/floors" className="floors store_search">
      <Suspense fallback={null}>
        <StoreSearchSection />
      </Suspense>
    </SubPageLayout>
  );
}

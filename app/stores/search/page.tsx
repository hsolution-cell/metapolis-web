import { Suspense } from "react";
import SubPageLayout from "@/components/sub/SubPageLayout";
import StoreSearchSection from "@/components/sub/stores/StoreSearchSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/stores/search" });

export default function Page() {
  return (
    <SubPageLayout path="/stores/floors" className="floors store_search">
      <Suspense fallback={null}>
        <StoreSearchSection />
      </Suspense>
    </SubPageLayout>
  );
}

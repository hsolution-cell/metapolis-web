import SubPageLayout from "@/components/sub/SubPageLayout";
import CategoriesSection from "@/components/sub/categories/CategoriesSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { listStores } from "@/lib/stores-db";
import { getOngoingStoreEventLinks } from "@/lib/store-events-db";

export const metadata = buildPageMetadata({ path: "/stores/categories" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const [stores, ongoing] = await Promise.all([
    listStores(),
    getOngoingStoreEventLinks(),
  ]);

  return (
    <SubPageLayout path="/stores/categories" className="categories">
      <CategoriesSection allStores={stores} ongoing={ongoing} />
    </SubPageLayout>
  );
}

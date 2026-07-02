import SubPageLayout from "@/components/sub/SubPageLayout";
import CategoriesSection from "@/components/sub/categories/CategoriesSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { listStores } from "@/lib/stores-db";

export const metadata = buildPageMetadata({ path: "/stores/categories" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const stores = await listStores();

  return (
    <SubPageLayout path="/stores/categories" className="categories">
      <CategoriesSection allStores={stores} />
    </SubPageLayout>
  );
}

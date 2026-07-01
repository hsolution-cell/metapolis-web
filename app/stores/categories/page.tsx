import SubPageLayout from "@/components/sub/SubPageLayout";
import CategoriesSection from "@/components/sub/categories/CategoriesSection";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/stores/categories" });

export default function Page() {
  return (
    <SubPageLayout path="/stores/categories" className="categories">
      <CategoriesSection />
    </SubPageLayout>
  );
}

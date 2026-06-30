import SubPageLayout from "@/components/sub/SubPageLayout";
import CategoriesSection from "@/components/sub/categories/CategoriesSection";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/stores/categories", label: "카테고리별 안내" });

export default function Page() {
  return (
    <SubPageLayout path="/stores/categories" className="categories">
      <CategoriesSection />
    </SubPageLayout>
  );
}

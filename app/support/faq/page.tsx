import SubPageLayout from "@/components/sub/SubPageLayout";
import FaqSection from "@/components/sub/faq/FaqSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { listFaqs, listFaqCategories } from "@/lib/faq-db";

export const metadata = buildPageMetadata({ path: "/support/faq" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const [items, categories] = await Promise.all([listFaqs(), listFaqCategories()]);

  return (
    <SubPageLayout path="/support/faq" className="faq">
      <FaqSection items={items} categories={categories} />
    </SubPageLayout>
  );
}

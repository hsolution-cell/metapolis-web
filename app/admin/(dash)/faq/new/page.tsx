import FaqForm from "@/components/admin/FaqForm";
import { listFaqCategories } from "@/lib/faq-db";

export const dynamic = "force-dynamic";

export default async function NewFaqPage() {
  const categories = await listFaqCategories();

  return (
    <>
      <div className="admin-page-head">
        <h1>새 FAQ 등록</h1>
      </div>
      <FaqForm mode="new" categories={categories} />
    </>
  );
}

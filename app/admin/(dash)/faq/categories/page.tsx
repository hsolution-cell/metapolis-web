import CategoryManager from "@/components/admin/CategoryManager";
import { listFaqCategories } from "@/lib/faq-db";
import {
  createFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminFaqCategoriesPage() {
  const categories = await listFaqCategories();

  return (
    <>
      <div className="admin-page-head">
        <h1>FAQ 구분 관리</h1>
      </div>
      <CategoryManager
        categories={categories}
        onCreate={createFaqCategory}
        onUpdate={updateFaqCategory}
        onDelete={deleteFaqCategory}
        deleteWarning="이 구분을 삭제할까요? 이 구분을 쓰던 FAQ는 '미분류'로 표시됩니다."
      />
    </>
  );
}

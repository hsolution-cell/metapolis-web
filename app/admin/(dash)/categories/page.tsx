import CategoryManager from "@/components/admin/CategoryManager";
import { listCategories } from "@/lib/notices-db";
import { createCategory, updateCategory, deleteCategory } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <>
      <div className="admin-page-head">
        <h1>고객알림 구분 관리</h1>
      </div>
      <CategoryManager
        categories={categories}
        onCreate={createCategory}
        onUpdate={updateCategory}
        onDelete={deleteCategory}
        deleteWarning="이 구분을 삭제할까요? 이 구분을 쓰던 공지는 '미분류'로 표시됩니다."
      />
    </>
  );
}

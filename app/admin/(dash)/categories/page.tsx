import CategoryManager from "@/components/admin/CategoryManager";
import { listCategories } from "@/lib/notices-db";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <>
      <div className="admin-page-head">
        <h1>구분 관리</h1>
      </div>
      <CategoryManager categories={categories} />
    </>
  );
}

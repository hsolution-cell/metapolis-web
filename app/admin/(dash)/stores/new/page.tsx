import StoreForm from "@/components/admin/StoreForm";

export default function NewStorePage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>새 매장 등록</h1>
      </div>
      <StoreForm mode="new" />
    </>
  );
}

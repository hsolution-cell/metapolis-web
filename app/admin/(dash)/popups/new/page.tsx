import PopupForm from "@/components/admin/PopupForm";

export default function NewPopupPage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>새 팝업 등록</h1>
      </div>
      <PopupForm mode="new" />
    </>
  );
}

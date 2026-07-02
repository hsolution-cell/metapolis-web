import WinnerForm from "@/components/admin/WinnerForm";

export default function NewWinnerPage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>새 당첨자 발표 등록</h1>
      </div>
      <WinnerForm mode="new" />
    </>
  );
}

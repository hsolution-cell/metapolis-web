import NoticeForm from "@/components/admin/NoticeForm";

export default function NewNoticePage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>새 공지 등록</h1>
      </div>
      <NoticeForm mode="new" />
    </>
  );
}

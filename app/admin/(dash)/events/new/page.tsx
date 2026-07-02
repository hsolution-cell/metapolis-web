import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>새 이벤트 등록</h1>
      </div>
      <EventForm mode="new" />
    </>
  );
}

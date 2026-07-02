import { notFound } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { getEventById } from "@/lib/events-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>이벤트 수정</h1>
      </div>
      <EventForm
        mode="edit"
        eventId={event.id}
        initial={{
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          thumbnail: event.thumbnail,
          body: event.body ?? "",
          pinned: event.pinned,
        }}
      />
    </>
  );
}

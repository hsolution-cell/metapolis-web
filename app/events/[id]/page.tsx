import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import EventDetailSection from "@/components/sub/events/EventDetailSection";
import { EVENT_DETAIL_BANNER } from "@/data/events";
import { getEventById, listEvents } from "@/lib/events-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) {
    return { title: "METAPOLIS | 메타폴리스 이벤트" };
  }
  return { title: `METAPOLIS | ${event.title}`, description: event.title };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const all = await listEvents();
  const index = all.findIndex((e) => e.id === id);
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <SubPageLayout
      path="/events"
      className="events events--detail"
      bannerImage={EVENT_DETAIL_BANNER}
    >
      <EventDetailSection
        title={event.title}
        startDate={event.startDate}
        endDate={event.endDate}
        bodyHtml={event.body ?? ""}
        listPath="/events"
        nextHref={next ? `/events/${next.id}` : undefined}
      />
    </SubPageLayout>
  );
}

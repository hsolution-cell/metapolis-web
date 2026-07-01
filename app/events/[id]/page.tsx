import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import EventDetailSection from "@/components/sub/events/EventDetailSection";
import {
  EVENT_DETAIL_BANNER,
  getEventById,
  getEventsByKind,
  METAPOLIS_EVENTS,
} from "@/data/events";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return METAPOLIS_EVENTS.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(METAPOLIS_EVENTS, id);

  if (!event) {
    return { title: "METAPOLIS | 메타폴리스 이벤트" };
  }

  return {
    title: `METAPOLIS | ${event.title}`,
    description: event.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const events = getEventsByKind("metapolis");
  const event = getEventById(events, id);

  if (!event) {
    notFound();
  }

  return (
    <SubPageLayout
      path="/events"
      className="events events--detail"
      bannerImage={EVENT_DETAIL_BANNER}
    >
      <EventDetailSection event={event} events={events} kind="metapolis" />
    </SubPageLayout>
  );
}

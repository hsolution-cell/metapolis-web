import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import EventDetailSection from "@/components/sub/events/EventDetailSection";
import {
  EVENT_DETAIL_BANNER,
  getEventById,
  getEventsByKind,
  STORE_EVENTS,
} from "@/data/events";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return STORE_EVENTS.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(STORE_EVENTS, id);

  if (!event) {
    return { title: "METAPOLIS | 매장 이벤트" };
  }

  return {
    title: `METAPOLIS | ${event.title}`,
    description: event.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const events = getEventsByKind("store");
  const event = getEventById(events, id);

  if (!event) {
    notFound();
  }

  return (
    <SubPageLayout
      path="/events/stores"
      className="events events--detail"
      bannerImage={EVENT_DETAIL_BANNER}
    >
      <EventDetailSection event={event} events={events} kind="store" />
    </SubPageLayout>
  );
}

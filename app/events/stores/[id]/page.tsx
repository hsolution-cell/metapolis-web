import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import EventDetailSection from "@/components/sub/events/EventDetailSection";
import {
  EVENT_DETAIL_BANNER,
  getEventBody,
  getEventById,
  getEventsByKind,
  getNextEvent,
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

  const bodyHtml = getEventBody(event)
    .map((p) => `<p>${p}</p>`)
    .join("");
  const next = getNextEvent(events, event.id);

  return (
    <SubPageLayout
      path="/events/stores"
      className="events events--detail"
      bannerImage={EVENT_DETAIL_BANNER}
    >
      <EventDetailSection
        title={event.title}
        startDate={event.startDate}
        endDate={event.endDate}
        bodyHtml={bodyHtml}
        listPath="/events/stores"
        nextHref={next ? `/events/stores/${next.id}` : undefined}
      />
    </SubPageLayout>
  );
}

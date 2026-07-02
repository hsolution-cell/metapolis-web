import { notFound } from "next/navigation";
import SubPageLayout from "@/components/sub/SubPageLayout";
import EventDetailSection from "@/components/sub/events/EventDetailSection";
import { EVENT_DETAIL_BANNER } from "@/data/events";
import { getStoreEventById, listStoreEvents } from "@/lib/store-events-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const event = await getStoreEventById(id);
  if (!event) {
    return { title: "METAPOLIS | 매장 이벤트" };
  }
  return { title: `METAPOLIS | ${event.title}`, description: event.title };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const event = await getStoreEventById(id);

  if (!event) {
    notFound();
  }

  const all = await listStoreEvents();
  const index = all.findIndex((e) => e.id === id);
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

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
        bodyHtml={event.body ?? ""}
        listPath="/events/stores"
        nextHref={next ? `/events/stores/${next.id}` : undefined}
      />
    </SubPageLayout>
  );
}

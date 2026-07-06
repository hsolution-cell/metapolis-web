import SubPageLayout from "@/components/sub/SubPageLayout";
import EventsSection from "@/components/sub/events/EventsSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { listStoreEvents } from "@/lib/store-events-db";
import type { EventItem } from "@/data/events";

export const metadata = buildPageMetadata({ path: "/events/stores" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const records = await listStoreEvents();
  const events: EventItem[] = records.map((e) => ({
    id: e.id,
    title: e.title,
    thumbnail: e.thumbnail ?? undefined,
    startDate: e.startDate,
    endDate: e.endDate,
    brandName: e.brandName ?? undefined,
    pinned: e.pinned,
  }));

  return (
    <SubPageLayout path="/events/stores" className="events">
      <EventsSection
        events={events}
        kind="store"
        eyebrow="Store Events at Metapolis Mall"
        title={<strong>매장 이벤트</strong>}
        lead="메타폴리스몰 입점 매장에서 진행 중인 다양한 프로모션과 혜택을 확인해 보세요"
        titleId="store-events-list-title"
      />
    </SubPageLayout>
  );
}

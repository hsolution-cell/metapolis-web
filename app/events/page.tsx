import SubPageLayout from "@/components/sub/SubPageLayout";
import EventsSection from "@/components/sub/events/EventsSection";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { listEvents } from "@/lib/events-db";
import type { EventItem } from "@/data/events";

export const metadata = buildPageMetadata({ path: "/events" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const records = await listEvents();
  const events: EventItem[] = records.map((e) => ({
    id: e.id,
    title: e.title,
    thumbnail: e.thumbnail ?? undefined,
    startDate: e.startDate,
    endDate: e.endDate,
    pinned: e.pinned,
  }));

  return (
    <SubPageLayout path="/events" className="events">
      <EventsSection
        events={events}
        kind="metapolis"
        eyebrow="Events & Benefits at Metapolis"
        title={<strong>메타폴리스 이벤트</strong>}
        lead="새로워진 메타폴리스에서 일상을 더 특별하게 채워줄 혜택과 이벤트를 만나보세요"
        titleId="events-list-title"
      />
    </SubPageLayout>
  );
}

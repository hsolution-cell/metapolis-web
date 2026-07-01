import SubPageLayout from "@/components/sub/SubPageLayout";
import EventsSection from "@/components/sub/events/EventsSection";
import { STORE_EVENTS } from "@/data/events";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata = buildPageMetadata({ path: "/events/stores" });

export default function Page() {
  return (
    <SubPageLayout path="/events/stores" className="events">
      <EventsSection
        events={STORE_EVENTS}
        kind="store"
        eyebrow="Store Events at Metapolis"
        title={<strong>매장 이벤트</strong>}
        lead="메타폴리스 입점 매장에서 진행 중인 다양한 프로모션과 혜택을 확인해 보세요"
        titleId="store-events-list-title"
      />
    </SubPageLayout>
  );
}

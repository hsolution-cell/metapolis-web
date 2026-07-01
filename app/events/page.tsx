import SubPageLayout from "@/components/sub/SubPageLayout";
import EventsSection from "@/components/sub/events/EventsSection";
import { METAPOLIS_EVENTS } from "@/data/events";
import { buildMockupMetadata } from "@/components/sub/MockupPage";

export const metadata = buildMockupMetadata({ path: "/events", label: "메타폴리스 이벤트" });

export default function Page() {
  return (
    <SubPageLayout path="/events" className="events">
      <EventsSection
        events={METAPOLIS_EVENTS}
        kind="metapolis"
        eyebrow="Events & Benefits at Metapolis"
        title={<strong>메타폴리스 이벤트</strong>}
        lead="새로워진 메타폴리스에서 일상을 더 특별하게 채워줄 혜택과 이벤트를 만나보세요"
        titleId="events-list-title"
      />
    </SubPageLayout>
  );
}

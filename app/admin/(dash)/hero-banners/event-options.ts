import { listEvents } from "@/lib/events-db";
import { listStoreEvents } from "@/lib/store-events-db";
import type { HeroLinkOption } from "@/components/admin/HeroBannerForm";

/** 배너 링크 자동 입력용 — 메타폴리스몰 이벤트 + 매장 이벤트 목록(종료 표시 포함) */
export async function buildHeroEventOptions(): Promise<HeroLinkOption[]> {
  const [events, storeEvents] = await Promise.all([listEvents(), listStoreEvents()]);
  const today = new Date().toISOString().slice(0, 10);
  const ended = (endDate: string) => (endDate < today ? " (종료)" : "");

  return [
    ...events.map((e) => ({
      label: `[이벤트] ${e.title}${ended(e.endDate)}`,
      href: `/events/${e.id}`,
    })),
    ...storeEvents.map((e) => ({
      label: `[매장 이벤트] ${e.title}${ended(e.endDate)}`,
      href: `/events/stores/${e.id}`,
    })),
  ];
}

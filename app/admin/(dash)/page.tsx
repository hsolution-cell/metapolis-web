import Link from "next/link";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";

type Stat = {
  label: string;
  href: string;
  value: string;
  sub?: string;
};

type CountQuery = ReturnType<
  ReturnType<ReturnType<typeof createSupabasePublicClient>["from"]>["select"]
>;

/** 테이블 행 수 (조회 실패 시 0) */
async function countRows(
  supabase: ReturnType<typeof createSupabasePublicClient>,
  table: string,
  filter?: (q: CountQuery) => CountQuery
) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) query = filter(query);
  const { count, error } = await query;
  return error ? 0 : count ?? 0;
}

export default async function AdminHome() {
  const supabase = createSupabasePublicClient();
  const today = new Date().toISOString().slice(0, 10);

  const [
    notices,
    events,
    eventsOngoing,
    storeEventsOngoing,
    winners,
    faqs,
    stores,
    bannersKo,
    bannersEn,
    popupsKo,
    popupsEn,
  ] = await Promise.all([
    countRows(supabase, "notices"),
    countRows(supabase, "events"),
    countRows(supabase, "events", (q) => q.gte("end_date", today)),
    countRows(supabase, "store_events", (q) => q.gte("end_date", today)),
    countRows(supabase, "winners"),
    countRows(supabase, "faqs"),
    countRows(supabase, "stores"),
    countRows(supabase, "hero_banners", (q) => q.eq("locale", "ko").eq("active", true)),
    countRows(supabase, "hero_banners", (q) => q.eq("locale", "en").eq("active", true)),
    countRows(supabase, "popups", (q) =>
      q.eq("locale", "ko").eq("active", true).lte("start_date", today).gte("end_date", today)
    ),
    countRows(supabase, "popups", (q) =>
      q.eq("locale", "en").eq("active", true).lte("start_date", today).gte("end_date", today)
    ),
  ]);

  const stats: Stat[] = [
    { label: "메인 배너", href: "/admin/hero-banners", value: `${bannersKo} / ${bannersEn}`, sub: "노출중 국문 / 영문" },
    { label: "팝업", href: "/admin/popups", value: `${popupsKo} / ${popupsEn}`, sub: "노출중 국문 / 영문" },
    { label: "고객알림", href: "/admin/notices", value: `${notices}건` },
    { label: "메타폴리스 이벤트", href: "/admin/events", value: `${eventsOngoing}건`, sub: `진행중 · 전체 ${events}건` },
    { label: "매장 이벤트", href: "/admin/store-events", value: `${storeEventsOngoing}건`, sub: "진행중" },
    { label: "당첨자 발표", href: "/admin/winners", value: `${winners}건` },
    { label: "자주 묻는 질문", href: "/admin/faq", value: `${faqs}건` },
    { label: "입점 매장", href: "/admin/stores", value: `${stores}개` },
  ];

  return (
    <>
      <div className="admin-page-head">
        <h1>대시보드</h1>
      </div>

      <div className="admin-cards">
        {stats.map((s) => (
          <Link key={s.href + s.label} href={s.href} className="admin-card">
            <span className="admin-card__label">{s.label}</span>
            <strong className="admin-card__value">{s.value}</strong>
            {s.sub && <span className="admin-card__sub">{s.sub}</span>}
          </Link>
        ))}
      </div>
    </>
  );
}

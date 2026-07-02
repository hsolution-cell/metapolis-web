import { createSupabasePublicClient } from "@/lib/supabase/public";

export type PopupLocale = "ko" | "en";

export type PopupRecord = {
  id: string;
  locale: PopupLocale;
  title: string;
  image: string;
  linkHref: string | null;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  sortOrder: number;
  active: boolean;
};

type PopupRow = {
  id: string;
  locale: string;
  title: string;
  image: string;
  link_href: string | null;
  start_date: string;
  end_date: string;
  sort_order: number;
  active: boolean;
};

const POPUP_SELECT =
  "id, locale, title, image, link_href, start_date, end_date, sort_order, active";

function mapRow(row: PopupRow): PopupRecord {
  return {
    id: row.id,
    locale: row.locale === "en" ? "en" : "ko",
    title: row.title,
    image: row.image,
    linkHref: row.link_href,
    startDate: row.start_date,
    endDate: row.end_date,
    sortOrder: row.sort_order,
    active: row.active,
  };
}

/** 관리자 목록 — 특정 언어 전체, 정렬 순서 오름차순 */
export async function listPopups(
  locale: PopupLocale = "ko"
): Promise<PopupRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("popups")
    .select(POPUP_SELECT)
    .eq("locale", locale)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(`팝업 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as PopupRow));
}

/** 단건 조회 */
export async function getPopupById(id: string): Promise<PopupRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("popups")
    .select(POPUP_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`팝업 조회 실패: ${error.message}`);
  return data ? mapRow(data as PopupRow) : null;
}

/**
 * 공개용 — 노출(active) + 오늘이 노출기간 안인 팝업만, 정렬 순서대로.
 * 조회 실패/미설정 시 빈 배열.
 */
export async function getVisiblePopups(
  locale: PopupLocale = "ko"
): Promise<PopupRecord[]> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("popups")
      .select(POPUP_SELECT)
      .eq("locale", locale)
      .eq("active", true)
      .lte("start_date", today)
      .gte("end_date", today)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) return [];
    return (data ?? []).map((row) => mapRow(row as PopupRow));
  } catch {
    return [];
  }
}

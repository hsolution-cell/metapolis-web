import { createSupabasePublicClient } from "@/lib/supabase/public";

export type EventRecord = {
  id: string;
  title: string;
  thumbnail: string | null;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  body: string | null; // HTML
  pinned: boolean;
};

type EventRow = {
  id: string;
  title: string;
  thumbnail: string | null;
  start_date: string;
  end_date: string;
  body: string | null;
  pinned: boolean;
};

const EVENT_SELECT = "id, title, thumbnail, start_date, end_date, body, pinned";

function mapRow(row: EventRow): EventRecord {
  return {
    id: row.id,
    title: row.title,
    thumbnail: row.thumbnail,
    startDate: row.start_date,
    endDate: row.end_date,
    body: row.body,
    pinned: row.pinned,
  };
}

/** 목록 — 고정 우선, 시작일 최신순 */
export async function listEvents(): Promise<EventRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_SELECT)
    .order("pinned", { ascending: false })
    .order("start_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`이벤트 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as EventRow));
}

/** 단건 조회 */
export async function getEventById(id: string): Promise<EventRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`이벤트 조회 실패: ${error.message}`);
  return data ? mapRow(data as EventRow) : null;
}

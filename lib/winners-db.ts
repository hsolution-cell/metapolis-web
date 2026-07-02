import { createSupabasePublicClient } from "@/lib/supabase/public";

export type WinnerRecord = {
  id: string;
  title: string;
  thumbnail: string | null;
  date: string; // YYYY-MM-DD
  body: string | null; // HTML
  pinned: boolean;
};

type WinnerRow = {
  id: string;
  title: string;
  thumbnail: string | null;
  date: string;
  body: string | null;
  pinned: boolean;
};

const WINNER_SELECT = "id, title, thumbnail, date, body, pinned";

function mapRow(row: WinnerRow): WinnerRecord {
  return {
    id: row.id,
    title: row.title,
    thumbnail: row.thumbnail,
    date: row.date,
    body: row.body,
    pinned: row.pinned,
  };
}

/** 목록 — 고정 우선, 최신순 */
export async function listWinners(): Promise<WinnerRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("winners")
    .select(WINNER_SELECT)
    .order("pinned", { ascending: false })
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`당첨자 발표 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as WinnerRow));
}

/** 단건 조회 */
export async function getWinnerById(id: string): Promise<WinnerRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("winners")
    .select(WINNER_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`당첨자 발표 조회 실패: ${error.message}`);
  return data ? mapRow(data as WinnerRow) : null;
}

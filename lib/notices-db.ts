import { createSupabasePublicClient } from "@/lib/supabase/public";

export type NoticeCategory = {
  id: string;
  name: string;
  sortOrder: number;
  color: string | null; // 배지 색상(hex), null 이면 기본색
};

/** 공지 뷰모델 */
export type NoticeRecord = {
  id: string;
  categoryId: string | null;
  categoryLabel: string; // 카테고리명 (없으면 "미분류")
  categoryColor: string | null; // 구분 배지 색상
  title: string;
  date: string; // YYYY-MM-DD
  body: string | null; // HTML
  pinned: boolean;
};

type NoticeRow = {
  id: string;
  category_id: string | null;
  title: string;
  date: string;
  body: string | null;
  pinned: boolean;
  notice_categories: { name: string; color: string | null } | null;
};

const NOTICE_SELECT =
  "id, category_id, title, date, body, pinned, notice_categories(name, color)";

function mapRow(row: NoticeRow): NoticeRecord {
  return {
    id: row.id,
    categoryId: row.category_id,
    categoryLabel: row.notice_categories?.name ?? "미분류",
    categoryColor: row.notice_categories?.color ?? null,
    title: row.title,
    date: row.date,
    body: row.body,
    pinned: row.pinned,
  };
}

/** 목록 — 고정글 우선, 최신순 */
export async function listNotices(): Promise<NoticeRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("notices")
    .select(NOTICE_SELECT)
    .order("pinned", { ascending: false })
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`공지 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as unknown as NoticeRow));
}

/** 단건 조회 */
export async function getNoticeById(id: string): Promise<NoticeRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("notices")
    .select(NOTICE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`공지 조회 실패: ${error.message}`);
  return data ? mapRow(data as unknown as NoticeRow) : null;
}

/** 카테고리 목록 (관리·폼 공용) */
export async function listCategories(): Promise<NoticeCategory[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("notice_categories")
    .select("id, name, sort_order, color")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw new Error(`카테고리 조회 실패: ${error.message}`);
  return (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    sortOrder: c.sort_order,
    color: c.color ?? null,
  }));
}

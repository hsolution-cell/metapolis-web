import { createSupabasePublicClient } from "@/lib/supabase/public";

export type NoticeCategory = "info" | "notice" | "event";

export const NOTICE_CATEGORY_LABEL: Record<NoticeCategory, string> = {
  info: "안내",
  notice: "공지",
  event: "행사",
};

/** 관리 폼용 카테고리 옵션 */
export const NOTICE_CATEGORY_OPTIONS: { value: NoticeCategory; label: string }[] = [
  { value: "info", label: "안내" },
  { value: "notice", label: "공지" },
  { value: "event", label: "행사" },
];

/** DB row 뷰모델 */
export type NoticeRecord = {
  id: string;
  category: NoticeCategory;
  categoryLabel: string;
  title: string;
  date: string; // YYYY-MM-DD
  body: string | null; // HTML
};

type NoticeRow = {
  id: string;
  category: NoticeCategory;
  title: string;
  date: string;
  body: string | null;
};

function mapRow(row: NoticeRow): NoticeRecord {
  return {
    id: row.id,
    category: row.category,
    categoryLabel: NOTICE_CATEGORY_LABEL[row.category] ?? row.category,
    title: row.title,
    date: row.date,
    body: row.body,
  };
}

/** 최신순 전체 목록 (공개 페이지·관리 목록 공용) */
export async function listNotices(): Promise<NoticeRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("notices")
    .select("id, category, title, date, body")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`공지 목록 조회 실패: ${error.message}`);
  return (data ?? []).map(mapRow);
}

/** 단건 조회 */
export async function getNoticeById(id: string): Promise<NoticeRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("notices")
    .select("id, category, title, date, body")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`공지 조회 실패: ${error.message}`);
  return data ? mapRow(data as NoticeRow) : null;
}

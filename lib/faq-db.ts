import { createSupabasePublicClient } from "@/lib/supabase/public";

export type FaqCategory = {
  id: string;
  name: string;
  sortOrder: number;
};

export type FaqRecord = {
  id: string;
  categoryId: string | null;
  categoryLabel: string;
  question: string;
  answer: string | null; // HTML
  pinned: boolean;
  sortOrder: number;
};

type FaqRow = {
  id: string;
  category_id: string | null;
  question: string;
  answer: string | null;
  pinned: boolean;
  sort_order: number;
  faq_categories: { name: string } | null;
};

const FAQ_SELECT =
  "id, category_id, question, answer, pinned, sort_order, faq_categories(name)";

function mapRow(row: FaqRow): FaqRecord {
  return {
    id: row.id,
    categoryId: row.category_id,
    categoryLabel: row.faq_categories?.name ?? "미분류",
    question: row.question,
    answer: row.answer,
    pinned: row.pinned,
    sortOrder: row.sort_order,
  };
}

/** 목록 — 고정 우선, 지정 순서 */
export async function listFaqs(): Promise<FaqRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("faqs")
    .select(FAQ_SELECT)
    .order("pinned", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(`FAQ 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as unknown as FaqRow));
}

export async function getFaqById(id: string): Promise<FaqRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("faqs")
    .select(FAQ_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`FAQ 조회 실패: ${error.message}`);
  return data ? mapRow(data as unknown as FaqRow) : null;
}

export async function listFaqCategories(): Promise<FaqCategory[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("faq_categories")
    .select("id, name, sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw new Error(`FAQ 카테고리 조회 실패: ${error.message}`);
  return (data ?? []).map((c) => ({ id: c.id, name: c.name, sortOrder: c.sort_order }));
}

import { createSupabasePublicClient } from "@/lib/supabase/public";
import type {
  StoreRecord,
  StoreIconCategory,
  StoreGuideCategory,
} from "@/data/storeDirectory";
import type { BranchBlock } from "@/data/branchStores";

type StoreRow = {
  id: string;
  name: string;
  name_en: string | null;
  block: BranchBlock;
  floor_id: string;
  tel: string;
  icon_category: StoreIconCategory;
  guide_category: StoreGuideCategory;
  is_signature: boolean;
  sort_order: number;
  /** 쉼표 구분 별칭 목록 (stores-search-keywords.sql 이전 DB에는 컬럼이 없을 수 있음) */
  search_keywords?: string | null;
  /** 매장 소개 (stores-descriptions.sql 이전 DB에는 컬럼이 없을 수 있음) */
  description?: string | null;
};

// 별칭 컬럼 미적용 DB에서도 조회가 깨지지 않도록 전체 컬럼 선택
const STORE_SELECT = "*";

function parseSearchKeywords(raw: string | null | undefined): string[] | null {
  if (!raw) return null;
  const keywords = raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  return keywords.length ? keywords : null;
}

function mapRow(row: StoreRow): StoreRecord & { sortOrder: number } {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    searchKeywords: parseSearchKeywords(row.search_keywords),
    description: row.description ?? null,
    block: row.block,
    floorId: row.floor_id,
    tel: row.tel,
    iconCategory: row.icon_category,
    guideCategory: row.guide_category,
    isSignature: row.is_signature,
    sortOrder: row.sort_order,
  };
}

/** 전체 매장 (관리·층별·카테고리 공용) — sort_order → 이름순 */
export async function listStores(): Promise<(StoreRecord & { sortOrder: number })[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("stores")
    .select(STORE_SELECT)
    .order("block", { ascending: true })
    .order("floor_id", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw new Error(`매장 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as StoreRow));
}

export async function getStoreById(
  id: string
): Promise<(StoreRecord & { sortOrder: number }) | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("stores")
    .select(STORE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`매장 조회 실패: ${error.message}`);
  return data ? mapRow(data as StoreRow) : null;
}

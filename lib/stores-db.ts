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
  block: BranchBlock;
  floor_id: string;
  tel: string;
  icon_category: StoreIconCategory;
  guide_category: StoreGuideCategory;
  is_signature: boolean;
  sort_order: number;
};

const STORE_SELECT =
  "id, name, block, floor_id, tel, icon_category, guide_category, is_signature, sort_order";

function mapRow(row: StoreRow): StoreRecord & { sortOrder: number } {
  return {
    id: row.id,
    name: row.name,
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

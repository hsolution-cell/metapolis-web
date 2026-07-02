import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { OngoingStoreEventLinks } from "@/data/storeDirectory";

export type StoreEventRecord = {
  id: string;
  title: string;
  thumbnail: string | null;
  startDate: string;
  endDate: string;
  body: string | null;
  storeId: string | null;
  brandName: string | null;
  pinned: boolean;
};

type StoreEventRow = {
  id: string;
  title: string;
  thumbnail: string | null;
  start_date: string;
  end_date: string;
  body: string | null;
  store_id: string | null;
  brand_name: string | null;
  pinned: boolean;
};

const SELECT = "id, title, thumbnail, start_date, end_date, body, store_id, brand_name, pinned";

function mapRow(row: StoreEventRow): StoreEventRecord {
  return {
    id: row.id,
    title: row.title,
    thumbnail: row.thumbnail,
    startDate: row.start_date,
    endDate: row.end_date,
    body: row.body,
    storeId: row.store_id,
    brandName: row.brand_name,
    pinned: row.pinned,
  };
}

export async function listStoreEvents(): Promise<StoreEventRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("store_events")
    .select(SELECT)
    .order("pinned", { ascending: false })
    .order("start_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`매장 이벤트 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as StoreEventRow));
}

export async function getStoreEventById(id: string): Promise<StoreEventRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("store_events")
    .select(SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`매장 이벤트 조회 실패: ${error.message}`);
  return data ? mapRow(data as StoreEventRow) : null;
}

/** 진행중 매장 이벤트 → 매장 카드 배지용 링크맵 (storeId·brandName 매칭) */
export async function getOngoingStoreEventLinks(): Promise<OngoingStoreEventLinks> {
  const events = await listStoreEvents();
  const now = Date.now();
  const links: OngoingStoreEventLinks = { byStoreId: {}, byBrandName: {} };

  for (const e of events) {
    const ended = new Date(`${e.endDate}T23:59:59`).getTime() < now;
    if (ended) continue;
    const href = `/events/stores/${e.id}`;
    if (e.storeId) links.byStoreId[e.storeId] = href;
    if (e.brandName) links.byBrandName[e.brandName] = href;
  }
  return links;
}

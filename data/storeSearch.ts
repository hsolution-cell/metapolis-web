import {
  STORE_GUIDE_CATEGORIES,
  formatStoreLocation,
  type StoreRecord,
} from "@/data/storeDirectory";

export { formatStoreLocation };

export function searchStores(stores: StoreRecord[], query: string): StoreRecord[] {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return [];

  return stores.filter((store) => {
    if (store.name.toLowerCase().includes(keyword)) return true;
    if (store.nameEn?.toLowerCase().includes(keyword)) return true;

    const category = STORE_GUIDE_CATEGORIES.find(
      (item) => item.id === store.guideCategory
    );

    if (category?.labelKo.toLowerCase().includes(keyword)) return true;
    if (category?.labelEn.toLowerCase().includes(keyword)) return true;

    if ((keyword === "키즈" || keyword === "kids") && store.iconCategory === "kids") return true;
    if (keyword === "내과" && store.name.includes("내과")) return true;
    if (keyword === "clinic" && store.iconCategory === "hospital") return true;

    return false;
  }).sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

export function getStoreFloorHref(store: StoreRecord, isEn = false): string {
  const params = new URLSearchParams({
    block: store.block,
    floor: store.floorId,
  });

  return `${isEn ? "/en" : "/stores"}/floors?${params.toString()}`;
}

export function getStoreSearchPageHref(query: string): string {
  return `/stores/search?q=${encodeURIComponent(query.trim())}`;
}

export type StoreSearchDestination =
  | { type: "empty" }
  | { type: "single"; href: string }
  | { type: "results"; href: string };

export function resolveStoreSearchDestination(
  stores: StoreRecord[],
  query: string,
  isEn = false
): StoreSearchDestination {
  const trimmed = query.trim();
  if (!trimmed) return { type: "empty" };

  const results = searchStores(stores, trimmed);

  if (results.length === 1) {
    return { type: "single", href: getStoreFloorHref(results[0], isEn) };
  }

  // 영문: 별도 검색 페이지가 없어 첫 결과의 영문 층별안내로 이동
  if (isEn) {
    if (!results.length) return { type: "results", href: "/en/floors" };
    return { type: "results", href: getStoreFloorHref(results[0], true) };
  }

  return { type: "results", href: getStoreSearchPageHref(trimmed) };
}

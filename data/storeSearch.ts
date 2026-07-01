import {
  STORE_DIRECTORY,
  STORE_GUIDE_CATEGORIES,
  formatStoreLocation,
  type StoreRecord,
} from "@/data/storeDirectory";

export { formatStoreLocation };

export function searchStores(query: string): StoreRecord[] {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return [];

  return STORE_DIRECTORY.filter((store) => {
    if (store.name.toLowerCase().includes(keyword)) return true;

    const category = STORE_GUIDE_CATEGORIES.find(
      (item) => item.id === store.guideCategory
    );

    if (category?.labelKo.toLowerCase().includes(keyword)) return true;
    if (category?.labelEn.toLowerCase().includes(keyword)) return true;

    if (keyword === "키즈" && store.iconCategory === "kids") return true;
    if (keyword === "내과" && store.name.includes("내과")) return true;

    return false;
  }).sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

export function getStoreFloorHref(store: StoreRecord): string {
  const params = new URLSearchParams({
    block: store.block,
    floor: store.floorId,
  });

  return `/stores/floors?${params.toString()}`;
}

export function getStoreSearchPageHref(query: string): string {
  return `/stores/search?q=${encodeURIComponent(query.trim())}`;
}

export type StoreSearchDestination =
  | { type: "empty" }
  | { type: "single"; href: string }
  | { type: "results"; href: string };

export function resolveStoreSearchDestination(query: string): StoreSearchDestination {
  const trimmed = query.trim();
  if (!trimmed) return { type: "empty" };

  const results = searchStores(trimmed);

  if (results.length === 1) {
    return { type: "single", href: getStoreFloorHref(results[0]) };
  }

  return { type: "results", href: getStoreSearchPageHref(trimmed) };
}

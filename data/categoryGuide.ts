import type { StoreGuideCategoryFilter } from "@/data/storeDirectory";

export type CategoryBannerMeta = {
  image: string;
  captionEn: string;
};

const BANNER_BASE = "/img/sub/categories";

export const CATEGORY_BANNERS: Record<StoreGuideCategoryFilter, CategoryBannerMeta> = {
  all: { image: `${BANNER_BASE}/banner-all.jpg`, captionEn: "ALL STORES" },
  fashion: { image: `${BANNER_BASE}/banner-fashion.jpg`, captionEn: "FASHION" },
  dining: { image: `${BANNER_BASE}/banner-dining.jpg`, captionEn: "DINING" },
  beauty: { image: `${BANNER_BASE}/banner-beauty.jpg`, captionEn: "BEAUTY" },
  lifestyle: { image: `${BANNER_BASE}/banner-lifestyle.jpg`, captionEn: "LIFESTYLE" },
  more: { image: `${BANNER_BASE}/banner-more.jpg`, captionEn: "MORE" },
};

export function getCategoryBanner(category: StoreGuideCategoryFilter) {
  return CATEGORY_BANNERS[category];
}

export function getCategoryGuideSummary(blockLabel: string, categoryKo: string) {
  return `${blockLabel} ${categoryKo} 안내`;
}

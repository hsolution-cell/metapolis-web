import { SUB_PAGES } from "@/data/siteMeta";
import { getGnbIndex } from "@/data/navigation";

export type SubPageConfig = {
  path: string;
  label: string;
  bannerImage: string;
};

export const DEFAULT_SUB_BANNER = "/img/sub/banner/default.jpg";

/** GNB 1뎁스 그룹별 서브 히어로 배경 (그룹 내 페이지 공통) */
export const GNB_BANNER_IMAGES: Record<number, string> = {
  0: "/img/sub/banner/menu1.png", // 메타폴리스몰
  1: "/img/sub/banner/menu2.png", // 매장안내
  2: "/img/sub/banner/menu3.png", // 이벤트
  3: "/img/sub/banner/menu4.png", // 고객센터
};

export function getSubBannerImage(path: string): string {
  const gnbIndex = getGnbIndex(path);
  if (gnbIndex === undefined) return DEFAULT_SUB_BANNER;
  return GNB_BANNER_IMAGES[gnbIndex] ?? DEFAULT_SUB_BANNER;
}

/** pathname → 서브 배너·타이틀 설정 */
export const SUB_PAGES_CONFIG: SubPageConfig[] = SUB_PAGES.map((page) => ({
  path: page.path,
  label: page.label,
  bannerImage: getSubBannerImage(page.path),
}));

const SUB_PAGE_MAP = new Map(SUB_PAGES_CONFIG.map((page) => [page.path, page]));

export function getSubPageConfig(path: string): SubPageConfig | undefined {
  return SUB_PAGE_MAP.get(path);
}

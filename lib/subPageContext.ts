import type { NavGroup, NavLink } from "@/data/navigation";
import { GNB_GROUPS, getGnbIndex } from "@/data/navigation";
import { DEFAULT_SUB_BANNER, getSubPageConfig, type SubPageConfig } from "@/data/subPages";

/** GNB에서 숨겼지만 직접 접근은 유지하는 페이지의 빵부스러기·배너용 그룹 정의 */
const HIDDEN_PAGE_GROUPS: Record<string, NavGroup> = {
  "/partnership": {
    label: "입점·제휴",
    href: "/partnership",
    items: [{ label: "입점·제휴 문의", href: "/partnership" }],
  },
};

export type SubPageContext = {
  config: SubPageConfig;
  group: NavGroup;
  siblings: NavLink[];
  currentPath: string;
};

export function getSubPageContext(path: string): SubPageContext {
  const config = getSubPageConfig(path);
  if (!config) {
    throw new Error(`Unknown sub page path: ${path}`);
  }

  const gnbIndex = getGnbIndex(path);
  const group =
    gnbIndex !== undefined ? GNB_GROUPS[gnbIndex] : HIDDEN_PAGE_GROUPS[path];
  if (!group) {
    throw new Error(`No GNB group for path: ${path}`);
  }

  return {
    config: {
      ...config,
      bannerImage: config.bannerImage || DEFAULT_SUB_BANNER,
    },
    group,
    siblings: group.items,
    currentPath: path,
  };
}

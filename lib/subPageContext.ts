import type { NavGroup, NavLink } from "@/data/navigation";
import { GNB_GROUPS, getGnbIndex } from "@/data/navigation";
import { DEFAULT_SUB_BANNER, getSubPageConfig, type SubPageConfig } from "@/data/subPages";

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
  if (gnbIndex === undefined) {
    throw new Error(`No GNB group for path: ${path}`);
  }

  const group = GNB_GROUPS[gnbIndex];

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

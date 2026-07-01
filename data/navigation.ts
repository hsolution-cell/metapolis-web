export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items: NavLink[];
};

export const GNB_GROUPS: NavGroup[] = [
  {
    label: "메타폴리스",
    href: "/about",
    items: [
      { label: "메타폴리스 소개", href: "/about" },
      { label: "영업시간", href: "/hours" },
      { label: "오시는 길", href: "/location" },
      { label: "주차안내", href: "/parking" },
    ],
  },
  {
    label: "매장안내",
    href: "/stores",
    items: [
      { label: "주요매장", href: "/stores" },
      { label: "층별안내", href: "/stores/floors" },
      { label: "카테고리별 안내", href: "/stores/categories" },
      { label: "편의시설", href: "/stores/facilities" },
    ],
  },
  {
    label: "이벤트",
    href: "/events",
    items: [
      { label: "메타폴리스 이벤트", href: "/events" },
      { label: "매장 이벤트", href: "/events/stores" },
      { label: "당첨자 발표", href: "/events/winners" },
    ],
  },
  {
    label: "고객센터",
    href: "/support/faq",
    items: [
      { label: "자주 묻는 질문", href: "/support/faq" },
      { label: "문의하기", href: "/support/inquiry" },
      { label: "고객알림", href: "/support/notices" },
    ],
  },
];

export const SEARCH_TAGS = ["아디다스", "스파오", "내과", "지오지아", "키즈"];

/** pathname → GNB column index (0–3) */
export const PATH_GNB_INDEX: Record<string, number> = {
  "/about": 0,
  "/hours": 0,
  "/location": 0,
  "/parking": 0,
  "/stores": 1,
  "/stores/floors": 1,
  "/stores/search": 1,
  "/stores/categories": 1,
  "/stores/facilities": 1,
  "/events": 2,
  "/events/stores": 2,
  "/events/winners": 2,
  "/support/faq": 3,
  "/support/inquiry": 3,
  "/support/notices": 3,
};

export function getGnbIndex(pathname: string): number | undefined {
  if (pathname === "/") return undefined;
  if (PATH_GNB_INDEX[pathname] !== undefined) return PATH_GNB_INDEX[pathname];
  for (const [path, index] of Object.entries(PATH_GNB_INDEX)) {
    if (pathname.startsWith(`${path}/`)) return index;
  }
  return undefined;
}

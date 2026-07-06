export type PageMeta = {
  title: string;
  description: string;
  noindex?: boolean;
};

export const DEFAULT_META: PageMeta = {
  title: "METAPOLIS MALL | 메타폴리스몰",
  description: "METAPOLIS MALL 메타폴리스몰 공식 홈페이지",
};

export const PAGE_META: Record<string, PageMeta> = {
  "/": DEFAULT_META,
  "/about": { title: "METAPOLIS MALL | 메타폴리스몰 소개", description: "METAPOLIS MALL 메타폴리스몰 소개" },
  "/hours": { title: "METAPOLIS MALL | 영업시간", description: "METAPOLIS MALL 영업시간" },
  "/location": { title: "METAPOLIS MALL | 오시는 길", description: "METAPOLIS MALL 오시는 길" },
  "/parking": { title: "METAPOLIS MALL | 주차안내", description: "METAPOLIS MALL 주차안내" },
  "/stores": { title: "METAPOLIS MALL | 주요매장", description: "METAPOLIS MALL 주요매장" },
  "/stores/floors": { title: "METAPOLIS MALL | 층별안내", description: "METAPOLIS MALL 층별안내" },
  "/stores/categories": { title: "METAPOLIS MALL | 카테고리별 안내", description: "METAPOLIS MALL 카테고리별 안내" },
  "/stores/facilities": { title: "METAPOLIS MALL | 편의시설", description: "METAPOLIS MALL 편의시설" },
  "/stores/search": { title: "METAPOLIS MALL | 매장 검색", description: "METAPOLIS MALL 매장 검색" },
  "/events": { title: "METAPOLIS MALL | 메타폴리스몰 이벤트", description: "METAPOLIS MALL 메타폴리스몰 이벤트" },
  "/events/stores": { title: "METAPOLIS MALL | 매장 이벤트", description: "METAPOLIS MALL 매장 이벤트" },
  "/events/winners": { title: "METAPOLIS MALL | 당첨자 발표", description: "METAPOLIS MALL 당첨자 발표" },
  "/support/faq": { title: "METAPOLIS MALL | 자주 묻는 질문", description: "METAPOLIS MALL 자주 묻는 질문" },
  "/support/inquiry": { title: "METAPOLIS MALL | 문의하기", description: "METAPOLIS MALL 문의하기" },
  "/support/notices": { title: "METAPOLIS MALL | 고객알림", description: "METAPOLIS MALL 고객알림" },
  "/privacy": { title: "METAPOLIS MALL | 개인정보처리방침", description: "METAPOLIS MALL 개인정보처리방침" },
  "/terms": { title: "METAPOLIS MALL | 이용약관", description: "METAPOLIS MALL 이용약관" },
  "/sitemap": { title: "METAPOLIS MALL | 사이트맵", description: "METAPOLIS MALL 사이트맵" },
  "/preview": {
    title: "METAPOLIS MALL | 페이지 시안 미리보기",
    description: "METAPOLIS MALL 페이지 시안 미리보기",
    noindex: true,
  },
};

export const SUB_PAGES = [
  { path: "/about", legacy: "menu1_1", label: "메타폴리스몰 소개" },
  { path: "/hours", legacy: "menu1_2", label: "영업시간" },
  { path: "/location", legacy: "menu1_3", label: "오시는 길" },
  { path: "/parking", legacy: "menu1_4", label: "주차안내" },
  { path: "/stores", legacy: "menu2_1", label: "주요매장" },
  { path: "/stores/floors", legacy: "menu2_2", label: "층별안내" },
  { path: "/stores/categories", legacy: "menu2_3", label: "카테고리별 안내" },
  { path: "/stores/facilities", legacy: "menu2_4", label: "편의시설" },
  { path: "/events", legacy: "menu3_1", label: "메타폴리스몰 이벤트" },
  { path: "/events/stores", legacy: "menu3_2", label: "매장 이벤트" },
  { path: "/events/winners", legacy: "menu3_3", label: "당첨자 발표" },
  { path: "/support/faq", legacy: "menu4_1", label: "자주 묻는 질문" },
  { path: "/support/inquiry", legacy: "menu4_2", label: "문의하기" },
  { path: "/support/notices", legacy: "menu4_3", label: "고객알림" },
] as const;

export function getPageMeta(pathname: string): PageMeta {
  return PAGE_META[pathname] ?? DEFAULT_META;
}

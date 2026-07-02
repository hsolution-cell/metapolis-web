export type WinnerItem = {
  id: string;
  title: string;
  thumbnail?: string;
  date: string;
  body?: string[];
  contentImage?: string;
  pinned?: boolean;
};

export const WINNERS_PER_PAGE = 5;

export const WINNER_ANNOUNCEMENTS: WinnerItem[] = [
  {
    id: "summer-lucky-draw",
    title: "여름 시즌 럭키 드로우 당첨자 발표",
    date: "2026-07-01",
    body: [
      "여름 시즌 럭키 드로우 이벤트 당첨자를 발표합니다.",
      "당첨되신 고객님께는 개별 연락을 통해 경품 수령 방법을 안내해 드립니다.",
    ],
  },
  {
    id: "welcome-gift-winners",
    title: "신규 회원 웰컴 기프트 당첨자 발표",
    date: "2026-06-20",
  },
  {
    id: "weekend-benefit",
    title: "주말 방문 혜택 이벤트 당첨자 발표",
    date: "2026-06-10",
  },
  {
    id: "spring-festival",
    title: "봄맞이 페스티벌 당첨자 발표",
    date: "2026-05-05",
  },
  {
    id: "kids-day",
    title: "키즈 데이 패밀리 이벤트 당첨자 발표",
    date: "2026-05-01",
  },
  {
    id: "opening-gift",
    title: "리뉴얼 오픈 기념 경품 이벤트 당첨자 발표",
    date: "2026-03-15",
  },
  {
    id: "parking-promo",
    title: "주차 무료 프로모션 당첨자 발표",
    date: "2026-03-01",
  },
  {
    id: "new-year-fortune",
    title: "새해 맞이 포춘 이벤트 당첨자 발표",
    date: "2026-01-31",
  },
  {
    id: "christmas-gift",
    title: "크리스마스 마켓 경품 추첨 당첨자 발표",
    date: "2025-12-26",
  },
  {
    id: "black-friday",
    title: "블랙 프라이데이 특별 추첨 당첨자 발표",
    date: "2025-12-01",
  },
  {
    id: "autumn-thanks",
    title: "가을 감사 이벤트 당첨자 발표",
    date: "2025-11-01",
  },
  {
    id: "chuseok-gift",
    title: "추석 맞이 사은품 추첨 당첨자 발표",
    date: "2025-10-01",
  },
];

export function formatWinnerDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}

export function getWinnerById(id: string): WinnerItem | undefined {
  return WINNER_ANNOUNCEMENTS.find((item) => item.id === id);
}

export function getNextWinner(id: string): WinnerItem | undefined {
  const index = WINNER_ANNOUNCEMENTS.findIndex((item) => item.id === id);
  if (index < 0 || index >= WINNER_ANNOUNCEMENTS.length - 1) return undefined;
  return WINNER_ANNOUNCEMENTS[index + 1];
}

export function getWinnerDetailHref(id: string): string {
  return `/events/winners/${id}`;
}

export function filterWinners(items: WinnerItem[], query: string): WinnerItem[] {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return items;

  return items.filter((item) => item.title.toLowerCase().includes(keyword));
}

export function paginateWinners<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    totalPages,
    totalItems: items.length,
  };
}

export function getWinnerListNumber(
  totalItems: number,
  page: number,
  perPage: number,
  index: number
): number {
  return totalItems - (page - 1) * perPage - index;
}

export function getWinnerBody(item: WinnerItem): string[] {
  if (item.body?.length) return item.body;

  return [
    `${item.title} 안내입니다.`,
    "당첨되신 고객님께는 개별 연락을 통해 경품 수령 방법을 안내해 드립니다.",
  ];
}

export type NoticeCategory = "info" | "notice" | "event";

export type NoticeItem = {
  id: string;
  category: NoticeCategory;
  categoryLabel: string;
  title: string;
  date: string;
  body?: string[];
};

export const NOTICES_PER_PAGE = 10;

/** 공개 목록(NoticesSection/NoticeListItem)에서 쓰는 최소 형태 */
export type NoticeListData = {
  id: string;
  categoryLabel: string;
  categoryColor?: string | null;
  title: string;
  date: string;
  pinned?: boolean;
};

export const NOTICE_ITEMS: NoticeItem[] = [
  {
    id: "parking-entrance-change",
    category: "info",
    categoryLabel: "안내",
    title: "메타폴리스몰 주차 이용안내(지하주차장 입구 위치 변경)",
    date: "2026-07-01",
    body: [
      "메타폴리스몰 지하주차장 입구 위치가 아래와 같이 변경됩니다.",
      "변경 기간 동안 혼잡이 예상되오니, 대중교통 이용을 권장드립니다.",
      "• 변경 일시: 2026년 7월 1일(수) ~ 7월 15일(수)",
      "• 변경 내용: 지하 1층 B구역 입구 일시 폐쇄, A구역 입구로 통합 운영",
    ],
  },
  {
    id: "business-hours-change",
    category: "info",
    categoryLabel: "안내",
    title: "메타폴리스몰 영업시간을 아래 내용과 같이 변경합니다",
    date: "2026-07-01",
    body: [
      "고객님의 편의를 위해 메타폴리스몰 영업시간을 아래와 같이 변경합니다.",
      "• 변경 전: 10:30 ~ 22:00",
      "• 변경 후: 10:30 ~ 22:30 (연장 운영)",
      "• 적용 일자: 2026년 7월 1일(수)부터",
    ],
  },
  {
    id: "summer-festival",
    category: "event",
    categoryLabel: "행사",
    title: "2026 여름 페스티벌 기간 특별 운영 안내",
    date: "2026-06-20",
  },
  {
    id: "elevator-maintenance",
    category: "notice",
    categoryLabel: "공지",
    title: "A Block 엘리베이터 정기 점검 안내",
    date: "2026-06-15",
  },
  {
    id: "aircon-check",
    category: "info",
    categoryLabel: "안내",
    title: "냉방 시설 점검에 따른 일부 구역 온도 조절 안내",
    date: "2026-06-10",
  },
  {
    id: "family-day",
    category: "event",
    categoryLabel: "행사",
    title: "가족의 날 맞이 키즈 프로그램 운영 안내",
    date: "2026-05-05",
  },
  {
    id: "holiday-hours",
    category: "notice",
    categoryLabel: "공지",
    title: "5월 연휴 기간 영업시간 안내",
    date: "2026-04-28",
  },
  {
    id: "parking-fee",
    category: "info",
    categoryLabel: "안내",
    title: "주차 요금 및 무료 주차 시간 변경 안내",
    date: "2026-04-15",
  },
  {
    id: "spring-event",
    category: "event",
    categoryLabel: "행사",
    title: "봄맞이 플라워 마켓 개최 안내",
    date: "2026-03-20",
  },
  {
    id: "fire-drill",
    category: "notice",
    categoryLabel: "공지",
    title: "소방 훈련 실시에 따른 일시적 이용 제한 안내",
    date: "2026-03-10",
  },
  {
    id: "renewal-open",
    category: "info",
    categoryLabel: "안내",
    title: "메타폴리스몰 리뉴얼 오픈 기념 운영 안내",
    date: "2026-02-01",
  },
  {
    id: "new-year-hours",
    category: "notice",
    categoryLabel: "공지",
    title: "설 연휴 기간 영업시간 및 휴무 안내",
    date: "2026-01-20",
  },
];

export function formatNoticeDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}

export function getNoticeById(id: string): NoticeItem | undefined {
  return NOTICE_ITEMS.find((item) => item.id === id);
}

export function getNextNotice(id: string): NoticeItem | undefined {
  const index = NOTICE_ITEMS.findIndex((item) => item.id === id);
  if (index < 0 || index >= NOTICE_ITEMS.length - 1) return undefined;
  return NOTICE_ITEMS[index + 1];
}

export function getNoticeDetailHref(id: string): string {
  return `/support/notices/${id}`;
}

export function filterNotices<T extends { title: string; categoryLabel: string }>(
  items: T[],
  query: string
): T[] {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return items;

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.categoryLabel.toLowerCase().includes(keyword)
  );
}

export function paginateNotices<T>(items: T[], page: number, perPage: number) {
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

export function getNoticeListNumber(
  totalItems: number,
  page: number,
  perPage: number,
  index: number
): number {
  return totalItems - (page - 1) * perPage - index;
}

export function getNoticeBody(item: NoticeItem): string[] {
  if (item.body?.length) return item.body;

  return [
    `${item.title}에 대한 안내입니다.`,
    "자세한 문의는 고객센터(031-371-7083)로 연락해 주시기 바랍니다.",
  ];
}

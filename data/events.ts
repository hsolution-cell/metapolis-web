export type EventStatus = "ongoing" | "ended";
export type EventFilter = "all" | EventStatus;

export type EventItem = {
  id: string;
  title: string;
  thumbnail?: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  body?: string[];
  contentImage?: string;
  /** 매장 이벤트 — storeDirectory id */
  storeId?: string;
  /** 매장 이벤트 — 카드 뱃지용 브랜드명 */
  brandName?: string;
  /** 상단 고정 */
  pinned?: boolean;
};

export type EventListKind = "metapolis" | "store";

export const EVENT_LIST_PATHS: Record<EventListKind, string> = {
  metapolis: "/events",
  store: "/events/stores",
};

export const EVENTS_PER_PAGE = 9;

export const EVENT_DETAIL_BANNER = "/img/sub/banner/menu3-1.png";

export const METAPOLIS_EVENTS: EventItem[] = [
  {
    id: "summer-benefit",
    title: "여름 시즌 특별 혜택",
    startDate: "2026-07-01",
    endDate: "2026-07-30",
    createdAt: "2026-06-20",
    body: [
      "무더운 여름을 맞아 메타폴리스몰 고객 여러분께 특별한 혜택을 준비했습니다.",
      "기간 내 방문하시면 다양한 사은품과 할인 쿠폰을 받으실 수 있습니다.",
    ],
  },
  {
    id: "welcome-gift",
    title: "신규 회원 웰컴 기프트",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    createdAt: "2026-05-28",
    body: [
      "메타폴리스몰 신규 회원을 위한 웰컴 기프트 이벤트를 진행합니다.",
      "회원 가입 후 안내데스크 또는 서비스 데스크에서 사은품을 수령해 주세요.",
    ],
  },
  {
    id: "weekend-lucky",
    title: "주말 럭키 드로우",
    startDate: "2026-06-14",
    endDate: "2026-07-13",
    createdAt: "2026-06-10",
    body: [
      "매주 주말, 메타폴리스몰을 방문하신 고객님을 대상으로 럭키 드로우를 진행합니다.",
      "영수증을 지참하시고 2층 서비스 데스크에서 응모해 주세요.",
    ],
  },
  {
    id: "kids-day",
    title: "키즈 데이 패밀리 페스티벌",
    startDate: "2026-05-01",
    endDate: "2026-05-05",
    createdAt: "2026-04-22",
  },
  {
    id: "spring-sale",
    title: "봄맞이 쇼핑 위크",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    createdAt: "2026-03-25",
  },
  {
    id: "parking-free",
    title: "주차 무료 프로모션",
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    createdAt: "2026-02-20",
  },
  {
    id: "opening-celebration",
    title: "리뉴얼 오픈 기념 이벤트",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    createdAt: "2026-01-26",
  },
  {
    id: "new-year",
    title: "새해 맞이 포춘 이벤트",
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    createdAt: "2025-12-28",
  },
  {
    id: "christmas-market",
    title: "크리스마스 마켓",
    startDate: "2025-12-01",
    endDate: "2025-12-25",
    createdAt: "2025-11-20",
  },
  {
    id: "black-friday",
    title: "블랙 프라이데이 특가",
    startDate: "2025-11-20",
    endDate: "2025-11-30",
    createdAt: "2025-11-10",
  },
  {
    id: "autumn-festival",
    title: "가을 단풍 페스티벌",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    createdAt: "2025-09-18",
  },
  {
    id: "chuseok-gift",
    title: "추석 맞이 사은품 증정",
    startDate: "2025-09-15",
    endDate: "2025-09-30",
    createdAt: "2025-09-01",
  },
];

export const STORE_EVENTS: EventItem[] = [
  {
    id: "homeplus-summer",
    title: "홈플러스 여름 대전",
    brandName: "홈플러스",
    storeId: "homeplus",
    startDate: "2026-06-20",
    endDate: "2026-07-31",
    createdAt: "2026-06-15",
    body: [
      "홈플러스에서 여름 시즌 대전을 진행합니다.",
      "신선식품 및 생활용품 특가 행사와 함께 다양한 사은품을 만나보세요.",
    ],
  },
  {
    id: "cgv-movie-week",
    title: "CGV 시네마 위크",
    brandName: "CGV",
    storeId: "cgv-a-4f",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    createdAt: "2026-05-25",
    body: [
      "CGV 메타폴리스몰점에서 시네마 위크를 진행합니다.",
      "기간 내 영화 관람 시 팝콘 업그레이드 혜택을 드립니다.",
    ],
  },
  {
    id: "starbucks-sizeup",
    title: "스타벅스 사이즈업 데이",
    brandName: "스타벅스",
    storeId: "starbucks-a-b2",
    startDate: "2026-06-10",
    endDate: "2026-07-10",
    createdAt: "2026-06-05",
  },
  {
    id: "juno-hair-promo",
    title: "준오헤어 시즌 프로모션",
    brandName: "준오헤어",
    storeId: "juno_hair",
    startDate: "2026-05-15",
    endDate: "2026-06-30",
    createdAt: "2026-05-10",
  },
  {
    id: "jessymix-sale",
    title: "제시믹스 봄·여름 시즌 세일",
    brandName: "제시믹스",
    storeId: "jessymix",
    startDate: "2026-04-01",
    endDate: "2026-06-15",
    createdAt: "2026-03-28",
  },
  {
    id: "aladin-book-fair",
    title: "알라딘 중고서점 북 페어",
    brandName: "알라딘",
    storeId: "aladin",
    startDate: "2026-03-10",
    endDate: "2026-04-10",
    createdAt: "2026-03-01",
  },
  {
    id: "resortlab-living",
    title: "리조트랩 홈리빙 기획전",
    brandName: "리조트랩",
    storeId: "resortlab",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    createdAt: "2026-01-20",
  },
  {
    id: "bandiinhouse-gift",
    title: "반디인하우스 구매 사은품 증정",
    brandName: "반디인하우스",
    storeId: "bandiinhouse",
    startDate: "2026-01-10",
    endDate: "2026-01-31",
    createdAt: "2026-01-05",
  },
  {
    id: "adidas-outlet",
    title: "아디다스 아울렛 특가",
    brandName: "아디다스",
    storeId: "adidas",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    createdAt: "2025-11-25",
  },
  {
    id: "spao-winter",
    title: "스파오 윈터 컬렉션 할인",
    brandName: "스파오",
    storeId: "spao",
    startDate: "2025-11-15",
    endDate: "2025-12-15",
    createdAt: "2025-11-08",
  },
  {
    id: "zara-new-open",
    title: "ZARA 신상품 런칭 이벤트",
    brandName: "ZARA",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    createdAt: "2025-09-22",
  },
  {
    id: "uniqlo-heattech",
    title: "유니클로 히트텍 프로모션",
    brandName: "유니클로",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    createdAt: "2025-08-28",
  },
];

export function getEventsByKind(kind: EventListKind): EventItem[] {
  return kind === "metapolis" ? METAPOLIS_EVENTS : STORE_EVENTS;
}

export function getEventById(
  events: EventItem[],
  id: string
): EventItem | undefined {
  return events.find((event) => event.id === id);
}

export function getNextEvent(
  events: EventItem[],
  id: string
): EventItem | undefined {
  const index = events.findIndex((event) => event.id === id);
  if (index < 0 || index >= events.length - 1) return undefined;
  return events[index + 1];
}

export function getEventDetailHref(kind: EventListKind, id: string): string {
  return `${EVENT_LIST_PATHS[kind]}/${id}`;
}

export function getEventStatus(
  event: EventItem,
  today: Date = new Date()
): EventStatus {
  const end = new Date(`${event.endDate}T23:59:59`);
  return today > end ? "ended" : "ongoing";
}

export function formatEventDateRange(startDate: string, endDate: string): string {
  const [startYear, startMonth, startDay] = startDate.split("-");
  const [endYear, endMonth, endDay] = endDate.split("-");

  if (startYear === endYear) {
    return `${startYear}.${startMonth}.${startDay} - ${endMonth}.${endDay}`;
  }

  return `${startYear}.${startMonth}.${startDay} - ${endYear}.${endMonth}.${endDay}`;
}

export function formatEventCreatedDate(event: EventItem): string {
  const date = event.createdAt ?? event.startDate;
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}

export function getEventBody(event: EventItem): string[] {
  if (event.body?.length) return event.body;

  return [
    `${event.title} 이벤트에 대한 상세 안내입니다.`,
    "자세한 참여 방법 및 유의사항은 아래 내용을 확인해 주세요.",
  ];
}

export function filterEvents(
  events: EventItem[],
  filter: EventFilter,
  today: Date = new Date()
): EventItem[] {
  if (filter === "all") return events;

  return events.filter((event) => getEventStatus(event, today) === filter);
}

export function paginateEvents<T>(items: T[], page: number, perPage: number) {
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

export function getOngoingStoreEvents(today: Date = new Date()): EventItem[] {
  return STORE_EVENTS.filter(
    (event) =>
      Boolean(event.storeId || event.brandName) &&
      getEventStatus(event, today) === "ongoing"
  );
}

type StoreEventLookup = {
  id: string;
  name: string;
};

export function getOngoingStoreEventForStore(
  store: StoreEventLookup,
  today: Date = new Date()
): EventItem | undefined {
  return getOngoingStoreEvents(today).find((event) => {
    if (event.storeId && event.storeId === store.id) return true;
    if (event.brandName && event.brandName === store.name) return true;
    return false;
  });
}

export function getOngoingStoreEventByStoreId(
  storeId: string,
  today: Date = new Date()
): EventItem | undefined {
  return getOngoingStoreEvents(today).find((event) => event.storeId === storeId);
}

export function getOngoingStoreEventHref(
  store: StoreEventLookup,
  today: Date = new Date()
): string | undefined {
  const event = getOngoingStoreEventForStore(store, today);
  if (!event) return undefined;
  return getEventDetailHref("store", event.id);
}

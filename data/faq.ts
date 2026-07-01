export type FaqCategory = "guide" | "service" | "parking" | "partnership";

export type FaqCategoryFilter = "all" | FaqCategory;

export type FaqItem = {
  id: string;
  num: string;
  category: FaqCategory;
  categoryLabel: string;
  question: string;
  answer: string;
};

export const FAQ_PER_PAGE = 9;

export const FAQ_CATEGORIES: { id: FaqCategoryFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "guide", label: "이용안내" },
  { id: "service", label: "편의·서비스" },
  { id: "parking", label: "주차·교통" },
  { id: "partnership", label: "입점·제휴" },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "partnership-inquiry",
    num: "01",
    category: "partnership",
    categoryLabel: "입점·제휴",
    question: "제휴문의는 어떻게 하나요?",
    answer:
      '제휴 및 대관 문의 등은 홈페이지 고객센터 내 <a href="/support/inquiry">[문의하기]</a>를 클릭하시어 대표전화로 접수해 주시면 담당자가 안내해 드립니다.',
  },
  {
    id: "public-transport",
    num: "02",
    category: "parking",
    categoryLabel: "주차·교통",
    question: "대중교통 이용시 어떻게 가야 하나요?",
    answer:
      '메타폴리스 홈페이지 內 <a href="/location">오시는 길</a> 페이지를 확인해 주시기 바랍니다.',
  },
  {
    id: "refund-policy",
    num: "03",
    category: "guide",
    categoryLabel: "이용안내",
    question: "교환이나 환불기준은 어떻게 되나요?",
    answer:
      "교환 및 환불은 구입일을 포함한 7일 이내에 가능합니다.<br /><br />① 상품을 구매하신 영수증과<br />② 구매 시 사용한 결제 수단(신용카드 등)<br />③ 구입하신 상태 그대로의 상품을 지참하시고, 메타폴리스에서 구매하신 매장에 방문하시면 교환 또는 환불이 가능합니다.<br /><br />※ 교환 또는 환불이 불가능한 상품<br />- 사용/착용/수선/오염/세탁 등으로 인한 재판매 불가 상품<br />- 제품 구매 시 교환 또는 환불 불가에 대한 별도의 안내 상품<br />- 매장 규정에 의해 구입처 외 교환 또는 환불이 불가능한 상품<br /><br />상품의 교환 또는 환불 가능여부를 방문 전 유선으로 확인하실 경우, 고객님의 소중한 시간과 비용을 절약하실 수 있습니다.",
  },
  {
    id: "nursing-room",
    num: "04",
    category: "service",
    categoryLabel: "편의·서비스",
    question: "수유실이 있나요?",
    answer:
      "수유실은 A Block 4층, B Block 4층에 위치해 있습니다.<br />- 수유실 운영시간 : 메타폴리스 영업시간과 동일(10:30 ~ 22:00)",
  },
  {
    id: "smoking-room",
    num: "05",
    category: "service",
    categoryLabel: "편의·서비스",
    question: "흡연실이 있나요?",
    answer:
      "흡연실은 A Block 4층, B Block 3층에 위치해 있습니다.<br />- 흡연실 운영시간 : 메타폴리스 영업시간과 동일(10:30 ~ 22:00)",
  },
  {
    id: "lost-found",
    num: "06",
    category: "service",
    categoryLabel: "편의·서비스",
    question: "물건을 잃어버렸어요",
    answer:
      "메타폴리스 내에서의 분실물 또는 습득물은 서비스 데스크에 문의하시기 바랍니다.<br />- 서비스 데스크 전화번호 : 031-371-7083~5<br />- 서비스 데스크 위치 : A Block 2층",
  },
  {
    id: "stroller-wheelchair",
    num: "07",
    category: "service",
    categoryLabel: "편의·서비스",
    question: "유모차/ 휠 체어 대여는 어디에서 하나요?",
    answer:
      "유모차 / 휠체어 대여는 서비스 데스크(A Block 2층)에서 가능합니다. 이용 시 신분증을 맡겨야 하며, 유모차는 유아(24개월 미만) 동반 시 대여 가능합니다.<br />- 서비스 데스크 운영시간 : 10:30 ~ 22:00",
  },
  {
    id: "regular-holiday",
    num: "08",
    category: "guide",
    categoryLabel: "이용안내",
    question: "메타폴리스의 정기휴무일은 언제인가요?",
    answer:
      "메타폴리스는 연중무휴입니다.<br />하지만, 일부 매장은 사정에 따라 휴무일 수 있습니다.<br />개별 매장 휴무일은 메타폴리스 홈페이지 또는 해당 매장 전화문의를 통해 확인하실 수 있습니다.",
  },
  {
    id: "business-hours",
    num: "09",
    category: "guide",
    categoryLabel: "이용안내",
    question: "메타폴리스의 영업시간이 궁금합니다.",
    answer:
      '메타폴리스의 영업시간은 오전 10시 30분부터 오후 10시까지입니다.<br />일부 매장의 경우 영업시간이 다를 수 있습니다.<br /><br />※ 자세한 영업시간은 <a href="/hours">홈페이지</a> 또는 전화 문의를 통해 확인하실 수 있습니다.',
  },
];

export const FAQ_TAGS = [
  "#제휴 문의",
  "#대중교통·오시는 길",
  "#교환·환불",
  "#수유실·흡연실",
  "#분실물·유모차·휠체어",
  "#영업시간·휴무일",
  "#FAQ",
];

export function filterFaqItems(
  items: FaqItem[],
  category: FaqCategoryFilter
): FaqItem[] {
  if (category === "all") return items;
  return items.filter((item) => item.category === category);
}

export function paginateFaqItems<T>(items: T[], page: number, perPage: number) {
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

export function getFaqListNumber(
  totalItems: number,
  page: number,
  perPage: number,
  index: number
): number {
  return totalItems - (page - 1) * perPage - index;
}

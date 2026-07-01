import type { BranchBlock } from "@/data/branchStores";

export type MajorStoreDetailRow = {
  label: string;
  value: string;
  link?: { label: string };
};

export type MajorStore = {
  id: string;
  category: string;
  name: string;
  detailName?: string;
  cardLocation: string;
  locationBadge: string;
  floorGuide: {
    block: BranchBlock;
    floorId: string;
  };
  description: string;
  cardLogo: string;
  detailLogo: string;
  image: string;
  imageAlt: string;
  isNew?: boolean;
  details: MajorStoreDetailRow[];
};

export const MAJOR_STORES: MajorStore[] = [
  {
    id: "cgv",
    category: "CULTURE · 영화관",
    name: "CGV",
    cardLocation: "A블록 3·4F",
    locationBadge: "A블록 3·4F",
    floorGuide: { block: "a", floorId: "3f" },
    description:
      "선진화된 관람 문화와 최고의 서비스로 영화 그 이상의 감동을 선사합니다",
    cardLogo: "/img/main_branch_store_cgv.png",
    detailLogo: "/img/sub/stores/cgv-logo.png",
    image: "/img/sub/stores/cgv.png",
    imageAlt: "CGV 영화관 내부",
    details: [
      { label: "Hours", value: "07:00 – 03:00 (상영 시간표 확인)" },
      { label: "Tel", value: "1544-1122" },
      {
        label: "Location",
        value: "A블록 3·4층",
        link: { label: "위치 확인하기" },
      },
      { label: "Parking", value: "영화 관람 시 3시간 무료" },
    ],
  },
  {
    id: "homeplus",
    category: "MART · 대형마트",
    name: "홈플러스",
    cardLocation: "B블록 B2 ~ B5",
    locationBadge: "B블록 B2 ~ B5",
    floorGuide: { block: "b", floorId: "b2b4" },
    description:
      "엄선된 신선함과 합리적인 가치로 쇼핑 그 이상의 풍요로운 일상을 선물합니다",
    cardLogo: "/img/main_branch_store_homeplus.png",
    detailLogo: "/img/sub/stores/homeplus-logo.png",
    image: "/img/sub/stores/homeplus.png",
    imageAlt: "홈플러스 매장",
    details: [
      { label: "Hours", value: "10:00 – 24:00 (2·4번째 일요일 휴무)" },
      { label: "Tel", value: "031-8015-7000" },
      {
        label: "Location",
        value: "B블록 B2 ~ B5",
        link: { label: "위치 확인하기" },
      },
      { label: "Parking", value: "구매 금액별 무료 시간 상이" },
    ],
  },
  {
    id: "outback",
    category: "DINING · 레스토랑",
    name: "아웃백",
    detailName: "아웃백 스테이크 하우스",
    cardLocation: "A블록 3F",
    locationBadge: "A블록 3F",
    floorGuide: { block: "a", floorId: "3f" },
    description:
      "완벽한 굽기의 스테이크와 따뜻한 환대로 특별한 추억을 남기는 아웃백입니다",
    cardLogo: "/img/main_branch_store_outback.png",
    detailLogo: "/img/sub/stores/outback-logo.png",
    image: "/img/sub/stores/outback.jpg",
    imageAlt: "아웃백 스테이크",
    details: [
      {
        label: "Hours",
        value: "월 ~ 목 11:00 – 22:00 / 금 ~ 일 10:30 – 22:00",
      },
      { label: "Tel", value: "031-8015-4261" },
      {
        label: "Location",
        value: "A블록 3층",
        link: { label: "위치 확인하기" },
      },
      { label: "Parking", value: "구매 금액별 무료 시간 상이" },
    ],
  },
  {
    id: "aladin",
    category: "BOOK · 중고서점",
    name: "알라딘",
    detailName: "알라딘 중고서점",
    cardLocation: "B블록 4F",
    locationBadge: "B블록 4F",
    floorGuide: { block: "b", floorId: "4f" },
    description:
      "넓고 탁 트인 문화 공간 속 가치있는 지식으로 독서의 재발견을 선사해 드립니다",
    cardLogo: "/img/main_branch_store_aladin.png",
    detailLogo: "/img/sub/stores/aladin-logo.png",
    image: "/img/sub/stores/aladin.png",
    imageAlt: "알라딘 중고서점",
    isNew: true,
    details: [
      { label: "Hours", value: "09:30 – 22:00" },
      { label: "Tel", value: "1544-2514" },
      {
        label: "Location",
        value: "B블록 4층",
        link: { label: "위치 확인하기" },
      },
      { label: "Parking", value: "구매 금액별 무료 시간 상이" },
    ],
  },
  {
    id: "zin",
    category: "LIVING · 인테리어",
    name: "LX Z:IN",
    detailName: "LX Z:IN 인테리어",
    cardLocation: "B블록 2F",
    locationBadge: "B블록 2F",
    floorGuide: { block: "b", floorId: "2f" },
    description:
      "프리미엄 소재와 감각적인 디자인으로 공간 그 이상의 품격 있는 삶을 완성합니다",
    cardLogo: "/img/main_branch_store_zin.png",
    detailLogo: "/img/sub/stores/zin-logo.png",
    image: "/img/sub/stores/zin.png",
    imageAlt: "LX Z:IN 인테리어 쇼룸",
    details: [
      { label: "Hours", value: "10:30 – 22:00" },
      { label: "Tel", value: "-" },
      {
        label: "Location",
        value: "B블록 2층",
        link: { label: "위치 확인하기" },
      },
      { label: "Parking", value: "구매 금액별 무료 시간 상이" },
    ],
  },
  {
    id: "theblackbelt",
    category: "KIDS · 키즈 플레이",
    name: "챔피언 더 블랙벨트",
    cardLocation: "B블록 3F",
    locationBadge: "B블록 3F",
    floorGuide: { block: "b", floorId: "3f" },
    description:
      "다이내믹한 체험과 도전으로 놀이 그 이상의 짜릿한 성취감을 안겨드립니다",
    cardLogo: "/img/main_branch_store_theblackbelt.png",
    detailLogo: "/img/sub/stores/theblackbelt-logo.png",
    image: "/img/sub/stores/theblackbelt.png",
    imageAlt: "챔피언 더 블랙벨트 키즈존",
    details: [
      { label: "Hours", value: "10:30 – 22:00" },
      { label: "Tel", value: "031-8003-2969" },
      {
        label: "Location",
        value: "B블록 3층",
        link: { label: "위치 확인하기" },
      },
      { label: "Parking", value: "구매 금액별 무료 시간 상이" },
    ],
  },
  {
    id: "muji",
    category: "LIFESTYLE · 라이프스타일",
    name: "무인양품",
    cardLocation: "B블록 1F",
    locationBadge: "B블록 1F",
    floorGuide: { block: "b", floorId: "1f" },
    description:
      "본질에 충실한 디자인과 기분 좋은 쓰임새로 편안한 일상을 제안합니다",
    cardLogo: "/img/main_branch_store_muji.png",
    detailLogo: "/img/sub/stores/muji-logo.png",
    image: "/img/sub/stores/muji.jpg",
    imageAlt: "무인양품 매장",
    details: [
      { label: "Hours", value: "10:30 – 22:00" },
      { label: "Tel", value: "031-8015-8024 (8025)" },
      {
        label: "Location",
        value: "B블록 1층",
        link: { label: "위치 확인하기" },
      },
      { label: "Parking", value: "구매 금액별 무료 시간 상이" },
    ],
  },
];

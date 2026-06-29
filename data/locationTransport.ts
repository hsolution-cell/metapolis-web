export type LocationBadgeType = "subway" | "bus-red" | "bus-green";

export type LocationRouteItem = {
  id: string;
  badge: { type: LocationBadgeType; label: string };
  /** 일반 문자열 또는 `<b>강조</b>` 인라인 마크업 */
  title: string;
  lines: string[];
  highlights?: string[];
};

export type LocationCarIcon = "nav" | "road" | "car";

export type LocationCarRouteItem = {
  id: string;
  icon: LocationCarIcon;
  title: string;
  lines: string[];
  highlights?: string[];
};

export const SUBWAY_ROUTES: LocationRouteItem[] = [
  {
    id: "byeongjeom-exit-1",
    badge: { type: "subway", label: "1" },
    title: "<b>병점역 1번</b> 출구",
    lines: ["병점역 · 화성청년지원센터 > 12·17·81·H4 승차 > 메타폴리스 하차"],
    highlights: ["메타폴리스 하차"],
  },
  {
    id: "byeongjeom-exit-2",
    badge: { type: "subway", label: "1" },
    title: "<b>병점역 2번</b> 출구",
    lines: [
      "병점역 후문 > 17·81·H65·H67·1001 승차 > 메타폴리스 하차",
      "병점역 후문 > 1000·1001 승차 > 동탄홈플러스 하차",
    ],
    highlights: ["메타폴리스 하차", "동탄홈플러스 하차"],
  },
  {
    id: "byeongjeom-cross",
    badge: { type: "subway", label: "1" },
    title: "<b>병점역 사거리</b>",
    lines: [
      "병점역 사거리 > 27·27-2·73·708 승차 > 메타폴리스 하차",
      "병점역 사거리 > 1000·1001 승차 > 동탄홈플러스 하차",
    ],
    highlights: ["메타폴리스 하차", "동탄홈플러스 하차"],
  },
];

export const BUS_ROUTES: LocationRouteItem[] = [
  {
    id: "seoul-station",
    badge: { type: "bus-red", label: "R" },
    title: "<b>서울역</b> (4108, M4108)",
    lines: ["서울역 > 을지로입구 > 한빛마을 (중) > 메타폴리스 (중)"],
    highlights: ["메타폴리스 (중)"],
  },
  {
    id: "gangnam-station",
    badge: { type: "bus-red", label: "R" },
    title: "<b>강남역</b> (4403, M4403, 8501, 8502)",
    lines: ["강남역 > 신논현역 > 예당마을 > 한빛마을 (중) > 메타폴리스 (중)"],
    highlights: ["메타폴리스 (중)"],
  },
  {
    id: "suwon-station",
    badge: { type: "bus-green", label: "G" },
    title: "<b>수원역</b> (7-1)",
    lines: ["수원역 > AK플라자 정류장 승차 > 메타폴리스 (중)"],
    highlights: ["메타폴리스 (중)"],
  },
  {
    id: "osan-city-hall",
    badge: { type: "bus-green", label: "G" },
    title: "<b>오산시청</b> (116-1)",
    lines: ["오산시청 > 운암주공4단지 승차 > 메타폴리스 (중)"],
    highlights: ["메타폴리스 (중)"],
  },
  {
    id: "yongin-city-hall",
    badge: { type: "bus-green", label: "G" },
    title: "<b>용인시청</b> (10, 66-4)",
    lines: ["용인시청 > 시청, 용인대역 승차 > 구법원사거리 하차 > 62-1 환승 > 메타폴리스 (중)"],
    highlights: ["메타폴리스 (중)"],
  },
];

export const CAR_ROUTES: LocationCarRouteItem[] = [
  {
    id: "navigation",
    icon: "nav",
    title: "네비게이션 검색",
    lines: [
      "A블록 경기 화성시 동탄중앙로 220",
      "B블록 경기 화성시 동탄중앙로 200",
    ],
    highlights: ["A블록", "B블록"],
  },
  {
    id: "highway",
    icon: "road",
    title: "고속도로 이용 시",
    lines: ["용인·서울고속도로 → 영천교차로 → 동탄신도시 방향"],
    highlights: ["동탄신도시 방향"],
  },
  {
    id: "from-seoul",
    icon: "car",
    title: "서울 방면에서 출발",
    lines: ["경부고속도로 진입 → 기흥동탄IC 출구 → 동탄방면 직진 → 동탄다은마을 방향"],
    highlights: ["동탄다은마을 방향"],
  },
  {
    id: "from-suwon",
    icon: "car",
    title: "수원 방면에서 출발",
    lines: ["오산방면 → 패션아일랜드 고가 직진 → 반정교차로 지하도 → 동탄다은마을 방향"],
    highlights: ["동탄다은마을 방향"],
  },
  {
    id: "from-osan",
    icon: "car",
    title: "오산 방면에서 출발",
    lines: ["동부대로 고가에서 동탄 방면 좌회전 → 기흥 톨게이트방면 → 동탄다은마을 방향"],
    highlights: ["동탄다은마을 방향"],
  },
  {
    id: "from-yongin",
    icon: "car",
    title: "용인 방면에서 출발",
    lines: ["보라교 사거리에서 영천교차로 방면 → 동탄중앙로 → 동탄다은마을 방향"],
    highlights: ["동탄다은마을 방향"],
  },
];

export const LOCATION_ADDRESS = "경기 화성시 동탄중앙로 220 메타폴리스";
export const LOCATION_PHONE = "031-371-7000";
export const LOCATION_MAP_LINK =
  "https://map.naver.com/p/search/%EB%A9%94%ED%83%80%ED%8F%B4%EB%A6%AC%EC%8A%A4%20%EB%8F%99%ED%83%84/place/";

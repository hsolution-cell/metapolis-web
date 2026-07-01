export type FacilityIconId =
  | "service"
  | "nursing"
  | "accessible"
  | "parking"
  | "security";

export type FacilityLocationBadge = {
  block: "a" | "b";
  floor: string;
};

export type FacilityDetailRow = {
  label: string;
  value?: string;
  locations?: FacilityLocationBadge[];
};

export type Facility = {
  id: string;
  category: string;
  name: string;
  cardLocation: string;
  locationBadge: string;
  description: string;
  imageCaption: string;
  image: string;
  imageAlt: string;
  icon: FacilityIconId;
  details: FacilityDetailRow[];
};

const IMAGE_BASE = "/img/sub/facilities";

export const FACILITIES: Facility[] = [
  {
    id: "service-desk",
    category: "SERVICE DESK · 안내",
    name: "서비스 데스크",
    cardLocation: "A블록 2F",
    locationBadge: "A블록 2F",
    description:
      "고객 불편사항 접수, 미아 보호 서비스, 유모차 및 휠체어 대여 등 방문 고객을 위한 기본 안내 서비스를 제공합니다.",
    imageCaption: "SERVICE",
    image: `${IMAGE_BASE}/service.jpg`,
    imageAlt: "서비스 데스크 안내 데스크",
    icon: "service",
    details: [
      { label: "Hours", value: "10:30 – 22:00" },
      { label: "Tel", value: "031-371-7083~5" },
      {
        label: "Location",
        locations: [{ block: "a", floor: "2F" }],
      },
    ],
  },
  {
    id: "nursing-room",
    category: "NURSING ROOM · 휴게",
    name: "유아 휴게실",
    cardLocation: "A · B블록 4F",
    locationBadge: "A · B블록 4F",
    description:
      "아기와 엄마가 편안하게 머무를 수 있도록 수유, 기저귀 교환, 휴식 공간을 마련한 가족 배려 공간입니다.",
    imageCaption: "NURSING",
    image: `${IMAGE_BASE}/nursing.jpg`,
    imageAlt: "유아 휴게실 내부",
    icon: "nursing",
    details: [
      { label: "Hours", value: "10:30 – 22:00" },
      { label: "Tel", value: "031-371-7000" },
      {
        label: "Location",
        locations: [
          { block: "a", floor: "4F" },
          { block: "b", floor: "4F" },
        ],
      },
    ],
  },
  {
    id: "accessible-restroom",
    category: "ACCESSIBLE RESTROOM · 화장실",
    name: "장애인 화장실",
    cardLocation: "전 층 운영",
    locationBadge: "전 층 운영",
    description:
      "모든 고객이 불편 없이 이용할 수 있도록 A·B블록 전 층에 넓고 안전한 장애인 전용 화장실을 운영합니다.",
    imageCaption: "ACCESS",
    image: `${IMAGE_BASE}/accessible.jpg`,
    imageAlt: "장애인 화장실",
    icon: "accessible",
    details: [
      { label: "Hours", value: "10:30 – 22:00" },
      {
        label: "Location",
        locations: [
          { block: "a", floor: "B2" },
          { block: "a", floor: "1F" },
          { block: "a", floor: "2F" },
          { block: "a", floor: "3F" },
          { block: "a", floor: "4F" },
          { block: "b", floor: "1F" },
          { block: "b", floor: "2F" },
          { block: "b", floor: "3F" },
          { block: "b", floor: "4F" },
        ],
      },
    ],
  },
  {
    id: "parking-office",
    category: "PARKING OFFICE · 주차",
    name: "주차 관제실",
    cardLocation: "B블록 1F",
    locationBadge: "B블록 1F",
    description:
      "주차 위치 안내, 무료주차 시간 적용, 차량 관련 문의 등 쾌적한 주차 이용을 위한 모든 사항을 도와드립니다.",
    imageCaption: "PARKING",
    image: `${IMAGE_BASE}/parking.jpg`,
    imageAlt: "주차 관제실",
    icon: "parking",
    details: [
      { label: "Hours", value: "10:30 – 22:00" },
      { label: "Tel", value: "031-371-7078" },
      {
        label: "Location",
        locations: [{ block: "b", floor: "1F" }],
      },
    ],
  },
  {
    id: "security-office",
    category: "SECURITY OFFICE · 보안",
    name: "보안실",
    cardLocation: "A블록 B2",
    locationBadge: "A블록 B2",
    description:
      "분실물 보관, 안전 관리, 비상 상황 대응 등 고객이 안심하고 머무를 수 있도록 24시간 운영합니다.",
    imageCaption: "SECURITY",
    image: `${IMAGE_BASE}/security.jpg`,
    imageAlt: "보안실",
    icon: "security",
    details: [
      { label: "Hours", value: "24hr" },
      { label: "Tel", value: "031-371-7080" },
      {
        label: "Location",
        locations: [{ block: "a", floor: "B2" }],
      },
    ],
  },
];

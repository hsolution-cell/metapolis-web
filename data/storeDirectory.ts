import { BRANCH_FLOORS, type BranchBlock } from "@/data/branchStores";
import {
  getOngoingStoreEventForStore,
  getOngoingStoreEventHref,
} from "@/data/events";

/** 카드 아이콘용 (층별·카테고리별 공통) */
export type StoreIconCategory =
  | "fashion" // 파란색 패션
  | "lingerie" // 분홍색 이너웨어
  | "shoes" // 보라색 신발
  | "fb" // 주황색 F&B
  | "cafe" // 노란색 카페
  | "service" // 회색 기타
  | "hair_service" // 회색 미용실
  | "makeup" // 분홍색 화장품
  | "jewelry" // 노란색 귀금속
  | "digital" // 청록색 디지털민트 전자기기
  | "culture" // 빨간색 영화관
  | "book" // 회색 서점
  | "hospital" // 연두색 병원·의원
  | "arcade" // 청록색 오락실
  | "mart" // 파란색 카트
  | "kids" // 파란색 아이옷
  | "living"; // 노란색 인테리어

/** iconCategory → guideCategory 매핑 규칙
 *  fashion · shoes · jewelry · lingerie · kids → fashion
 *  fb · cafe → dining
 *  hair_service · makeup · hospital → beauty
 *  living · book · digital · culture · arcade → lifestyle
 *  mart · service → more
 */

/** 카테고리별 안내 사이드바 필터 (all은 가상 필터) */
export type StoreGuideCategory =
  | "fashion"
  | "dining"
  | "beauty"
  | "lifestyle"
  | "more";

export type StoreGuideCategoryFilter = "all" | StoreGuideCategory;

export type StoreRecord = {
  id: string;
  name: string;
  block: BranchBlock;
  floorId: string;
  tel: string;
  iconCategory: StoreIconCategory;
  guideCategory: StoreGuideCategory;
  isSignature?: boolean;
};

export type StoreGuideCategoryMeta = {
  id: StoreGuideCategoryFilter;
  labelEn: string;
  labelKo: string;
};

export const STORE_GUIDE_CATEGORIES: StoreGuideCategoryMeta[] = [
  { id: "all", labelEn: "ALL", labelKo: "전체 매장" },
  { id: "fashion", labelEn: "Fashion", labelKo: "패션 · 잡화" },
  { id: "dining", labelEn: "Dining", labelKo: "식 · 음료" },
  { id: "beauty", labelEn: "Beauty", labelKo: "뷰티 · 헬스" },
  { id: "lifestyle", labelEn: "Lifestyle", labelKo: "리빙 · 컬처" },
  { id: "more", labelEn: "More", labelKo: "마트 · 기타" },
];

export const STORE_DIRECTORY: StoreRecord[] = [
  // A · 4F
  {
    id: "cgv-a-4f",
    name: "CGV",
    block: "a",
    floorId: "4f",
    tel: "1544-1122",
    iconCategory: "culture",
    guideCategory: "lifestyle",
    isSignature: true,
  },
  {
    id: "mad_for_garlic",
    name: "매드포갈릭",
    block: "a",
    floorId: "4f",
    tel: "031-8015-4101",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "gongcha",
    name: "공차",
    block: "a",
    floorId: "4f",
    tel: "031-371-7000",
    iconCategory: "cafe",
    guideCategory: "dining",
  },
  {
    id: "sinryongpumara",
    name: "신룽푸마라탕",
    block: "a",
    floorId: "4f",
    tel: "031-8003-8372",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "sushi_sun",
    name: "스시선",
    block: "a",
    floorId: "4f",
    tel: "031-8015-1777",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "hinoajiri",
    name: "히노아지",
    block: "a",
    floorId: "4f",
    tel: "031-8003-4030",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "hongdadaeomimi",
    name: "홍대개미",
    block: "a",
    floorId: "4f",
    tel: "031-8003-3892",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "hansungkalguksu",
    name: "황생가칼국수",
    block: "a",
    floorId: "4f",
    tel: "031-613-4559",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "mangabu",
    name: "만가부",
    block: "a",
    floorId: "4f",
    tel: "031-8003-2035",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "juno_hair",
    name: "준오헤어",
    block: "a",
    floorId: "4f",
    tel: "031-8015-4102",
    iconCategory: "hair_service",
    guideCategory: "beauty",
  },
  {
    id: "bandiinhouse",
    name: "반디인하우스",
    block: "a",
    floorId: "4f",
    tel: "010-8689-8241",
    iconCategory: "living",
    guideCategory: "lifestyle",
  },
  {
    id: "yoshikatsu",
    name: "요시카츠",
    block: "a",
    floorId: "4f",
    tel: "031-613-5525",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "namdopansikㅊ",
    name: "남도분식",
    block: "a",
    floorId: "4f",
    tel: "031-613-5525",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "hongsujjimdak",
    name: "홍수계찜닭",
    block: "a",
    floorId: "4f",
    tel: "031-613-6755",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "abikko",
    name: "아비꼬",
    block: "a",
    floorId: "4f",
    tel: "031-613-8101",
    iconCategory: "fb",
    guideCategory: "dining",
  },

  // A · 3F
  {
    id: "cgv-a-3f",
    name: "CGV",
    block: "a",
    floorId: "3f",
    tel: "031-8015-4110",
    iconCategory: "culture",
    guideCategory: "lifestyle",
    isSignature: true,
  },
  {
    id: "geogung",
    name: "거궁",
    block: "a",
    floorId: "3f",
    tel: "031-8003-4007",
    iconCategory: "fb",
    guideCategory: "dining",
    isSignature: true,
  },
  {
    id: "thaiisland",
    name: "콘타이",
    block: "a",
    floorId: "3f",
    tel: "031-613-1090",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "jjang_orakil-a-3f",
    name: "짱오락실",
    block: "a",
    floorId: "3f",
    tel: "02-333-8334",
    iconCategory: "arcade",
    guideCategory: "lifestyle",
  },
  {
    id: "jeju",
    name: "제주스",
    block: "a",
    floorId: "3f",
    tel: "031-371-7000",
    iconCategory: "cafe",
    guideCategory: "dining",
  },
  {
    id: "outbacksteak",
    name: "아웃백스테이크",
    block: "a",
    floorId: "3f",
    tel: "031-8015-4261",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "chongdamdongshabu",
    name: "청담동샤브",
    block: "a",
    floorId: "3f",
    tel: "031-613-9003",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "sagodang",
    name: "사과당",
    block: "a",
    floorId: "3f",
    tel: "031-371-7000",
    iconCategory: "cafe",
    guideCategory: "dining",
  },

  // A · 2F
  {
    id: "seogaeancook",
    name: "서가앤쿡",
    block: "a",
    floorId: "2f",
    tel: "031-613-8679",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "tokkijung-a-2f",
    name: "토끼정",
    block: "a",
    floorId: "2f",
    tel: "031-613-8670",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "giordano",
    name: "지오다노",
    block: "a",
    floorId: "2f",
    tel: "031-613-9821",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "rogadiss",
    name: "로가디스",
    block: "a",
    floorId: "2f",
    tel: "031-8015-4484",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "pahrenheit",
    name: "파렌하이트",
    block: "a",
    floorId: "2f",
    tel: "031-613-5108",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "vinerplus",
    name: "비너스 플러스",
    block: "a",
    floorId: "2f",
    tel: "031-8003-0830",
    iconCategory: "lingerie",
    guideCategory: "fashion",
  },
  {
    id: "soup",
    name: "SOUP",
    block: "a",
    floorId: "2f",
    tel: "031-8003-8797",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "loem",
    name: "로엠",
    block: "a",
    floorId: "2f",
    tel: "031-8015-5476",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "banecake",
    name: "반에이크",
    block: "a",
    floorId: "2f",
    tel: "031-613-9405",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "clarivis",
    name: "클라비스",
    block: "a",
    floorId: "2f",
    tel: "031-8003-4857",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "huayu",
    name: "후아유",
    block: "a",
    floorId: "2f",
    tel: "031-613-8380",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "ageed",
    name: "에이지드",
    block: "a",
    floorId: "2f",
    tel: "031-8003-3577",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "projectm",
    name: "프로젝트엠",
    block: "a",
    floorId: "2f",
    tel: "031-8015-1439",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "polham",
    name: "폴햄",
    block: "a",
    floorId: "2f",
    tel: "070-8880-6746",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "truegen",
    name: "트루젠",
    block: "a",
    floorId: "2f",
    tel: "031-613-2239",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "gioggia",
    name: "지오지아",
    block: "a",
    floorId: "2f",
    tel: "031-8015-2542",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "anibody",
    name: "애니바디",
    block: "a",
    floorId: "2f",
    tel: "031-8003-5923",
    iconCategory: "lingerie",
    guideCategory: "fashion",
  },
  {
    id: "crocs",
    name: "크록스",
    block: "a",
    floorId: "2f",
    tel: "031-8003-8839",
    iconCategory: "shoes",
    guideCategory: "fashion",
  },
  {
    id: "shesmiss",
    name: "쉬즈미스",
    block: "a",
    floorId: "2f",
    tel: "031-8015-5524",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "vivian",
    name: "비비안",
    block: "a",
    floorId: "2f",
    tel: "031-8003-7962",
    iconCategory: "lingerie",
    guideCategory: "fashion",
  },
  {
    id: "miso",
    name: "미쏘",
    block: "a",
    floorId: "2f",
    tel: "031-8015-0394",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "list",
    name: "리스트",
    block: "a",
    floorId: "2f",
    tel: "031-8015-5523",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "due-mare",
    name: "듀에마레",
    block: "a",
    floorId: "2f",
    tel: "031-613-6885",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "coming-soon",
    name: "오픈예정",
    block: "a",
    floorId: "2f",
    tel: "-",
    iconCategory: "service",
    guideCategory: "more",
  },

  // A · 1F
  {
    id: "sktelecom",
    name: "SK텔레콤",
    block: "a",
    floorId: "1f",
    tel: "070-7470-3530",
    iconCategory: "digital",
    guideCategory: "lifestyle",
  },
  {
    id: "coffeebean",
    name: "커피빈",
    block: "a",
    floorId: "1f",
    tel: "031-613-7684",
    iconCategory: "cafe",
    guideCategory: "dining",
  },
  {
    id: "oliveyoung",
    name: "올리브영",
    block: "a",
    floorId: "1f",
    tel: "1577-4887",
    iconCategory: "makeup",
    guideCategory: "beauty",
  },
  {
    id: "lacostesports",
    name: "라코스테 스포츠",
    block: "a",
    floorId: "1f",
    tel: "031-613-2060",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "discovery",
    name: "디스커버리",
    block: "a",
    floorId: "1f",
    tel: "031-8015-5670",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "adidas",
    name: "아디다스",
    block: "a",
    floorId: "1f",
    tel: "031-8015-3296",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "thenorthface",
    name: "노스페이스",
    block: "a",
    floorId: "1f",
    tel: "031-8015-1353",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "lifework",
    name: "라이프워크",
    block: "a",
    floorId: "1f",
    tel: "031-8003-8362",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "codac",
    name: "코닥",
    block: "a",
    floorId: "1f",
    tel: "031-613-6846",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "doublejedi",
    name: "더블제이디",
    block: "a",
    floorId: "1f",
    tel: "010-2239-9337",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "umbrellaproject",
    name: "엄브로",
    block: "a",
    floorId: "1f",
    tel: "031-8015-0508",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "rockport",
    name: "락포트",
    block: "a",
    floorId: "1f",
    tel: "031-613-8412",
    iconCategory: "shoes",
    guideCategory: "fashion",
  },
  {
    id: "legoctsportive",
    name: "르꼬끄스포르티브",
    block: "a",
    floorId: "1f",
    tel: "031-8015-0538",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "alaska",
    name: "알래스카",
    block: "a",
    floorId: "1f",
    tel: "031-8003-2502",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "sketch",
    name: "스케처스",
    block: "a",
    floorId: "1f",
    tel: "031-8015-4968",
    iconCategory: "shoes",
    guideCategory: "fashion",
  },
  {
    id: "dessant",
    name: "데상트",
    block: "a",
    floorId: "1f",
    tel: "031-8015-0548",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "dynafit",
    name: "다이나핏",
    block: "a",
    floorId: "1f",
    tel: "031-8003-8020",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "newbalance",
    name: "뉴발란스",
    block: "a",
    floorId: "1f",
    tel: "031-8015-0348",
    iconCategory: "shoes",
    guideCategory: "fashion",
  },
  {
    id: "mlb",
    name: "MLB",
    block: "a",
    floorId: "1f",
    tel: "031-8015-2673",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },

  // A · B2
  {
    id: "jessymix",
    name: "제시믹스",
    block: "a",
    floorId: "b2",
    tel: "031-8043-6949",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "mindbridge",
    name: "마인드브릿지",
    block: "a",
    floorId: "b2",
    tel: "031-613-9980",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "8seconds",
    name: "에잇세컨즈",
    block: "a",
    floorId: "b2",
    tel: "031-8003-8304",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "spao",
    name: "스파오",
    block: "a",
    floorId: "b2",
    tel: "031-8015-0861",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "wonderplace",
    name: "원더플레이스",
    block: "a",
    floorId: "b2",
    tel: "070-4113-2624",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "tweed",
    name: "트위",
    block: "a",
    floorId: "b2",
    tel: "031-8003-1960",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "lf-store",
    name: "LF몰 스토어",
    block: "a",
    floorId: "b2",
    tel: "031-613-7786",
    iconCategory: "fashion",
    guideCategory: "fashion",
  },
  {
    id: "resortlab",
    name: "리조트랩",
    block: "a",
    floorId: "b2",
    tel: "031-8043-6939",
    iconCategory: "service",
    guideCategory: "more",
  },
  {
    id: "repair",
    name: "수선실",
    block: "a",
    floorId: "b2",
    tel: "031-613-0954",
    iconCategory: "service",
    guideCategory: "more",
  },
  {
    id: "blissgold",
    name: "블리스골드",
    block: "a",
    floorId: "b2",
    tel: "—",
    iconCategory: "jewelry",
    guideCategory: "fashion",
  },
  {
    id: "ashley-queens",
    name: "애슐리퀸즈",
    block: "a",
    floorId: "b2",
    tel: "0507-1473-1071",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "burning",
    name: "버닝",
    block: "a",
    floorId: "b2",
    tel: "031-8003-8991",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "vaultburger",
    name: "폴트버거",
    block: "a",
    floorId: "b2",
    tel: "031-613-7568",
    iconCategory: "fb",
    guideCategory: "dining",
  },
  {
    id: "starbucks-a-b2",
    name: "스타벅스",
    block: "a",
    floorId: "b2",
    tel: "1522-3232",
    iconCategory: "cafe",
    guideCategory: "dining",
  },
  {
    id: "winnibini",
    name: "위니비니",
    block: "a",
    floorId: "b2",
    tel: "02-587-5040",
    iconCategory: "cafe",
    guideCategory: "dining",
  },

  // B · 4F
  {
    id: "aladin",
    name: "알라딘",
    block: "b",
    floorId: "4f",
    tel: "1544-2514",
    iconCategory: "book",
    guideCategory: "lifestyle",
    isSignature: true,
  },
  {
    id: "salon_de_marshall",
    name: "살롱드마샬",
    block: "b",
    floorId: "4f",
    tel: "031-8003-5660",
    iconCategory: "hair_service",
    guideCategory: "beauty",
  },
  {
    id: "majipiero",
    name: "마지삐에로",
    block: "b",
    floorId: "4f",
    tel: "031-613-7949",
    iconCategory: "arcade",
    guideCategory: "lifestyle",
  },

  // B · 3F
  {
    id: "jjang_orakil",
    name: "짱오락실",
    block: "b",
    floorId: "3f",
    tel: "02-333-8334",
    iconCategory: "arcade",
    guideCategory: "lifestyle",
    isSignature: true,
  },
  {
    id: "gs25",
    name: "GS25",
    block: "b",
    floorId: "3f",
    tel: "031-371-7000",
    iconCategory: "mart",
    guideCategory: "more",
  },
  {
    id: "champion",
    name: "챔피언",
    block: "b",
    floorId: "3f",
    tel: "031-8003-2969",
    iconCategory: "arcade",
    guideCategory: "lifestyle",
  },
  {
    id: "mochistory",
    name: "모찌이야기",
    block: "b",
    floorId: "3f",
    tel: "-",
    iconCategory: "cafe",
    guideCategory: "dining",
  },
  {
    id: "grace_skin",
    name: "그레이스피부과",
    block: "b",
    floorId: "3f",
    tel: "031-8015-5337",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "gyunanbon",
    name: "근앤본 정형신경외과",
    block: "b",
    floorId: "3f",
    tel: "031-613-8899",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "dongtan_yeonsu",
    name: "동탄연세소아청소년과",
    block: "b",
    floorId: "3f",
    tel: "031-613-6080",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "meta_internal_medicine",
    name: "메타폴리스 내과",
    block: "b",
    floorId: "3f",
    tel: "031-831-5582",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "meta_dentist",
    name: "메타폴리스 치과의원",
    block: "b",
    floorId: "3f",
    tel: "031-8015-5074",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "seoul_eye",
    name: "잘보는 서울안과",
    block: "b",
    floorId: "3f",
    tel: "031-613-0011",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "i_nuri",
    name: "아이누리 한의원",
    block: "b",
    floorId: "3f",
    tel: "031-831-8886",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "i_saraeng",
    name: "아이사랑 해든약국",
    block: "b",
    floorId: "3f",
    tel: "031-613-9982",
    iconCategory: "hospital",
    guideCategory: "beauty",
  },
  {
    id: "my_little_tiger",
    name: "마이리틀타이거",
    block: "b",
    floorId: "3f",
    tel: "031-8003-4388",
    iconCategory: "arcade",
    guideCategory: "lifestyle",
  },

  // B · 2F
  {
    id: "artbox",
    name: "artbox",
    block: "b",
    floorId: "2f",
    tel: "031-8003-0780",
    iconCategory: "mart",
    guideCategory: "more",
  },
  {
    id: "modernhouse",
    name: "모던하우스",
    block: "b",
    floorId: "2f",
    tel: "031-8043-3173",
    iconCategory: "living",
    guideCategory: "lifestyle",
  },
  {
    id: "abcmart",
    name: "ABC마트",
    block: "b",
    floorId: "2f",
    tel: "031-831-8414",
    iconCategory: "shoes",
    guideCategory: "fashion",
  },
  {
    id: "cobroungzi",
    name: "코브라운지",
    block: "b",
    floorId: "2f",
    tel: "010-5117-0087",
    iconCategory: "service",
    guideCategory: "more",
  },
  {
    id: "cobartcenter",
    name: "코브아트센터",
    block: "b",
    floorId: "2f",
    tel: "031-778-8000",
    iconCategory: "service",
    guideCategory: "more",
  },
  {
    id: "lx_z_in",
    name: "LX Z:IN 인테리어",
    block: "b",
    floorId: "2f",
    tel: "031-8003-8641",
    iconCategory: "living",
    guideCategory: "lifestyle",
  },
  {
    id: "yusol",
    name: "유솔",
    block: "b",
    floorId: "2f",
    tel: "031-8003-8583",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "topten_kids",
    name: "탑텐 키즈",
    block: "b",
    floorId: "2f",
    tel: "031-8015-3492",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "spaoyo_kids",
    name: "스파오 키즈",
    block: "b",
    floorId: "2f",
    tel: "031-8015-1132",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "sindy_kids",
    name: "신디 키즈",
    block: "b",
    floorId: "2f",
    tel: "031-613-2528",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "millibat",
    name: "밀리밤",
    block: "b",
    floorId: "2f",
    tel: "031-613-2528",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "thedaygirl",
    name: "더데이걸",
    block: "b",
    floorId: "2f",
    tel: "031-8003-9906",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "angpongs",
    name: "앙팡스",
    block: "b",
    floorId: "2f",
    tel: "031-613-9912",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "moimalon",
    name: "모이몰른",
    block: "b",
    floorId: "2f",
    tel: "031-8015-8999",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "cooli_su",
    name: "컬리수",
    block: "b",
    floorId: "2f",
    tel: "031-8003-7394",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "chick_and_loem_girls",
    name: "치크 & 로엠걸즈",
    block: "b",
    floorId: "2f",
    tel: "031-8003-8583",
    iconCategory: "kids",
    guideCategory: "fashion",
  },

  // B · 1F
  {
    id: "etland",
    name: "전자랜드",
    block: "b",
    floorId: "1f",
    tel: "031-8015-8071",
    iconCategory: "digital",
    guideCategory: "lifestyle",
  },
  {
    id: "modernhouse-b-1f",
    name: "모던하우스",
    block: "b",
    floorId: "1f",
    tel: "031-8043-3173",
    iconCategory: "living",
    guideCategory: "lifestyle",
  },
  {
    id: "lloyd",
    name: "로이드",
    block: "b",
    floorId: "1f",
    tel: "031-613-7779",
    iconCategory: "jewelry",
    guideCategory: "fashion",
  },
  {
    id: "moin_yang_pyeon",
    name: "무인양품",
    block: "b",
    floorId: "1f",
    tel: "031-8015-8024",
    iconCategory: "mart",
    guideCategory: "more",
  },
  {
    id: "new_balance_kids",
    name: "뉴발란스 키즈",
    block: "b",
    floorId: "1f",
    tel: "031-8015-0314",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "polham_kids",
    name: "폴햄키즈",
    block: "b",
    floorId: "1f",
    tel: "010-9071-4440",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  {
    id: "mimi_and_co",
    name: "미미앤코",
    block: "b",
    floorId: "1f",
    tel: "010-9393-5280",
    iconCategory: "mart",
    guideCategory: "more",
  },
  {
    id: "meta_optical",
    name: "메타폴리스 옵티컬",
    block: "b",
    floorId: "1f",
    tel: "031-8015-0550",
    iconCategory: "shoes",
    guideCategory: "fashion",
  },
  {
    id: "designskin",
    name: "디자인스킨",
    block: "b",
    floorId: "1f",
    tel: "031-8003-1073",
    iconCategory: "mart",
    guideCategory: "more",
  },
  {
    id: "fullory",
    name: "푸롤리",
    block: "b",
    floorId: "1f",
    tel: "-",
    iconCategory: "cafe",
    guideCategory: "dining",
  },
  {
    id: "shupen_kids",
    name: "슈펜키즈",
    block: "b",
    floorId: "1f",
    tel: "-",
    iconCategory: "kids",
    guideCategory: "fashion",
  },
  // B · B2-B4
  {
    id: "homeplus",
    name: "홈플러스",
    block: "b",
    floorId: "b2b4",
    tel: "031-8015-7000",
    iconCategory: "mart",
    guideCategory: "more",
  },
];

export function getFloorLabel(block: BranchBlock, floorId: string) {
  return BRANCH_FLOORS[block].find((floor) => floor.id === floorId)?.label ?? floorId;
}

export function formatStoreLocation(store: StoreRecord) {
  return `${store.block.toUpperCase()} · ${getFloorLabel(store.block, store.floorId)}`;
}

export function getStoresByBlock(block: BranchBlock) {
  return STORE_DIRECTORY.filter((store) => store.block === block);
}

export function getStoresByBlockAndFloor(block: BranchBlock, floorId: string) {
  return STORE_DIRECTORY.filter(
    (store) => store.block === block && store.floorId === floorId
  );
}

export function getStoresByGuideCategory(
  category: StoreGuideCategoryFilter,
  block?: BranchBlock
) {
  const scoped = block ? getStoresByBlock(block) : STORE_DIRECTORY;

  if (category === "all") return scoped;

  return scoped.filter((store) => store.guideCategory === category);
}

/** 층별·카테고리별 카드 공통 뷰 모델 */
export type StoreCardView = {
  id: string;
  name: string;
  tel: string;
  location: string;
  iconCategory: StoreIconCategory;
  guideCategory: StoreGuideCategory;
  hasEvent: boolean;
  eventHref?: string;
  isSignature?: boolean;
};

export function toStoreCardView(store: StoreRecord): StoreCardView {
  const ongoingEvent = getOngoingStoreEventForStore(store);

  return {
    id: store.id,
    name: store.name,
    tel: store.tel,
    location: formatStoreLocation(store),
    iconCategory: store.iconCategory,
    guideCategory: store.guideCategory,
    hasEvent: Boolean(ongoingEvent),
    eventHref: getOngoingStoreEventHref(store),
    isSignature: store.isSignature,
  };
}

export type HeroSlide = {
  bg: string;
  bgMobile: string;
  badge: string;
  title: string;
  desc: string;
  link?: string;
};

// TODO(고객확정): 슬라이드별 실제 이미지/문구 확정 시 항목 추가(다중 슬라이드).
//                현재는 동일 슬라이드 중복을 없애기 위해 1개만 노출.
/** 모바일 이미지: public/img/hero_bg_{n}_mo.png */
export const HERO_SLIDES: HeroSlide[] = [
  {
    bg: "/img/hero_bg_01.png",
    bgMobile: "/img/hero_bg_01_mo.png",
    badge: "NOTICE",
    title: "일상 속 설레는 산책,\n새로워진 메타폴리스에서.",
    desc: "5월, 새로운 이름으로 시작하는 설렘",
  },
];

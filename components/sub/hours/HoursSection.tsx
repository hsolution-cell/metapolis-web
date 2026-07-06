import type { ReactNode } from "react";
import SubSectionHead from "@/components/sub/SubSectionHead";
import HoursHeroVisual from "@/components/sub/hours/HoursHeroVisual";
import HoursMainIntro from "@/components/sub/hours/HoursMainIntro";
import HoursStoresSection from "@/components/sub/hours/HoursStoresSection";
import type { HoursScheduleRow, HoursStoreCardProps } from "@/components/sub/hours/HoursStoreCard";

type HoursCategory = {
  title: string;
  stores: HoursStoreCardProps[];
};

type HoursSectionProps = {
  introEyebrow?: string;
  introTitle?: ReactNode;
  heroMidText?: string;
  storesEyebrow?: string;
  storesTitle?: ReactNode;
  categories?: HoursCategory[];
  noteLabel?: string;
};

const DAILY = (hours: string): HoursScheduleRow[] => [
  { label: "매일", value: hours },
];

const HOURS_CATEGORIES: HoursCategory[] = [
  {
    title: "Shopping & Culture",
    stores: [
      {
        category: "대형마트",
        name: "홈플러스",
        logo: "/img/main_branch_store_homeplus.png",
        schedules: DAILY("10:00 - 24:00"),
        note: "매달 둘째 · 넷째 주 일요일 의무휴업",
      },
      {
        category: "영화관",
        name: "CGV",
        logo: "/img/main_branch_store_cgv.png",
        schedules: DAILY("07:00 - 03:00"),
        note: "상영 시간표에 따라 상이",
      },
      {
        category: "중고서점",
        name: "알라딘",
        logo: "/img/main_branch_store_aladin.png",
        schedules: DAILY("09:30 - 22:00"),
      },
      {
        category: "카페",
        name: "스타벅스",
        logo: "/img/main_branch_store_starbucks.png",
        schedules: DAILY("08:00 - 22:00"),
      },
      {
        category: "라이프스타일",
        name: "리조트랩",
        logo: "/img/main_branch_store_resortlab.png",
        schedules: DAILY("09:00 - 22:00"),
      },
    ],
  },
  {
    title: "Medical",
    stores: [
      {
        category: "소아청소년과",
        name: "연세소아청소년과",
        logo: "/img/sub/hours/icons/pediatric.png",
        schedules: [
          { label: "평일", value: "08:30 - 21:00" },
          { label: "토요일", value: "08:30 - 18:00" },
          { label: "일·공휴일", value: "09:00 - 13:00" },
        ],
        note: "공휴일 유동적 휴진",
      },
      {
        category: "내과 / 소화기",
        name: "메타폴리스몰내과",
        logo: "/img/sub/hours/icons/internal.png",
        schedules: [
          { label: "월·화·목·금", value: "09:30 - 19:00" },
          { label: "수요일", value: "09:00 - 13:00" },
          { label: "토요일", value: "09:30 - 13:30" },
          { label: "일·공휴일", value: "휴진", closed: true },
        ],
      },
      {
        category: "치과",
        name: "메타폴리스몰치과",
        logo: "/img/sub/hours/icons/dental.png",
        schedules: [
          { label: "월·수·금", value: "10:00 - 19:00" },
          { label: "화·목", value: "10:00 - 20:00" },
          { label: "토요일", value: "10:00 - 18:00" },
          { label: "일·공휴일", value: "휴진", closed: true },
        ],
      },
      {
        category: "피부과",
        name: "그레이스피부과",
        logo: "/img/sub/hours/icons/dermatology.png",
        schedules: [
          { label: "월·화·수", value: "10:00 - 19:00" },
          { label: "금요일", value: "10:00 - 20:00" },
          { label: "토요일", value: "10:00 - 15:00" },
          { label: "목·일·공휴일", value: "휴진", closed: true },
        ],
      },
      {
        category: "한의원",
        name: "아이누리한의원",
        logo: "/img/sub/hours/icons/oriental.png",
        schedules: [
          { label: "평일", value: "10:00 - 19:00" },
          { label: "토요일", value: "09:30 - 19:00" },
          { label: "공휴일", value: "09:30 - 16:00" },
          { label: "일요일", value: "휴진", closed: true },
        ],
      },
      {
        category: "정형 · 신경외과",
        name: "근앤본 정형신경외과",
        logo: "/img/sub/hours/icons/orthopedics.png",
        schedules: [
          { label: "평일", value: "09:30 - 20:00" },
          { label: "토요일", value: "09:30 - 14:30" },
          { label: "공휴일", value: "유동적 휴진", closed: true },
          { label: "일요일", value: "휴진", closed: true },
        ],
      },
      {
        category: "안과",
        name: "잘보는 서울안과",
        logo: "/img/sub/hours/icons/ophthalmology.png",
        schedules: [
          { label: "평일", value: "10:30 - 19:00" },
          { label: "토요일", value: "10:30 - 18:00" },
          { label: "일·공휴일", value: "휴진", closed: true },
        ],
      },
      {
        category: "약국",
        name: "아이사랑해든약국",
        logo: "/img/sub/hours/icons/pharmacy.png",
        schedules: [
          { label: "평일 · 토요일", value: "08:30 - 22:00" },
          { label: "일 · 공휴일", value: "09:00 - 22:00" },
        ],
      },
    ],
  },
];

export default function HoursSection({
  introEyebrow = "Opening Hours",
  introTitle = (
    <>
      <strong>영업시간</strong> 안내
    </>
  ),
  heroMidText = "연중무휴",
  storesEyebrow,
  storesTitle,
  categories = HOURS_CATEGORIES,
  noteLabel,
}: HoursSectionProps = {}) {
  return (
    <div className="hours">
      <section
        className="hours_main"
        aria-labelledby="hours-main-title"
      >
        <HoursMainIntro>
          <SubSectionHead
            className="hours_main_head"
            eyebrow={introEyebrow}
            title={introTitle}
            titleId="hours-main-title"
          />
        </HoursMainIntro>
        <HoursHeroVisual midText={heroMidText} />
      </section>

      <HoursStoresSection
        categories={categories}
        eyebrow={storesEyebrow}
        title={storesTitle}
        noteLabel={noteLabel}
      />
    </div>
  );
}

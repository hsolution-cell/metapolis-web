import HeroSection from "@/components/home/HeroSection";
import CateSection from "@/components/home/CateSection";
import BranchSection from "@/components/home/BranchSection";
import FaqSection from "@/components/home/FaqSection";
import LocationSection from "@/components/home/LocationSection";
import { getActiveHeroSlides } from "@/lib/hero-banners-db";

export default async function HomePage() {
  // 관리자가 등록한 노출 배너 사용, 없거나 조회 실패 시 기본 슬라이드로 폴백
  const slides = await getActiveHeroSlides();

  return (
    <>
      <div className="header_container" />
      <HeroSection slides={slides ?? undefined} />
      <CateSection />
      <BranchSection />
      <FaqSection />
      <LocationSection />
    </>
  );
}

import HeroSection from "@/components/home/HeroSection";
import CateSection from "@/components/home/CateSection";
import BranchSection from "@/components/home/BranchSection";
import FaqSection from "@/components/home/FaqSection";
import LocationSection from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      <div className="header_container" />
      <HeroSection />
      <CateSection />
      <BranchSection />
      <FaqSection />
      <LocationSection />
    </>
  );
}

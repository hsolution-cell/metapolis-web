import HeroSection from "@/components/home/HeroSection";
import BranchSection from "@/components/home/BranchSection";
import FaqSection from "@/components/home/FaqSection";
import LocationSection from "@/components/home/LocationSection";
import InquirySection from "@/components/sub/inquiry/InquirySection";
import {
  EN_HERO_SLIDES,
  EN_BRANCH,
  EN_FAQ_ITEMS,
  EN_FAQ_TAGS,
  EN_FAQ_INTRO,
  EN_LOCATION,
  EN_CONTACT,
} from "@/data/en/home";
import { getActiveHeroSlides } from "@/lib/hero-banners-db";

export default async function EnHome() {
  // 관리자가 등록한 영문 배너 사용, 없거나 조회 실패 시 기본 슬라이드로 폴백
  const slides = await getActiveHeroSlides("en");

  return (
    <>
      <div className="header_container" />
      <HeroSection slides={slides ?? EN_HERO_SLIDES} ariaLabel="Main banner" />

      <BranchSection
        title={EN_BRANCH.title}
        desc={EN_BRANCH.desc}
        backLabel={EN_BRANCH.backLabel}
        ariaLabel="Store directory by floor"
      />

      <FaqSection
        items={EN_FAQ_ITEMS}
        tags={EN_FAQ_TAGS}
        title={
          <>
            Before You Visit,
            <br />
            <strong>Frequently Asked Questions</strong>
          </>
        }
        desc={EN_FAQ_INTRO.desc}
        contactLabel={EN_FAQ_INTRO.contactLabel}
        tel={EN_FAQ_INTRO.tel}
        telHref={EN_FAQ_INTRO.telHref}
        ariaLabel="Frequently asked questions"
      />

      {/* Contact Us — 국문 문의하기(InquirySection) 디자인 재사용 */}
      <InquirySection
        className="en-inquiry"
        eyebrow={EN_CONTACT.eyebrow}
        title={
          <>
            {EN_CONTACT.title}
            <br />
            {EN_CONTACT.subtitle}
          </>
        }
        desc={EN_CONTACT.text}
        address={EN_CONTACT.address}
        cardAriaLabel="Customer support"
        cardBadge="• Customer Support •"
        cardLead={
          <>
            For inquiries, <b>please call the number below</b>
          </>
        }
        phone={EN_CONTACT.phone}
        phoneHref="tel:0313717000"
        consultLabel="Support Hours"
        consultHours={EN_CONTACT.supportHours}
        operationLabel="Operating Hours"
        operationHours={
          <>
            10:30 - 22:00 <span className="en-nowrap">(365 days)</span>
          </>
        }
        watermark="CALL"
      />

      <LocationSection
        desc={EN_LOCATION.desc}
        addressKo=""
        addressEn={EN_LOCATION.addressEn}
        mapAlt="Metapolis Mall location map"
        tel={EN_LOCATION.tel}
        hour={EN_LOCATION.hour}
        primary={EN_LOCATION.primary}
        secondary={EN_LOCATION.secondary}
        ariaLabel="Location"
      />
    </>
  );
}

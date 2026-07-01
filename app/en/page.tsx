import HeroSection from "@/components/home/HeroSection";
import BranchSection from "@/components/home/BranchSection";
import FaqSection from "@/components/home/FaqSection";
import LocationSection from "@/components/home/LocationSection";
import {
  EN_HERO_SLIDES,
  EN_BRANCH,
  EN_FAQ_ITEMS,
  EN_FAQ_TAGS,
  EN_FAQ_INTRO,
  EN_LOCATION,
  EN_CONTACT,
} from "@/data/en/home";

export default function EnHome() {
  return (
    <>
      <div className="header_container" />
      <HeroSection slides={EN_HERO_SLIDES} ariaLabel="Main banner" />

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

      {/* Contact Us — EN 전용 섹션 */}
      <section className="en-contact page main_section_pad" aria-label="Contact us">
        <div className="content_inner en-contact__inner">
          <div className="en-contact__lead">
            <p className="en-contact__eyebrow">{EN_CONTACT.eyebrow}</p>
            <h2 className="en-contact__title">{EN_CONTACT.title}</h2>
            <p className="en-contact__subtitle">{EN_CONTACT.subtitle}</p>
            <p className="en-contact__text">{EN_CONTACT.text}</p>
            <p className="en-contact__address">
              <span className="en-label">ADDRESS</span>
              {EN_CONTACT.address}
            </p>
          </div>
          <div className="en-contact__card">
            <p className="en-contact__card-eyebrow">Customer Support</p>
            <p className="en-contact__card-note">For inquiries, please call the number below.</p>
            <a className="en-contact__phone" href={`tel:${EN_CONTACT.phone}`}>
              {EN_CONTACT.phone}
            </a>
            <div className="en-contact__hours">
              <div>
                <span className="en-label">Support Hours</span>
                <strong>{EN_CONTACT.supportHours}</strong>
              </div>
              <div>
                <span className="en-label">Operating Hours</span>
                <strong>{EN_CONTACT.operatingHours}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocationSection
        desc={EN_LOCATION.desc}
        addressKo=""
        addressEn={EN_LOCATION.addressEn}
        mapAlt="Metapolis location map"
        tel={EN_LOCATION.tel}
        hour={EN_LOCATION.hour}
        primary={EN_LOCATION.primary}
        secondary={EN_LOCATION.secondary}
        ariaLabel="Location"
      />
    </>
  );
}

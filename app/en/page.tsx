import Link from "next/link";
import {
  EN_HERO,
  EN_FLOOR_GROUPS,
  EN_FAQ_TAGS,
  EN_CONTACT,
  EN_LOCATION,
} from "@/data/en/home";
import EnFaqAccordion from "@/components/en/home/EnFaqAccordion";

export default function EnHome() {
  return (
    <main className="en-main">
      {/* Hero */}
      <section className="en-hero" aria-label="Main banner">
        <div className="en-hero__bg" aria-hidden="true">
          <picture>
            <source media="(max-width: 768px)" srcSet={EN_HERO.bgMobile} />
            <img src={EN_HERO.bg} alt="" />
          </picture>
        </div>
        <div className="en-hero__inner">
          <div className="en-hero__text">
            <span className="en-hero__badge">{EN_HERO.badge}</span>
            <h2 className="en-hero__title">
              {EN_HERO.title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>
            <p className="en-hero__desc">
              <span>{EN_HERO.desc}</span>
              <span className="en-hero__arrow" aria-hidden="true" />
            </p>
          </div>
        </div>
      </section>

      {/* Store Directory by Floor */}
      <section className="en-floors" aria-label="Store directory by floor">
        <div className="en-section__inner">
          <h2 className="en-floors__title">Metapolis Store Directory by Floor</h2>
          <p className="en-floors__sub">
            Discover the endless fun at Time Terrace at a glance
          </p>
          <div className="en-floors__grid">
            {EN_FLOOR_GROUPS.map((group) => (
              <div className="en-floors__group" key={group.block}>
                <div className="en-floors__block">
                  <span className="en-floors__block-letter">{group.block.charAt(0)}</span>
                  <span className="en-floors__block-label">Block</span>
                </div>
                {group.floors.map((floor) => (
                  <Link href="/en/floors" className="en-floors__cell" key={floor}>
                    {floor}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <span className="en-floors__watermark" aria-hidden="true">
            METAPOLIS DONGTAN
          </span>
        </div>
      </section>

      {/* FAQ */}
      <section className="en-faq" aria-label="Frequently asked questions">
        <div className="en-section__inner en-faq__inner">
          <aside className="en-faq__intro">
            <p className="en-faq__eyebrow">FAQs</p>
            <h2 className="en-faq__heading">Before You Visit</h2>
            <p className="en-faq__lead">Here are our most frequently asked questions</p>
            <p className="en-faq__center-label">Customer Service Center</p>
            <p className="en-faq__tel">Tel. 031 - 731 - 7000</p>
            <ul className="en-faq__tags">
              {EN_FAQ_TAGS.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          </aside>
          <EnFaqAccordion />
        </div>
      </section>

      {/* Contact Us */}
      <section className="en-contact" aria-label="Contact us">
        <div className="en-section__inner en-contact__inner">
          <div className="en-contact__lead">
            <p className="en-contact__eyebrow">{EN_CONTACT.eyebrow}</p>
            <h2 className="en-contact__title">{EN_CONTACT.title}</h2>
            <p className="en-contact__subtitle">{EN_CONTACT.subtitle}</p>
            <p className="en-contact__text">{EN_CONTACT.text}</p>
            <p className="en-contact__address">
              <span className="en-label">ADDRESS</span> {EN_CONTACT.address}
            </p>
          </div>
          <div className="en-contact__card">
            <p className="en-contact__card-eyebrow">Customer Support</p>
            <p className="en-contact__card-note">
              For inquiries, please call the number below.
            </p>
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

      {/* Location */}
      <section className="en-location" aria-label="Location">
        <div className="en-section__inner">
          <p className="en-location__eyebrow">{EN_LOCATION.eyebrow}</p>
          <p className="en-location__text">{EN_LOCATION.text}</p>
          <div className="en-location__body">
            <div className="en-location__map">
              <img src={EN_LOCATION.mapImage} alt="Metapolis location map" />
            </div>
            <div className="en-location__info">
              <p>
                <span className="en-label">LOCATION</span>
                {EN_LOCATION.address}
              </p>
              <p>
                <span className="en-label">CALL</span>
                {EN_LOCATION.phone}
              </p>
              <p>
                <span className="en-label">HOUR</span>
                {EN_LOCATION.hour}
              </p>
              <div className="en-location__btns">
                <Link href="/en/location" className="en-btn">
                  Directions
                </Link>
                <Link href="/en/location" className="en-btn">
                  Parking Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

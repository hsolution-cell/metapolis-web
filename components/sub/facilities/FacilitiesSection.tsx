import type { CSSProperties } from "react";
import SubReveal from "@/components/sub/SubReveal";
import SubSectionHead from "@/components/sub/SubSectionHead";
import FacilitiesMarquee from "@/components/sub/facilities/FacilitiesMarquee";
import FacilityDetailItem from "@/components/sub/facilities/FacilityDetailItem";
import FacilityIcon from "@/components/sub/facilities/FacilityIcon";
import { StoresAnchorLink, StoresScrollInit } from "@/components/sub/stores/StoresAnchorScroll";
import { FACILITIES } from "@/data/facilities";

export default function FacilitiesSection() {
  return (
    <div className="facilities">
      <StoresScrollInit />
      <section
        className="facilities_cards"
        aria-labelledby="facilities-cards-title"
      >
        <div className="facilities_cards_inner content_inner innerTop innerBot">
          <SubReveal
            className="facilities_cards_reveal"
            threshold={0.15}
            rootMargin="0px 0px -8% 0px"
          >
            <SubSectionHead
              className="facilities_cards_head"
              eyebrow="For Your Comfort"
              title={
                <>
                  <strong>편의시설 </strong>안내
                </>
              }
              titleId="facilities-cards-title"
            />
            <p className="facilities_cards_lead">
              메타폴리스는 모든 고객이 편리하게 머무를 수 있도록 다양한
              편의시설을 운영합니다
            </p>

            <div className="facilities_cards_wrap">
              <FacilitiesMarquee />

              <ul className="facilities_cards_list">
                {FACILITIES.map((facility, index) => (
                  <li
                    key={facility.id}
                    className="facilities_card sub_reveal_item"
                    style={{ "--sub-reveal-i": index } as CSSProperties}
                  >
                    <StoresAnchorLink
                      className="facilities_card_link"
                      href={`#facility-${facility.id}`}
                    >
                      <span className="facilities_card_icon">
                        <FacilityIcon id={facility.icon} />
                      </span>
                      <strong className="facilities_card_name">
                        {facility.name}
                      </strong>
                      <span className="facilities_card_loc">
                        {facility.cardLocation}
                      </span>
                    </StoresAnchorLink>
                  </li>
                ))}
              </ul>
            </div>
          </SubReveal>
        </div>
      </section>

      <section className="facilities_detail" aria-label="편의시설 상세">
        <div className="facilities_detail_inner content_inner innerTop innerBot">
          <SubReveal
            className="facilities_detail_list"
            threshold={0.08}
            rootMargin="0px 0px -6% 0px"
          >
            {FACILITIES.map((facility, index) => (
              <FacilityDetailItem
                key={facility.id}
                facility={facility}
                revealIndex={index}
              />
            ))}
          </SubReveal>
        </div>
      </section>
    </div>
  );
}

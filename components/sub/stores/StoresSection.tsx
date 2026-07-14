import type { CSSProperties } from "react";
import SubReveal from "@/components/sub/SubReveal";
import SubSectionHead from "@/components/sub/SubSectionHead";
import StoreDetailItem from "@/components/sub/stores/StoreDetailItem";
import StoresBrandsMarquee from "@/components/sub/stores/StoresBrandsMarquee";
import { StoresAnchorLink, StoresScrollInit } from "@/components/sub/stores/StoresAnchorScroll";
import { MAJOR_STORES } from "@/data/majorStores";

export default function StoresSection() {
  return (
    <div className="stores">
      <StoresScrollInit />
      <section className="stores_brands" aria-labelledby="stores-brands-title">
        <div className="stores_brands_inner content_inner innerTop innerBot">
          <SubReveal
            className="stores_brands_reveal"
            threshold={0.15}
            rootMargin="0px 0px -8% 0px"
          >
            <SubSectionHead
              className="stores_brands_head"
              eyebrow="Brands at Metapolis Mall"
              title={
                <>
                  <strong>
                    메타폴리스몰을 빛내는 <br className="br-mobile" />
                    입점 브랜드
                  </strong>
                </>
              }
              titleId="stores-brands-title"
            />
            <p className="stores_brands_lead">
              쇼핑부터 다이닝, 컬처, 라이프스타일까지 다채로운 즐거움! 층별 대표
              매장을 한눈에 살펴보세요
            </p>

            <div className="stores_brands_cards_wrap">
              <StoresBrandsMarquee />

              <ul className="stores_brands_cards">
                {MAJOR_STORES.map((store, index) => (
                  <li
                    key={store.id}
                    className="stores_brand_card sub_reveal_item"
                    style={{ "--sub-reveal-i": index } as CSSProperties}
                  >
                    <StoresAnchorLink
                      className="stores_brand_card_link"
                      href={`#store-${store.id}`}
                    >
                      <span className="stores_brand_card_logo">
                        <img src={store.cardLogo} alt="" aria-hidden="true" />
                      </span>
                      <strong className="stores_brand_card_name">
                        {store.name}
                      </strong>
                      <span className="stores_brand_card_loc">
                        {store.cardLocation}
                      </span>
                    </StoresAnchorLink>
                  </li>
                ))}
              </ul>
            </div>
          </SubReveal>
        </div>
      </section>

      <section className="stores_detail" aria-label="주요 매장 상세">
        <div className="stores_detail_inner content_inner innerTop innerBot">
          <SubReveal
            className="stores_detail_list"
            threshold={0.08}
            rootMargin="0px 0px -6% 0px"
          >
            {MAJOR_STORES.map((store, index) => (
              <StoreDetailItem
                key={store.id}
                store={store}
                revealIndex={index}
              />
            ))}
          </SubReveal>
        </div>
      </section>
    </div>
  );
}

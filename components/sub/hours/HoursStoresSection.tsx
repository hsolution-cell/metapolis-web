"use client";

import type { CSSProperties } from "react";
import SubSectionHead from "@/components/sub/SubSectionHead";
import HoursStoreCard, {
  type HoursStoreCardProps,
} from "@/components/sub/hours/HoursStoreCard";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type HoursCategory = {
  title: string;
  stores: HoursStoreCardProps[];
};

type HoursStoresSectionProps = {
  categories: HoursCategory[];
};

export default function HoursStoresSection({
  categories,
}: HoursStoresSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -6% 0px",
  });

  return (
    <section
      ref={ref}
      className={`hours_stores${inView ? " is-inview" : ""}`}
      aria-labelledby="hours-stores-title"
    >
      <div className="content_inner hours_stores_inner">
        <SubSectionHead
          className="hours_stores_head"
          eyebrow="Stores with Different Hours"
          title={
            <>
              <strong>영업시간이 다른 매장</strong> 안내
            </>
          }
          titleId="hours-stores-title"
        />

        {categories.map((category, categoryIndex) => (
          <div
            key={category.title}
            className="hours_category"
            style={
              {
                "--hours-reveal-delay": `${categoryIndex * 140}ms`,
              } as CSSProperties
            }
          >
            <div className="hours_category_head">
              <h3 className="hours_category_title">{category.title}</h3>
              <span className="hours_category_line" aria-hidden="true" />
            </div>

            <ul className="hours_store_grid">
              {category.stores.map((store, storeIndex) => (
                <li
                  key={store.name}
                  style={
                    { "--hours-card-i": storeIndex } as CSSProperties
                  }
                >
                  <HoursStoreCard {...store} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

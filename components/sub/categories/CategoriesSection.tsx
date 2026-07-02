"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SubReveal from "@/components/sub/SubReveal";
import CategoryBanner from "@/components/sub/categories/CategoryBanner";
import FloorsBlockToggle from "@/components/sub/floors/FloorsBlockToggle";
import FloorStoreCard from "@/components/sub/floors/FloorStoreCard";
import { getCategoryBanner, getCategoryGuideSummary } from "@/data/categoryGuide";
import type { BranchBlock } from "@/data/branchStores";
import {
  STORE_GUIDE_CATEGORIES,
  toStoreCardView,
  type StoreGuideCategoryFilter,
  type StoreRecord,
  type OngoingStoreEventLinks,
} from "@/data/storeDirectory";

const INITIAL_VISIBLE = 16;
const LOAD_MORE_STEP = 16;

const BLOCK_LABELS: Record<BranchBlock, string> = {
  a: "A Block",
  b: "B Block",
};

type CategoriesSectionProps = {
  allStores: StoreRecord[];
  ongoing?: OngoingStoreEventLinks;
};

export default function CategoriesSection({ allStores, ongoing }: CategoriesSectionProps) {
  const [block, setBlock] = useState<BranchBlock>("a");
  const [categoryId, setCategoryId] = useState<StoreGuideCategoryFilter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const navListRef = useRef<HTMLUListElement>(null);

  const category = useMemo(
    () => STORE_GUIDE_CATEGORIES.find((item) => item.id === categoryId)!,
    [categoryId]
  );

  const blockLabel = BLOCK_LABELS[block];
  const banner = getCategoryBanner(categoryId);

  const stores = useMemo(
    () =>
      allStores
        .filter(
          (store) =>
            store.block === block &&
            (categoryId === "all" || store.guideCategory === categoryId)
        )
        .map((store) => toStoreCardView(store, ongoing)),
    [allStores, categoryId, block, ongoing]
  );

  const visibleStores = stores.slice(0, visibleCount);
  const hasMore = visibleCount < stores.length;

  const resetVisibleCount = () => setVisibleCount(INITIAL_VISIBLE);

  useEffect(() => {
    const nav = navListRef.current;
    if (!nav) return;

    const activeBtn = nav.querySelector<HTMLButtonElement>(".floors_nav_btn.is-active");
    activeBtn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [categoryId]);

  return (
    <div className="floors categories">
      <div className="floors_inner content_inner innerTop innerBot">
        <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
          <div className="floors_layout">
            <aside className="floors_sidebar" aria-label="카테고리 선택">
              <FloorsBlockToggle
                block={block}
                onChange={(nextBlock) => {
                  setBlock(nextBlock);
                  resetVisibleCount();
                }}
              />

              <div className="floors_nav">
                <p className="floors_nav_label">
                  <span className="floors_nav_label_site">METAPOLIS DONGTAN</span>
                  <span className="floors_nav_label_dot" aria-hidden="true">
                    {" · "}
                  </span>
                  <span className="floors_nav_label_block">Category</span>
                </p>
                <ul className="floors_nav_list" ref={navListRef}>
                  {STORE_GUIDE_CATEGORIES.map((item) => {
                    const isActive = item.id === categoryId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`floors_nav_btn${isActive ? " is-active" : ""}`}
                          aria-current={isActive ? "true" : undefined}
                          onClick={() => {
                            setCategoryId(item.id);
                            resetVisibleCount();
                          }}
                        >
                          <span className="floors_nav_floor">{item.labelEn}</span>
                          <span className="floors_nav_summary">{item.labelKo}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="floors_content">
              <div className="floors_content_head">
                <div className="floors_content_title">
                  <p className="floors_content_block">{blockLabel}</p>
                  <h2 className="floors_content_floor categories_content_title">{category.labelKo}</h2>
                </div>
                <p className="floors_content_summary">
                  {getCategoryGuideSummary(blockLabel, category.labelKo)}
                </p>
              </div>

              <CategoryBanner
                key={categoryId}
                categoryId={categoryId}
                image={banner.image}
                captionEn={banner.captionEn}
                alt={`${blockLabel} ${category.labelKo} 카테고리 배너`}
              />

              <section className="floors_directory" aria-labelledby="categories-directory-title">
                <div className="floors_directory_head">
                  <h3 id="categories-directory-title" className="floors_directory_title">
                    Store Directory
                  </h3>
                </div>
                <ul className="floors_store_grid categories_store_grid">
                  {visibleStores.map((store) => (
                    <FloorStoreCard key={store.id} store={store} showLocation />
                  ))}
                </ul>
                {hasMore ? (
                  <div className="categories_load_more_wrap">
                    <button
                      type="button"
                      className="categories_load_more"
                      onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
                    >
                      <span>더보기</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ) : null}
              </section>
            </div>
          </div>
        </SubReveal>
      </div>
    </div>
  );
}

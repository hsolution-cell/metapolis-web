"use client";

import type { FaqCategoryFilter } from "@/data/faq";
import { FAQ_CATEGORIES } from "@/data/faq";

type FaqFilterTabsProps = {
  active: FaqCategoryFilter;
  onChange: (category: FaqCategoryFilter) => void;
};

export default function FaqFilterTabs({ active, onChange }: FaqFilterTabsProps) {
  return (
    <div className="faq_tabs" role="tablist" aria-label="FAQ 카테고리">
      {FAQ_CATEGORIES.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`faq_tab${isActive ? " is-active" : ""}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

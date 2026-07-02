"use client";

import type { FaqCategory } from "@/lib/faq-db";

type FaqFilterTabsProps = {
  categories: FaqCategory[];
  active: string; // "all" 또는 category id
  onChange: (categoryId: string) => void;
};

export default function FaqFilterTabs({ categories, active, onChange }: FaqFilterTabsProps) {
  const tabs = [
    { id: "all", label: "전체" },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ];

  return (
    <div className="faq_tabs" role="tablist" aria-label="FAQ 카테고리">
      {tabs.map((tab) => {
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

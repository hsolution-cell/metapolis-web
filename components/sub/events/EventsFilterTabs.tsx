"use client";

import type { EventFilter } from "@/data/events";

const TABS: { id: EventFilter; label: string }[] = [
  { id: "all", label: "전체 이벤트" },
  { id: "ongoing", label: "진행중" },
  { id: "ended", label: "종료" },
];

type EventsFilterTabsProps = {
  active: EventFilter;
  onChange: (filter: EventFilter) => void;
};

export default function EventsFilterTabs({ active, onChange }: EventsFilterTabsProps) {
  return (
    <div className="events_tabs" role="tablist" aria-label="이벤트 상태 필터">
      {TABS.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`events_tab${isActive ? " is-active" : ""}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

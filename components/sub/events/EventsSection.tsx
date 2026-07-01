"use client";

import { useMemo, useState, type ReactNode } from "react";
import SubReveal from "@/components/sub/SubReveal";
import SubSectionHead from "@/components/sub/SubSectionHead";
import EventCard from "@/components/sub/events/EventCard";
import EventsFilterTabs from "@/components/sub/events/EventsFilterTabs";
import EventsPagination from "@/components/sub/events/EventsPagination";
import {
  EVENTS_PER_PAGE,
  filterEvents,
  paginateEvents,
  type EventFilter,
  type EventItem,
  type EventListKind,
} from "@/data/events";

export type EventsSectionProps = {
  events: EventItem[];
  kind: EventListKind;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  titleId: string;
};

export default function EventsSection({
  events,
  kind,
  eyebrow,
  title,
  lead,
  titleId,
}: EventsSectionProps) {
  const [filter, setFilter] = useState<EventFilter>("all");
  const [page, setPage] = useState(1);

  const filteredEvents = useMemo(
    () => filterEvents(events, filter),
    [events, filter]
  );

  const { items, page: safePage, totalPages } = useMemo(
    () => paginateEvents(filteredEvents, page, EVENTS_PER_PAGE),
    [filteredEvents, page]
  );

  const handleFilterChange = (nextFilter: EventFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  return (
    <div className="events">
      <section className="events_list" aria-labelledby={titleId}>
        <div className="events_inner content_inner innerTop innerBot">
          <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
            <SubSectionHead
              className="events_head"
              eyebrow={eyebrow}
              title={title}
              titleId={titleId}
            />
            <p className="events_lead">{lead}</p>
            <div className="events_divider" aria-hidden="true" />

            <div className="events_toolbar">
              <EventsFilterTabs active={filter} onChange={handleFilterChange} />
            </div>

            {items.length ? (
              <ul className="events_grid">
                {items.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} kind={kind} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="events_empty">해당 조건의 이벤트가 없습니다.</p>
            )}

            <EventsPagination
              page={safePage}
              totalPages={totalPages}
              onChange={setPage}
            />
          </SubReveal>
        </div>
      </section>
    </div>
  );
}

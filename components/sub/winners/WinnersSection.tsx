"use client";

import { useMemo, useState } from "react";
import SubReveal from "@/components/sub/SubReveal";
import SubSectionHead from "@/components/sub/SubSectionHead";
import EventsPagination from "@/components/sub/events/EventsPagination";
import WinnerListItem from "@/components/sub/winners/WinnerListItem";
import {
  WINNER_ANNOUNCEMENTS,
  WINNERS_PER_PAGE,
  filterWinners,
  getWinnerListNumber,
  paginateWinners,
  type WinnerItem,
} from "@/data/winners";

type WinnersSectionProps = {
  items?: WinnerItem[];
};

export default function WinnersSection({
  items = WINNER_ANNOUNCEMENTS,
}: WinnersSectionProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(
    () => filterWinners(items, query),
    [items, query]
  );

  const { items: pageItems, page: safePage, totalPages, totalItems } = useMemo(
    () => paginateWinners(filteredItems, page, WINNERS_PER_PAGE),
    [filteredItems, page]
  );

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className="winners">
      <section className="winners_list" aria-labelledby="winners-list-title">
        <div className="winners_inner content_inner innerTop innerBot">
          <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
            <SubSectionHead
              className="winners_head"
              eyebrow="Lucky Winners"
              title={<strong>당첨자 발표</strong>}
              titleId="winners-list-title"
            />
            <p className="winners_lead">
              메타폴리스 이벤트에 참여해 주신 고객님께 감사드리며, 당첨자 명단을
              확인해 보세요!
            </p>

            <div className="winners_toolbar">
              <label className="winners_search">
                <span className="winners_search_label">당첨자 발표 검색</span>
                <input
                  type="search"
                  className="winners_search_input"
                  placeholder="검색어를 입력해 주세요"
                  value={query}
                  onChange={(event) => handleSearchChange(event.target.value)}
                />
                <span className="winners_search_icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20L16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </label>
            </div>

            {pageItems.length ? (
              <ol className="winners_rows">
                {pageItems.map((item, index) => (
                  <WinnerListItem
                    key={item.id}
                    item={item}
                    listNumber={getWinnerListNumber(
                      totalItems,
                      safePage,
                      WINNERS_PER_PAGE,
                      index
                    )}
                  />
                ))}
              </ol>
            ) : (
              <p className="winners_empty">검색 결과가 없습니다.</p>
            )}

            <EventsPagination
              page={safePage}
              totalPages={totalPages}
              onChange={setPage}
              ariaLabel="당첨자 발표 페이지"
            />
          </SubReveal>
        </div>
      </section>
    </div>
  );
}

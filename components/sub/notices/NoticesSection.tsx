"use client";

import { useMemo, useState } from "react";
import SubReveal from "@/components/sub/SubReveal";
import SubSectionHead from "@/components/sub/SubSectionHead";
import EventsPagination from "@/components/sub/events/EventsPagination";
import NoticeListItem from "@/components/sub/notices/NoticeListItem";
import {
  NOTICES_PER_PAGE,
  filterNotices,
  getNoticeListNumber,
  paginateNotices,
  type NoticeListData,
} from "@/data/notices";

type NoticesSectionProps = {
  items: NoticeListData[];
};

export default function NoticesSection({ items }: NoticesSectionProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(
    () => filterNotices(items, query),
    [items, query]
  );

  const { items: pageItems, page: safePage, totalPages, totalItems } = useMemo(
    () => paginateNotices(filteredItems, page, NOTICES_PER_PAGE),
    [filteredItems, page]
  );

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className="notices">
      <section className="notices_list" aria-labelledby="notices-list-title">
        <div className="notices_inner content_inner innerTop innerBot">
          <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
            <SubSectionHead
              className="notices_head"
              eyebrow="Notice"
              title={<strong>고객알림</strong>}
              titleId="notices-list-title"
            />
            <p className="notices_lead">
              메타폴리스몰의 운영 소식과 안내사항을 전해드립니다
            </p>

            <div className="notices_toolbar">
              <label className="notices_search">
                <span className="notices_search_label">고객알림 검색</span>
                <input
                  type="search"
                  className="notices_search_input"
                  placeholder="검색어를 입력해 주세요"
                  value={query}
                  onChange={(event) => handleSearchChange(event.target.value)}
                />
                <span className="notices_search_icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 20L16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </label>
            </div>

            <div className="notices_table">
              <div className="notices_table_head" aria-hidden="true">
                <span className="notices_col notices_col_num">No.</span>
                <span className="notices_col notices_col_category">구분</span>
                <span className="notices_col notices_col_topic">주제</span>
              </div>

              {pageItems.length ? (
                <div className="notices_table_body">
                  {pageItems.map((item, index) => (
                    <NoticeListItem
                      key={item.id}
                      item={item}
                      listNumber={getNoticeListNumber(
                        totalItems,
                        safePage,
                        NOTICES_PER_PAGE,
                        index
                      )}
                    />
                  ))}
                </div>
              ) : (
                <p className="notices_empty">검색 결과가 없습니다.</p>
              )}
            </div>

            <EventsPagination
              page={safePage}
              totalPages={totalPages}
              onChange={setPage}
              ariaLabel="고객알림 페이지"
            />
          </SubReveal>
        </div>
      </section>
    </div>
  );
}

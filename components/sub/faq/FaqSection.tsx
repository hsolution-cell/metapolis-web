"use client";

import { useEffect, useMemo, useState } from "react";
import SubReveal from "@/components/sub/SubReveal";
import SubSectionHead from "@/components/sub/SubSectionHead";
import EventsPagination from "@/components/sub/events/EventsPagination";
import FaqFilterTabs from "@/components/sub/faq/FaqFilterTabs";
import FaqListItem from "@/components/sub/faq/FaqListItem";
import { FAQ_PER_PAGE, getFaqListNumber, paginateFaqItems } from "@/data/faq";
import type { FaqCategory, FaqRecord } from "@/lib/faq-db";

type FaqSectionProps = {
  items: FaqRecord[];
  categories: FaqCategory[];
};

export default function FaqSection({ items, categories }: FaqSectionProps) {
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredItems = useMemo(
    () => (category === "all" ? items : items.filter((i) => i.categoryId === category)),
    [items, category]
  );

  const { items: pageItems, page: safePage, totalPages, totalItems } = useMemo(
    () => paginateFaqItems(filteredItems, page, FAQ_PER_PAGE),
    [filteredItems, page]
  );

  useEffect(() => {
    setTimeout(() => setOpenId(null), 100);
  }, [category, safePage]);

  const handleCategoryChange = (nextCategory: string) => {
    setCategory(nextCategory);
    setPage(1);
  };

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq">
      <section className="faq_list_section" aria-labelledby="faq-list-title">
        <div className="faq_inner content_inner innerTop innerBot">
          <SubReveal threshold={0.12} rootMargin="0px 0px -8% 0px">
            <SubSectionHead
              className="faq_head"
              eyebrow="Frequently Asked Questions"
              title={<strong>자주묻는 질문</strong>}
              titleId="faq-list-title"
            />
            <p className="faq_lead">
              메타폴리스몰 방문 전, 가장 많이 찾으시는 문의사항을 모았습니다.
            </p>

            <div className="faq_toolbar">
              <FaqFilterTabs
                categories={categories}
                active={category}
                onChange={handleCategoryChange}
              />
            </div>

            <div className="faq_table">
              <div className="faq_table_head" aria-hidden="true">
                <span className="faq_col faq_col_num">No.</span>
                <span className="faq_col faq_col_category">구분</span>
                <span className="faq_col faq_col_topic">주제</span>
                <span className="faq_col faq_col_action" />
              </div>

              {pageItems.length ? (
                <div className="faq_table_body">
                  {pageItems.map((item, index) => (
                    <FaqListItem
                      key={item.id}
                      item={item}
                      listNumber={getFaqListNumber(totalItems, safePage, FAQ_PER_PAGE, index)}
                      isOpen={openId === item.id}
                      onToggle={() => handleToggle(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="faq_empty">해당 카테고리의 문의가 없습니다.</p>
              )}
            </div>

            <EventsPagination
              page={safePage}
              totalPages={totalPages}
              onChange={setPage}
              ariaLabel="FAQ 페이지"
            />
          </SubReveal>
        </div>
      </section>
    </div>
  );
}

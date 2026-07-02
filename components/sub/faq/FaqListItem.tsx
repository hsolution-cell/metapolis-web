"use client";

import type { FaqRecord } from "@/lib/faq-db";

type FaqListItemProps = {
  item: FaqRecord;
  listNumber: number;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FaqListItem({
  item,
  listNumber,
  isOpen,
  onToggle,
}: FaqListItemProps) {
  return (
    <div className={`faq_item${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="faq_question"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="faq_col faq_col_num">{listNumber}</span>
        <span className="faq_col faq_col_category">{item.categoryLabel}</span>
        <span className="faq_col faq_col_topic">
          <span className="faq_q_mark" aria-hidden="true">
            Q
          </span>
          <span className="faq_q_text">{item.question}</span>
        </span>
        <span className="faq_chevron" aria-hidden="true">
          <svg viewBox="0 0 17 10" width="17" height="10" fill="none">
            <path
              d="M1 1L8.5 8.5L16 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="faq_answer">
        <div className="faq_answer_inner">
          <div className="faq_answer_row">
            <span className="faq_col faq_col_num" aria-hidden="true" />
            <span className="faq_col faq_col_category" aria-hidden="true" />
            <div className="faq_answer_body">
              <span className="faq_a_mark" aria-hidden="true">
                A
              </span>
              <div
                className="faq_a_text"
                dangerouslySetInnerHTML={{ __html: item.answer ?? "" }}
              />
            </div>
            <span className="faq_col faq_col_action" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

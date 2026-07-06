"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FAQ_ITEMS, FAQ_TAGS } from "@/data/faq";

type FaqItem = { num: string; question: string; answer: string };

type FaqSectionProps = {
  items?: FaqItem[];
  tags?: string[];
  title?: ReactNode;
  desc?: string;
  contactLabel?: string;
  tel?: string;
  telHref?: string;
  ariaLabel?: string;
};

export default function FaqSection({
  items = FAQ_ITEMS,
  tags = FAQ_TAGS,
  title = (
    <>
      메타폴리스몰 방문 전,
      <br />
      <strong>가장 많이 찾는 질문</strong>
    </>
  ),
  desc = "가장 많이 찾으시는 문의사항을 정리해 드립니다.",
  contactLabel = "고객센터",
  tel = "Tel. 031 - 731 - 7000",
  telHref = "tel:0317317000",
  ariaLabel = "자주 묻는 질문",
}: FaqSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      className={`main_faq page main_section_pad${inView ? " is-inview" : ""}`}
      aria-label={ariaLabel}
    >
      <div className="main_faq_bg" aria-hidden="true" />
      <p className="main_faq_watermark" aria-hidden="true">
        METAPOLIS MALL
      </p>

      <div className="main_faq_inner content_inner">
        <div className="main_faq_layout">
          <aside className="main_faq_intro">
            <div className="main_faq_card">
              <h2 className="main_faq_title">{title}</h2>
              <p className="main_faq_desc">{desc}</p>
              <div className="main_faq_contact">
                <span className="main_faq_contact_label">{contactLabel}</span>
                <a href={telHref} className="main_faq_contact_tel">
                  {tel}
                </a>
              </div>
              <ul className="main_faq_tags">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="main_faq_accordion">
            <div className="main_faq_list">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.num} className={`main_faq_item${isOpen ? " is-open" : ""}`}>
                    <button
                      type="button"
                      className="main_faq_question"
                      aria-expanded={isOpen}
                      onClick={() => toggleItem(index)}
                    >
                      <span className="main_faq_num">{item.num}</span>
                      <span className="main_faq_qtext">{item.question}</span>
                      <span className="main_faq_icon" aria-hidden="true" />
                    </button>
                    <div className="main_faq_answer">
                      <div className="main_faq_answer_inner">
                        <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { FAQ_ITEMS, FAQ_TAGS } from "@/data/faq";

export default function FaqSection() {
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
      aria-label="자주 묻는 질문"
    >
      <div className="main_faq_bg" aria-hidden="true" />
      <p className="main_faq_watermark" aria-hidden="true">
        METAPOLIS
      </p>

      <div className="main_faq_inner content_inner">
        <div className="main_faq_layout">
          <aside className="main_faq_intro">
            <div className="main_faq_intro_deco" aria-hidden="true">
              <img src="/img/main_faq_intro_deco.png" alt="" />
            </div>
            <div className="main_faq_card">
              <h2 className="main_faq_title">
                메타폴리스 방문 전,
                <br />
                <strong>가장 많이 찾는 질문</strong>
              </h2>
              <p className="main_faq_desc">가장 많이 찾으시는 문의사항을 정리해 드립니다.</p>
              <div className="main_faq_contact">
                <span className="main_faq_contact_label">고객센터</span>
                <a href="tel:0317317000" className="main_faq_contact_tel">
                  Tel. 031 - 731 - 7000
                </a>
              </div>
              <ul className="main_faq_tags">
                {FAQ_TAGS.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="main_faq_accordion">
            <div className="main_faq_list">
              {FAQ_ITEMS.map((item, index) => {
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

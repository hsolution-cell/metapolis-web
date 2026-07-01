"use client";

import { useState } from "react";
import { EN_FAQ } from "@/data/en/home";

export default function EnFaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <ul className="en-faq__list">
      {EN_FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className={isOpen ? "is-open" : undefined}>
            <button
              type="button"
              className="en-faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="en-faq__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="en-faq__qtext">{item.q}</span>
              <span className="en-faq__icon" aria-hidden="true" />
            </button>
            {isOpen && <div className="en-faq__a">{item.a}</div>}
          </li>
        );
      })}
    </ul>
  );
}

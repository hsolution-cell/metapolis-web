"use client";

import { useEffect, useRef, useState } from "react";

const MARQUEE_TEXT = "METAPOLIS MALL DONGTAN";

type HoursHeroVisualProps = {
  open?: string;
  close?: string;
  midText?: string;
};

export default function HoursHeroVisual({
  open = "10:30",
  close = "22:00",
  midText = "연중무휴",
}: HoursHeroVisualProps = {}) {
  const visualRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const target = visualRef.current;
    if (!target) return;

    const update = () => {
      const rect = target.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const threshold = window.innerHeight * 0.08;
      const isCentered = Math.abs(elementCenter - viewportCenter) < threshold;
      const isAboveCenterZone = elementCenter > viewportCenter + threshold;
      const scrollingUp = window.scrollY < lastScrollYRef.current;

      lastScrollYRef.current = window.scrollY;

      setIsExpanded((prev) => {
        if (isCentered) return true;
        if (scrollingUp && isAboveCenterZone) return false;
        return prev;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="hours_hero">
      <div className="hours_hero_deco" aria-hidden="true">
        <div className="hours_hero_marquee">
          <div className="hours_hero_marquee_track">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>{MARQUEE_TEXT}&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>
      </div>

      <div className="content_inner hours_hero_inner">
        <div
          ref={visualRef}
          className={`hours_hero_visual${isExpanded ? " is-expanded" : ""}`}
        >
          <div className="hours_hero_orb">
            <img
              className="hours_hero_moon"
              src="/img/sub/hours/moon.png"
              alt=""
            />
          </div>
          <div className="hours_hero_time">
            <span className="hours_hero_open">{open}</span>
            <span className="hours_hero_mid">
              <span className="hours_hero_dash" aria-hidden="true">
                —
              </span>
              {midText}
              <span className="hours_hero_dash" aria-hidden="true">
                —
              </span>
            </span>
            <span className="hours_hero_close">{close}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

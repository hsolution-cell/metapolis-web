"use client";

import type { ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type HoursMainIntroProps = {
  children: ReactNode;
};

export default function HoursMainIntro({ children }: HoursMainIntroProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div
      ref={ref}
      className={`content_inner hours_main_intro sub_reveal${inView ? " is-inview" : ""}`}
    >
      {children}
    </div>
  );
}

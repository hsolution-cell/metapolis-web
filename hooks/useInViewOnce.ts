"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOnceOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useInViewOnce<T extends HTMLElement = HTMLElement>(
  options: UseInViewOnceOptions = {},
) {
  const { threshold = 0.12, rootMargin = "0px 0px -8% 0px" } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView };
}

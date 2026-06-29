"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type SubRevealProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function SubReveal<T extends ElementType = "div">({
  as,
  className = "",
  children,
  threshold,
  rootMargin,
  ...rest
}: SubRevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold, rootMargin });

  return (
    <Tag
      ref={ref}
      className={`sub_reveal${inView ? " is-inview" : ""}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

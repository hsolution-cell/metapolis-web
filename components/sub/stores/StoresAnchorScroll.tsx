"use client";

import { useEffect, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { scrollToAnchorHash, scrollToAnchorId } from "@/lib/scrollToAnchor";

type StoresAnchorLinkProps = ComponentPropsWithoutRef<"a">;

export function StoresAnchorLink({ href, onClick, ...rest }: StoresAnchorLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !href?.startsWith("#")) return;

    const id = decodeURIComponent(href.slice(1));
    if (!id) return;

    event.preventDefault();
    if (scrollToAnchorId(id)) {
      window.history.pushState(null, "", href);
    }
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}

export function StoresScrollInit() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToAnchorHash(hash);
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}

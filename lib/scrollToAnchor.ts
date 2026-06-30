const DEFAULT_HEADER_H = 80;
const SCROLL_GAP = 32;

export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function getAnchorScrollOffset(gap = SCROLL_GAP) {
  if (typeof window === "undefined") return DEFAULT_HEADER_H + gap;

  const headerH = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-h")
  );

  return (Number.isFinite(headerH) ? headerH : DEFAULT_HEADER_H) + gap;
}

export function scrollToAnchorId(id: string, behavior?: ScrollBehavior) {
  const target = document.getElementById(id);
  if (!target) return false;

  const top =
    target.getBoundingClientRect().top + window.scrollY - getAnchorScrollOffset();

  window.scrollTo({
    top: Math.max(0, top),
    behavior: behavior ?? getScrollBehavior(),
  });
  return true;
}

export function scrollToAnchorHash(hash: string, behavior?: ScrollBehavior) {
  if (!hash.startsWith("#")) return false;
  const id = decodeURIComponent(hash.slice(1));
  if (!id) return false;
  return scrollToAnchorId(id, behavior);
}

// 영문 사이트 내비게이션 — 5개 메뉴 구조(국문과 별개)
export type EnNavItem = { label: string; href: string };

export const EN_NAV: EnNavItem[] = [
  { label: "About METAPOLIS", href: "/en/about" },
  { label: "Hours", href: "/en/hours" },
  { label: "Access & Parking", href: "/en/location" },
  { label: "Floor Guide", href: "/en/floors" },
];

// 푸터 링크 — 법무/문의 페이지는 국문 페이지로 연결(영문 페이지 없음)
export const EN_FOOTER_LINKS: EnNavItem[] = [
  { label: "Leasing Inquiries", href: "/support/inquiry" },
  { label: "Venue Rentals", href: "/support/inquiry" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Sitemap", href: "/sitemap" },
];

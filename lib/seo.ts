/** 상세 게시글용 openGraph 메타 — 이미지 있으면 og:image 포함(없으면 루트 기본 og 유지) */
export function postOpenGraph(title: string, image?: string | null) {
  return {
    title: `METAPOLIS MALL | ${title}`,
    description: title,
    ...(image ? { images: [image] } : {}),
  };
}

/** HTML 본문에서 첫 <img src> 추출 — 썸네일 없는 글(공지)의 og:image 용 */
export function firstImageSrc(html?: string | null): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

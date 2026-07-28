import type { Metadata } from "next";
import { getPageMeta } from "@/data/siteMeta";

type BuildPageMetadataOptions = {
  path: string;
};

/** 국문 ↔ 영문 대응 경로 (hreflang용) */
const KO_TO_EN_PATHS: Record<string, string> = {
  "/": "/en",
  "/about": "/en/about",
  "/hours": "/en/hours",
  "/location": "/en/location",
  "/stores/floors": "/en/floors",
};

const EN_TO_KO_PATHS: Record<string, string> = Object.fromEntries(
  Object.entries(KO_TO_EN_PATHS).map(([ko, en]) => [en, ko])
);

/** canonical + (대응 페이지가 있으면) hreflang alternates — metadataBase 기준 상대 경로 */
export function buildPageAlternates(path: string): Metadata["alternates"] {
  const enPath = KO_TO_EN_PATHS[path];
  if (enPath) {
    return {
      canonical: path,
      languages: { ko: path, en: enPath, "x-default": path },
    };
  }

  const koPath = EN_TO_KO_PATHS[path];
  if (koPath) {
    return {
      canonical: path,
      languages: { ko: koPath, en: path, "x-default": koPath },
    };
  }

  return { canonical: path };
}

export function buildPageMetadata({ path }: BuildPageMetadataOptions): Metadata {
  const meta = getPageMeta(path);
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildPageAlternates(path),
    ...(meta.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      siteName: "METAPOLIS MALL",
      images: [{ url: "/img/thumbnail.png", width: 1200, height: 630 }],
    },
  };
}

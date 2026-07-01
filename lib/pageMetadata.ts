import type { Metadata } from "next";
import { getPageMeta } from "@/data/siteMeta";

type BuildPageMetadataOptions = {
  path: string;
};

export function buildPageMetadata({ path }: BuildPageMetadataOptions): Metadata {
  const meta = getPageMeta(path);
  return {
    title: meta.title,
    description: meta.description,
    ...(meta.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      siteName: "METAPOLIS",
      images: [{ url: "/img/thumbnail.png", width: 1200, height: 630 }],
    },
  };
}

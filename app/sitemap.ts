import type { MetadataRoute } from "next";
import { SUB_PAGES } from "@/data/siteMeta";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://metapolis.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/privacy",
    "/terms",
    "/sitemap",
    ...SUB_PAGES.map((p) => p.path),
    "/stores/search",
  ];

  return staticPaths.map((path) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

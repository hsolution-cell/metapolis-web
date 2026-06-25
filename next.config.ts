import type { NextConfig } from "next";

const LEGACY_REDIRECTS = [
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/menu1_1.html", destination: "/about", permanent: true },
  { source: "/menu1_2.html", destination: "/hours", permanent: true },
  { source: "/menu1_3.html", destination: "/location", permanent: true },
  { source: "/menu1_4.html", destination: "/parking", permanent: true },
  { source: "/menu2_1.html", destination: "/stores", permanent: true },
  { source: "/menu2_2.html", destination: "/stores/floors", permanent: true },
  { source: "/menu2_3.html", destination: "/stores/categories", permanent: true },
  { source: "/menu2_4.html", destination: "/stores/facilities", permanent: true },
  { source: "/menu3_1.html", destination: "/events", permanent: true },
  { source: "/menu3_2.html", destination: "/events/stores", permanent: true },
  { source: "/menu3_3.html", destination: "/events/winners", permanent: true },
  { source: "/menu4_1.html", destination: "/support/faq", permanent: true },
  { source: "/menu4_2.html", destination: "/support/inquiry", permanent: true },
  { source: "/menu4_3.html", destination: "/support/notices", permanent: true },
  { source: "/site1.html", destination: "/privacy", permanent: true },
  { source: "/site2.html", destination: "/terms", permanent: true },
  { source: "/site3.html", destination: "/sitemap", permanent: true },
  { source: "/preview.html", destination: "/preview", permanent: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS;
  },
};

export default nextConfig;

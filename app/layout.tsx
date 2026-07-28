import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickMenu from "@/components/layout/QuickMenu";
import PopupLayer from "@/components/PopupLayer";
import { ToastProvider } from "@/contexts/ToastContext";
import { DEFAULT_META } from "@/data/siteMeta";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://metapolis.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_META.title,
  description: DEFAULT_META.description,
  openGraph: {
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    type: "website",
    siteName: "METAPOLIS MALL",
    images: [{ url: "/img/thumbnail.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* 쇼핑몰 사업장 구조화 데이터 — 구글 지역검색·AI 검색용 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ShoppingCenter",
              name: "메타폴리스몰",
              alternateName: "METAPOLIS MALL",
              url: SITE_URL,
              image: `${SITE_URL}/img/thumbnail.png`,
              telephone: "+82-31-371-7000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "동탄중앙로 220",
                addressLocality: "화성시",
                addressRegion: "경기도",
                addressCountry: "KR",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "10:30",
                closes: "22:00",
              },
            }),
          }}
        />
        <ToastProvider>
          <div className="wrap">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <QuickMenu />
          <PopupLayer />
          <SpeedInsights />
        </ToastProvider>
      </body>
    </html>
  );
}

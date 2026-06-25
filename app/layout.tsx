import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickMenu from "@/components/layout/QuickMenu";
import { ToastProvider } from "@/contexts/ToastContext";
import { DEFAULT_META } from "@/data/siteMeta";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: DEFAULT_META.title,
  description: DEFAULT_META.description,
  icons: {
    icon: [{ url: "/img/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
  },
  openGraph: {
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    type: "website",
    siteName: "METAPOLIS",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ToastProvider>
          <div className="wrap">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <QuickMenu />
          <SpeedInsights />
        </ToastProvider>
      </body>
    </html>
  );
}

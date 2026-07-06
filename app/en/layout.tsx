import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "METAPOLIS MALL | English",
  description: "METAPOLIS MALL official website — mall introduction, hours, access & parking, floor guide.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <div className="en-root">{children}</div>;
}

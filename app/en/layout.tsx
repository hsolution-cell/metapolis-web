import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "METAPOLIS | English",
  description: "METAPOLIS official website — mall introduction, hours, access & parking, floor guide.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <div className="en-root">{children}</div>;
}

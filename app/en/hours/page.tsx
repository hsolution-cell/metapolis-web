import type { Metadata } from "next";
import EnSubLayout from "@/components/en/EnSubLayout";
import HoursSection from "@/components/sub/hours/HoursSection";
import { EN_HOURS_CATEGORIES } from "@/data/en/hours";

export const metadata: Metadata = {
  title: "METAPOLIS | Hours",
  description: "METAPOLIS opening hours — open year-round, 10:30 AM to 10:00 PM.",
};

export default function Page() {
  return (
    <EnSubLayout
      currentPath="/en/hours"
      label="Hours"
      bannerImage="/img/sub/banner/menu1.png"
      className="hours"
    >
      <HoursSection
        introEyebrow="Mall Hours"
        introTitle="Hours"
        heroMidText="Open 365 Days"
        storesEyebrow="Please check individual hours before visiting"
        storesTitle="Store Hours Vary"
        categories={EN_HOURS_CATEGORIES}
        noteLabel="Note :"
      />
    </EnSubLayout>
  );
}

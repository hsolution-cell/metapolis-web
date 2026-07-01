import type { Metadata } from "next";
import EnSubLayout from "@/components/en/EnSubLayout";
import ParkingSection from "@/components/sub/parking/ParkingSection";
import {
  EN_PARKING_STEPS,
  EN_PARKING_FEE_DETAILS,
  EN_PARKING_BENEFITS,
  EN_PARKING_SPECIAL,
} from "@/data/en/parking";

export const metadata: Metadata = {
  title: "METAPOLIS | Access & Parking",
  description: "How to get to METAPOLIS and parking guide, fees, and validation.",
};

export default function Page() {
  return (
    <EnSubLayout
      currentPath="/en/location"
      label="Access & Parking"
      bannerImage="/img/sub/banner/menu1.png"
      className="parking"
    >
      <ParkingSection
        eyebrow="Location Info"
        title="Access & Parking"
        notice1={
          <>
            Register your license plate at <b>checkout to validate your free parking</b>
          </>
        }
        notice2Href="tel:0313717078"
        notice2={
          <>
            <b>031-371-7078</b> (Parking Office)
          </>
        }
        mapImage="/img/sub/parking/map-en.png"
        mapAlt="Metapolis Block A / Block B parking entrance map"
        caption="No vehicular movement between Blocks A & B"
        addressText="220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do"
        processLabel="Process"
        processTitle="Parking Guide"
        processSteps={EN_PARKING_STEPS}
        feeLabel="Rates"
        feeTitle="Parking Fees"
        feeBadge="20:00 - 08:00 Next Day · 50% Off"
        feeHeadline={
          <>
            First 30 Mins : Free &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 500 KRW / Each 10 Mins
          </>
        }
        feeDetails={EN_PARKING_FEE_DETAILS}
        freeLabel="Validation"
        freeTitle="Validated Parking"
        benefitsHead={{ amount: "Purchase Amount", time: "Free Parking" }}
        benefitsRows={EN_PARKING_BENEFITS}
        benefitsNote="*Exclusions may apply at select stores"
        specialCards={EN_PARKING_SPECIAL}
      />
    </EnSubLayout>
  );
}

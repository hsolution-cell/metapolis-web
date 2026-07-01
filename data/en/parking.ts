import type { ParkingIconType } from "@/components/sub/parking/ParkingIcons";

// 영문 Access & Parking 데이터 (시안 기준)

export const EN_PARKING_STEPS: { iconType: ParkingIconType; label: string }[] = [
  { iconType: "entry", label: "Automatic License Plate Recognition" },
  { iconType: "confirm", label: "Parking Validation at Store Checkout" },
  { iconType: "payment", label: "Pay at pre-payment kiosk or exit" },
];

export const EN_PARKING_FEE_DETAILS = [
  { dt: "Daily Max Rate", dd: "20,000 KRW" },
  { dt: "Grace Period After Payment", dd: "20 Mins" },
];

export const EN_PARKING_BENEFITS = [
  { amount: "10,000 KRW or more", time: "1 Hour Free" },
  { amount: "20,000 KRW or more", time: "2 Hours Free" },
  { amount: "30,000 KRW or more", time: "3 Hours Free" },
  { amount: "40,000 KRW or more", time: "4 Hours Free" },
  { amount: "50,000 KRW or more", time: "5 Hours Free" },
];

export const EN_PARKING_SPECIAL: {
  title: string;
  iconType: ParkingIconType;
  time: string;
  note?: string;
}[] = [
  { title: "Clinic Visitors", iconType: "clinic", time: "2 Hours Free" },
  { title: "Cinema (CGV)", iconType: "cgv", time: "3 Hours Free", note: "(self-service kiosk)" },
];

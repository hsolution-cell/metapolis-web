// 영문 홈 콘텐츠 — 시안(메인) 기준

export const EN_HERO = {
  badge: "NOTICE",
  title: "A joyful daily stroll\nat the all-new METAPOLIS",
  desc: "A new beginning this May, a new name.",
  bg: "/img/hero_bg_01.png",
  bgMobile: "/img/hero_bg_01_mo.png",
};

// 층별 안내 그리드 (A/B 블록)
export type EnFloorGroup = { block: string; floors: string[] };
export const EN_FLOOR_GROUPS: EnFloorGroup[] = [
  { block: "A Block", floors: ["4F", "3F", "2F", "1F", "B2"] },
  { block: "B Block", floors: ["4F", "3F", "2F", "1F", "B2-B4"] },
];

// FAQ (시안 문항)
export type EnFaqItem = { q: string; a: string };
export const EN_FAQ: EnFaqItem[] = [
  {
    q: "What is the parking policy at Metapolis?",
    a: "Free for the first 30 mins, then 500 won per 10 mins. Free parking varies by purchase amount. See [Access & Parking] for details.",
  },
  {
    q: "Where are the nursing rooms and smoking areas?",
    a: "Nursing Rooms: 4F (Blocks A & B) / Smoking Areas: 4F (Block A), 3F (Block B).",
  },
  {
    q: "Where can I rent a stroller or wheelchair?",
    a: "Rentals are available at the Service Desk (Block A, 2nd floor). For inquiries, call 031-731-7000.",
  },
  {
    q: "What should I do if I lose something?",
    a: "Please contact the Service Desk (Block A, 2nd floor / 031-371-7083~5) for lost and found items.",
  },
  {
    q: "What is the exchange and refund policy?",
    a: "Available within 7 days of purchase. Please visit the original store with the item and receipt.",
  },
  {
    q: "What are your regular closed days and store hours?",
    a: "We are open year-round from 10:30 AM to 10:00 PM (hours may vary for some stores).",
  },
  {
    q: "How do I inquire about partnerships and venue rentals?",
    a: "Please contact our Customer Center (031-731-7000). A representative will review and assist you.",
  },
];

export const EN_FAQ_TAGS = [
  "Amenities",
  "Partners",
  "FAQ",
  "Returns/Lost & Found",
  "Parking",
  "Rental Services",
  "Operating Hours",
];

export const EN_CONTACT = {
  eyebrow: "We're Here to Help",
  title: "Contact Us",
  subtitle: "Got a question?",
  text: "Feel free to call our main number. Our Service Desk is happy to assist you with general inquiries, store leasing, and venue rentals.",
  address: "220 Dongtanjungang-ro, Hwaseong-si, Gyeonggi-do",
  phone: "031-371-7000",
  supportHours: "09:00 - 18:00",
  operatingHours: "10:30 - 22:00 (365 days)",
};

export const EN_LOCATION = {
  eyebrow: "LOCATION",
  text: "Enjoy a relaxing time at Metapolis, a place to stroll and unwind",
  mapImage: "/img/sub/location/map.png",
  address: "220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do",
  phone: "031-371-7000",
  hour: "10:30 - 22:00",
};

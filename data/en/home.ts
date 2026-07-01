import type { HeroSlide } from "@/data/heroSlides";

// 영문 홈 콘텐츠 — 국문 홈 컴포넌트를 재사용하되 콘텐츠만 영어로 제공

export const EN_HERO_SLIDES: HeroSlide[] = [
  {
    bg: "/img/hero_bg_01.png",
    bgMobile: "/img/hero_bg_01_mo.png",
    badge: "NOTICE",
    title: "A joyful daily stroll\nat the all-new METAPOLIS",
    desc: "A new beginning this May, a new name.",
  },
];

export const EN_BRANCH = {
  title: "Metapolis Store Directory by Floor",
  desc: "Discover the endless fun at Time Terrace at a glance",
  backLabel: "Back",
};

// FAQ 아이템 — 국문 FaqSection과 동일 형태 { num, question, answer }
export type EnFaqItem = { num: string; question: string; answer: string };
export const EN_FAQ_ITEMS: EnFaqItem[] = [
  {
    num: "01",
    question: "What is the parking policy at Metapolis?",
    answer:
      'Free for the first 30 mins, then 500 won per 10 mins. Free parking varies by purchase amount. See <a href="/en/location">Access &amp; Parking</a> for details.',
  },
  {
    num: "02",
    question: "Where are the nursing rooms and smoking areas?",
    answer: "Nursing Rooms: 4F (Blocks A &amp; B) / Smoking Areas: 4F (Block A), 3F (Block B).",
  },
  {
    num: "03",
    question: "Where can I rent a stroller or wheelchair?",
    answer:
      "Rentals are available at the Service Desk (Block A, 2nd floor). For inquiries, call 031-731-7000.",
  },
  {
    num: "04",
    question: "What should I do if I lose something?",
    answer:
      "Please contact the Service Desk (Block A, 2nd floor / 031-371-7083~5) for lost and found items.",
  },
  {
    num: "05",
    question: "What is the exchange and refund policy?",
    answer:
      "Available within 7 days of purchase. Please visit the original store with the item and receipt.",
  },
  {
    num: "06",
    question: "What are your regular closed days and store hours?",
    answer:
      "We are open year-round from 10:30 AM to 10:00 PM (hours may vary for some stores).",
  },
  {
    num: "07",
    question: "How do I inquire about partnerships and venue rentals?",
    answer:
      "Please contact our Customer Center (031-731-7000). A representative will review and assist you.",
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

export const EN_FAQ_INTRO = {
  desc: "Here are our most frequently asked questions",
  contactLabel: "Customer Service Center",
  tel: "Tel. 031 - 731 - 7000",
  telHref: "tel:0317317000",
};

export const EN_LOCATION = {
  desc: "Enjoy a relaxing time at Metapolis, a place to stroll and unwind.",
  addressEn: "220, Dongtanjungang-ro, Dongtan-gu, Hwaseong-si, Gyeonggi-do",
  tel: "031-371-7000",
  hour: "10:30 - 22:00",
  primary: { href: "/en/location", label: "Access & Parking" },
  secondary: { href: "/en/floors", label: "Floor Guide" },
};

export const EN_CONTACT = {
  eyebrow: "We're Here to Help",
  title: "Contact Us",
  subtitle: "Got a question?",
  text: "Feel free to call our main number. Our Service Desk is happy to assist you with general inquiries, store leasing, and venue rentals.",
  address: "220 Dongtanjungang-ro, Hwaseong-si, Gyeonggi-do",
  phone: "031-371-7000",
  supportHours: "09:00 - 18:00",
  // "(365 days)"가 중간에서 끊기지 않도록 비분리 공백 사용 → "10:30 - 22:00 / (365 days)"
  operatingHours: "10:30 - 22:00 (365 days)",
};

import type { HoursStoreCardProps } from "@/components/sub/hours/HoursStoreCard";

// 영문 Hours 데이터 (시안 기준)
type EnHoursCategory = { title: string; stores: HoursStoreCardProps[] };

export const EN_HOURS_CATEGORIES: EnHoursCategory[] = [
  {
    title: "Shopping & Culture",
    stores: [
      {
        category: "Hypermarket",
        name: "Homeplus",
        logo: "/img/main_branch_store_homeplus.png",
        schedules: [{ label: "Daily", value: "10:00 - 24:00" }],
        note: "Closed: 2nd & 4th Sundays",
      },
      {
        category: "Cinema",
        name: "CGV",
        logo: "/img/main_branch_store_cgv.png",
        schedules: [{ label: "Daily", value: "07:00 - 03:00 next day" }],
        note: "Varies by movie schedule",
      },
      {
        category: "Used Bookstore",
        name: "Aladdin",
        logo: "/img/main_branch_store_aladin.png",
        schedules: [{ label: "Daily", value: "09:30 - 22:00" }],
      },
      {
        category: "Cafe",
        name: "Starbucks",
        logo: "/img/main_branch_store_starbucks.png",
        schedules: [{ label: "Daily", value: "08:00 - 22:00" }],
      },
      {
        category: "Lifestyle",
        name: "Resort Lab",
        logo: "/img/main_branch_store_resortlab.png",
        schedules: [{ label: "Daily", value: "09:00 - 22:00" }],
      },
    ],
  },
  {
    title: "Medical",
    stores: [
      {
        category: "Pediatrics",
        name: "Yonsei Pediatrics",
        logo: "/img/sub/hours/icons/pediatric.png",
        schedules: [
          { label: "Mon - Fri", value: "08:30 - 21:00" },
          { label: "Sat", value: "08:30 - 18:00" },
          { label: "Sun & Holidays", value: "09:00 - 13:00" },
        ],
        note: "Holiday hours may vary",
      },
      {
        category: "Internal Medicine",
        name: "Metapolis Internal Medicine",
        logo: "/img/sub/hours/icons/internal.png",
        schedules: [
          { label: "Mon, Tue, Thu, Fri", value: "09:30 - 19:00" },
          { label: "Wed", value: "09:00 - 13:00" },
          { label: "Sat", value: "09:30 - 13:30" },
          { label: "Sun & Holidays", value: "Closed", closed: true },
        ],
      },
      {
        category: "Dentistry",
        name: "Metapolis Dental Clinic",
        logo: "/img/sub/hours/icons/dental.png",
        schedules: [
          { label: "Mon, Wed, Fri", value: "10:00 - 19:00" },
          { label: "Tue, Thu", value: "10:00 - 20:00" },
          { label: "Sat", value: "10:00 - 18:00" },
          { label: "Sun & Holidays", value: "Closed", closed: true },
        ],
      },
      {
        category: "Dermatology",
        name: "Grace Dermatology",
        logo: "/img/sub/hours/icons/dermatology.png",
        schedules: [
          { label: "Mon, Tue, Wed", value: "10:00 - 19:00" },
          { label: "Fri", value: "10:00 - 20:00" },
          { label: "Sat", value: "10:00 - 15:00" },
          { label: "Thu, Sun & Holidays", value: "Closed", closed: true },
        ],
      },
      {
        category: "Korean Medicine",
        name: "Ainuri Korean Medicine Clinic",
        logo: "/img/sub/hours/icons/oriental.png",
        schedules: [
          { label: "Mon - Fri", value: "10:00 - 19:00" },
          { label: "Sat", value: "09:30 - 19:00" },
          { label: "Holidays", value: "09:30 - 16:00" },
          { label: "Sun", value: "Closed", closed: true },
        ],
      },
      {
        category: "Ortho & Neurosurg",
        name: "Geun & Bon Clinic",
        logo: "/img/sub/hours/icons/orthopedics.png",
        schedules: [
          { label: "Mon - Fri", value: "09:30 - 20:00" },
          { label: "Sat", value: "09:30 - 14:30" },
          { label: "Holidays", value: "Hours may vary" },
          { label: "Sun", value: "Closed", closed: true },
        ],
      },
      {
        category: "Ophthalmology",
        name: "Seoul Eye Clinic",
        logo: "/img/sub/hours/icons/ophthalmology.png",
        schedules: [
          { label: "Mon - Fri", value: "10:30 - 19:00" },
          { label: "Sat", value: "10:30 - 18:00" },
          { label: "Sun & Holidays", value: "Closed", closed: true },
        ],
      },
      {
        category: "Pharmacy",
        name: "I-Sarang Haedeun Pharmacy",
        logo: "/img/sub/hours/icons/pharmacy.png",
        schedules: [
          { label: "Mon - Fri", value: "08:30 - 22:00" },
          { label: "Sun & Holidays", value: "09:00 - 22:00" },
        ],
      },
    ],
  },
];

import type { ComponentType } from "react";
import type { StoreIconCategory } from "@/data/storeDirectory";
import IconArcade from "@/components/sub/floors/icons/IconArcade";
import IconBook from "@/components/sub/floors/icons/IconBook";
import IconCafe from "@/components/sub/floors/icons/IconCafe";
import IconCulture from "@/components/sub/floors/icons/IconCulture";
import IconDigital from "@/components/sub/floors/icons/IconDigital";
import IconFashion from "@/components/sub/floors/icons/IconFashion";
import IconFb from "@/components/sub/floors/icons/IconFb";
import IconJewelry from "@/components/sub/floors/icons/IconJewelry";
import IconHairService from "@/components/sub/floors/icons/IconHairService";
import IconHospital from "@/components/sub/floors/icons/IconHospital";
import IconKids from "@/components/sub/floors/icons/IconKids";
import IconLingerie from "@/components/sub/floors/icons/IconLingerie";
import IconLiving from "@/components/sub/floors/icons/IconLiving";
import IconMart from "@/components/sub/floors/icons/IconMart";
import IconMakeup from "@/components/sub/floors/icons/IconMakeup";
import IconService from "@/components/sub/floors/icons/IconService";
import IconShoes from "@/components/sub/floors/icons/IconShoes";
import IconSpa from "@/components/sub/floors/icons/IconSpa";

type FloorIconProps = {
  category: StoreIconCategory;
};

const ICONS: Record<StoreIconCategory, ComponentType> = {
  fashion: IconFashion,
  lingerie: IconLingerie,
  shoes: IconShoes,
  fb: IconFb,
  cafe: IconCafe,
  service: IconService,
  hair_service: IconHairService,
  makeup: IconMakeup,
  jewelry: IconJewelry,
  digital: IconDigital,
  spa: IconSpa,
  culture: IconCulture,
  book: IconBook,
  hospital: IconHospital,
  arcade: IconArcade,
  mart: IconMart,
  kids: IconKids,
  living: IconLiving,
};

export default function FloorIcon({ category }: FloorIconProps) {
  const Icon = ICONS[category] ?? IconFashion;
  return <Icon />;
}

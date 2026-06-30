import type { BranchBlock } from "@/data/branchStores";
import {
  getStoresByBlockAndFloor,
  toStoreCardView,
  type StoreIconCategory,
  type StoreCardView,
} from "@/data/storeDirectory";

/** @deprecated StoreIconCategory 사용 권장 */
export type FloorStoreCategory = StoreIconCategory;

/** @deprecated StoreCardView 사용 권장 */
export type FloorGuideStore = Pick<
  StoreCardView,
  "id" | "name" | "tel" | "iconCategory" | "hasEvent"
>;

function toFloorGuideStore(store: StoreCardView): FloorGuideStore {
  return {
    id: store.id,
    name: store.name,
    tel: store.tel,
    iconCategory: store.iconCategory,
    hasEvent: store.hasEvent,
  };
}

export type FloorGuideFloor = {
  id: string;
  label: string;
  summary: string;
  mapImage: string;
  mapCaption: string;
  stores: FloorGuideStore[];
};

export type FloorGuideBlock = {
  id: BranchBlock;
  label: string;
  floors: FloorGuideFloor[];
};

const MAP = "/img/sub/floors/maps/placeholder.png";
const MAP_A4 = "/img/sub/floors/maps/a4.png";
const MAP_A3 = "/img/sub/floors/maps/a3.png";
const MAP_A2 = "/img/sub/floors/maps/a2.png";
const MAP_A1 = "/img/sub/floors/maps/a1.png";
const MAP_AB2 = "/img/sub/floors/maps/ab2.png";
const MAP_B4 = "/img/sub/floors/maps/b4.png";
const MAP_B3 = "/img/sub/floors/maps/b3.png";
const MAP_B2 = "/img/sub/floors/maps/b2.png";
const MAP_B1 = "/img/sub/floors/maps/b1.png";
const MAP_BB2 = "/img/sub/floors/maps/bb2.png";

const FLOOR_META: Record<BranchBlock, Omit<FloorGuideFloor, "stores">[]> = {
  a: [
    {
      id: "4f",
      label: "4F",
      summary: "CGV · 헤어샵 · 네일샵 · 유아휴게실 등",
      mapImage: MAP_A4,
      mapCaption: "A BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "3f",
      label: "3F",
      summary: "CGV · 아웃백 · 게임센터 · 레스토랑",
      mapImage: MAP_A3,
      mapCaption: "A BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "2f",
      label: "2F",
      summary: "남성&여성패션 · F&B · 서비스데스크",
      mapImage: MAP_A2,
      mapCaption: "A BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "1f",
      label: "1F",
      summary: "스포츠 · 아웃도어 · 카페",
      mapImage: MAP_A1,
      mapCaption: "A BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "b2",
      label: "B2",
      summary: "SPA · F&B · 디지털 · 수선실 등",
      mapImage: MAP_AB2,
      mapCaption: "A BLOCK · FLOOR DIRECTORY",
    },
  ],
  b: [
    {
      id: "4f",
      label: "4F",
      summary: "알라딘 · 문화 · F&B",
      mapImage: MAP_B4,
      mapCaption: "B BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "3f",
      label: "3F",
      summary: "키즈 · 편의 · F&B",
      mapImage: MAP_B3,
      mapCaption: "B BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "2f",
      label: "2F",
      summary: "리빙 · 잡화 · 인테리어",
      mapImage: MAP_B2,
      mapCaption: "B BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "1f",
      label: "1F",
      summary: "라이프스타일 · 가전 · 뷰티",
      mapImage: MAP_B1,
      mapCaption: "B BLOCK · FLOOR DIRECTORY",
    },
    {
      id: "b2b4",
      label: "B2",
      summary: "홈플러스 · 대형마트",
      mapImage: MAP_BB2,
      mapCaption: "B BLOCK · FLOOR DIRECTORY",
    },
  ],
};

function buildFloorGuideBlock(block: BranchBlock): FloorGuideBlock {
  return {
    id: block,
    label: block === "a" ? "A Block" : "B Block",
    floors: FLOOR_META[block].map((floor) => ({
      ...floor,
      stores: getStoresByBlockAndFloor(block, floor.id).map((store) =>
        toFloorGuideStore(toStoreCardView(store))
      ),
    })),
  };
}

export const FLOOR_GUIDE_BLOCKS: FloorGuideBlock[] = [
  buildFloorGuideBlock("a"),
  buildFloorGuideBlock("b"),
];

export function getFloorGuideBlock(block: BranchBlock) {
  return FLOOR_GUIDE_BLOCKS.find((item) => item.id === block);
}

export function getFloorGuideFloor(block: BranchBlock, floorId: string) {
  return getFloorGuideBlock(block)?.floors.find((floor) => floor.id === floorId);
}

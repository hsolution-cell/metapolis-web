import type { BranchBlock } from "@/data/branchStores";
import type { FloorGuideBlock, FloorGuideFloor } from "@/data/floorGuide";
import { toStoreCardView, type StoreRecord } from "@/data/storeDirectory";

// 영문 Floor Guide — 층 요약/맵캡션은 영문(시안 기준)
const EN_FLOOR_META: Record<BranchBlock, Omit<FloorGuideFloor, "stores">[]> = {
  a: [
    { id: "4f", label: "4F", summary: "CGV · Hair / Nail Salon · Nursery", mapImage: "/img/sub/floors/maps/a4.png", mapCaption: "A BLOCK · FLOOR DIRECTORY" },
    { id: "3f", label: "3F", summary: "CGV · Outback · Arcade · Restaurants", mapImage: "/img/sub/floors/maps/a3.png", mapCaption: "A BLOCK · FLOOR DIRECTORY" },
    { id: "2f", label: "2F", summary: "Men's / Women's Fashion · Info Desk", mapImage: "/img/sub/floors/maps/a2.png", mapCaption: "A BLOCK · FLOOR DIRECTORY" },
    { id: "1f", label: "1F", summary: "Sports · Outdoor · Cafes", mapImage: "/img/sub/floors/maps/a1.png", mapCaption: "A BLOCK · FLOOR DIRECTORY" },
    { id: "b2", label: "B2", summary: "SPA · F&B · Tech · Alterations", mapImage: "/img/sub/floors/maps/ab2.png", mapCaption: "A BLOCK · FLOOR DIRECTORY" },
  ],
  b: [
    { id: "4f", label: "4F", summary: "Aladdin · Culture · F&B", mapImage: "/img/sub/floors/maps/b4.png", mapCaption: "B BLOCK · FLOOR DIRECTORY" },
    { id: "3f", label: "3F", summary: "Kids · Convenience · F&B", mapImage: "/img/sub/floors/maps/b3.png", mapCaption: "B BLOCK · FLOOR DIRECTORY" },
    { id: "2f", label: "2F", summary: "Living · Goods · Interior", mapImage: "/img/sub/floors/maps/b2.png", mapCaption: "B BLOCK · FLOOR DIRECTORY" },
    { id: "1f", label: "1F", summary: "Lifestyle · Electronics · Beauty", mapImage: "/img/sub/floors/maps/b1.png", mapCaption: "B BLOCK · FLOOR DIRECTORY" },
    { id: "b2b4", label: "B2", summary: "Homeplus · Hypermarket", mapImage: "/img/sub/floors/maps/bb2.png", mapCaption: "B BLOCK · FLOOR DIRECTORY" },
  ],
};


/** DB에서 받은 매장 목록으로 영문 층별 블록 구성 (매장명은 영문 매핑) */
export function buildEnFloorGuideBlocks(allStores: StoreRecord[]): FloorGuideBlock[] {
  const blocks: BranchBlock[] = ["a", "b"];
  return blocks.map((block) => ({
    id: block,
    label: block === "a" ? "A Block" : "B Block",
    floors: EN_FLOOR_META[block].map((floor) => ({
      ...floor,
      stores: allStores
        .filter((store) => store.block === block && store.floorId === floor.id)
        .map((store) => {
          const v = toStoreCardView(store);
          return {
            id: v.id,
            // 영문명은 DB(name_en) 기준 — 미입력 시 국문 이름 그대로
            name: store.nameEn ?? v.name,
            tel: v.tel,
            iconCategory: v.iconCategory,
            // 영문 Floor Guide에서는 이벤트(EVENT 배지·이벤트 링크) 미노출
            hasEvent: false,
            eventHref: undefined,
          };
        }),
    })),
  }));
}

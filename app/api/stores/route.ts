import { NextResponse } from "next/server";
import { listStores } from "@/lib/stores-db";

export const dynamic = "force-dynamic";

// 공개 매장 목록 — 클라이언트 검색용
export async function GET() {
  const stores = await listStores();
  return NextResponse.json(
    stores.map((s) => ({
      id: s.id,
      name: s.name,
      block: s.block,
      floorId: s.floorId,
      tel: s.tel,
      iconCategory: s.iconCategory,
      guideCategory: s.guideCategory,
    }))
  );
}

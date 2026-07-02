import { NextResponse } from "next/server";
import { getVisiblePopups } from "@/lib/popups-db";

export const dynamic = "force-dynamic";

// 공개 팝업 목록 — 노출중(active + 노출기간 내)만, 언어별, 클라이언트 표시용
export async function GET(request: Request) {
  const localeParam = new URL(request.url).searchParams.get("locale");
  const locale = localeParam === "en" ? "en" : "ko";
  const popups = await getVisiblePopups(locale);
  return NextResponse.json(
    popups.map((p) => ({
      id: p.id,
      title: p.title,
      image: p.image,
      linkHref: p.linkHref,
    }))
  );
}

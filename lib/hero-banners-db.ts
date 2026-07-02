import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { HeroSlide } from "@/data/heroSlides";

export type HeroLocale = "ko" | "en";

export type HeroBannerRecord = {
  id: string;
  locale: HeroLocale;
  badge: string;
  title: string;
  description: string;
  linkHref: string | null;
  bg: string | null;
  bgMobile: string | null;
  sortOrder: number;
  active: boolean;
};

type HeroBannerRow = {
  id: string;
  locale: string;
  badge: string | null;
  title: string;
  description: string | null;
  link_href: string | null;
  bg: string | null;
  bg_mobile: string | null;
  sort_order: number;
  active: boolean;
};

const HERO_SELECT =
  "id, locale, badge, title, description, link_href, bg, bg_mobile, sort_order, active";

function mapRow(row: HeroBannerRow): HeroBannerRecord {
  return {
    id: row.id,
    locale: row.locale === "en" ? "en" : "ko",
    badge: row.badge ?? "",
    title: row.title,
    description: row.description ?? "",
    linkHref: row.link_href,
    bg: row.bg,
    bgMobile: row.bg_mobile,
    sortOrder: row.sort_order,
    active: row.active,
  };
}

/** 관리자 목록 — 특정 언어의 노출/비노출 전부, 정렬 순서 오름차순 */
export async function listHeroBanners(
  locale: HeroLocale = "ko"
): Promise<HeroBannerRecord[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("hero_banners")
    .select(HERO_SELECT)
    .eq("locale", locale)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(`메인 배너 목록 조회 실패: ${error.message}`);
  return (data ?? []).map((row) => mapRow(row as HeroBannerRow));
}

/** 단건 조회 */
export async function getHeroBannerById(
  id: string
): Promise<HeroBannerRecord | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("hero_banners")
    .select(HERO_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`메인 배너 조회 실패: ${error.message}`);
  return data ? mapRow(data as HeroBannerRow) : null;
}

/**
 * 공개 메인 페이지용 슬라이드 — 노출(active) 배너만, 정렬 순서대로.
 * HeroSection 이 기대하는 HeroSlide 형태로 변환.
 * 조회 실패/미설정 시 null 반환 → 호출부에서 하드코딩 기본값으로 폴백.
 */
export async function getActiveHeroSlides(
  locale: HeroLocale = "ko"
): Promise<HeroSlide[] | null> {
  try {
    const banners = (await listHeroBanners(locale)).filter((b) => b.active);
    if (!banners.length) return null;
    return banners.map((b) => ({
      bg: b.bg ?? "",
      bgMobile: b.bgMobile ?? b.bg ?? "",
      badge: b.badge,
      title: b.title,
      desc: b.description,
      link: b.linkHref ?? undefined,
    }));
  } catch {
    return null;
  }
}

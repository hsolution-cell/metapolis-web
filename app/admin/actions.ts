"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cleanupRemovedImages } from "@/lib/storage-cleanup";

type ServerSupabase = Awaited<ReturnType<typeof createSupabaseServerClient>>;

/**
 * 행의 이미지 관련 컬럼 값들을 조회(수정/삭제 전 스냅샷).
 * 이후 cleanupRemovedImages 와 조합해 안 쓰게 된 스토리지 이미지를 정리한다.
 */
async function fetchRowImageSources(
  supabase: ServerSupabase,
  table: string,
  id: string,
  columns: string[]
): Promise<(string | null)[]> {
  const { data } = await supabase
    .from(table)
    .select(columns.join(", "))
    .eq("id", id)
    .maybeSingle();
  if (!data) return [];
  const row = data as unknown as Record<string, string | null>;
  return columns.map((c) => row[c] ?? null);
}

export type NoticeInput = {
  categoryId: string | null;
  title: string;
  date: string;
  body: string;
  pinned: boolean;
};

function revalidateNotices(id?: string) {
  revalidatePath("/support/notices");
  revalidatePath("/admin/notices");
  if (id) revalidatePath(`/support/notices/${id}`);
}

// ---------- 공지 ----------
export async function createNotice(input: NoticeInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("notices").insert({
    category_id: input.categoryId,
    title: input.title.trim(),
    date: input.date,
    body: input.body.trim() || null,
    pinned: input.pinned,
  });
  if (error) throw new Error(error.message);
  revalidateNotices();
}

export async function updateNotice(id: string, input: NoticeInput) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "notices", id, ["body"]);
  const { error } = await supabase
    .from("notices")
    .update({
      category_id: input.categoryId,
      title: input.title.trim(),
      date: input.date,
      body: input.body.trim() || null,
      pinned: input.pinned,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old, [input.body]);
  revalidateNotices(id);
}

export async function deleteNotice(id: string) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "notices", id, ["body"]);
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old);
  revalidateNotices(id);
}

// ---------- 카테고리(구분) ----------
function revalidateCategories() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/notices");
  revalidatePath("/support/notices");
}

export async function createCategory(name: string, sortOrder: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("notice_categories")
    .insert({ name: name.trim(), sort_order: sortOrder });
  if (error) throw new Error(error.message);
  revalidateCategories();
}

export async function updateCategory(id: string, name: string, sortOrder: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("notice_categories")
    .update({ name: name.trim(), sort_order: sortOrder })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCategories();
}

export async function deleteCategory(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("notice_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCategories();
}

// ---------- 메타폴리스 이벤트 ----------
export type EventInput = {
  title: string;
  startDate: string;
  endDate: string;
  thumbnail: string | null;
  body: string;
  pinned: boolean;
};

function revalidateEvents(id?: string) {
  revalidatePath("/events");
  revalidatePath("/admin/events");
  if (id) revalidatePath(`/events/${id}`);
}

export async function createEvent(input: EventInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("events").insert({
    title: input.title.trim(),
    start_date: input.startDate,
    end_date: input.endDate,
    thumbnail: input.thumbnail,
    body: input.body.trim() || null,
    pinned: input.pinned,
  });
  if (error) throw new Error(error.message);
  revalidateEvents();
}

export async function updateEvent(id: string, input: EventInput) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "events", id, ["thumbnail", "body"]);
  const { error } = await supabase
    .from("events")
    .update({
      title: input.title.trim(),
      start_date: input.startDate,
      end_date: input.endDate,
      thumbnail: input.thumbnail,
      body: input.body.trim() || null,
      pinned: input.pinned,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old, [input.thumbnail, input.body]);
  revalidateEvents(id);
}

export async function deleteEvent(id: string) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "events", id, ["thumbnail", "body"]);
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old);
  revalidateEvents(id);
}

// ---------- 당첨자 발표 ----------
export type WinnerInput = {
  title: string;
  date: string;
  thumbnail: string | null;
  body: string;
  pinned: boolean;
};

function revalidateWinners(id?: string) {
  revalidatePath("/events/winners");
  revalidatePath("/admin/winners");
  if (id) revalidatePath(`/events/winners/${id}`);
}

export async function createWinner(input: WinnerInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("winners").insert({
    title: input.title.trim(),
    date: input.date,
    thumbnail: input.thumbnail,
    body: input.body.trim() || null,
    pinned: input.pinned,
  });
  if (error) throw new Error(error.message);
  revalidateWinners();
}

export async function updateWinner(id: string, input: WinnerInput) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "winners", id, ["thumbnail", "body"]);
  const { error } = await supabase
    .from("winners")
    .update({
      title: input.title.trim(),
      date: input.date,
      thumbnail: input.thumbnail,
      body: input.body.trim() || null,
      pinned: input.pinned,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old, [input.thumbnail, input.body]);
  revalidateWinners(id);
}

export async function deleteWinner(id: string) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "winners", id, ["thumbnail", "body"]);
  const { error } = await supabase.from("winners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old);
  revalidateWinners(id);
}

// ---------- FAQ ----------
export type FaqInput = {
  categoryId: string | null;
  question: string;
  answer: string;
  pinned: boolean;
  sortOrder: number;
};

function revalidateFaqs() {
  revalidatePath("/support/faq");
  revalidatePath("/admin/faq");
}

export async function createFaq(input: FaqInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("faqs").insert({
    category_id: input.categoryId,
    question: input.question.trim(),
    answer: input.answer.trim() || null,
    pinned: input.pinned,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);
  revalidateFaqs();
}

export async function updateFaq(id: string, input: FaqInput) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "faqs", id, ["answer"]);
  const { error } = await supabase
    .from("faqs")
    .update({
      category_id: input.categoryId,
      question: input.question.trim(),
      answer: input.answer.trim() || null,
      pinned: input.pinned,
      sort_order: input.sortOrder,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old, [input.answer]);
  revalidateFaqs();
}

export async function deleteFaq(id: string) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "faqs", id, ["answer"]);
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old);
  revalidateFaqs();
}

// ---------- FAQ 카테고리 ----------
function revalidateFaqCategories() {
  revalidatePath("/admin/faq/categories");
  revalidatePath("/admin/faq");
  revalidatePath("/support/faq");
}

export async function createFaqCategory(name: string, sortOrder: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("faq_categories")
    .insert({ name: name.trim(), sort_order: sortOrder });
  if (error) throw new Error(error.message);
  revalidateFaqCategories();
}

export async function updateFaqCategory(id: string, name: string, sortOrder: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("faq_categories")
    .update({ name: name.trim(), sort_order: sortOrder })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateFaqCategories();
}

export async function deleteFaqCategory(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("faq_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateFaqCategories();
}

// ---------- 매장 이벤트 ----------
export type StoreEventInput = {
  title: string;
  brandName: string;
  storeId: string | null;
  startDate: string;
  endDate: string;
  thumbnail: string | null;
  body: string;
  pinned: boolean;
};

function revalidateStoreEvents(id?: string) {
  revalidatePath("/events/stores");
  revalidatePath("/admin/store-events");
  revalidatePath("/stores/floors");
  revalidatePath("/stores/categories");
  if (id) revalidatePath(`/events/stores/${id}`);
}

export async function createStoreEvent(input: StoreEventInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("store_events").insert({
    title: input.title.trim(),
    brand_name: input.brandName.trim() || null,
    store_id: input.storeId,
    start_date: input.startDate,
    end_date: input.endDate,
    thumbnail: input.thumbnail,
    body: input.body.trim() || null,
    pinned: input.pinned,
  });
  if (error) throw new Error(error.message);
  revalidateStoreEvents();
}

export async function updateStoreEvent(id: string, input: StoreEventInput) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "store_events", id, ["thumbnail", "body"]);
  const { error } = await supabase
    .from("store_events")
    .update({
      title: input.title.trim(),
      brand_name: input.brandName.trim() || null,
      store_id: input.storeId,
      start_date: input.startDate,
      end_date: input.endDate,
      thumbnail: input.thumbnail,
      body: input.body.trim() || null,
      pinned: input.pinned,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old, [input.thumbnail, input.body]);
  revalidateStoreEvents(id);
}

export async function deleteStoreEvent(id: string) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "store_events", id, ["thumbnail", "body"]);
  const { error } = await supabase.from("store_events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old);
  revalidateStoreEvents(id);
}

// ---------- 입점 매장 ----------
export type StoreInput = {
  name: string;
  block: string;
  floorId: string;
  tel: string;
  iconCategory: string;
  guideCategory: string;
  isSignature: boolean;
  sortOrder: number;
};

function revalidateStores() {
  revalidatePath("/stores/floors");
  revalidatePath("/stores/categories");
  revalidatePath("/en/floors");
  revalidatePath("/admin/stores");
}

export async function createStore(input: StoreInput) {
  const supabase = await createSupabaseServerClient();
  const id = `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const { error } = await supabase.from("stores").insert({
    id,
    name: input.name.trim(),
    block: input.block,
    floor_id: input.floorId,
    tel: input.tel.trim() || "—",
    icon_category: input.iconCategory,
    guide_category: input.guideCategory,
    is_signature: input.isSignature,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);
  revalidateStores();
}

export async function updateStore(id: string, input: StoreInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("stores")
    .update({
      name: input.name.trim(),
      block: input.block,
      floor_id: input.floorId,
      tel: input.tel.trim() || "—",
      icon_category: input.iconCategory,
      guide_category: input.guideCategory,
      is_signature: input.isSignature,
      sort_order: input.sortOrder,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStores();
}

export async function deleteStore(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("stores").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStores();
}

// ---------- 메인 배너(hero) ----------
export type HeroBannerInput = {
  locale: "ko" | "en";
  badge: string;
  title: string;
  description: string;
  linkHref: string | null;
  bg: string | null;
  bgMobile: string | null;
  sortOrder: number;
  active: boolean;
};

function revalidateHeroBanners() {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/admin/hero-banners");
}

export async function createHeroBanner(input: HeroBannerInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("hero_banners").insert({
    locale: input.locale,
    badge: input.badge.trim() || null,
    title: input.title.trim(),
    description: input.description.trim() || null,
    link_href: input.linkHref?.trim() || null,
    bg: input.bg,
    bg_mobile: input.bgMobile,
    sort_order: input.sortOrder,
    active: input.active,
  });
  if (error) throw new Error(error.message);
  revalidateHeroBanners();
}

export async function updateHeroBanner(id: string, input: HeroBannerInput) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "hero_banners", id, ["bg", "bg_mobile"]);
  const { error } = await supabase
    .from("hero_banners")
    .update({
      locale: input.locale,
      badge: input.badge.trim() || null,
      title: input.title.trim(),
      description: input.description.trim() || null,
      link_href: input.linkHref?.trim() || null,
      bg: input.bg,
      bg_mobile: input.bgMobile,
      sort_order: input.sortOrder,
      active: input.active,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old, [input.bg, input.bgMobile]);
  revalidateHeroBanners();
}

export async function deleteHeroBanner(id: string) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "hero_banners", id, ["bg", "bg_mobile"]);
  const { error } = await supabase.from("hero_banners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old);
  revalidateHeroBanners();
}

// ---------- 팝업(popup) ----------
export type PopupInput = {
  locale: "ko" | "en";
  title: string;
  image: string | null;
  linkHref: string | null;
  startDate: string;
  endDate: string;
  sortOrder: number;
  active: boolean;
};

function revalidatePopups() {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/admin/popups");
}

export async function createPopup(input: PopupInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("popups").insert({
    locale: input.locale,
    title: input.title.trim(),
    image: input.image,
    link_href: input.linkHref?.trim() || null,
    start_date: input.startDate,
    end_date: input.endDate,
    sort_order: input.sortOrder,
    active: input.active,
  });
  if (error) throw new Error(error.message);
  revalidatePopups();
}

export async function updatePopup(id: string, input: PopupInput) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "popups", id, ["image"]);
  const { error } = await supabase
    .from("popups")
    .update({
      locale: input.locale,
      title: input.title.trim(),
      image: input.image,
      link_href: input.linkHref?.trim() || null,
      start_date: input.startDate,
      end_date: input.endDate,
      sort_order: input.sortOrder,
      active: input.active,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old, [input.image]);
  revalidatePopups();
}

export async function deletePopup(id: string) {
  const supabase = await createSupabaseServerClient();
  const old = await fetchRowImageSources(supabase, "popups", id, ["image"]);
  const { error } = await supabase.from("popups").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await cleanupRemovedImages(supabase, old);
  revalidatePopups();
}

// ---------- 인증 ----------
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

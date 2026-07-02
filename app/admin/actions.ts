"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
  revalidateNotices(id);
}

export async function deleteNotice(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) throw new Error(error.message);
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
  revalidateEvents(id);
}

export async function deleteEvent(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
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
  revalidateWinners(id);
}

export async function deleteWinner(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("winners").delete().eq("id", id);
  if (error) throw new Error(error.message);
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
  revalidateFaqs();
}

export async function deleteFaq(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
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

// ---------- 인증 ----------
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

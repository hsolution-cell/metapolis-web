"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type NoticeInput = {
  category: string;
  title: string;
  date: string;
  body: string;
};

function revalidateNotices(id?: string) {
  revalidatePath("/support/notices");
  revalidatePath("/admin/notices");
  if (id) revalidatePath(`/support/notices/${id}`);
}

export async function createNotice(input: NoticeInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("notices").insert({
    category: input.category,
    title: input.title.trim(),
    date: input.date,
    body: input.body.trim() || null,
  });
  if (error) throw new Error(error.message);
  revalidateNotices();
}

export async function updateNotice(id: string, input: NoticeInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("notices")
    .update({
      category: input.category,
      title: input.title.trim(),
      date: input.date,
      body: input.body.trim() || null,
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

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

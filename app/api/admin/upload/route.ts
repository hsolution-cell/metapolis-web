import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// TinyMCE 본문 이미지 업로드 → Supabase Storage(content-images)
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no file" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const rand = Math.random().toString(36).slice(2, 8);
  const path = `notices/${Date.now()}-${rand}.${ext}`;

  const { error } = await supabase.storage
    .from("content-images")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("content-images").getPublicUrl(path);
  return NextResponse.json({ location: data.publicUrl });
}

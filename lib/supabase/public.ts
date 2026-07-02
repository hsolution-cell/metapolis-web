import { createClient } from "@supabase/supabase-js";

/**
 * 공개 페이지 읽기 전용 Supabase 클라이언트 — 쿠키/세션 없이 publishable key만 사용.
 * RLS의 공개 SELECT 정책 하에서만 동작(쓰기 불가).
 */
export function createSupabasePublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

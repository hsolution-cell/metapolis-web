import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용 관리자 클라이언트 — secret key(sb_secret_...)로 RLS를 우회한다.
 * 절대 클라이언트 코드에서 import 금지. (Storage 업로드 등 관리 작업용)
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버(서버 컴포넌트 / 서버 액션 / route handler)용 Supabase 클라이언트.
 * 로그인 사용자의 세션 쿠키를 읽어 RLS가 적용된 상태로 동작한다.
 * Next 16에서 cookies()는 async이므로 await 필요.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 호출된 경우 쓰기가 막힐 수 있음 — 미들웨어가 세션을 갱신하므로 무시
          }
        },
      },
    }
  );
}

import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/actions";

export default async function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-side__brand">METAPOLIS Admin</div>
        <nav className="admin-side__nav">
          <Link href="/admin/notices">고객알림</Link>
          <Link href="/admin/categories">└ 구분 관리</Link>
          <Link href="/admin/events">메타폴리스 이벤트</Link>
          <Link href="/admin/winners">당첨자 발표</Link>
          <Link href="/admin/faq">자주 묻는 질문</Link>
          <Link href="/admin/faq/categories">└ 구분 관리</Link>
          <Link href="/admin/stores">입점 매장</Link>
        </nav>
        <div className="admin-side__foot">
          <p className="admin-side__user">{user?.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="admin-btn admin-btn--sm"
              style={{ width: "100%", justifyContent: "center" }}
            >
              로그아웃
            </button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

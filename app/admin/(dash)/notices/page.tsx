import Link from "next/link";
import { listNotices } from "@/lib/notices-db";
import { formatNoticeDate } from "@/data/notices";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const notices = await listNotices();

  return (
    <>
      <div className="admin-page-head">
        <h1>고객알림</h1>
        <Link href="/admin/notices/new" className="admin-btn admin-btn--primary">
          + 새 공지
        </Link>
      </div>

      {notices.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 90 }}>구분</th>
              <th>제목</th>
              <th style={{ width: 130 }}>등록일</th>
              <th style={{ width: 150 }} />
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id}>
                <td>
                  <span className="admin-badge">{n.categoryLabel}</span>
                </td>
                <td>
                  {n.pinned && <span className="admin-pin">고정</span>}
                  {n.title}
                </td>
                <td>{formatNoticeDate(n.date)}</td>
                <td>
                  <div className="admin-cell-actions">
                    <Link
                      href={`/admin/notices/${n.id}/edit`}
                      className="admin-btn admin-btn--sm"
                    >
                      수정
                    </Link>
                    <DeleteButton id={n.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty">등록된 공지가 없습니다. “+ 새 공지”로 추가해 보세요.</div>
      )}
    </>
  );
}

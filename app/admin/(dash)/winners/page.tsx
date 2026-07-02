import Link from "next/link";
import { listWinners } from "@/lib/winners-db";
import { formatWinnerDate } from "@/data/winners";
import WinnerDeleteButton from "@/components/admin/WinnerDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminWinnersPage() {
  const winners = await listWinners();

  return (
    <>
      <div className="admin-page-head">
        <h1>당첨자 발표</h1>
        <Link href="/admin/winners/new" className="admin-btn admin-btn--primary">
          + 새 발표
        </Link>
      </div>

      {winners.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>제목</th>
              <th style={{ width: 130 }}>발표일</th>
              <th style={{ width: 150 }} />
            </tr>
          </thead>
          <tbody>
            {winners.map((w) => (
              <tr key={w.id}>
                <td>
                  {w.pinned && <span className="admin-pin">고정</span>}
                  {w.title}
                </td>
                <td>{formatWinnerDate(w.date)}</td>
                <td>
                  <div className="admin-cell-actions">
                    <Link
                      href={`/admin/winners/${w.id}/edit`}
                      className="admin-btn admin-btn--sm"
                    >
                      수정
                    </Link>
                    <WinnerDeleteButton id={w.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty">등록된 당첨자 발표가 없습니다.</div>
      )}
    </>
  );
}

import Link from "next/link";
import { listStoreEvents } from "@/lib/store-events-db";
import { formatEventDateRange } from "@/data/events";
import StoreEventDeleteButton from "@/components/admin/StoreEventDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminStoreEventsPage() {
  const events = await listStoreEvents();
  const now = Date.now();

  return (
    <>
      <div className="admin-page-head">
        <h1>매장 이벤트</h1>
        <Link href="/admin/store-events/new" className="admin-btn admin-btn--primary">
          + 새 매장 이벤트
        </Link>
      </div>

      {events.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 90 }}>상태</th>
              <th style={{ width: 120 }}>브랜드</th>
              <th>제목</th>
              <th style={{ width: 190 }}>기간</th>
              <th style={{ width: 150 }} />
            </tr>
          </thead>
          <tbody>
            {events.map((e) => {
              const ended = new Date(`${e.endDate}T23:59:59`).getTime() < now;
              return (
                <tr key={e.id}>
                  <td>
                    <span className="admin-badge">{ended ? "종료" : "진행중"}</span>
                  </td>
                  <td>{e.brandName ?? "—"}</td>
                  <td>
                    {e.pinned && <span className="admin-pin">고정</span>}
                    {e.title}
                  </td>
                  <td>{formatEventDateRange(e.startDate, e.endDate)}</td>
                  <td>
                    <div className="admin-cell-actions">
                      <Link
                        href={`/admin/store-events/${e.id}/edit`}
                        className="admin-btn admin-btn--sm"
                      >
                        수정
                      </Link>
                      <StoreEventDeleteButton id={e.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty">등록된 매장 이벤트가 없습니다.</div>
      )}
    </>
  );
}

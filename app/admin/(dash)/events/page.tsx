import Link from "next/link";
import { listEvents } from "@/lib/events-db";
import { formatEventDateRange } from "@/data/events";
import EventDeleteButton from "@/components/admin/EventDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await listEvents();
  const now = Date.now();

  return (
    <>
      <div className="admin-page-head">
        <h1>메타폴리스 이벤트</h1>
        <Link href="/admin/events/new" className="admin-btn admin-btn--primary">
          + 새 이벤트
        </Link>
      </div>

      {events.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 90 }}>상태</th>
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
                  <td>
                    {e.pinned && <span className="admin-pin">고정</span>}
                    {e.title}
                  </td>
                  <td>{formatEventDateRange(e.startDate, e.endDate)}</td>
                  <td>
                    <div className="admin-cell-actions">
                      <Link
                        href={`/admin/events/${e.id}/edit`}
                        className="admin-btn admin-btn--sm"
                      >
                        수정
                      </Link>
                      <EventDeleteButton id={e.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty">등록된 이벤트가 없습니다. “+ 새 이벤트”로 추가해 보세요.</div>
      )}
    </>
  );
}

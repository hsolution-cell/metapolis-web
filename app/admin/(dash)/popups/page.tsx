import Link from "next/link";
import { listPopups } from "@/lib/popups-db";
import { formatEventDateRange } from "@/data/events";
import PopupDeleteButton from "@/components/admin/PopupDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPopupsPage() {
  const popups = await listPopups();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <div className="admin-page-head">
        <h1>팝업</h1>
        <Link href="/admin/popups/new" className="admin-btn admin-btn--primary">
          + 새 팝업
        </Link>
      </div>

      {popups.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>순서</th>
              <th style={{ width: 100 }}>상태</th>
              <th style={{ width: 100 }}>미리보기</th>
              <th>제목</th>
              <th style={{ width: 190 }}>노출 기간</th>
              <th style={{ width: 150 }} />
            </tr>
          </thead>
          <tbody>
            {popups.map((p) => {
              const visible = p.active && p.startDate <= today && p.endDate >= today;
              return (
                <tr key={p.id}>
                  <td>{p.sortOrder}</td>
                  <td>
                    <span className="admin-badge">
                      {!p.active ? "숨김" : visible ? "노출중" : "대기/종료"}
                    </span>
                  </td>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 4 }}
                    />
                  </td>
                  <td>{p.title}</td>
                  <td>{formatEventDateRange(p.startDate, p.endDate)}</td>
                  <td>
                    <div className="admin-cell-actions">
                      <Link
                        href={`/admin/popups/${p.id}/edit`}
                        className="admin-btn admin-btn--sm"
                      >
                        수정
                      </Link>
                      <PopupDeleteButton id={p.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty">
          등록된 팝업이 없습니다. “+ 새 팝업”으로 추가해 보세요.
        </div>
      )}
    </>
  );
}

import Link from "next/link";
import { listHeroBanners } from "@/lib/hero-banners-db";
import HeroBannerDeleteButton from "@/components/admin/HeroBannerDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminHeroBannersPage() {
  const banners = await listHeroBanners();

  return (
    <>
      <div className="admin-page-head">
        <h1>메인 배너</h1>
        <Link href="/admin/hero-banners/new" className="admin-btn admin-btn--primary">
          + 새 배너
        </Link>
      </div>

      {banners.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>순서</th>
              <th style={{ width: 90 }}>상태</th>
              <th style={{ width: 120 }}>미리보기</th>
              <th>문구</th>
              <th style={{ width: 150 }} />
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b.id}>
                <td>{b.sortOrder}</td>
                <td>
                  <span className="admin-badge">{b.active ? "노출" : "숨김"}</span>
                </td>
                <td>
                  {b.bg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.bg}
                      alt=""
                      style={{ width: 96, height: 54, objectFit: "cover", borderRadius: 4 }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  {b.badge && <span className="admin-pin">{b.badge}</span>}
                  {b.title.replace(/\n/g, " ")}
                </td>
                <td>
                  <div className="admin-cell-actions">
                    <Link
                      href={`/admin/hero-banners/${b.id}/edit`}
                      className="admin-btn admin-btn--sm"
                    >
                      수정
                    </Link>
                    <HeroBannerDeleteButton id={b.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty">
          등록된 배너가 없습니다. “+ 새 배너”로 추가해 보세요.
        </div>
      )}
    </>
  );
}

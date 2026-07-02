import Link from "next/link";
import { listHeroBanners, type HeroLocale } from "@/lib/hero-banners-db";
import HeroBannerDeleteButton from "@/components/admin/HeroBannerDeleteButton";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ locale?: string }>;
};

export default async function AdminHeroBannersPage({ searchParams }: PageProps) {
  const { locale: localeParam } = await searchParams;
  const locale: HeroLocale = localeParam === "en" ? "en" : "ko";
  const banners = await listHeroBanners(locale);
  const newHref =
    locale === "en" ? "/admin/hero-banners/new?locale=en" : "/admin/hero-banners/new";

  return (
    <>
      <div className="admin-page-head">
        <h1>메인 배너</h1>
        <Link href={newHref} className="admin-btn admin-btn--primary">
          + 새 배너
        </Link>
      </div>

      <div className="admin-tabs">
        <Link
          href="/admin/hero-banners"
          className={`admin-tab${locale === "ko" ? " is-active" : ""}`}
        >
          국문
        </Link>
        <Link
          href="/admin/hero-banners?locale=en"
          className={`admin-tab${locale === "en" ? " is-active" : ""}`}
        >
          영문
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
          등록된 {locale === "en" ? "영문" : "국문"} 배너가 없습니다. “+ 새 배너”로 추가해 보세요.
        </div>
      )}
    </>
  );
}

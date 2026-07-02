import Link from "next/link";
import { listStores } from "@/lib/stores-db";
import { getFloorLabel, STORE_GUIDE_CATEGORIES } from "@/data/storeDirectory";
import StoreDeleteButton from "@/components/admin/StoreDeleteButton";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ block?: string }>;
};

function guideLabel(code: string) {
  return STORE_GUIDE_CATEGORIES.find((c) => c.id === code)?.labelKo ?? code;
}

export default async function AdminStoresPage({ searchParams }: PageProps) {
  const { block: blockParam } = await searchParams;
  const block = blockParam === "b" ? "b" : "a";
  const all = await listStores();
  const stores = all.filter((s) => s.block === block);

  return (
    <>
      <div className="admin-page-head">
        <h1>입점 매장</h1>
        <Link href="/admin/stores/new" className="admin-btn admin-btn--primary">
          + 새 매장
        </Link>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
        <Link
          href="/admin/stores?block=a"
          className={`admin-btn admin-btn--sm${block === "a" ? " admin-btn--primary" : ""}`}
        >
          A Block
        </Link>
        <Link
          href="/admin/stores?block=b"
          className={`admin-btn admin-btn--sm${block === "b" ? " admin-btn--primary" : ""}`}
        >
          B Block
        </Link>
        <span style={{ color: "#6b7580" }}>{stores.length}개</span>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: 70 }}>층</th>
            <th>매장명</th>
            <th style={{ width: 150 }}>전화</th>
            <th style={{ width: 120 }}>카테고리</th>
            <th style={{ width: 150 }} />
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{getFloorLabel(s.block, s.floorId)}</td>
              <td>
                {s.isSignature && <span className="admin-pin">시그니처</span>}
                {s.name}
              </td>
              <td>{s.tel}</td>
              <td>
                <span className="admin-badge">{guideLabel(s.guideCategory)}</span>
              </td>
              <td>
                <div className="admin-cell-actions">
                  <Link href={`/admin/stores/${s.id}/edit`} className="admin-btn admin-btn--sm">
                    수정
                  </Link>
                  <StoreDeleteButton id={s.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

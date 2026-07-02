import Link from "next/link";
import { listFaqs } from "@/lib/faq-db";
import FaqDeleteButton from "@/components/admin/FaqDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const faqs = await listFaqs();

  return (
    <>
      <div className="admin-page-head">
        <h1>자주 묻는 질문</h1>
        <Link href="/admin/faq/new" className="admin-btn admin-btn--primary">
          + 새 FAQ
        </Link>
      </div>

      {faqs.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 120 }}>구분</th>
              <th>질문</th>
              <th style={{ width: 150 }} />
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id}>
                <td>
                  <span className="admin-badge">{f.categoryLabel}</span>
                </td>
                <td>
                  {f.pinned && <span className="admin-pin">고정</span>}
                  {f.question}
                </td>
                <td>
                  <div className="admin-cell-actions">
                    <Link href={`/admin/faq/${f.id}/edit`} className="admin-btn admin-btn--sm">
                      수정
                    </Link>
                    <FaqDeleteButton id={f.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty">등록된 FAQ가 없습니다.</div>
      )}
    </>
  );
}

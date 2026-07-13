import Link from "next/link";
import { formatNoticeDate } from "@/data/notices";
import type { NoticeRecord } from "@/lib/notices-db";

type NoticeDetailSectionProps = {
  item: NoticeRecord;
  nextHref?: string;
};

export default function NoticeDetailSection({ item, nextHref }: NoticeDetailSectionProps) {
  const bodyHtml = item.body?.trim()
    ? item.body
    : `<p>${item.title}에 대한 안내입니다.</p><p>자세한 문의는 고객센터(031-371-7083)로 연락해 주시기 바랍니다.</p>`;

  return (
    <article className="events_detail notices_detail">
      <div className="events_detail_inner content_inner innerTop innerBot">
        <div className="events_detail_head">
          <p className="notices_detail_meta">
            <span
              className="notices_badge"
              style={
                item.categoryColor
                  ? { backgroundColor: item.categoryColor, color: "#fff" }
                  : undefined
              }
            >
              {item.categoryLabel}
            </span>
          </p>
          <h2 className="events_detail_title">{item.title}</h2>
          <p className="events_detail_period">
            <span className="events_detail_period_label">등록일</span>
            {formatNoticeDate(item.date)}
          </p>
        </div>

        <div className="events_detail_rule" aria-hidden="true" />

        <div
          className="events_detail_body notices_detail_body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        <div className="events_detail_rule" aria-hidden="true" />

        <nav className="events_detail_nav" aria-label="게시글 이동">
          {nextHref ? (
            <Link href={nextHref} className="events_detail_btn events_detail_btn--outline">
              다음글
            </Link>
          ) : null}
          <Link href="/support/notices" className="events_detail_btn events_detail_btn--primary">
            목록
          </Link>
        </nav>
      </div>
    </article>
  );
}

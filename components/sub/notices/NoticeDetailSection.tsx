import Link from "next/link";
import {
  formatNoticeDate,
  getNextNotice,
  getNoticeBody,
  getNoticeDetailHref,
  type NoticeItem,
} from "@/data/notices";

type NoticeDetailSectionProps = {
  item: NoticeItem;
};

export default function NoticeDetailSection({ item }: NoticeDetailSectionProps) {
  const nextItem = getNextNotice(item.id);
  const body = getNoticeBody(item);

  return (
    <article className="events_detail notices_detail">
      <div className="events_detail_inner content_inner innerTop innerBot">
        <div className="events_detail_head">
          <p className="notices_detail_meta">
            <span className="notices_badge">{item.categoryLabel}</span>
          </p>
          <h2 className="events_detail_title">{item.title}</h2>
          <p className="events_detail_period">
            <span className="events_detail_period_label">등록일</span>
            {formatNoticeDate(item.date)}
          </p>
        </div>

        <div className="events_detail_rule" aria-hidden="true" />

        <div className="events_detail_body">
          {body.map((paragraph, index) => (
            <p key={`${item.id}-body-${index}`} className="events_detail_text">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="events_detail_rule" aria-hidden="true" />

        <nav className="events_detail_nav" aria-label="게시글 이동">
          {nextItem ? (
            <Link
              href={getNoticeDetailHref(nextItem.id)}
              className="events_detail_btn events_detail_btn--outline"
            >
              다음글
            </Link>
          ) : null}
          <Link
            href="/support/notices"
            className="events_detail_btn events_detail_btn--primary"
          >
            목록
          </Link>
        </nav>
      </div>
    </article>
  );
}

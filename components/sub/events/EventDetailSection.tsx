import Link from "next/link";
import { formatEventDateRange } from "@/data/events";

type EventDetailSectionProps = {
  title: string;
  startDate: string;
  endDate: string;
  bodyHtml: string;
  listPath: string;
  nextHref?: string;
};

export default function EventDetailSection({
  title,
  startDate,
  endDate,
  bodyHtml,
  listPath,
  nextHref,
}: EventDetailSectionProps) {
  const html = bodyHtml?.trim()
    ? bodyHtml
    : `<p>${title} 이벤트에 대한 상세 안내입니다.</p><p>자세한 참여 방법 및 유의사항은 아래 내용을 확인해 주세요.</p>`;

  return (
    <article className="events_detail">
      <div className="events_detail_inner content_inner innerTop innerBot">
        <div className="events_detail_head">
          <h2 className="events_detail_title">{title}</h2>
          <p className="events_detail_period">
            <span className="events_detail_period_label">이벤트 기간</span>
            {formatEventDateRange(startDate, endDate)}
          </p>
        </div>

        <div className="events_detail_rule" aria-hidden="true" />

        <div
          className="events_detail_body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="events_detail_rule" aria-hidden="true" />

        <nav className="events_detail_nav" aria-label="게시글 이동">
          {nextHref ? (
            <Link href={nextHref} className="events_detail_btn events_detail_btn--outline">
              다음글
            </Link>
          ) : null}
          <Link href={listPath} className="events_detail_btn events_detail_btn--primary">
            목록
          </Link>
        </nav>
      </div>
    </article>
  );
}

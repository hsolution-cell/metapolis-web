import Link from "next/link";
import { formatWinnerDate } from "@/data/winners";

type WinnerDetailSectionProps = {
  title: string;
  date: string;
  bodyHtml: string;
  nextHref?: string;
};

export default function WinnerDetailSection({
  title,
  date,
  bodyHtml,
  nextHref,
}: WinnerDetailSectionProps) {
  const html = bodyHtml?.trim()
    ? bodyHtml
    : `<p>${title} 안내입니다.</p><p>당첨되신 고객님께는 개별 연락을 통해 경품 수령 방법을 안내해 드립니다.</p>`;

  return (
    <article className="events_detail">
      <div className="events_detail_inner content_inner innerTop innerBot">
        <div className="events_detail_head">
          <h2 className="events_detail_title">{title}</h2>
          <p className="events_detail_period">
            <span className="events_detail_period_label">발표일</span>
            {formatWinnerDate(date)}
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
          <Link href="/events/winners" className="events_detail_btn events_detail_btn--primary">
            목록
          </Link>
        </nav>
      </div>
    </article>
  );
}

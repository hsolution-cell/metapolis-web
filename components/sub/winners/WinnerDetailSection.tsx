import Link from "next/link";
import {
  formatWinnerDate,
  getNextWinner,
  getWinnerBody,
  getWinnerDetailHref,
  type WinnerItem,
} from "@/data/winners";

type WinnerDetailSectionProps = {
  item: WinnerItem;
};

export default function WinnerDetailSection({ item }: WinnerDetailSectionProps) {
  const nextItem = getNextWinner(item.id);
  const body = getWinnerBody(item);

  return (
    <article className="events_detail">
      <div className="events_detail_inner content_inner innerTop innerBot">
        <div className="events_detail_head">
          <h2 className="events_detail_title">{item.title}</h2>
          <p className="events_detail_period">
            <span className="events_detail_period_label">발표일</span>
            {formatWinnerDate(item.date)}
          </p>
        </div>

        <div className="events_detail_rule" aria-hidden="true" />

        <div className="events_detail_body">
          {body.map((paragraph, index) => (
            <p key={`${item.id}-body-${index}`} className="events_detail_text">
              {paragraph}
            </p>
          ))}

          {item.contentImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="events_detail_image"
              src={item.contentImage}
              alt=""
            />
          ) : (
            <div className="events_detail_image events_detail_image--placeholder">
              <span>이미지가 보여지는 영역입니다</span>
            </div>
          )}
        </div>

        <div className="events_detail_rule" aria-hidden="true" />

        <nav className="events_detail_nav" aria-label="게시글 이동">
          {nextItem ? (
            <Link
              href={getWinnerDetailHref(nextItem.id)}
              className="events_detail_btn events_detail_btn--outline"
            >
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

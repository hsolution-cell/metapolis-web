import Link from "next/link";
import {
  EVENT_LIST_PATHS,
  formatEventDateRange,
  getEventBody,
  getEventDetailHref,
  getNextEvent,
  type EventItem,
  type EventListKind,
} from "@/data/events";

type EventDetailSectionProps = {
  event: EventItem;
  events: EventItem[];
  kind: EventListKind;
};

export default function EventDetailSection({
  event,
  events,
  kind,
}: EventDetailSectionProps) {
  const nextEvent = getNextEvent(events, event.id);
  const listPath = EVENT_LIST_PATHS[kind];
  const body = getEventBody(event);

  return (
    <article className="events_detail">
      <div className="events_detail_inner content_inner innerTop innerBot">
        <div className="events_detail_head">
          <h2 className="events_detail_title">{event.title}</h2>
          <p className="events_detail_period">
            <span className="events_detail_period_label">이벤트 기간</span>
            {formatEventDateRange(event.startDate, event.endDate)}
          </p>
        </div>

        <div className="events_detail_rule" aria-hidden="true" />

        <div className="events_detail_body">
          {body.map((paragraph, index) => (
            <p key={`${event.id}-body-${index}`} className="events_detail_text">
              {paragraph}
            </p>
          ))}

          {event.contentImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="events_detail_image"
              src={event.contentImage}
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
          {nextEvent ? (
            <Link
              href={getEventDetailHref(kind, nextEvent.id)}
              className="events_detail_btn events_detail_btn--outline"
            >
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

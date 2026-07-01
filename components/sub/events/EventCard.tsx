"use client";

import { useState } from "react";
import {
  formatEventDateRange,
  getEventDetailHref,
  getEventStatus,
  type EventItem,
  type EventListKind,
} from "@/data/events";

type EventCardProps = {
  event: EventItem;
  kind: EventListKind;
};

export default function EventCard({ event, kind }: EventCardProps) {
  const [hideImage, setHideImage] = useState(false);
  const status = getEventStatus(event);
  const statusLabel = status === "ongoing" ? "진행중" : "종료";
  const href = getEventDetailHref(kind, event.id);

  return (
    <a href={href} className="events_card">
      <div className="events_card_media">
        {!hideImage && event.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="events_card_img"
            src={event.thumbnail}
            alt=""
            onError={() => setHideImage(true)}
          />
        ) : (
          <div className="events_card_placeholder" aria-hidden="true">
            <span>실제 이벤트 이미지 반영 예정</span>
          </div>
        )}
        <span
          className={`events_card_badge events_card_badge--${status}`}
          aria-hidden="true"
        >
          <span className="events_card_badge_dot" aria-hidden="true" />
          {statusLabel}
        </span>
      </div>

      {kind === "store" && event.brandName ? (
        <span className="events_card_brand">{event.brandName}</span>
      ) : null}

      <h3 className="events_card_title">{event.title}</h3>
      <p className="events_card_date">
        <span className="events_card_date_mark" aria-hidden="true" />
        {formatEventDateRange(event.startDate, event.endDate)}
      </p>
    </a>
  );
}

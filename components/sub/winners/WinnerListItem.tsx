"use client";

import { useState } from "react";
import {
  formatWinnerDate,
  getWinnerDetailHref,
  type WinnerItem,
} from "@/data/winners";

type WinnerListItemProps = {
  item: WinnerItem;
  listNumber: number;
};

export default function WinnerListItem({ item, listNumber }: WinnerListItemProps) {
  const [hideImage, setHideImage] = useState(false);

  return (
    <li className="winners_row">
      <span className="winners_row_num" aria-hidden="true">
        {listNumber}
      </span>
      <a href={getWinnerDetailHref(item.id)} className="winners_row_link">
        <div className="winners_row_thumb">
          {!hideImage && item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="winners_row_img"
              src={item.thumbnail}
              alt=""
              onError={() => setHideImage(true)}
            />
          ) : (
            <div className="winners_row_placeholder" aria-hidden="true">
              <span>실제 이벤트 썸네일 반영 예정</span>
            </div>
          )}
        </div>

        <div className="winners_row_body">
          <h3 className="winners_row_title">{item.title}</h3>
          <p className="winners_row_date">{formatWinnerDate(item.date)}</p>
        </div>

        <span className="winners_row_arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </li>
  );
}

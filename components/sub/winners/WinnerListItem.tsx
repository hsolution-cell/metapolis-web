"use client";

import { useState } from "react";
import {
  formatWinnerDate,
  getWinnerDetailHref,
  type WinnerItem,
} from "@/data/winners";
import { DEFAULT_THUMBNAIL } from "@/lib/constants";

type WinnerListItemProps = {
  item: WinnerItem;
  listNumber: number;
};

export default function WinnerListItem({ item, listNumber }: WinnerListItemProps) {
  const [imgSrc, setImgSrc] = useState(item.thumbnail || DEFAULT_THUMBNAIL);

  return (
    <li className="winners_row">
      <span className="winners_row_num" aria-hidden="true">
        {item.pinned ? <span className="winners_row_pin">고정</span> : listNumber}
      </span>
      <a href={getWinnerDetailHref(item.id)} className="winners_row_link">
        <div className="winners_row_thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="winners_row_img"
            src={imgSrc}
            alt=""
            onError={() => setImgSrc(DEFAULT_THUMBNAIL)}
          />
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

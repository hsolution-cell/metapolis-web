import Link from "next/link";
import {
  formatNoticeDate,
  getNoticeDetailHref,
  type NoticeListData,
} from "@/data/notices";

type NoticeListItemProps = {
  item: NoticeListData;
  listNumber: number;
};

export default function NoticeListItem({ item, listNumber }: NoticeListItemProps) {
  return (
    <div className={`notices_row${item.pinned ? " notices_row--pinned" : ""}`}>
      <Link href={getNoticeDetailHref(item.id)} className="notices_row_link">
        <span className="notices_col notices_col_num">
          {item.pinned ? <span className="notices_pin">고정</span> : listNumber}
        </span>
        <span className="notices_col notices_col_category">
          <span className="notices_badge">{item.categoryLabel}</span>
        </span>
        <span className="notices_col notices_col_topic">
          <span className="notices_topic_text">{item.title}</span>
          <time className="notices_topic_date" dateTime={item.date}>
            {formatNoticeDate(item.date)}
          </time>
        </span>
      </Link>
    </div>
  );
}

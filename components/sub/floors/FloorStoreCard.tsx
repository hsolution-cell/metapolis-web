import type { StoreCardView } from "@/data/storeDirectory";
import FloorIcon from "@/components/sub/floors/FloorIcon";

type FloorStoreCardProps = {
  store: Pick<
    StoreCardView,
    "name" | "tel" | "iconCategory" | "hasEvent" | "eventHref"
  > & {
    location?: string;
  };
  showLocation?: boolean;
};

function StoreTel({
  tel,
  showIcon = false,
}: {
  tel: string;
  showIcon?: boolean;
}) {
  if (tel === "—") {
    return <span className="floors_store_tel">{tel}</span>;
  }

  return (
    <a className="floors_store_tel" href={`tel:${tel.replace(/-/g, "")}`}>
      {showIcon ? (
        <svg
          className="floors_store_tel_icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9.69856 3.99369C9.40686 3.403 8.79727 2.92523 8.04857 3.00972C7.37878 3.08512 6.38437 3.33746 5.70635 4.16494C5.01038 5.01478 4.75084 6.34012 5.28525 8.32585C5.85594 10.4442 6.70337 12.5326 7.75687 14.2175C8.80251 15.8903 10.0905 17.2293 11.5681 17.7427C12.8747 18.1966 13.874 18.0071 14.6029 17.5085C15.306 17.0277 15.6919 16.3044 15.8916 15.8035C16.1153 15.2428 15.9679 14.6589 15.6762 14.2285L14.6003 12.6432C14.3626 12.293 14.0204 12.029 13.6239 11.8901C13.2273 11.7512 12.7973 11.7447 12.3968 11.8715L10.9099 12.3424C10.8629 12.3586 10.8123 12.3605 10.7642 12.348C10.7162 12.3354 10.6728 12.3088 10.6395 12.2716C9.97755 11.4861 9.23595 10.3908 9.03438 9.28216C9.02793 9.25256 9.03231 9.22159 9.04672 9.19502C9.26549 8.82257 9.64209 8.40049 10.0164 8.03108C10.6511 7.40516 10.8915 6.41021 10.4727 5.56227L9.69856 3.99369Z"
            fill="currentColor"
          />
        </svg>
      ) : null}
      <span className="floors_store_tel_num">{tel}</span>
    </a>
  );
}

export default function FloorStoreCard({ store, showLocation = false }: FloorStoreCardProps) {
  const isEventLink = Boolean(store.hasEvent && store.eventHref);

  return (
    <li
      className={`floors_store_card floors_store_card--${store.iconCategory}${
        showLocation ? " floors_store_card--guide" : ""
      }${isEventLink ? " is-event-link" : ""}`}
    >
      {store.hasEvent ? (
        <span className="floors_store_event" aria-hidden="true">
          EVENT
        </span>
      ) : null}

      {isEventLink ? (
        <a
          href={store.eventHref}
          className="floors_store_hit"
          aria-label={`${store.name} 진행 중 이벤트 보기`}
        />
      ) : null}

      <span className="floors_store_icon" aria-hidden="true">
        <FloorIcon category={store.iconCategory} />
      </span>
      <div className="floors_store_body">
        <strong className="floors_store_name">{store.name}</strong>
        {showLocation ? (
          <div className="floors_store_meta">
            {store.location ? (
              <span className="floors_store_location">{store.location}</span>
            ) : null}
            <StoreTel tel={store.tel} showIcon />
          </div>
        ) : (
          <StoreTel tel={store.tel} />
        )}
      </div>
    </li>
  );
}

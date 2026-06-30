import type { StoreCardView } from "@/data/storeDirectory";
import FloorIcon from "@/components/sub/floors/FloorIcon";

type FloorStoreCardProps = {
  store: Pick<StoreCardView, "name" | "tel" | "iconCategory" | "hasEvent">;
};

export default function FloorStoreCard({ store }: FloorStoreCardProps) {
  return (
    <li className={`floors_store_card floors_store_card--${store.iconCategory}`}>
      {store.hasEvent ? (
        <span className="floors_store_event" aria-label="이벤트 진행 중">
          EVENT
        </span>
      ) : null}
      <span className="floors_store_icon" aria-hidden="true">
        <FloorIcon category={store.iconCategory} />
      </span>
      <div className="floors_store_body">
        <strong className="floors_store_name">{store.name}</strong>
        {store.tel === "—" ? (
          <span className="floors_store_tel">{store.tel}</span>
        ) : (
          <a className="floors_store_tel" href={`tel:${store.tel.replace(/-/g, "")}`}>
            {store.tel}
          </a>
        )}
      </div>
    </li>
  );
}

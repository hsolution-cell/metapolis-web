import type { CSSProperties } from "react";
import type { MajorStore } from "@/data/majorStores";

type StoreDetailItemProps = {
  store: MajorStore;
  revealIndex?: number;
};

export default function StoreDetailItem({ store, revealIndex }: StoreDetailItemProps) {
  return (
    <article
      id={`store-${store.id}`}
      className="stores_detail_item sub_reveal_item"
      style={
        revealIndex === undefined
          ? undefined
          : ({ "--sub-reveal-i": revealIndex } as CSSProperties)
      }
    >
      <div className="stores_detail_media">
        <div className="stores_detail_frame">
          {store.isNew ? (
            <span className="stores_detail_new" aria-label="신규 입점">
              New
            </span>
          ) : null}
          <img className="stores_detail_img" src={store.image} alt={store.imageAlt} />
          <div className="stores_detail_logo">
            <img src={store.detailLogo} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="stores_detail_body">
        <div className="stores_detail_meta">
          <span className="stores_detail_category">{store.category}</span>
          <span className="stores_detail_badge">{store.locationBadge}</span>
        </div>

        <h3 className="stores_detail_name">{store.detailName ?? store.name}</h3>
        <p className="stores_detail_desc">{store.description}</p>

        <dl className="stores_detail_table">
          {store.details.map((row) => (
            <div key={row.label} className="stores_detail_row">
              <dt>{row.label}</dt>
              <dd>
                {row.value}
                {row.link ? (
                  <>
                    {" "}
                    <a className="stores_detail_link" href={row.link.href}>
                      {row.link.label} &gt;
                    </a>
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

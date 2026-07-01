"use client";

import { useState, type CSSProperties } from "react";
import type { Facility, FacilityLocationBadge } from "@/data/facilities";

type FacilityDetailItemProps = {
  facility: Facility;
  revealIndex?: number;
};

function LocationBadgeRow({
  block,
  locations,
}: {
  block: FacilityLocationBadge["block"];
  locations: FacilityLocationBadge[];
}) {
  if (!locations.length) return null;

  const blockLabel = block === "a" ? "A" : "B";

  return (
    <span className="facilities_detail_badges_row">
      {locations.map((location) => (
        <span
          key={`${block}-${location.floor}`}
          className="facilities_detail_loc_item"
        >
          <span
            className={`facilities_detail_loc_mark facilities_detail_loc_mark--${block}`}
            aria-hidden="true"
          >
            {blockLabel}
          </span>
          <span className="facilities_detail_loc_floor">{location.floor}</span>
        </span>
      ))}
    </span>
  );
}

function LocationBadges({ locations }: { locations: FacilityLocationBadge[] }) {
  const blockA = locations.filter((location) => location.block === "a");
  const blockB = locations.filter((location) => location.block === "b");

  return (
    <span className="facilities_detail_badges">
      <LocationBadgeRow block="a" locations={blockA} />
      <LocationBadgeRow block="b" locations={blockB} />
    </span>
  );
}

export default function FacilityDetailItem({ facility, revealIndex }: FacilityDetailItemProps) {
  const [hideImage, setHideImage] = useState(false);

  return (
    <article
      id={`facility-${facility.id}`}
      className="facilities_detail_item sub_reveal_item"
      style={
        revealIndex === undefined
          ? undefined
          : ({ "--sub-reveal-i": revealIndex } as CSSProperties)
      }
    >
      <div className="facilities_detail_media">
        <div
          className={`facilities_detail_frame facilities_detail_frame--${facility.id}${
            hideImage ? " facilities_detail_frame--fallback" : ""
          }`}
        >
          {!hideImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="facilities_detail_img"
              src={facility.image}
              alt={facility.imageAlt}
              onError={() => setHideImage(true)}
            />
          ) : null}
          <span className="facilities_detail_caption" aria-hidden="true">
            {facility.imageCaption}
          </span>
        </div>
      </div>

      <div className="facilities_detail_body">
        <div className="facilities_detail_meta">
          <span className="facilities_detail_category">{facility.category}</span>
          <span className="facilities_detail_badge">{facility.locationBadge}</span>
        </div>

        <h3 className="facilities_detail_name">{facility.name}</h3>
        <p className="facilities_detail_desc">{facility.description}</p>

        <dl className="facilities_detail_table">
          {facility.details.map((row) => (
            <div key={row.label} className="facilities_detail_row">
              <dt>{row.label}</dt>
              <dd>
                {row.value ? <span>{row.value}</span> : null}
                {row.locations ? <LocationBadges locations={row.locations} /> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

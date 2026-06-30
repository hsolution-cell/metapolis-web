"use client";

import { useState } from "react";
import type { StoreGuideCategoryFilter } from "@/data/storeDirectory";

type CategoryBannerProps = {
  categoryId: StoreGuideCategoryFilter;
  image: string;
  captionEn: string;
  alt: string;
};

export default function CategoryBanner({
  categoryId,
  image,
  captionEn,
  alt,
}: CategoryBannerProps) {
  const [hideImage, setHideImage] = useState(false);

  return (
    <div
      className={`categories_banner categories_banner--${categoryId}${
        hideImage ? " categories_banner--fallback" : ""
      }`}
    >
      {!hideImage ? (
        <div className="categories_banner_media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="categories_banner_img"
            src={image}
            alt={alt}
            onError={() => setHideImage(true)}
          />
        </div>
      ) : null}
      {!hideImage ? <div className="categories_banner_overlay" aria-hidden="true" /> : null}
      <p className="categories_banner_caption" aria-hidden="true">
        {captionEn}
      </p>
    </div>
  );
}

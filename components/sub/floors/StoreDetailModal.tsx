"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import FloorIcon from "@/components/sub/floors/FloorIcon";
import type { FloorGuideStore } from "@/data/floorGuide";

type StoreDetailModalProps = {
  store: FloorGuideStore;
  onClose: () => void;
};

/** 매장 카드 클릭 시 뜨는 브랜드 소개 팝업 */
export default function StoreDetailModal({ store, onClose }: StoreDetailModalProps) {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const telHref = store.tel !== "—" ? `tel:${store.tel.replace(/-/g, "")}` : null;

  return createPortal(
    <div
      className="store_modal_backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="store_modal"
        role="dialog"
        aria-modal="true"
        aria-label={store.name}
      >
        <button
          type="button"
          className="store_modal_close"
          aria-label={isEn ? "Close" : "닫기"}
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {!imageFailed ? (
          <figure className="store_modal_figure">
            <img
              src={`/img/sub/stores/popup/${store.id}.jpg`}
              alt=""
              onError={() => setImageFailed(true)}
            />
          </figure>
        ) : (
          <div className="store_modal_figure store_modal_figure--fallback" aria-hidden="true">
            <FloorIcon category={store.iconCategory} />
          </div>
        )}

        <div className="store_modal_body">
          <strong className="store_modal_name">{store.name}</strong>

          <dl className="store_modal_meta">
            {store.location ? (
              <div className="store_modal_meta_row">
                <dt>{isEn ? "Location" : "위치"}</dt>
                <dd>{store.location}</dd>
              </div>
            ) : null}
            {telHref ? (
              <div className="store_modal_meta_row">
                <dt>{isEn ? "Tel" : "전화"}</dt>
                <dd>
                  <a href={telHref}>{store.tel}</a>
                </dd>
              </div>
            ) : null}
          </dl>

          {/* 소개글은 국문만 보유 — 영문 페이지에서는 미노출 */}
          {!isEn && store.description ? (
            <p className="store_modal_desc">{store.description}</p>
          ) : null}

          <div className="store_modal_actions">
            {telHref ? (
              <a href={telHref} className="store_modal_btn">
                {isEn ? "Call" : "전화 걸기"}
              </a>
            ) : null}
            {store.hasEvent && store.eventHref ? (
              <a href={store.eventHref} className="store_modal_btn store_modal_btn--gold">
                {isEn ? "View Event" : "진행 중 이벤트 보기"}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

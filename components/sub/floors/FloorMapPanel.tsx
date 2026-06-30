"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type FloorMapPanelProps = {
  src: string;
  alt: string;
  caption?: string;
};

export default function FloorMapPanel({ src, alt, caption }: FloorMapPanelProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    closeBtnRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const lightbox =
    open && mounted
      ? createPortal(
          <div className="floors_map_lightbox" role="presentation">
            <button
              type="button"
              className="floors_map_lightbox_backdrop"
              aria-label="층별 지도 닫기"
              onClick={close}
            />
            <div
              className="floors_map_lightbox_dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <div className="floors_map_lightbox_head">
                <p id={titleId} className="floors_map_lightbox_title">
                  {alt}
                </p>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="floors_map_lightbox_close"
                  aria-label="닫기"
                  onClick={close}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="floors_map_lightbox_body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="floors_map_lightbox_img" src={src} alt="" />
                <p className="floors_map_lightbox_scroll_hint" aria-hidden="true">
                  좌우·상하로 스크롤하여 확인하세요
                </p>
              </div>
              {caption ? <p className="floors_map_lightbox_caption">{caption}</p> : null}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="floors_map_panel">
        <button
          type="button"
          className="floors_map_trigger"
          aria-label={`${alt} 크게 보기`}
          onClick={() => setOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="floors_map_img" src={src} alt={alt} />
          <span className="floors_map_zoom_hint" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            크게 보기
          </span>
        </button>
        {caption ? <p className="floors_map_caption">{caption}</p> : null}
      </div>
      {lightbox}
    </>
  );
}

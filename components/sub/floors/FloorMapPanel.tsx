"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

type FloorMapPanelProps = {
  src: string;
  alt: string;
  caption?: string;
};

const MAX_ZOOM = 3;

export default function FloorMapPanel({ src, alt, caption }: FloorMapPanelProps) {
  const pathname = usePathname();
  // 영문 페이지에서는 영문 문구 사용
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");
  const t = isEn
    ? {
        zoom: "View Larger",
        zoomAria: (a: string) => `View larger: ${a}`,
        closeMap: "Close floor map",
        close: "Close",
        scrollHint: "Pinch to zoom, scroll to move",
      }
    : {
        zoom: "크게 보기",
        zoomAria: (a: string) => `${a} 크게 보기`,
        closeMap: "층별 지도 닫기",
        close: "닫기",
        scrollHint: "두 손가락으로 확대·축소, 스크롤로 이동하세요",
      };
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef(1);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  // 핀치 줌 — 이미지 폭을 키워(스크롤 영역 확장) 확대하고, 핀치 중심을 유지
  useEffect(() => {
    if (!open) return;

    zoomRef.current = 1;
    const el = bodyRef.current;
    const img = imgRef.current;
    if (!el || !img) return;
    img.style.width = "100%";

    const touchDist = (touches: TouchList) =>
      Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );

    const applyZoom = (next: number, centerX: number, centerY: number) => {
      const prev = zoomRef.current;
      const zoom = Math.min(MAX_ZOOM, Math.max(1, next));
      if (zoom === prev) return;
      const rect = el.getBoundingClientRect();
      const cx = centerX - rect.left;
      const cy = centerY - rect.top;
      const contentX = el.scrollLeft + cx;
      const contentY = el.scrollTop + cy;
      zoomRef.current = zoom;
      img.style.width = `${zoom * 100}%`;
      el.scrollLeft = (contentX * zoom) / prev - cx;
      el.scrollTop = (contentY * zoom) / prev - cy;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchRef.current = { dist: touchDist(e.touches), zoom: zoomRef.current };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const pinch = pinchRef.current;
      if (!pinch || e.touches.length !== 2) return;
      e.preventDefault();
      const next = (pinch.zoom * touchDist(e.touches)) / pinch.dist;
      applyZoom(
        next,
        (e.touches[0].clientX + e.touches[1].clientX) / 2,
        (e.touches[0].clientY + e.touches[1].clientY) / 2
      );
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchRef.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [open]);

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
              aria-label={t.closeMap}
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
                  aria-label={t.close}
                  onClick={close}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="floors_map_lightbox_body" ref={bodyRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={imgRef} className="floors_map_lightbox_img" src={src} alt="" />
                <p className="floors_map_lightbox_scroll_hint" aria-hidden="true">
                  {t.scrollHint}
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
          aria-label={t.zoomAria(alt)}
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
            {t.zoom}
          </span>
        </button>
        {caption ? <p className="floors_map_caption">{caption}</p> : null}
      </div>
      {lightbox}
    </>
  );
}

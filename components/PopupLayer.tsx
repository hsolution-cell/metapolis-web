"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Popup = {
  id: string;
  title: string;
  image: string;
  linkHref: string | null;
};

const HIDE_PREFIX = "metapolis-popup-hide:";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/** 오늘 하루 숨김 처리된 팝업 id 집합 조회 */
function readHiddenIds(): Set<string> {
  const today = todayKey();
  const hidden = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith(HIDE_PREFIX)) {
        if (localStorage.getItem(key) === today) {
          hidden.add(key.slice(HIDE_PREFIX.length));
        }
      }
    }
  } catch {
    /* localStorage 접근 불가 시 무시 */
  }
  return hidden;
}

export default function PopupLayer() {
  const pathname = usePathname();
  const [popups, setPopups] = useState<Popup[]>([]);

  // 메인 페이지에서만 노출
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/popups");
        if (!res.ok) return;
        const data: Popup[] = await res.json();
        if (cancelled) return;
        const hidden = readHiddenIds();
        setPopups(data.filter((p) => !hidden.has(p.id)));
      } catch {
        /* 조회 실패 시 표시 안 함 */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isHome]);

  if (!isHome || popups.length === 0) return null;

  function close(id: string) {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  }

  function hideToday(id: string) {
    try {
      localStorage.setItem(`${HIDE_PREFIX}${id}`, todayKey());
    } catch {
      /* 무시 */
    }
    close(id);
  }

  return (
    <div className="popup-layer" role="dialog" aria-modal="true" aria-label="팝업 공지">
      <div className="popup-layer__backdrop" />
      <div className="popup-layer__stack">
        {popups.map((popup, i) => (
          <div
            className="popup-card"
            key={popup.id}
            style={{ transform: `translate(${i * 24}px, ${i * 24}px)` }}
          >
            <div className="popup-card__body">
              {popup.linkHref ? (
                <a href={popup.linkHref} className="popup-card__link">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={popup.image} alt={popup.title} />
                </a>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={popup.image} alt={popup.title} />
              )}
            </div>
            <div className="popup-card__foot">
              <button
                type="button"
                className="popup-card__btn"
                onClick={() => hideToday(popup.id)}
              >
                오늘 하루 보지 않기
              </button>
              <button
                type="button"
                className="popup-card__btn popup-card__btn--close"
                onClick={() => close(popup.id)}
              >
                닫기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

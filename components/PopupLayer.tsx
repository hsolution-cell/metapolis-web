"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

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
  const [closed, setClosed] = useState(false);

  // 국문 메인("/")·영문 메인("/en")에서만 노출
  const isHome = pathname === "/" || pathname === "/en";
  const locale = pathname === "/en" ? "en" : "ko";

  useEffect(() => {
    if (!isHome) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/popups?locale=${locale}`);
        if (!res.ok) return;
        const data: Popup[] = await res.json();
        if (cancelled) return;
        const hidden = readHiddenIds();
        setPopups(data.filter((p) => !hidden.has(p.id)));
        setClosed(false);
      } catch {
        /* 조회 실패 시 표시 안 함 */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isHome, locale]);

  if (!isHome || closed || popups.length === 0) return null;

  const isSingle = popups.length <= 1;

  /** 오늘 하루 보지 않기 — 현재 노출 중인 팝업 전체에 적용 */
  function hideToday() {
    try {
      const today = todayKey();
      for (const p of popups) {
        localStorage.setItem(`${HIDE_PREFIX}${p.id}`, today);
      }
    } catch {
      /* 무시 */
    }
    setClosed(true);
  }

  return (
    <div className="popup-layer" role="dialog" aria-modal="true" aria-label="팝업 공지">
      <div className="popup-layer__backdrop" />
      <div className="popup-card">
        <div className="popup-card__body">
          <Swiper
            className="popup-swiper"
            modules={[Autoplay, Pagination]}
            loop={!isSingle}
            speed={600}
            autoplay={isSingle ? false : { delay: 4000, disableOnInteraction: false }}
            pagination={isSingle ? false : { clickable: true }}
          >
            {popups.map((popup) => (
              <SwiperSlide key={popup.id}>
                {popup.linkHref ? (
                  <a href={popup.linkHref} className="popup-card__link">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={popup.image} alt={popup.title} />
                  </a>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={popup.image} alt={popup.title} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="popup-card__foot">
          <button type="button" className="popup-card__btn" onClick={hideToday}>
            오늘 하루 보지 않기
          </button>
          <button
            type="button"
            className="popup-card__btn popup-card__btn--close"
            onClick={() => setClosed(true)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

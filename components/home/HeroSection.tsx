"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { HERO_SLIDES, type HeroSlide } from "@/data/heroSlides";

type HeroSectionProps = {
  slides?: HeroSlide[];
  ariaLabel?: string;
};

export default function HeroSection({
  slides = HERO_SLIDES,
  ariaLabel = "메인 배너",
}: HeroSectionProps = {}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  // 슬라이드가 1개면 루프/자동재생/네비/페이지네이션 컨트롤을 숨김
  const isSingle = slides.length <= 1;

  useEffect(() => {
    const onResize = () => {
      swiperRef.current?.update();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
    };
  }, []);

  const toggleAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;

    if (autoplayPaused) {
      swiper.autoplay.start();
      setAutoplayPaused(false);
    } else {
      swiper.autoplay.stop();
      setAutoplayPaused(true);
    }
  };

  return (
    <section className="main_hero page" aria-label={ariaLabel}>
      <div className="hero_swiper_wrap">
        <Swiper
          className="hero_swiper swiper"
          modules={[Autoplay, Navigation, Pagination]}
          loop={!isSingle}
          speed={800}
          observer
          observeParents
          autoplay={isSingle ? false : { delay: 5000, disableOnInteraction: false }}
          navigation={
            isSingle
              ? false
              : {
                  nextEl: ".hero_nav--next",
                  prevEl: ".hero_nav--prev",
                }
          }
          pagination={
            isSingle
              ? false
              : {
                  el: ".hero_pagination",
                  clickable: true,
                  type: "bullets",
                }
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChangeTransitionStart={(swiper) => {
            swiper.el.classList.add("is-transitioning");
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            swiper.el.classList.remove("is-transitioning");
          }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="hero_slide">
                <div className="hero_slide_bg" aria-hidden="true">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={slide.bgMobile} />
                    <img src={slide.bg} alt="" />
                  </picture>
                </div>
                <div className="hero_slide_inner content_inner">
                  <div className="hero_slide_text">
                    <span className="hero_badge">{slide.badge}</span>
                    <h2 className="hero_title">
                      {slide.title.split("\n").map((line, li) => (
                        <span key={li}>
                          {line}
                          {li === 0 && <br />}
                        </span>
                      ))}
                    </h2>
                    <p className="hero_desc">
                      <a href="#" className="hero_desc_link">
                        <span>{slide.desc}</span>
                        <span className="hero_desc_arrow" aria-hidden="true" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {!isSingle && (
            <>
              <button type="button" className="hero_nav hero_nav--prev" aria-label="이전 배너">
                <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M13 2L3 14L13 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="hero_nav hero_nav--next" aria-label="다음 배너">
                <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 2L13 14L3 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </Swiper>

        {!isSingle && (
          <div className="hero_controls">
            <div className="hero_pagination swiper-pagination" />
            <button
              type="button"
              className={`hero_autoplay_btn${autoplayPaused ? " is-paused" : ""}`}
              aria-label={autoplayPaused ? "재생" : "멈춤"}
              aria-pressed={autoplayPaused}
              onClick={toggleAutoplay}
            />
          </div>
        )}
      </div>
    </section>
  );
}

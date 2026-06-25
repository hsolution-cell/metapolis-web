"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

const SLIDES = Array.from({ length: 4 }, () => ({
  bg: "/img/hero_bg_01.png",
  badge: "NOTICE",
  title: "일상 속 설레는 산책,\n새로워진 메타폴리스에서.",
  desc: "5월, 새로운 이름으로 시작하는 설렘",
}));

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    return () => {
      swiperRef.current?.destroy(true, true);
    };
  }, []);

  return (
    <section className="main_hero page" aria-label="메인 배너">
      <Swiper
        className="hero_swiper swiper"
        modules={[Autoplay, Navigation, Pagination]}
        loop
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".hero_nav--next",
          prevEl: ".hero_nav--prev",
        }}
        pagination={{
          el: ".hero_pagination",
          clickable: true,
          type: "bullets",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChangeTransitionStart={() => {
          swiperRef.current?.el.classList.add("is-transitioning");
        }}
        onSlideChangeTransitionEnd={() => {
          swiperRef.current?.el.classList.remove("is-transitioning");
        }}
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="hero_slide">
              <div className="hero_slide_bg" aria-hidden="true">
                <img src={slide.bg} alt="" />
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
      </Swiper>

      <div className="hero_pagination swiper-pagination" />
    </section>
  );
}

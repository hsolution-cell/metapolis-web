-- ============================================================
-- 메인 배너 다국어 확장 — hero_banners 에 locale 컬럼 추가 + 영문 시드
-- (hero-banners.sql 이후 실행. 여러 번 실행해도 안전)
-- ============================================================

-- 국문/영문 구분 컬럼(기존 행은 'ko'로 채워짐)
alter table public.hero_banners
  add column if not exists locale text not null default 'ko';

-- 현재 하드코딩된 영문 기본 슬라이드 1건 시드 (영문 배너가 하나도 없을 때만)
insert into public.hero_banners (locale, badge, title, description, bg, bg_mobile, sort_order, active)
select * from (values
  ('en',
   'NOTICE',
   E'A joyful daily stroll\nat the all-new METAPOLIS',
   'A new beginning this May, a new name.',
   '/img/hero_bg_01.png',
   '/img/hero_bg_01_mo.png',
   0,
   true)
) as seed(locale, badge, title, description, bg, bg_mobile, sort_order, active)
where not exists (select 1 from public.hero_banners where locale = 'en');

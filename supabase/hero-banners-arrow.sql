-- ============================================================
-- 메인 배너 화살표 아이콘 표시 여부 — hero_banners 에 show_arrow 컬럼 추가
-- (여러 번 실행해도 안전. 기존 행은 true = 지금처럼 화살표 표시)
-- ============================================================

alter table public.hero_banners
  add column if not exists show_arrow boolean not null default true;

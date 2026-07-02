-- ============================================================
-- 팝업 다국어 확장 — popups 에 locale 컬럼 추가
-- (popups.sql 이후 실행. 여러 번 실행해도 안전)
-- ============================================================

-- 국문/영문 구분 컬럼(기존 행은 'ko'로 채워짐)
alter table public.popups
  add column if not exists locale text not null default 'ko';

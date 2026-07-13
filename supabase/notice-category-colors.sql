-- ============================================================
-- 고객알림 구분(카테고리) 배지 색상 — notice_categories 에 color 컬럼 추가
-- (여러 번 실행해도 안전. color 가 null 이면 기존 기본 배지 색 사용)
-- ============================================================

alter table public.notice_categories
  add column if not exists color text;

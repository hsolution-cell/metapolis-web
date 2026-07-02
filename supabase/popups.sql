-- ============================================================
-- 팝업(popups) — 테이블 · RLS
-- SQL Editor 에 붙여넣고 Run (여러 번 실행해도 안전)
-- 이미지는 기존 content-images 버킷 재사용(notices.sql에서 생성됨)
-- ============================================================

create table if not exists public.popups (
  id uuid primary key default gen_random_uuid(),
  title text not null,                     -- 관리용 제목 / 이미지 대체텍스트
  image text not null,                     -- 팝업 이미지 URL
  link_href text,                          -- 클릭 시 이동 링크(선택)
  start_date date not null,                -- 노출 시작일
  end_date date not null,                  -- 노출 종료일
  sort_order integer not null default 0,   -- 여러 개일 때 정렬(작을수록 먼저)
  active boolean not null default true,    -- 노출 여부
  created_at timestamptz not null default now()
);

alter table public.popups enable row level security;

drop policy if exists "popups public read" on public.popups;
create policy "popups public read" on public.popups for select using (true);

drop policy if exists "popups auth insert" on public.popups;
create policy "popups auth insert" on public.popups for insert to authenticated with check (true);

drop policy if exists "popups auth update" on public.popups;
create policy "popups auth update" on public.popups for update to authenticated using (true) with check (true);

drop policy if exists "popups auth delete" on public.popups;
create policy "popups auth delete" on public.popups for delete to authenticated using (true);

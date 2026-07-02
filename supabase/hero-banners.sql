-- ============================================================
-- 메인 배너(hero_banners) — 테이블 · RLS · 시드
-- SQL Editor 에 붙여넣고 Run (여러 번 실행해도 안전)
-- 이미지는 기존 content-images 버킷 재사용(notices.sql에서 생성됨)
-- ============================================================

create table if not exists public.hero_banners (
  id uuid primary key default gen_random_uuid(),
  badge text,                              -- 라벨 (예: NOTICE)
  title text not null,                     -- 메인 문구 (줄바꿈 \n 지원)
  description text,                        -- 설명 문구
  link_href text,                          -- 설명 링크 이동 경로(선택)
  bg text,                                 -- 데스크톱 배경 이미지 URL
  bg_mobile text,                          -- 모바일 배경 이미지 URL
  sort_order integer not null default 0,   -- 정렬(작을수록 먼저)
  active boolean not null default true,    -- 노출 여부
  created_at timestamptz not null default now()
);

alter table public.hero_banners enable row level security;

drop policy if exists "hero_banners public read" on public.hero_banners;
create policy "hero_banners public read" on public.hero_banners for select using (true);

drop policy if exists "hero_banners auth insert" on public.hero_banners;
create policy "hero_banners auth insert" on public.hero_banners for insert to authenticated with check (true);

drop policy if exists "hero_banners auth update" on public.hero_banners;
create policy "hero_banners auth update" on public.hero_banners for update to authenticated using (true) with check (true);

drop policy if exists "hero_banners auth delete" on public.hero_banners;
create policy "hero_banners auth delete" on public.hero_banners for delete to authenticated using (true);

-- 현재 하드코딩된 기본 슬라이드 1건 시드 (비어 있을 때만)
insert into public.hero_banners (badge, title, description, bg, bg_mobile, sort_order, active)
select * from (values
  ('NOTICE',
   E'일상 속 설레는 산책,\n새로워진 메타폴리스에서.',
   '5월, 새로운 이름으로 시작하는 설렘',
   '/img/hero_bg_01.png',
   '/img/hero_bg_01_mo.png',
   0,
   true)
) as seed(badge, title, description, bg, bg_mobile, sort_order, active)
where not exists (select 1 from public.hero_banners);

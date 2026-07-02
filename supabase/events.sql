-- ============================================================
-- 메타폴리스 이벤트(events) — 테이블 · RLS · 시드
-- SQL Editor 에 붙여넣고 Run (여러 번 실행해도 안전)
-- 이미지는 기존 content-images 버킷 재사용(notices.sql에서 생성됨)
-- ============================================================

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  thumbnail text,                          -- 썸네일 이미지 URL
  start_date date not null,
  end_date date not null,
  body text,                               -- TinyMCE HTML
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "events public read" on public.events;
create policy "events public read" on public.events for select using (true);

drop policy if exists "events auth insert" on public.events;
create policy "events auth insert" on public.events for insert to authenticated with check (true);

drop policy if exists "events auth update" on public.events;
create policy "events auth update" on public.events for update to authenticated using (true) with check (true);

drop policy if exists "events auth delete" on public.events;
create policy "events auth delete" on public.events for delete to authenticated using (true);

-- 기존 12건 시드 (비어 있을 때만)
insert into public.events (title, start_date, end_date, body)
select * from (values
  ('여름 시즌 특별 혜택', date '2026-07-01', date '2026-07-30',
   '<p>무더운 여름을 맞아 메타폴리스 고객 여러분께 특별한 혜택을 준비했습니다.</p><p>기간 내 방문하시면 다양한 사은품과 할인 쿠폰을 받으실 수 있습니다.</p>'),
  ('신규 회원 웰컴 기프트', date '2026-06-01', date '2026-08-31',
   '<p>메타폴리스 신규 회원을 위한 웰컴 기프트 이벤트를 진행합니다.</p><p>회원 가입 후 안내데스크 또는 서비스 데스크에서 사은품을 수령해 주세요.</p>'),
  ('주말 럭키 드로우', date '2026-06-14', date '2026-07-13',
   '<p>매주 주말, 메타폴리스를 방문하신 고객님을 대상으로 럭키 드로우를 진행합니다.</p><p>영수증을 지참하시고 2층 서비스 데스크에서 응모해 주세요.</p>'),
  ('키즈 데이 패밀리 페스티벌', date '2026-05-01', date '2026-05-05', null),
  ('봄맞이 쇼핑 위크', date '2026-04-01', date '2026-04-30', null),
  ('주차 무료 프로모션', date '2026-03-01', date '2026-03-31', null),
  ('리뉴얼 오픈 기념 이벤트', date '2026-02-01', date '2026-02-28', null),
  ('새해 맞이 포춘 이벤트', date '2026-01-01', date '2026-01-31', null),
  ('크리스마스 마켓', date '2025-12-01', date '2025-12-25', null),
  ('블랙 프라이데이 특가', date '2025-11-20', date '2025-11-30', null),
  ('가을 단풍 페스티벌', date '2025-10-01', date '2025-10-31', null),
  ('추석 맞이 사은품 증정', date '2025-09-15', date '2025-09-30', null)
) as seed(title, start_date, end_date, body)
where not exists (select 1 from public.events);

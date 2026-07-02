-- ============================================================
-- 당첨자 발표(winners) — 테이블 · RLS · 시드
-- SQL Editor 에 붙여넣고 Run (여러 번 실행해도 안전)
-- ============================================================

create table if not exists public.winners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  thumbnail text,
  date date not null,
  body text,
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.winners enable row level security;

drop policy if exists "winners public read" on public.winners;
create policy "winners public read" on public.winners for select using (true);

drop policy if exists "winners auth insert" on public.winners;
create policy "winners auth insert" on public.winners for insert to authenticated with check (true);

drop policy if exists "winners auth update" on public.winners;
create policy "winners auth update" on public.winners for update to authenticated using (true) with check (true);

drop policy if exists "winners auth delete" on public.winners;
create policy "winners auth delete" on public.winners for delete to authenticated using (true);

-- 기존 12건 시드 (비어 있을 때만)
insert into public.winners (title, date, body)
select * from (values
  ('여름 시즌 럭키 드로우 당첨자 발표', date '2026-07-01',
   '<p>여름 시즌 럭키 드로우 이벤트 당첨자를 발표합니다.</p><p>당첨되신 고객님께는 개별 연락을 통해 경품 수령 방법을 안내해 드립니다.</p>'),
  ('신규 회원 웰컴 기프트 당첨자 발표', date '2026-06-20', null),
  ('주말 방문 혜택 이벤트 당첨자 발표', date '2026-06-10', null),
  ('봄맞이 페스티벌 당첨자 발표', date '2026-05-05', null),
  ('키즈 데이 패밀리 이벤트 당첨자 발표', date '2026-05-01', null),
  ('리뉴얼 오픈 기념 경품 이벤트 당첨자 발표', date '2026-03-15', null),
  ('주차 무료 프로모션 당첨자 발표', date '2026-03-01', null),
  ('새해 맞이 포춘 이벤트 당첨자 발표', date '2026-01-31', null),
  ('크리스마스 마켓 경품 추첨 당첨자 발표', date '2025-12-26', null),
  ('블랙 프라이데이 특별 추첨 당첨자 발표', date '2025-12-01', null),
  ('가을 감사 이벤트 당첨자 발표', date '2025-11-01', null),
  ('추석 맞이 사은품 추첨 당첨자 발표', date '2025-10-01', null)
) as seed(title, date, body)
where not exists (select 1 from public.winners);

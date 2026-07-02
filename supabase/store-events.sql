-- ============================================================
-- 매장 이벤트(store_events) — 테이블 · RLS · 시드
-- SQL Editor 에 붙여넣고 Run (여러 번 실행해도 안전)
-- ============================================================

create table if not exists public.store_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  thumbnail text,
  start_date date not null,
  end_date date not null,
  body text,
  store_id text,          -- stores.id 와 매칭(선택)
  brand_name text,        -- 카드 뱃지·매칭용 브랜드명
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.store_events enable row level security;

drop policy if exists "store_events public read" on public.store_events;
create policy "store_events public read" on public.store_events for select using (true);
drop policy if exists "store_events auth insert" on public.store_events;
create policy "store_events auth insert" on public.store_events for insert to authenticated with check (true);
drop policy if exists "store_events auth update" on public.store_events;
create policy "store_events auth update" on public.store_events for update to authenticated using (true) with check (true);
drop policy if exists "store_events auth delete" on public.store_events;
create policy "store_events auth delete" on public.store_events for delete to authenticated using (true);

insert into public.store_events (title, brand_name, store_id, start_date, end_date, body)
select * from (values
  ('홈플러스 여름 대전', '홈플러스', 'homeplus', date '2026-06-20', date '2026-07-31',
   '<p>홈플러스에서 여름 시즌 대전을 진행합니다.</p><p>신선식품 및 생활용품 특가 행사와 함께 다양한 사은품을 만나보세요.</p>'),
  ('CGV 시네마 위크', 'CGV', 'cgv-a-4f', date '2026-06-01', date '2026-06-30',
   '<p>CGV 메타폴리스점에서 시네마 위크를 진행합니다.</p><p>기간 내 영화 관람 시 팝콘 업그레이드 혜택을 드립니다.</p>'),
  ('스타벅스 사이즈업 데이', '스타벅스', 'starbucks-a-b2', date '2026-06-10', date '2026-07-10', null),
  ('준오헤어 시즌 프로모션', '준오헤어', 'juno_hair', date '2026-05-15', date '2026-06-30', null),
  ('제시믹스 봄·여름 시즌 세일', '제시믹스', 'jessymix', date '2026-04-01', date '2026-06-15', null),
  ('알라딘 중고서점 북 페어', '알라딘', 'aladin', date '2026-03-10', date '2026-04-10', null),
  ('리조트랩 홈리빙 기획전', '리조트랩', 'resortlab', date '2026-02-01', date '2026-02-28', null),
  ('반디인하우스 구매 사은품 증정', '반디인하우스', 'bandiinhouse', date '2026-01-10', date '2026-01-31', null),
  ('아디다스 아울렛 특가', '아디다스', 'adidas', date '2025-12-01', date '2025-12-31', null),
  ('스파오 윈터 컬렉션 할인', '스파오', 'spao', date '2025-11-15', date '2025-12-15', null),
  ('ZARA 신상품 런칭 이벤트', 'ZARA', null, date '2025-10-01', date '2025-10-31', null),
  ('유니클로 히트텍 프로모션', '유니클로', null, date '2025-09-01', date '2025-09-30', null)
) as seed(title, brand_name, store_id, start_date, end_date, body)
where not exists (select 1 from public.store_events);

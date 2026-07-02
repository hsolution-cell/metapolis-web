-- ============================================================
-- 고객알림(notices) — 테이블 · RLS · Storage · 시드
-- Supabase 대시보드 → SQL Editor 에 전체 붙여넣고 Run 하세요.
-- (여러 번 실행해도 안전하도록 작성)
-- ============================================================

-- 1) 테이블
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'info' check (category in ('info','notice','event')),
  title text not null,
  body text,                              -- TinyMCE HTML
  date date not null default current_date,
  created_at timestamptz not null default now()
);

-- 2) RLS: 공개 읽기 / 로그인 사용자만 쓰기
alter table public.notices enable row level security;

drop policy if exists "notices public read" on public.notices;
create policy "notices public read"
  on public.notices for select using (true);

drop policy if exists "notices auth insert" on public.notices;
create policy "notices auth insert"
  on public.notices for insert to authenticated with check (true);

drop policy if exists "notices auth update" on public.notices;
create policy "notices auth update"
  on public.notices for update to authenticated using (true) with check (true);

drop policy if exists "notices auth delete" on public.notices;
create policy "notices auth delete"
  on public.notices for delete to authenticated using (true);

-- 3) Storage 버킷(본문 이미지) — 공개 읽기 / 로그인 업로드
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

drop policy if exists "content images public read" on storage.objects;
create policy "content images public read"
  on storage.objects for select using (bucket_id = 'content-images');

drop policy if exists "content images auth upload" on storage.objects;
create policy "content images auth upload"
  on storage.objects for insert to authenticated with check (bucket_id = 'content-images');

drop policy if exists "content images auth update" on storage.objects;
create policy "content images auth update"
  on storage.objects for update to authenticated using (bucket_id = 'content-images');

drop policy if exists "content images auth delete" on storage.objects;
create policy "content images auth delete"
  on storage.objects for delete to authenticated using (bucket_id = 'content-images');

-- 4) 기존 공지 12건 시드 (비어 있을 때만)
insert into public.notices (category, title, body, date)
select * from (values
  ('info',   '메타폴리스 주차 이용안내(지하주차장 입구 위치 변경)',
   '<p>메타폴리스 지하주차장 입구 위치가 아래와 같이 변경됩니다.</p><p>변경 기간 동안 혼잡이 예상되오니, 대중교통 이용을 권장드립니다.</p><p>• 변경 일시: 2026년 7월 1일(수) ~ 7월 15일(수)</p><p>• 변경 내용: 지하 1층 B구역 입구 일시 폐쇄, A구역 입구로 통합 운영</p>',
   date '2026-07-01'),
  ('info',   '메타폴리스 영업시간을 아래 내용과 같이 변경합니다',
   '<p>고객님의 편의를 위해 메타폴리스 영업시간을 아래와 같이 변경합니다.</p><p>• 변경 전: 10:30 ~ 22:00</p><p>• 변경 후: 10:30 ~ 22:30 (연장 운영)</p><p>• 적용 일자: 2026년 7월 1일(수)부터</p>',
   date '2026-07-01'),
  ('event',  '2026 여름 페스티벌 기간 특별 운영 안내', null, date '2026-06-20'),
  ('notice', 'A Block 엘리베이터 정기 점검 안내',       null, date '2026-06-15'),
  ('info',   '냉방 시설 점검에 따른 일부 구역 온도 조절 안내', null, date '2026-06-10'),
  ('event',  '가족의 날 맞이 키즈 프로그램 운영 안내',   null, date '2026-05-05'),
  ('notice', '5월 연휴 기간 영업시간 안내',              null, date '2026-04-28'),
  ('info',   '주차 요금 및 무료 주차 시간 변경 안내',    null, date '2026-04-15'),
  ('event',  '봄맞이 플라워 마켓 개최 안내',             null, date '2026-03-20'),
  ('notice', '소방 훈련 실시에 따른 일시적 이용 제한 안내', null, date '2026-03-10'),
  ('info',   '메타폴리스 리뉴얼 오픈 기념 운영 안내',    null, date '2026-02-01'),
  ('notice', '설 연휴 기간 영업시간 및 휴무 안내',       null, date '2026-01-20')
) as seed(category, title, body, date)
where not exists (select 1 from public.notices);

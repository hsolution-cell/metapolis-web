-- ============================================================
-- 고객알림 확장: 구분(카테고리) 테이블 + 상단 고정(pinned)
-- notices.sql 실행 이후에 SQL Editor 에 붙여넣고 Run 하세요.
-- (여러 번 실행해도 안전)
-- ============================================================

-- 1) 카테고리 테이블
create table if not exists public.notice_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.notice_categories enable row level security;

drop policy if exists "notice_categories public read" on public.notice_categories;
create policy "notice_categories public read"
  on public.notice_categories for select using (true);

drop policy if exists "notice_categories auth insert" on public.notice_categories;
create policy "notice_categories auth insert"
  on public.notice_categories for insert to authenticated with check (true);

drop policy if exists "notice_categories auth update" on public.notice_categories;
create policy "notice_categories auth update"
  on public.notice_categories for update to authenticated using (true) with check (true);

drop policy if exists "notice_categories auth delete" on public.notice_categories;
create policy "notice_categories auth delete"
  on public.notice_categories for delete to authenticated using (true);

-- 2) 기본 카테고리 시드 (비어 있을 때만): 안내 · 공지 · 행사
insert into public.notice_categories (name, sort_order)
select * from (values ('안내', 1), ('공지', 2), ('행사', 3)) as s(name, sort_order)
where not exists (select 1 from public.notice_categories);

-- 3) notices 컬럼 추가: category_id(FK), pinned(상단 고정)
alter table public.notices
  add column if not exists category_id uuid references public.notice_categories(id) on delete set null;
alter table public.notices
  add column if not exists pinned boolean not null default false;

-- 4) 기존 category 텍스트('info'/'notice'/'event') → category_id 매핑
update public.notices n
set category_id = c.id
from public.notice_categories c
where n.category_id is null
  and c.name = case n.category
    when 'info' then '안내'
    when 'notice' then '공지'
    when 'event' then '행사'
    else null
  end;

-- 5) 옛 category 텍스트 컬럼/체크 제거 (category_id 로 대체)
alter table public.notices drop constraint if exists notices_category_check;
alter table public.notices drop column if exists category;

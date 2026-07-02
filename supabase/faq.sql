-- ============================================================
-- 자주 묻는 질문(FAQ) — 카테고리 · FAQ 테이블 · RLS · 시드
-- SQL Editor 에 붙여넣고 Run (여러 번 실행해도 안전)
-- ============================================================

-- 1) FAQ 카테고리
create table if not exists public.faq_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.faq_categories enable row level security;

drop policy if exists "faq_categories public read" on public.faq_categories;
create policy "faq_categories public read" on public.faq_categories for select using (true);
drop policy if exists "faq_categories auth insert" on public.faq_categories;
create policy "faq_categories auth insert" on public.faq_categories for insert to authenticated with check (true);
drop policy if exists "faq_categories auth update" on public.faq_categories;
create policy "faq_categories auth update" on public.faq_categories for update to authenticated using (true) with check (true);
drop policy if exists "faq_categories auth delete" on public.faq_categories;
create policy "faq_categories auth delete" on public.faq_categories for delete to authenticated using (true);

insert into public.faq_categories (name, sort_order)
select * from (values ('이용안내',1),('편의·서비스',2),('주차·교통',3),('입점·제휴',4)) as s(name, sort_order)
where not exists (select 1 from public.faq_categories);

-- 2) FAQ
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.faq_categories(id) on delete set null,
  question text not null,
  answer text,
  pinned boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.faqs enable row level security;

drop policy if exists "faqs public read" on public.faqs;
create policy "faqs public read" on public.faqs for select using (true);
drop policy if exists "faqs auth insert" on public.faqs;
create policy "faqs auth insert" on public.faqs for insert to authenticated with check (true);
drop policy if exists "faqs auth update" on public.faqs;
create policy "faqs auth update" on public.faqs for update to authenticated using (true) with check (true);
drop policy if exists "faqs auth delete" on public.faqs;
create policy "faqs auth delete" on public.faqs for delete to authenticated using (true);

-- 3) 기존 9건 시드 (비어 있을 때만)
insert into public.faqs (category_id, question, answer, sort_order)
select c.id, v.question, v.answer, v.sort_order
from (values
  ('입점·제휴', '제휴문의는 어떻게 하나요?',
   '<p>제휴 및 대관 문의 등은 홈페이지 고객센터 내 <a href="/support/inquiry">[문의하기]</a>를 클릭하시어 대표전화로 접수해 주시면 담당자가 안내해 드립니다.</p>', 1),
  ('주차·교통', '대중교통 이용시 어떻게 가야 하나요?',
   '<p>메타폴리스 홈페이지 內 <a href="/location">오시는 길</a> 페이지를 확인해 주시기 바랍니다.</p>', 2),
  ('이용안내', '교환이나 환불기준은 어떻게 되나요?',
   '<p>교환 및 환불은 구입일을 포함한 7일 이내에 가능합니다.</p><p>① 상품을 구매하신 영수증과<br>② 구매 시 사용한 결제 수단(신용카드 등)<br>③ 구입하신 상태 그대로의 상품을 지참하시고, 메타폴리스에서 구매하신 매장에 방문하시면 교환 또는 환불이 가능합니다.</p><p>※ 교환 또는 환불이 불가능한 상품<br>- 사용/착용/수선/오염/세탁 등으로 인한 재판매 불가 상품<br>- 제품 구매 시 교환 또는 환불 불가에 대한 별도의 안내 상품<br>- 매장 규정에 의해 구입처 외 교환 또는 환불이 불가능한 상품</p>', 3),
  ('편의·서비스', '수유실이 있나요?',
   '<p>수유실은 A Block 4층, B Block 4층에 위치해 있습니다.<br>- 수유실 운영시간 : 메타폴리스 영업시간과 동일(10:30 ~ 22:00)</p>', 4),
  ('편의·서비스', '흡연실이 있나요?',
   '<p>흡연실은 A Block 4층, B Block 3층에 위치해 있습니다.<br>- 흡연실 운영시간 : 메타폴리스 영업시간과 동일(10:30 ~ 22:00)</p>', 5),
  ('편의·서비스', '물건을 잃어버렸어요',
   '<p>메타폴리스 내에서의 분실물 또는 습득물은 서비스 데스크에 문의하시기 바랍니다.<br>- 서비스 데스크 전화번호 : 031-371-7083~5<br>- 서비스 데스크 위치 : A Block 2층</p>', 6),
  ('편의·서비스', '유모차/ 휠 체어 대여는 어디에서 하나요?',
   '<p>유모차 / 휠체어 대여는 서비스 데스크(A Block 2층)에서 가능합니다. 이용 시 신분증을 맡겨야 하며, 유모차는 유아(24개월 미만) 동반 시 대여 가능합니다.<br>- 서비스 데스크 운영시간 : 10:30 ~ 22:00</p>', 7),
  ('이용안내', '메타폴리스의 정기휴무일은 언제인가요?',
   '<p>메타폴리스는 연중무휴입니다.<br>하지만, 일부 매장은 사정에 따라 휴무일 수 있습니다.<br>개별 매장 휴무일은 메타폴리스 홈페이지 또는 해당 매장 전화문의를 통해 확인하실 수 있습니다.</p>', 8),
  ('이용안내', '메타폴리스의 영업시간이 궁금합니다.',
   '<p>메타폴리스의 영업시간은 오전 10시 30분부터 오후 10시까지입니다.<br>일부 매장의 경우 영업시간이 다를 수 있습니다.</p><p>※ 자세한 영업시간은 <a href="/hours">홈페이지</a> 또는 전화 문의를 통해 확인하실 수 있습니다.</p>', 9)
) as v(cat_name, question, answer, sort_order)
join public.faq_categories c on c.name = v.cat_name
where not exists (select 1 from public.faqs);

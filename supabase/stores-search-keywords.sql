-- ============================================================
-- 매장 검색어 복수 등록 — stores 에 search_keywords 컬럼 추가 + 별칭 시드
-- (stores.sql 이후 실행. 여러 번 실행해도 안전 — 이미 입력된 별칭은 덮어쓰지 않음)
-- search_keywords: 쉼표(,)로 구분한 추가 검색어 목록 (예: '무지, muji')
-- ============================================================

alter table public.stores
  add column if not exists search_keywords text;

-- id 오타 정정 (남도분식) — 참조 행 먼저 갱신
update public.store_events set store_id = 'namdopansik' where store_id = 'namdopansikㅊ';
update public.stores set id = 'namdopansik' where id = 'namdopansikㅊ';

-- 별칭 시드 (매장명 기준)
update public.stores as s
set search_keywords = v.keywords
from (values
  ('artbox', '아트박스'),
  ('무인양품', '무지'),
  ('ABC마트', '에이비씨마트'),
  ('CGV', '씨지브이, 영화관'),
  ('GS25', '지에스25, 편의점'),
  ('MLB', '엠엘비'),
  ('SK텔레콤', '에스케이텔레콤, SKT'),
  ('LF몰 스토어', '엘에프몰'),
  ('LX Z:IN 인테리어', '엘엑스지인, 지인'),
  ('에잇세컨즈', '8seconds'),
  ('스타벅스', '스벅'),
  ('올리브영', '올영')
) as v(name, keywords)
where s.name = v.name
  and s.search_keywords is null;

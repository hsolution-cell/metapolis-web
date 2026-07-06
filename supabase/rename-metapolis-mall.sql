-- ============================================================
-- 상호명 변경: 메타폴리스 → 메타폴리스몰 / METAPOLIS → METAPOLIS MALL
-- DB에 저장된 게시글 콘텐츠 일괄 치환 (여러 번 실행해도 안전)
--
-- 유지(치환 제외):
--   · stores 테이블 전체 — 입점매장 상호(메타폴리스 내과 등)는 별개 사업자
--   · 본문 속 "메타폴리스 내과/치과의원/옵티컬", 버스 정류장명("메타폴리스 하차", "메타폴리스 (중)")
-- ============================================================

create or replace function public.rename_brand(t text)
returns text language sql immutable as $$
  select
    -- 4) 보호해 둔 문자열 복원
    replace(replace(replace(replace(replace(replace(replace(replace(
      -- 3) 조사 보정 (를→을, 는→은)
      replace(replace(
        -- 2) 브랜드 치환 (국문 → 영문 순)
        replace(replace(replace(
          -- 1) 이미 올바른 표기·고유명칭을 희귀 토큰으로 보호
          replace(replace(replace(replace(replace(replace(replace(replace(
            t,
            '메타폴리스몰',        '⟦KM⟧'),
            'METAPOLIS MALL',      '⟦EM⟧'),
            'Metapolis Mall',      '⟦em⟧'),
            '메타폴리스 내과',     '⟦P1⟧'),
            '메타폴리스 치과의원', '⟦P2⟧'),
            '메타폴리스 옵티컬',   '⟦P3⟧'),
            '메타폴리스 하차',     '⟦P4⟧'),
            '메타폴리스 (중)',     '⟦P5⟧'),
          '메타폴리스', '메타폴리스몰'),
          'METAPOLIS', 'METAPOLIS MALL'),
          'Metapolis', 'Metapolis Mall'),
        '메타폴리스몰를', '메타폴리스몰을'),
        '메타폴리스몰는', '메타폴리스몰은'),
      '⟦KM⟧', '메타폴리스몰'),
      '⟦EM⟧', 'METAPOLIS MALL'),
      '⟦em⟧', 'Metapolis Mall'),
      '⟦P1⟧', '메타폴리스 내과'),
      '⟦P2⟧', '메타폴리스 치과의원'),
      '⟦P3⟧', '메타폴리스 옵티컬'),
      '⟦P4⟧', '메타폴리스 하차'),
      '⟦P5⟧', '메타폴리스 (중)')
$$;

update public.notices       set title = public.rename_brand(title), body = public.rename_brand(body);
update public.events        set title = public.rename_brand(title), body = public.rename_brand(body);
update public.store_events  set title = public.rename_brand(title), body = public.rename_brand(body);
update public.winners       set title = public.rename_brand(title), body = public.rename_brand(body);
update public.faqs          set question = public.rename_brand(question), answer = public.rename_brand(answer);
update public.notice_categories set name = public.rename_brand(name);
update public.faq_categories    set name = public.rename_brand(name);
update public.hero_banners  set title = public.rename_brand(title), description = public.rename_brand(description), badge = public.rename_brand(badge);
update public.popups        set title = public.rename_brand(title);

drop function public.rename_brand(text);

# 메타폴리스 웹 — 남은 작업 체크리스트

전체 점검 결과: 대부분의 페이지는 실제 콘텐츠로 완성된 **프로덕션 수준**.
깨진 이미지/에셋 참조 없음, 미사용 컴포넌트 정리 완료, TODO/lorem 마커 없음.
남은 것은 아래 플레이스홀더 · SEO 마감 · 신규 기능(ENG)뿐.

---

## Tier 1 — 오픈 전 필수 (플레이스홀더 안전 처리)

- [x] **법률 연락처 플레이스홀더** `data/legalContact.ts`
  - 임시값(`ㅇㅇㅇ` 등) → 빈 값으로 변경. `optionalLegalLine()` 가드가 빈 줄 자동 생략, 전화는 고객센터 번호 폴백
  - `privacy.ts` / `terms.ts`는 기존 폴백(`|| "메타폴리스"`) 확인 완료 — 수정 불필요
  - ⏳ 실제 값(법인명·보호책임자)은 고객 확정 후 입력
- [x] **히어로 슬라이드 중복** `data/heroSlides.ts`
  - 동일 4개 슬라이드 → 1개로 축소
  - `components/home/HeroSection.tsx` — 단일 슬라이드 시 루프·자동재생·네비·페이지네이션 숨김 처리 완료
  - ⏳ 실제 슬라이드 이미지·문구는 고객 확정 후 추가

## Tier 2 — SEO / 공유 마감

- [x] **`app/robots.ts` 생성** — `/preview` disallow, `sitemap.xml`·host 지정. `/robots.txt` 출력 확인 완료
- [x] **OG 이미지 + `metadataBase`** `app/layout.tsx` (+`lib/pageMetadata.ts`)
  - `public/img/thumbnail.png` (1200×630) 적용, `metadataBase` 설정 완료 → 전 페이지 공유 썸네일·절대 URL 정상
- [x] **`npm run build` 검증** — 프로덕션 빌드/타입체크 통과 확인

## Tier 3 — Next.js 16 최적화 (선택, 오픈 필수 아님)

- [ ] **Instant Navigation** — `unstable_instant` / `use cache` 미적용
  - 참고: `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`
  - 정적 데이터 기반 사이트라 적용 이득 큼(내비 지연 방지)

## Tier 4 — 신규 기능: 영문(EN) 홈페이지 (별도 페이즈)

- 접속 경로: **`/en`** (`app/en/*` 서브트리). 디자인은 국문과 거의 동일 → 국문 홈 컴포넌트 재사용
- [x] `/en` 라우트 + EN 전용 레이아웃/헤더/푸터(메뉴 5개)
- [x] 언어 토글 실제 연결(국문 ENG→/en, EN KOR→/)
- [x] Hero/Branch/FAQ/Location을 props 기반으로 리팩터해 국문/EN 공유
- [ ] EN 전용 메뉴 5개 페이지:
  - [x] 메인 페이지 (시안 반영, FAQ 영문 7문항 포함)
  - [ ] 메타폴리스 소개 (About)
  - [ ] 영업시간 (Hours)
  - [ ] 주소 및 주차안내 (Access & Parking) — `/en/location`
  - [ ] 층별안내 (Floor Guide) — `/en/floors`
- [ ] 나머지 페이지 EN 콘텐츠/이미지 확보 후 순차 제작
- [ ] `sitemap.ts` / `robots.ts` / `hreflang`에 `/en` 반영, html lang="en" 처리
- [ ] EN 헤더 검색 기능(현재 아이콘만) 처리 방향 결정

## Tier 5 — 신규 기능: 관리자 페이지 (별도 페이즈)

### 확정된 아키텍처
- **데이터 계층: Supabase (무료 티어)** — Postgres(DB) + Storage(이미지) + Auth(관리자 인증) 올인원
  - 자체 DB 설치·운영 없음. 프로젝트 URL + API Key를 **환경변수**에 넣어 연결
  - `@supabase/supabase-js`로 조회/저장, 이미지는 Supabase Storage 업로드
- **호스팅: Vercel (확정)** — Next.js 제작사라 Next 16 호환성 최고, git 푸시 = 자동 배포
  - ⚠️ 상업용이므로 **Vercel Pro(월 $20)** 필요 (Hobby는 비상업용 한정)
  - Vercel ↔ Supabase 공식 Integration으로 환경변수 자동 연동 가능
  - Supabase는 서버리스 대응 연결(pooler/HTTP) 기본 제공 → `@supabase/supabase-js`만 사용하면 됨
- **에디터: TinyMCE** (https://www.tiny.cloud/powered-by-tiny/)
  - API 키: `3626c37ab42f5b4a0348473243e50771a6478e5d9bd216153bd5cd8e8bc0ae6a`
  - [ ] 키는 하드코딩 대신 **환경변수(`NEXT_PUBLIC_TINYMCE_API_KEY`)로 관리**, 사용 도메인 등록

### 데이터 흐름
관리자 페이지(작성/업로드) → Supabase(테이블·Storage 저장) → 공개 페이지(조회, on-demand revalidation으로 갱신)

### 구현 항목
- [ ] Supabase 프로젝트 생성 + 환경변수 연결(`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
- [ ] 관리자 로그인 (단일 계정 인증 — Supabase Auth 또는 env 계정+세션 쿠키)
- [ ] 테이블/버킷 설계 및 관리 기능:
  - [ ] 입점 매장 추가 → `stores` 테이블 → **층별안내 + 카테고리별 안내**에 반영
  - [ ] 팝업 기능 → `popups` (등록/노출 관리)
  - [ ] 메타폴리스 이벤트 글 업로드 → `events`
  - [ ] 매장 이벤트 업로드 → `store_events`
  - [ ] 당첨자 발표 업로드 → `winners`
  - [ ] 고객알림 업로드 → `notices`
  - [ ] 자주 묻는 질문(FAQ) 업로드 → `faqs`
  - [ ] 메인 배너 추가 및 변경 → `banners` + 이미지 Storage
- [ ] 공개 페이지를 정적 `data/*.ts` → Supabase 조회로 전환(관리 대상 항목)
- [ ] **별도 견적·일정 필요.** 호스팅 업체 확정 후 배포 구성.

> 결정 로그: 초기 "DB 없음" → Vercel 서버리스 파일쓰기 불가 확인 → 관리형 DB 수용 → 비용검토 → **Vercel Pro + Supabase 무료**로 최종 확정 (Vercel이 Next 16 호환·배포 편의 최고, DB는 Supabase 창고).

---

## 고객 확정 필요 (값 대기)

- [ ] 법인 정식 명칭
- [ ] 개인정보 보호책임자 이름 · 이메일 · 전화
- [ ] 히어로 슬라이드별 실제 이미지/문구 (다중 슬라이드 여부)
- [ ] OG 대표 이미지
- [ ] 영문 번역 콘텐츠

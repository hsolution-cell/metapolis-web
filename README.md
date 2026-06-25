# METAPOLIS Web (Next.js)

메타폴리스 공식 홈페이지 Next.js 마이그레이션 프로젝트입니다.

## 기술 스택

- Next.js App Router + TypeScript
- 기존 정적 사이트 CSS 그대로 사용 (`styles/`)
- Swiper (메인 Hero 슬라이더)
- 정적 데이터 (`data/*.ts`) — DB 없음

## 개발

```bash
cd metapolis-web
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 빌드

```bash
npm run build
npm start
```

## URL 구조

| 기존 HTML | 신규 URL |
|-----------|----------|
| index.html | `/` |
| menu1_1~1_4 | `/about`, `/hours`, `/location`, `/parking` |
| menu2_1~2_4 | `/stores`, `/stores/floors`, `/stores/categories`, `/stores/facilities` |
| menu3_1~3_3 | `/events`, `/events/stores`, `/events/winners` |
| menu4_1~4_3 | `/support/faq`, `/support/inquiry`, `/support/notices` |
| site1~3 | `/privacy`, `/terms`, `/sitemap` |
| preview.html | `/preview` |

기존 `menu*.html` URL은 `next.config.ts` redirects로 신규 URL로 301 리다이렉트됩니다.

## 서브페이지 시안 이미지

상세 페이지는 통이미지 mockup으로 표시됩니다. 시안 PNG를 아래 경로에 추가하세요:

```
public/img/sub/menu1_1.png
public/img/sub/menu1_2.png
...
public/img/sub/menu4_3.png
```

전체 페이지 목록은 `/preview`에서 확인할 수 있습니다.

## Vercel 배포

1. GitHub 저장소에 `metapolis-web` 푸시
2. [Vercel](https://vercel.com)에서 New Project → 해당 저장소 Import
3. Root Directory: `metapolis-web` (모노레포인 경우)
4. Framework Preset: Next.js (자동 감지)
5. Deploy

환경 변수 (선택):

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | sitemap.xml용 사이트 URL (예: `https://metapolis.co.kr`) |

## 프로젝트 구조

```
metapolis-web/
├── app/              # App Router 페이지
├── components/       # React 컴포넌트
├── contexts/         # Toast 등 Context
├── data/             # 정적 데이터 (navigation, FAQ, 매장 등)
├── hooks/            # useHeaderMenu 등
├── public/img/       # 이미지 에셋
└── styles/           # 기존 CSS
```

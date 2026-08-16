# ChessStep

한국어·영어로 컴퓨터와 체스를 두고, 초급·중급·고급 코스를 학습하는 **완전 정적 웹사이트 프로젝트**입니다. 데이터베이스와 외부 체스 API 없이 브라우저에서 대국이 실행되며, Render Static Site에 바로 배포할 수 있습니다. Kakao AdFit은 환경변수로 켠 경우 공개 콘텐츠 페이지에서 페이지당 한 개만 로드됩니다.

## 핵심 기능

- 초급·중급·고급 3단계 컴퓨터 대국
- 백·흑·무작위 진영 선택
- 합법 수 표시, 체크·체크메이트·스테일메이트 판정
- 캐슬링, 앙파상, 폰 승격, 50수 규칙, 3회 반복, 기물 부족 무승부
- 되돌리기, 힌트, 수 목록, 잡은 기물, FEN 복사
- 초급·중급·고급 각 6개, 총 18개 학습 레슨
- 규칙·전술·오프닝·엔드게임 독립 가이드
- 한국어 12개 + 영어 12개, 총 24개 정적 HTML URL
- 모바일·태블릿·PC 반응형 UI
- 레슨 완료 상태와 대국 설정을 브라우저 `localStorage`에 저장
- Google Search Console 및 네이버 서치어드바이저용 SEO 구성
- Render Blueprint(`render.yaml`) 포함

## 기술 선택

이 프로젝트는 런타임 프레임워크 대신 다음의 단순한 정적 구성을 사용합니다.

- **빌드:** Node.js 20 이상 + 자체 정적 사이트 생성 스크립트
- **화면:** 시맨틱 HTML, CSS, Vanilla JavaScript ES Modules
- **체스:** 자체 합법 수 엔진 + Web Worker 기반 미니맥스/알파베타 AI
- **배포:** Render Static Site
- **의존성:** 0개

검색용 본문과 메타데이터는 빌드 시 HTML에 모두 들어갑니다. 체스판과 AI만 브라우저에서 실행되므로 서버 비용, 런타임 장애 지점, 자바스크립트 렌더링 의존성을 줄였습니다.

## 빠른 실행

필요 환경:

- Node.js 20 이상
- npm 10 이상 권장

```bash
npm ci
cp .env.example .env
npm run check
npm run dev
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다.

주요 명령:

```bash
npm run dev       # dist가 없으면 빌드한 뒤 로컬 미리보기
npm run build     # dist 정적 파일 생성
npm run test      # 체스 엔진과 AI 자동 테스트
npm run seo:check # 메타데이터·내부 링크·사이트맵 검사
npm run adfit:check # 광고 런타임 선택·1회 삽입 검사
npm run check     # 테스트 → 빌드 → SEO → AdFit 검사 전체 실행
```

## 환경변수

`.env.example`을 `.env`로 복사해 사용합니다. `.env`는 Git에 포함되지 않습니다.

```dotenv
SITE_URL=https://www.gameonchess.com
GOOGLE_SITE_VERIFICATION=
NAVER_SITE_VERIFICATION=
GA_MEASUREMENT_ID=

# Kakao AdFit
ADFIT_ENABLED=false
ADFIT_ENABLE_KO=true
ADFIT_ENABLE_EN=true
ADFIT_PLAY_DESKTOP_STICKY=true
ADFIT_LANDING_DESKTOP_728X90=
ADFIT_LANDING_MOBILE_320X100=
ADFIT_CONTENT_DESKTOP_300X250=
ADFIT_CONTENT_TABLET_728X90=
ADFIT_CONTENT_MOBILE_320X100=
ADFIT_PLAY_DESKTOP_160X600=
ADFIT_PLAY_TABLET_728X90=
ADFIT_PLAY_MOBILE_320X50=
```

| 변수 | 필수 여부 | 설명 |
|---|---:|---|
| `SITE_URL` | 배포 시 필수 | canonical, hreflang, Open Graph, JSON-LD, robots.txt, sitemap.xml에 사용할 실제 공개 주소입니다. 마지막 `/`는 있어도 됩니다. |
| `GOOGLE_SITE_VERIFICATION` | 선택 | Search Console HTML 태그 인증에서 `content` 값만 입력합니다. |
| `NAVER_SITE_VERIFICATION` | 선택 | 네이버 사이트 소유확인 메타 태그의 `content` 값만 입력합니다. |
| `GA_MEASUREMENT_ID` | 선택 | `G-XXXXXXXXXX` 형식. 비워 두면 분석 스크립트를 전혀 삽입하지 않습니다. |
| `ADFIT_ENABLED` | 선택 | `true`일 때 홈·대국·학습·가이드·소개 페이지에 Kakao AdFit 설정을 출력합니다. 기본값은 `false`입니다. |
| `ADFIT_ENABLE_KO` | 선택 | `true`일 때 한국어 공개 콘텐츠 페이지에 광고를 허용합니다. 기본값은 `true`입니다. |
| `ADFIT_ENABLE_EN` | 선택 | `true`일 때 영어 공개 콘텐츠 페이지에 광고를 허용합니다. 기본값은 `true`입니다. |
| `ADFIT_PLAY_DESKTOP_STICKY` | 선택 | 대국 페이지 데스크톱 160×600 레일의 sticky 동작을 제어합니다. 기본값은 `true`입니다. |
| `ADFIT_LANDING_DESKTOP_728X90` | 선택 | 홈·학습 목록·소개 페이지 데스크톱 인라인 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |
| `ADFIT_LANDING_MOBILE_320X100` | 선택 | 홈·학습 목록·소개 페이지 모바일 인라인 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |
| `ADFIT_CONTENT_DESKTOP_300X250` | 선택 | 세부 코스·가이드 페이지 데스크톱 목차 레일 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |
| `ADFIT_CONTENT_TABLET_728X90` | 선택 | 세부 코스·가이드 페이지 태블릿 인라인 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |
| `ADFIT_CONTENT_MOBILE_320X100` | 선택 | 세부 코스·가이드 페이지 모바일 인라인 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |
| `ADFIT_PLAY_DESKTOP_160X600` | 선택 | 대국 페이지 데스크톱 우측 레일 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |
| `ADFIT_PLAY_TABLET_728X90` | 선택 | 대국 페이지 태블릿 인라인 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |
| `ADFIT_PLAY_MOBILE_320X50` | 선택 | 대국 페이지 모바일 인라인 광고단위 ID입니다. 실제 ID는 저장소에 넣지 않습니다. |

**중요:** 커스텀 도메인을 연결했다면 `SITE_URL`을 `onrender.com` 주소가 아니라 최종 대표 도메인으로 바꾸고 다시 배포해야 합니다.

## Render 배포

### 방법 A: Blueprint로 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. Render 대시보드에서 **New → Blueprint**를 선택합니다.
3. 저장소를 연결하면 루트의 `render.yaml`을 읽어 Static Site를 만듭니다.
4. 서비스 환경변수에서 `SITE_URL`을 실제 Render URL 또는 커스텀 도메인으로 수정합니다.
5. 필요한 경우 Google·네이버 인증값과 Kakao AdFit 광고단위 ID를 입력한 뒤 재배포합니다.

Blueprint 기본값:

- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Runtime: `static`

### 방법 B: Static Site를 직접 생성

1. Render에서 **New → Static Site**를 선택합니다.
2. GitHub 저장소를 연결합니다.
3. Build Command에 `npm ci && npm run build`를 입력합니다.
4. Publish Directory에 `dist`를 입력합니다.
5. 환경변수를 등록하고 배포합니다.

## Google Search Console 등록

권장 순서:

1. 최종 도메인의 **도메인 속성** 또는 URL 접두어 속성을 만듭니다.
2. 도메인 속성은 DNS TXT 레코드로 인증합니다.
3. URL 접두어 속성에서 HTML 태그 방식을 쓸 경우 메타 태그 전체가 아니라 `content="..."` 안의 값만 `GOOGLE_SITE_VERIFICATION`에 넣습니다.
4. Render에서 재배포합니다.
5. Search Console의 Sitemaps 메뉴에 `sitemap.xml`을 제출합니다.
6. URL 검사에서 `/`, `/play/`, `/learn/beginner/`, `/en/`, `/en/play/` 등 핵심 페이지를 먼저 확인합니다.
7. 실제 선택된 canonical과 색인 상태를 점검합니다.

## 네이버 서치어드바이저 등록

1. 최종 대표 도메인을 사이트로 등록합니다.
2. HTML 태그 인증을 선택했다면 `content` 값만 `NAVER_SITE_VERIFICATION`에 넣습니다.
3. 재배포 후 소유확인을 완료합니다.
4. 요청 → 사이트맵 제출에서 `sitemap.xml`을 등록합니다.
5. 검증 → robots.txt에서 수집 허용과 사이트맵 주소를 확인합니다.
6. 요청 → 웹 페이지 수집에서 한국어 핵심 URL부터 제한적으로 요청합니다.
7. 리포트에서 색인·수집·콘텐츠 품질 문제를 추적합니다.

자세한 배포 전후 점검표는 [`SEO_CHECKLIST.md`](./SEO_CHECKLIST.md)를 참고하세요.

## URL 구조

한국어를 루트 기본 언어로, 영어를 `/en/` 하위에 배치했습니다.

| 페이지 | 한국어 | 영어 |
|---|---|---|
| 홈 | `/` | `/en/` |
| 컴퓨터 대국 | `/play/` | `/en/play/` |
| 코스 허브 | `/learn/` | `/en/learn/` |
| 초급 | `/learn/beginner/` | `/en/learn/beginner/` |
| 중급 | `/learn/intermediate/` | `/en/learn/intermediate/` |
| 고급 | `/learn/advanced/` | `/en/learn/advanced/` |
| 규칙 | `/rules/` | `/en/rules/` |
| 전술 | `/tactics/` | `/en/tactics/` |
| 오프닝 | `/openings/` | `/en/openings/` |
| 엔드게임 | `/endgames/` | `/en/endgames/` |
| 소개 | `/about/` | `/en/about/` |
| 개인정보처리방침 | `/privacy/` | `/en/privacy/` |

`/ko/`로 들어오는 주소는 Render에서 한국어 루트 URL로 301 리디렉션합니다. 한국어와 영어 각 페이지에는 상호 대응하는 `hreflang="ko"`, `hreflang="en"`, `hreflang="x-default"`가 들어갑니다.

## SEO 구현 내용

모든 색인 대상 페이지에 다음을 빌드 시 생성합니다.

- 고유 `<title>`과 meta description
- 대표 URL canonical
- 양방향 hreflang 및 x-default
- Open Graph와 Twitter Card
- `index,follow` robots 메타
- 한 페이지당 하나의 `<h1>`
- Breadcrumb 구조화 데이터
- WebSite, Organization, WebPage JSON-LD
- 페이지에 따라 Course, ItemList, FAQPage, Article, SoftwareApplication JSON-LD
- 절대 URL 기반 `sitemap.xml`
- 루트 `robots.txt`와 sitemap 선언
- 반응형 1200×630 Open Graph 이미지
- 내부 링크 기반의 크롤링 가능한 정보 구조
- 외부 폰트·이미지·체스 API 요청 없음
- Kakao AdFit과 Google Analytics는 환경변수가 설정된 페이지에서만 선택적으로 로드

`npm run seo:check`는 24개 HTML의 기본 SEO 태그, hreflang, JSON-LD, 내부 링크, 사이트맵 URL 수, AdFit 설정 루트와 스크립트 출력 조건을 자동 검사합니다. `npm run adfit:check`는 7개 뷰포트에서 광고 규격 선택과 페이지당 `<ins>` 1개 제한을 검사합니다.


## 콘텐츠 수정

| 수정 목적 | 파일 |
|---|---|
| 사이트명·기본 URL·경로 | `src/content/site.mjs` |
| 홈·공통 UI·코스 카드 | `src/content/content.mjs` |
| 18개 레슨 본문 | `src/content/courses.mjs` |
| 대국 안내·규칙·전술·오프닝·엔드게임·소개 | `src/content/guides.mjs` |
| 전체 레이아웃·SEO 생성 | `scripts/build.mjs` |
| 디자인 | `src/assets/styles.css` |
| 체스 규칙 엔진 | `src/assets/chess-engine.js` |
| AI 평가·탐색 | `src/assets/chess-ai.js` |
| 대국 화면 동작 | `src/assets/game.js` |

콘텐츠를 바꾼 뒤 반드시 실행합니다.

```bash
npm run check
```

## 체스 AI의 동작

- **초급:** 1수 평가에 무작위성을 섞어 실수할 여지를 둡니다.
- **중급:** 기본 평가 함수와 알파베타 탐색을 사용해 짧은 전술을 계산합니다.
- **고급:** 제한 시간 안에서 반복 심화 탐색을 수행합니다.
- **힌트:** 현재 포지션을 별도 탐색해 추천 UCI 수를 강조합니다.
- **Web Worker:** 계산 중 화면이 멈추지 않도록 AI 탐색을 별도 스레드에서 실행합니다.

전용 고성능 체스 엔진의 Elo를 흉내 내는 목적이 아니라, 초·중급 학습자가 단계별로 연습하는 상대를 목표로 합니다. 기기 성능과 포지션 복잡도에 따라 실제 탐색 깊이는 달라질 수 있습니다.

## 자동 테스트

`tests/engine.test.mjs`에서 다음을 검증합니다.

- 초기 포지션 합법 수와 표준 perft 20·400·8,902
- 일반 이동, SAN, 되돌리기
- 체크메이트와 스테일메이트
- 캐슬링 및 공격받는 칸 통과 금지
- 앙파상과 폰 승격
- 기물 부족 및 3회 반복 무승부
- 세 난이도 AI가 합법 수를 반환하고 원래 포지션을 복구하는지

## 개인정보와 운영

- 기본 상태에서는 서버, 데이터베이스, 로그인, 광고, 분석 도구를 사용하지 않습니다.
- 레슨 진행률과 대국 설정은 사용자의 브라우저에만 저장됩니다.
- `GA_MEASUREMENT_ID`를 설정하면 Google Analytics 스크립트가 삽입되므로 실제 서비스의 개인정보처리방침과 동의 요구사항을 별도로 검토해야 합니다.
- `ADFIT_ENABLED=true`와 광고단위 ID를 설정하면 홈·대국·학습·가이드·소개 페이지에서 Kakao AdFit 스크립트가 페이지당 한 번만 로드됩니다. 실제 서비스에서는 `/privacy/`와 `/en/privacy/`의 TODO 항목을 운영 정보에 맞게 확정해야 합니다.

## 프로젝트 구조

```text
chessstep-static/
├─ public/                    # 아이콘, OG 이미지, webmanifest
├─ scripts/
│  ├─ build.mjs              # 24개 정적 페이지와 SEO 파일 생성
│  ├─ dev-server.mjs         # 로컬 정적 서버
│  ├─ adfit-check.mjs        # AdFit 런타임 선택 검사
│  └─ seo-check.mjs          # SEO 자동 검사
├─ src/
│  ├─ assets/                # CSS, 체스 엔진, AI, 대국 UI
│  └─ content/               # 한국어·영어 콘텐츠와 URL 설정
├─ tests/engine.test.mjs     # 규칙·AI 테스트
├─ .env.example
├─ render.yaml
├─ package.json
└─ SEO_CHECKLIST.md
```

## 라이선스

MIT License

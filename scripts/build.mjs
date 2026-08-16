import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { Chess, PIECE_SYMBOLS, colorOf } from '../src/assets/chess-engine.js';
import { SITE, ROUTES, route } from '../src/content/site.mjs';
import { UI, HOME, COURSE_SUMMARIES } from '../src/content/content.mjs';
import { COURSES } from '../src/content/courses.mjs';
import { PLAY, LEARN, GUIDES, ABOUT, PRIVACY } from '../src/content/guides.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const buildDate = new Date().toISOString().slice(0, 10);

async function loadEnvFile(filename) {
  const target = path.join(root, filename);
  if (!existsSync(target)) return;
  const raw = await readFile(target, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

await loadEnvFile('.env');
await loadEnvFile('.env.local');

const siteUrl = (process.env.SITE_URL || SITE.defaultUrl).replace(/\/+$/, '');
const googleVerification = (process.env.GOOGLE_SITE_VERIFICATION || '').trim();
const naverVerification = (process.env.NAVER_SITE_VERIFICATION || '').trim();
const gaMeasurementId = (process.env.GA_MEASUREMENT_ID || '').trim();

function envBool(name, fallback = false) {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  return String(raw).trim().toLowerCase() === 'true';
}

const ADFIT_PAGE_GROUPS = {
  landing: new Set(['home', 'learn', 'about']),
  play: new Set(['play']),
  content: new Set([
    'beginner',
    'intermediate',
    'advanced',
    'rules',
    'tactics',
    'openings',
    'endgames'
  ]),
  excluded: new Set(['privacy', '404'])
};

const adfit = {
  enabled: envBool('ADFIT_ENABLED', false),
  enableKo: envBool('ADFIT_ENABLE_KO', true),
  enableEn: envBool('ADFIT_ENABLE_EN', true),
  playDesktopSticky: envBool('ADFIT_PLAY_DESKTOP_STICKY', true),
  units: {
    landingDesktop: (process.env.ADFIT_LANDING_DESKTOP_728X90 || '').trim(),
    landingMobile: (process.env.ADFIT_LANDING_MOBILE_320X100 || '').trim(),
    contentDesktop: (process.env.ADFIT_CONTENT_DESKTOP_300X250 || '').trim(),
    contentTablet: (process.env.ADFIT_CONTENT_TABLET_728X90 || '').trim(),
    contentMobile: (process.env.ADFIT_CONTENT_MOBILE_320X100 || '').trim(),
    playDesktop: (process.env.ADFIT_PLAY_DESKTOP_160X600 || '').trim(),
    playTablet: (process.env.ADFIT_PLAY_TABLET_728X90 || '').trim(),
    playMobile: (process.env.ADFIT_PLAY_MOBILE_320X50 || '').trim()
  }
};

function isAdfitLanguageEnabled(lang) {
  if (!adfit.enabled) return false;
  if (lang === 'ko') return adfit.enableKo;
  if (lang === 'en') return adfit.enableEn;
  return false;
}

function getAdfitPageGroup(pageKey) {
  for (const [group, keys] of Object.entries(ADFIT_PAGE_GROUPS)) {
    if (keys.has(pageKey)) return group;
  }
  return 'excluded';
}

function isAdfitPageEnabled(pageKey, lang) {
  return getAdfitPageGroup(pageKey) !== 'excluded' && isAdfitLanguageEnabled(lang);
}

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function absolute(urlPath) {
  return `${siteUrl}${urlPath === '/' ? '/' : urlPath}`;
}

function jsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function renderAdfitConfig(pageKey, lang) {
  const group = getAdfitPageGroup(pageKey);
  if (group === 'excluded' || !isAdfitLanguageEnabled(lang)) return '';
  const adLabel = lang === 'ko' ? '광고' : 'Advertisement';
  const attributes = [
    'class="adfit-config"',
    'data-adfit-root',
    `data-adfit-page-group="${esc(group)}"`,
    `data-adfit-label="${esc(adLabel)}"`,
    `data-adfit-landing-desktop-unit="${esc(adfit.units.landingDesktop)}"`,
    `data-adfit-landing-mobile-unit="${esc(adfit.units.landingMobile)}"`,
    `data-adfit-content-desktop-unit="${esc(adfit.units.contentDesktop)}"`,
    `data-adfit-content-tablet-unit="${esc(adfit.units.contentTablet)}"`,
    `data-adfit-content-mobile-unit="${esc(adfit.units.contentMobile)}"`,
    `data-adfit-play-desktop-unit="${esc(adfit.units.playDesktop)}"`,
    `data-adfit-play-tablet-unit="${esc(adfit.units.playTablet)}"`,
    `data-adfit-play-mobile-unit="${esc(adfit.units.playMobile)}"`,
    `data-adfit-play-desktop-sticky="${adfit.playDesktopSticky ? 'true' : 'false'}"`
  ];
  return `<div ${attributes.join(' ')}></div>`;
}

function renderAdfitInlineHost(pageKey, lang) {
  if (!isAdfitPageEnabled(pageKey, lang)) return '';
  return '<div class="adfit-inline-host" data-adfit-host="inline"></div>';
}

function renderAdfitRailHost(pageKey, lang) {
  if (!isAdfitPageEnabled(pageKey, lang)) return '';
  return '<div class="adfit-rail-host" data-adfit-host="rail"></div>';
}

function renderAdfitStrip(pageKey, lang) {
  const host = renderAdfitInlineHost(pageKey, lang);
  return host ? `<div class="adfit-strip">${host}</div>` : '';
}

function pageScripts(pageKey, lang, scripts = []) {
  if (isAdfitPageEnabled(pageKey, lang)) scripts.push('/assets/adfit.js');
  return scripts;
}

const TEMPLATE_LABELS = {
  ko: {
    navAria: '주요 메뉴',
    menu: '메뉴',
    language: '언어',
    breadcrumb: '이동 경로',
    ogImageAlt: 'ChessStep 체스 학습 사이트 미리보기',
    developedPosition: '전개가 완료된 체스 포지션',
    practiceLoop: '연습 흐름',
    courses: '코스',
    playChess: '컴퓨터 대국',
    aiLevels: 'AI 난이도',
    howToPractice: '연습 방법',
    learningRoadmap: '학습 로드맵',
    selfCheck: '자가 진단',
    chessGuide: '체스 가이드',
    about: '소개',
    promotion: { q: '퀸', r: '룩', b: '비숍', n: '나이트' }
  },
  en: {
    navAria: 'Primary navigation',
    menu: 'Menu',
    language: 'Language',
    breadcrumb: 'Breadcrumb',
    ogImageAlt: 'ChessStep chess learning website preview',
    developedPosition: 'Developed chess position',
    practiceLoop: 'Practice loop',
    courses: 'Courses',
    playChess: 'Play chess',
    aiLevels: 'AI levels',
    howToPractice: 'How to practice',
    learningRoadmap: 'Learning roadmap',
    selfCheck: 'Self-check',
    chessGuide: 'Chess guide',
    about: 'About',
    promotion: { q: 'Queen', r: 'Rook', b: 'Bishop', n: 'Knight' }
  }
};

function label(lang, key) {
  return TEMPLATE_LABELS[lang][key];
}

function courseEyebrow(level, lang) {
  return lang === 'ko' ? `${level} 코스` : `${level} course`;
}

function navGroup(pageKey) {
  if (['beginner', 'intermediate', 'advanced'].includes(pageKey)) return 'learn';
  return pageKey;
}

function breadcrumbs(pageKey, lang, title) {
  const ui = UI[lang];
  const crumbs = [{ name: ui.breadcrumbHome, key: 'home' }];
  if (['beginner', 'intermediate', 'advanced'].includes(pageKey)) {
    crumbs.push({ name: ui.nav.learn, key: 'learn' });
  }
  if (pageKey !== 'home') crumbs.push({ name: title, key: pageKey });
  return crumbs;
}

function breadcrumbSchema(items, lang) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(route(item.key, lang))
    }))
  };
}

function faqSchema(faq = []) {
  if (!faq.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
}

function baseGraph({ lang, pageKey, title, description, breadcrumbItems, extra = [] }) {
  const pageUrl = absolute(route(pageKey, lang));
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: SITE.name,
      url: `${siteUrl}/`,
      logo: {
        '@type': 'ImageObject',
        url: absolute('/icon-512.png'),
        width: 512,
        height: 512
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: SITE.name,
      url: `${siteUrl}/`,
      inLanguage: ['ko', 'en'],
      publisher: { '@id': `${siteUrl}/#organization` }
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      dateModified: buildDate
    }
  ];
  if (breadcrumbItems?.length > 1) graph.push(breadcrumbSchema(breadcrumbItems, lang));
  for (const item of extra.filter(Boolean)) graph.push(item);
  return { '@context': 'https://schema.org', '@graph': graph };
}

function head({ lang, pageKey, title, description, breadcrumbItems, extraSchema = [], pageType = 'website', scripts = [] }) {
  const ui = UI[lang];
  const ogImageAlt = label(lang, 'ogImageAlt');
  const canonical = absolute(route(pageKey, lang));
  const koUrl = absolute(ROUTES[pageKey].ko);
  const enUrl = absolute(ROUTES[pageKey].en);
  const ogImage = absolute('/og-default.png');
  const graph = baseGraph({ lang, pageKey, title, description, breadcrumbItems, extra: extraSchema });
  const verificationTags = [
    googleVerification ? `<meta name="google-site-verification" content="${esc(googleVerification)}">` : '',
    naverVerification ? `<meta name="naver-site-verification" content="${esc(naverVerification)}">` : ''
  ].filter(Boolean).join('\n    ');
  const analytics = gaMeasurementId ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(gaMeasurementId)}',{anonymize_ip:true});</script>` : '';
  const moduleScripts = scripts.map((src) => `<script type="module" src="${src}"></script>`).join('\n    ');

  return `<!doctype html>
<html lang="${ui.htmlLang}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
    <meta name="author" content="${esc(SITE.name)}">
    <meta name="theme-color" content="${SITE.themeColor}">
    ${verificationTags}
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="ko" href="${koUrl}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="x-default" href="${koUrl}">
    <link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)} RSS" href="${absolute('/rss.xml')}">
    <meta property="og:type" content="${pageType}">
    <meta property="og:site_name" content="${esc(SITE.name)}">
    <meta property="og:locale" content="${SITE.locale[lang]}">
    <meta property="og:locale:alternate" content="${SITE.locale[lang === 'ko' ? 'en' : 'ko']}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${esc(ogImageAlt)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:image:alt" content="${esc(ogImageAlt)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon-64.png" type="image/png" sizes="64x64">
    <link rel="apple-touch-icon" href="/icon-192.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="stylesheet" href="/assets/styles.css">
    <script type="application/ld+json">${jsonLd(graph)}</script>${analytics}
    ${moduleScripts}
</head>`;
}

function renderHeader(lang, pageKey) {
  const ui = UI[lang];
  const labels = TEMPLATE_LABELS[lang];
  const current = navGroup(pageKey);
  const other = lang === 'ko' ? 'en' : 'ko';
  const navItems = [
    ['home', ui.nav.home], ['play', ui.nav.play], ['learn', ui.nav.learn], ['rules', ui.nav.rules],
    ['tactics', ui.nav.tactics], ['openings', ui.nav.openings], ['about', ui.nav.about]
  ];
  return `<body>
<a class="skip-link" href="#main">${esc(ui.skip)}</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${route('home', lang)}" aria-label="${esc(SITE.name)}">
      <span class="brand-mark" aria-hidden="true">♞</span>
      <span class="brand-word">${esc(SITE.name)}<small>${esc(ui.brandTagline)}</small></span>
    </a>
    <button class="nav-toggle" type="button" aria-controls="site-navigation" aria-expanded="false" data-nav-toggle><span></span><span class="sr-only">${esc(labels.menu)}</span></button>
    <nav class="site-nav" id="site-navigation" aria-label="${esc(labels.navAria)}" data-nav-menu>
      ${navItems.map(([key, label]) => `<a class="${key === 'play' ? 'nav-play' : ''}" href="${route(key, lang)}"${current === key ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('')}
      <span class="lang-switch" aria-label="${esc(labels.language)}">
        <a href="${ROUTES[pageKey][lang]}" lang="${lang}" aria-current="page">${lang === 'ko' ? 'KO' : 'EN'}</a>
        <a href="${ROUTES[pageKey][other]}" lang="${other}" hreflang="${other}">${other === 'ko' ? 'KO' : 'EN'}</a>
      </span>
    </nav>
  </div>
</header>`;
}

function renderFooter(lang) {
  const ui = UI[lang];
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${route('home', lang)}"><span class="brand-mark" aria-hidden="true">♞</span><span class="brand-word">${SITE.name}</span></a>
        <p>${esc(ui.footerIntro)}</p>
      </div>
      <div class="footer-links"><strong>${esc(ui.footerLearn)}</strong>
        <a href="${route('beginner', lang)}">${lang === 'ko' ? '초급 코스' : 'Beginner course'}</a>
        <a href="${route('intermediate', lang)}">${lang === 'ko' ? '중급 코스' : 'Intermediate course'}</a>
        <a href="${route('advanced', lang)}">${lang === 'ko' ? '고급 코스' : 'Advanced course'}</a>
      </div>
      <div class="footer-links"><strong>${esc(ui.footerPractice)}</strong>
        <a href="${route('play', lang)}">${esc(ui.nav.play)}</a>
        <a href="${route('tactics', lang)}">${esc(ui.nav.tactics)}</a>
        <a href="${route('endgames', lang)}">${lang === 'ko' ? '엔드게임' : 'Endgames'}</a>
      </div>
      <div class="footer-links"><strong>${esc(ui.footerInfo)}</strong>
        <a href="${route('rules', lang)}">${esc(ui.nav.rules)}</a>
        <a href="${route('openings', lang)}">${esc(ui.nav.openings)}</a>
        <a href="${route('about', lang)}">${esc(ui.nav.about)}</a>
        <a href="${route('privacy', lang)}">${lang === 'ko' ? '개인정보처리방침' : 'Privacy'}</a>
      </div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} ${SITE.name}. ${esc(ui.copyright)}</span><span>${esc(ui.updated)}: ${buildDate}</span></div>
  </div>
</footer>
<script type="module" src="/assets/site.js"></script>
</body>
</html>`;
}

function renderBreadcrumbs(items, lang) {
  return `<nav class="breadcrumbs" aria-label="${esc(label(lang, 'breadcrumb'))}">${items.map((item, index) => {
    const isLast = index === items.length - 1;
    return `${index ? '<span class="separator" aria-hidden="true">/</span>' : ''}${isLast ? `<span aria-current="page">${esc(item.name)}</span>` : `<a href="${route(item.key, lang)}">${esc(item.name)}</a>`}`;
  }).join('')}</nav>`;
}

function renderBoard(fen, label = 'Chess position', compact = false) {
  const game = new Chess(fen);
  return `<div class="${compact ? 'mini-board' : 'diagram-board'}" role="img" aria-label="${esc(label)}">${game.board.map((piece, index) => {
    const squareClass = (Math.floor(index / 8) + index % 8) % 2 === 0 ? 'light' : 'dark';
    const pieceHtml = piece ? `<span class="${colorOf(piece) === 'w' ? 'white-piece' : 'black-piece'}" aria-hidden="true">${PIECE_SYMBOLS[piece]}</span>` : '';
    return `<span class="${compact ? 'mini-board-square' : 'diagram-square'} ${squareClass}">${pieceHtml}</span>`;
  }).join('')}</div>`;
}

function renderFaq(faq, lang) {
  if (!faq?.length) return '';
  return `<section id="faq" class="section"><div class="narrow"><div class="section-heading"><div><span class="eyebrow">FAQ</span><h2>${esc(UI[lang].faq)}</h2></div></div><div class="faq-list">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>`;
}

function renderCourseCards(lang) {
  const ui = UI[lang];
  return `<div class="card-grid">${COURSE_SUMMARIES[lang].map((course) => `<article class="card course-card" data-level="${course.key}">
    <div class="course-meta"><span class="pill">${esc(course.level)}</span><span class="pill">${esc(course.duration)}</span><span class="pill">${course.lessonCount} ${esc(ui.lessons)}</span></div>
    <h3>${esc(course.title)}</h3><p>${esc(course.description)}</p>
    <ul class="check-list">${course.topics.map((topic) => `<li>${esc(topic)}</li>`).join('')}</ul>
    <a class="button button-secondary" href="${route(course.key, lang)}">${esc(ui.learnNow)}</a>
  </article>`).join('')}</div>`;
}

function renderHome(lang) {
  const c = HOME[lang];
  const ui = UI[lang];
  const labels = TEMPLATE_LABELS[lang];
  const crumbs = breadcrumbs('home', lang, c.metaTitle);
  const courseListSchema = {
    '@type': 'ItemList',
    name: lang === 'ko' ? 'ChessStep 체스 코스' : 'ChessStep chess courses',
    itemListElement: COURSE_SUMMARIES[lang].map((course, index) => ({
      '@type': 'ListItem', position: index + 1,
      item: {
        '@type': 'Course', name: course.title, description: course.description,
        url: absolute(route(course.key, lang)), inLanguage: lang,
        provider: { '@id': `${siteUrl}/#organization` }
      }
    }))
  };
  const faq = faqSchema(c.faq);
  return `${head({ lang, pageKey: 'home', title: c.metaTitle, description: c.metaDescription, breadcrumbItems: crumbs, extraSchema: [courseListSchema, faq], scripts: pageScripts('home', lang) })}
${renderHeader(lang, 'home')}
<main id="main">
  ${renderAdfitConfig('home', lang)}
  <section class="hero"><div class="container hero-grid">
    <div><span class="eyebrow">${esc(c.eyebrow)}</span><h1>${c.h1}</h1><p class="hero-lead">${esc(c.lead)}</p>
      <div class="action-row"><a class="button" href="${route('play', lang)}">${esc(c.primary)} <span aria-hidden="true">→</span></a><a class="button button-secondary" href="${route('beginner', lang)}">${esc(c.secondary)}</a></div>
    </div>
    <div class="hero-board-card">${renderBoard('r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 6 6', labels.developedPosition, true)}<div class="hero-proof">${c.proof.map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}</div></div>
  </div></section>
  ${renderAdfitStrip('home', lang)}
  <section class="section section-soft"><div class="container"><div class="section-heading"><div><span class="eyebrow">${esc(labels.practiceLoop)}</span><h2>${esc(c.benefitsHeading)}</h2><p>${esc(c.benefitsLead)}</p></div></div><div class="card-grid">${c.benefits.map((item) => `<article class="card"><span class="card-icon" aria-hidden="true">${item.icon}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="section-heading"><div><span class="eyebrow">${esc(labels.courses)}</span><h2>${esc(c.coursesHeading)}</h2><p>${esc(c.coursesLead)}</p></div><a class="button button-secondary" href="${route('learn', lang)}">${esc(ui.readMore)}</a></div>${renderCourseCards(lang)}</div></section>
  <section class="section section-dark"><div class="container"><div class="stat-grid">${c.stats.map(([value, label]) => `<div class="stat"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}</div></div></section>
  ${renderFaq(c.faq, lang)}
  <section class="section"><div class="container"><div class="cta-panel"><div><h2>${lang === 'ko' ? '첫 수를 직접 두어 보세요' : 'Make your first move'}</h2><p>${lang === 'ko' ? '초급 난이도에서 중앙 폰을 전진하고, 두 나이트를 전개한 뒤 캐슬링을 목표로 시작하세요.' : 'Start on beginner, advance a central pawn, develop both knights, and make castling your first goal.'}</p></div><a class="button" href="${route('play', lang)}">${esc(ui.playNow)}</a></div></div></section>
</main>
${renderFooter(lang)}`;
}

function gameApp(lang) {
  const ko = lang === 'ko';
  const promotion = TEMPLATE_LABELS[lang].promotion;
  return `<div class="chess-app" data-chess-app data-locale="${lang}">
    <section class="board-panel" aria-label="${ko ? '체스 대국판' : 'Chess game board'}"><div class="chess-board" data-board></div><noscript>${ko ? '체스판을 사용하려면 JavaScript를 켜주세요.' : 'Enable JavaScript to use the interactive board.'}</noscript></section>
    <aside class="game-sidebar">
      <div class="game-card game-status" aria-live="polite"><strong data-status>${ko ? '대국을 준비합니다…' : 'Preparing the game…'}</strong><small data-status-detail></small></div>
      <div class="game-card"><div class="control-grid">
        <div class="field"><label for="difficulty">${ko ? '컴퓨터 난이도' : 'Computer level'}</label><select id="difficulty" data-difficulty><option value="beginner">${ko ? '초급' : 'Beginner'}</option><option value="intermediate" selected>${ko ? '중급' : 'Intermediate'}</option><option value="advanced">${ko ? '고급' : 'Advanced'}</option></select></div>
        <div class="field"><label for="side">${ko ? '내 진영' : 'Your side'}</label><select id="side" data-side><option value="white">${ko ? '백' : 'White'}</option><option value="black">${ko ? '흑' : 'Black'}</option><option value="random">${ko ? '무작위' : 'Random'}</option></select></div>
      </div><div class="game-actions"><button class="button" type="button" data-new-game>${ko ? '새 대국' : 'New game'}</button><button class="button button-secondary" type="button" data-undo>${ko ? '되돌리기' : 'Undo'}</button><button class="button button-secondary" type="button" data-hint>${ko ? '힌트' : 'Hint'}</button></div></div>
      <div class="game-card"><h2>${ko ? '잡은 기물' : 'Captured pieces'}</h2><div class="captured-grid"><div><small>${ko ? '내가 잡음' : 'Captured by you'}</small><div class="captured-pieces" data-captured-white>—</div></div><div><small>${ko ? '컴퓨터가 잡음' : 'Captured by computer'}</small><div class="captured-pieces" data-captured-black>—</div></div></div></div>
      <div class="game-card move-log"><h2>${ko ? '수 목록' : 'Move list'}</h2><div data-move-list></div></div>
    </aside>
    <dialog class="promotion-dialog" data-promotion-dialog><h2>${ko ? '승격 기물 선택' : 'Choose promotion'}</h2><div class="promotion-options"><button type="button" data-promotion="q" aria-label="${esc(promotion.q)}">♕</button><button type="button" data-promotion="r" aria-label="${esc(promotion.r)}">♖</button><button type="button" data-promotion="b" aria-label="${esc(promotion.b)}">♗</button><button type="button" data-promotion="n" aria-label="${esc(promotion.n)}">♘</button></div></dialog>
    <div class="toast" data-toast hidden role="status"></div>
  </div>`;
}

function renderPlay(lang) {
  const c = PLAY[lang];
  const ui = UI[lang];
  const labels = TEMPLATE_LABELS[lang];
  const crumbs = breadcrumbs('play', lang, c.title);
  const adfitActive = isAdfitPageEnabled('play', lang);
  const hasDesktopRail = adfitActive && Boolean(adfit.units.playDesktop);
  const appSchema = {
    '@type': 'SoftwareApplication', name: c.title, applicationCategory: 'GameApplication', operatingSystem: 'Web',
    url: absolute(route('play', lang)), inLanguage: lang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: lang === 'ko' ? 'KRW' : 'USD' }
  };
  return `${head({ lang, pageKey: 'play', title: c.metaTitle, description: c.metaDescription, breadcrumbItems: crumbs, extraSchema: [appSchema, faqSchema(c.faq)], scripts: pageScripts('play', lang, ['/assets/game.js']) })}
${renderHeader(lang, 'play')}
<main id="main">
<div class="play-monetized-shell${adfitActive ? ' has-adfit' : ''}"${adfitActive ? ` data-adfit-has-rail="${hasDesktopRail ? 'true' : 'false'}"` : ''}>
  ${renderAdfitConfig('play', lang)}
  <div class="play-monetized-grid">
    <div class="play-primary">
      <section class="page-hero page-hero--play"><div class="play-inner">${renderBreadcrumbs(crumbs, lang)}<span class="eyebrow">${esc(labels.playChess)}</span><h1>${esc(c.title)}</h1><p class="page-intro">${esc(c.intro)}</p></div></section>
      ${renderAdfitInlineHost('play', lang)}
      <section class="chess-app-shell"><div class="play-inner">${gameApp(lang)}
  <div class="play-guide"><div class="section-heading"><div><span class="eyebrow">${esc(labels.aiLevels)}</span><h2>${lang === 'ko' ? '난이도 선택 기준' : 'Choose a useful level'}</h2></div></div><div class="play-guide-grid">${c.difficulty.map((item, index) => `<article class="card"><span class="card-icon">${index + 1}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></div>
</div></section>
    </div>
    ${renderAdfitRailHost('play', lang)}
  </div>
</div>
<section class="section section-soft"><div class="narrow"><div class="section-heading"><div><span class="eyebrow">${esc(labels.howToPractice)}</span><h2>${lang === 'ko' ? '대국을 학습으로 바꾸는 4단계' : 'Turn a game into four learning steps'}</h2></div></div><div class="lesson-list">${c.steps.map(([title, text], index) => `<article class="lesson-card"><div class="lesson-head"><span class="lesson-number">${index + 1}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></div></article>`).join('')}</div></div></section>
${renderFaq(c.faq, lang)}
<section class="section"><div class="container"><div class="cta-panel"><div><h2>${lang === 'ko' ? '대국에서 놓친 개념을 바로 보완하세요' : 'Study the skill your game exposed'}</h2><p>${lang === 'ko' ? '기물 손실이 많았다면 초급, 전술을 놓쳤다면 중급, 계획이 막혔다면 고급 코스로 이동하세요.' : 'Choose beginner for loose pieces, intermediate for missed tactics, or advanced for unclear plans.'}</p></div><a class="button" href="${route('learn', lang)}">${esc(ui.learnNow)}</a></div></div></section>
</main>${renderFooter(lang)}`;
}

function renderLearn(lang) {
  const c = LEARN[lang];
  const labels = TEMPLATE_LABELS[lang];
  const crumbs = breadcrumbs('learn', lang, c.title);
  const courseListSchema = {
    '@type': 'ItemList', name: c.title,
    itemListElement: COURSE_SUMMARIES[lang].map((course, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Course', name: course.title, description: course.description, url: absolute(route(course.key, lang)), inLanguage: lang, provider: { '@id': `${siteUrl}/#organization` } } }))
  };
  return `${head({ lang, pageKey: 'learn', title: c.metaTitle, description: c.metaDescription, breadcrumbItems: crumbs, extraSchema: [courseListSchema], scripts: pageScripts('learn', lang) })}
${renderHeader(lang, 'learn')}<main id="main">${renderAdfitConfig('learn', lang)}<section class="page-hero"><div class="container">${renderBreadcrumbs(crumbs, lang)}<span class="eyebrow">${esc(labels.learningRoadmap)}</span><h1>${esc(c.title)}</h1><p class="page-intro">${esc(c.intro)}</p></div></section>
${renderAdfitStrip('learn', lang)}
<section class="section"><div class="container"><div class="lesson-list">${c.path.map(([n, title, text]) => `<article class="lesson-card"><div class="lesson-head"><span class="lesson-number">${n}</span><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></div></article>`).join('')}</div></div></section>
<section class="section section-soft"><div class="container"><div class="section-heading"><div><span class="eyebrow">${esc(labels.courses)}</span><h2>${lang === 'ko' ? '18개 핵심 레슨' : '18 focused lessons'}</h2></div></div>${renderCourseCards(lang)}</div></section>
<section class="section"><div class="container"><div class="section-heading"><div><span class="eyebrow">${esc(labels.selfCheck)}</span><h2>${esc(c.diagnosticTitle)}</h2></div></div><div class="card-grid">${c.diagnostic.map(([title, text]) => `<article class="card"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></div></section>
<section class="section section-dark"><div class="narrow"><h2>${esc(c.methodTitle)}</h2><ol class="check-list">${c.method.map((item) => `<li>${esc(item)}</li>`).join('')}</ol></div></section>
</main>${renderFooter(lang)}`;
}

function renderDiagram(lesson) {
  if (!lesson.fen) return '';
  return `<figure class="diagram-wrap">${renderBoard(lesson.fen, lesson.caption || lesson.title)}<figcaption class="diagram-caption">${esc(lesson.caption || '')}</figcaption></figure>`;
}

function courseSchema(course, lang, key) {
  return {
    '@type': 'Course', name: course.title, description: course.intro, url: absolute(route(key, lang)), inLanguage: lang,
    educationalLevel: course.level, isAccessibleForFree: true,
    provider: { '@id': `${siteUrl}/#organization` },
    teaches: course.outcomes,
    hasPart: course.lessons.map((lesson, index) => ({ '@type': 'LearningResource', position: index + 1, name: lesson.title, description: lesson.summary, timeRequired: `PT${lesson.duration}M` }))
  };
}

function renderCourse(lang, key) {
  const c = COURSES[lang][key];
  const ui = UI[lang];
  const crumbs = breadcrumbs(key, lang, c.title);
  const nextKey = key === 'beginner' ? 'intermediate' : key === 'intermediate' ? 'advanced' : 'play';
  const tocItems = [
    ['outcomes', ui.outcomes], ['curriculum', ui.curriculum], ['routine', ui.routine], ['mistakes', ui.mistakes], ['faq', ui.faq]
  ];
  return `${head({ lang, pageKey: key, title: c.metaTitle, description: c.metaDescription, breadcrumbItems: crumbs, extraSchema: [courseSchema(c, lang, key), faqSchema(c.faq)], pageType: 'article', scripts: pageScripts(key, lang) })}
${renderHeader(lang, key)}<main id="main">${renderAdfitConfig(key, lang)}<section class="page-hero"><div class="container">${renderBreadcrumbs(crumbs, lang)}<span class="eyebrow">${esc(courseEyebrow(c.level, lang))}</span><h1>${esc(c.title)}</h1><p class="page-intro">${esc(c.intro)}</p><div class="course-meta"><span class="pill">${esc(c.duration)}</span><span class="pill">${c.lessonCount} ${esc(ui.lessons)}</span><span class="pill">${esc(ui.free)}</span><span class="pill">${esc(ui.noLogin)}</span></div></div></section>
${renderAdfitStrip(key, lang)}
<section class="section"><div class="container article-layout" data-course-progress="${lang}:${key}"><article class="article-body">
  <section id="outcomes"><h2>${esc(ui.outcomes)}</h2><ul class="check-list">${c.outcomes.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section>
  <div class="progress-panel"><div><strong>${esc(ui.progress)}</strong><small>${esc(ui.localSave)}</small></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-progress-meter></div><span class="progress-label" data-progress-label>0/${c.lessonCount} · 0%</span></div>
  <section id="curriculum"><h2>${esc(ui.curriculum)}</h2><div class="lesson-list">${c.lessons.map((lesson, index) => `<article class="lesson-card"><div class="lesson-head"><span class="lesson-number">${index + 1}</span><div><h3>${esc(lesson.title)}</h3><p>${esc(lesson.summary)} · ${lesson.duration} ${esc(ui.minutes)}</p></div></div>
    ${lesson.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
    ${lesson.bullets?.length ? `<ul class="arrow-list">${lesson.bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}
    ${renderDiagram(lesson)}
    <div class="lesson-support"><div class="callout"><strong>${esc(ui.keyPoint)}</strong>${esc(lesson.keyPoint)}</div>
    <div class="callout callout-warning"><strong>${esc(ui.practice)}</strong>${esc(lesson.practice)}</div></div>
    <label class="lesson-check"><input type="checkbox" value="lesson-${index + 1}" data-lesson-check> ${esc(ui.complete)}</label>
  </article>`).join('')}</div></section>
  <section id="routine"><h2>${esc(ui.routine)}</h2><ol class="check-list">${c.routine.map((item) => `<li>${esc(item)}</li>`).join('')}</ol></section>
  <section id="mistakes"><h2>${esc(ui.mistakes)}</h2><ul class="arrow-list">${c.mistakes.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section>
  <section id="faq"><h2>${esc(ui.faq)}</h2><div class="faq-list">${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></section>
  <div class="action-row"><a class="button button-secondary" href="${route('learn', lang)}">← ${esc(ui.backToCourses)}</a><a class="button" href="${route(nextKey, lang)}">${key === 'advanced' ? esc(ui.playNow) : esc(ui.nextCourse)} →</a></div>
</article><aside class="article-rail"><nav class="toc"><strong>${esc(ui.toc)}</strong><ol>${tocItems.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('')}</ol></nav>${renderAdfitRailHost(key, lang)}</aside></div></section></main>${renderFooter(lang)}`;
}

function articleSchema(c, lang, key) {
  return {
    '@type': 'Article', headline: c.title, description: c.intro, inLanguage: lang,
    mainEntityOfPage: absolute(route(key, lang)), datePublished: '2026-08-14', dateModified: buildDate,
    author: { '@id': `${siteUrl}/#organization` }, publisher: { '@id': `${siteUrl}/#organization` },
    image: absolute('/og-default.png')
  };
}

function renderGuide(lang, key) {
  const c = GUIDES[key][lang];
  const labels = TEMPLATE_LABELS[lang];
  const crumbs = breadcrumbs(key, lang, c.title);
  const toc = c.sections.map((section) => [section.id, section.title]);
  return `${head({ lang, pageKey: key, title: c.metaTitle, description: c.metaDescription, breadcrumbItems: crumbs, extraSchema: [articleSchema(c, lang, key), faqSchema(c.faq)], pageType: 'article', scripts: pageScripts(key, lang) })}
${renderHeader(lang, key)}<main id="main">${renderAdfitConfig(key, lang)}<section class="page-hero"><div class="container">${renderBreadcrumbs(crumbs, lang)}<span class="eyebrow">${esc(labels.chessGuide)}</span><h1>${esc(c.title)}</h1><p class="page-intro">${esc(c.intro)}</p></div></section>
${renderAdfitStrip(key, lang)}
<section class="section"><div class="container article-layout"><article class="article-body">${c.sections.map((section) => `<section id="${esc(section.id)}"><h2>${esc(section.title)}</h2>${section.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}${section.bullets?.length ? `<ul class="arrow-list">${section.bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}${section.fen ? `<figure class="diagram-wrap">${renderBoard(section.fen, section.caption || section.title)}<figcaption class="diagram-caption">${esc(section.caption || '')}</figcaption></figure>` : ''}</section>`).join('')}
<section id="faq"><h2>${esc(UI[lang].faq)}</h2><div class="faq-list">${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></section>
<div class="cta-panel"><div><h2>${lang === 'ko' ? '읽은 내용을 체스판에서 확인하세요' : 'Test the idea on the board'}</h2><p>${lang === 'ko' ? '컴퓨터와 대국하며 오늘 배운 주제를 한 가지 목표로 정해 보세요.' : 'Play the computer with one lesson from this guide as your game goal.'}</p></div><a class="button" href="${route('play', lang)}">${esc(UI[lang].playNow)}</a></div></article><aside class="article-rail"><nav class="toc"><strong>${esc(UI[lang].toc)}</strong><ol>${toc.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('')}<li><a href="#faq">${esc(UI[lang].faq)}</a></li></ol></nav>${renderAdfitRailHost(key, lang)}</aside></div></section></main>${renderFooter(lang)}`;
}

function renderAbout(lang) {
  const c = ABOUT[lang];
  const labels = TEMPLATE_LABELS[lang];
  const crumbs = breadcrumbs('about', lang, c.title);
  return `${head({ lang, pageKey: 'about', title: c.metaTitle, description: c.metaDescription, breadcrumbItems: crumbs, extraSchema: [articleSchema(c, lang, 'about')], pageType: 'article', scripts: pageScripts('about', lang) })}
${renderHeader(lang, 'about')}<main id="main">${renderAdfitConfig('about', lang)}<section class="page-hero"><div class="container">${renderBreadcrumbs(crumbs, lang)}<span class="eyebrow">${esc(labels.about)}</span><h1>${esc(c.title)}</h1><p class="page-intro">${esc(c.intro)}</p></div></section>
${renderAdfitStrip('about', lang)}
<section class="section"><div class="container"><div class="card-grid">${c.principles.map(([title, text], index) => `<article class="card"><span class="card-icon">${index + 1}</span><h2>${esc(title)}</h2><p>${esc(text)}</p></article>`).join('')}</div></div></section>
<section class="section section-soft"><div class="narrow"><h2>${esc(c.limitsTitle)}</h2><ul class="check-list">${c.limits.map((item) => `<li>${esc(item)}</li>`).join('')}</ul><h2>${esc(c.privacyTitle)}</h2><p>${esc(c.privacy)}</p></div></section>
<section class="section"><div class="container"><div class="cta-panel"><div><h2>${lang === 'ko' ? '코드를 바꾸기 쉬운 구조로 만들었습니다' : 'Built to be easy to customize'}</h2><p>${lang === 'ko' ? '브랜드, 도메인, 인증 태그, 코스 콘텐츠, 색상은 중앙 설정과 콘텐츠 파일에서 수정할 수 있습니다.' : 'Brand, domain, verification tags, course content, and colors are separated into clear configuration and content files.'}</p></div><a class="button" href="${route('learn', lang)}">${esc(UI[lang].learnNow)}</a></div></div></section></main>${renderFooter(lang)}`;
}

function renderPrivacy(lang) {
  const c = PRIVACY[lang];
  const crumbs = breadcrumbs('privacy', lang, c.title);
  const toc = c.sections.map((section) => [section.id, section.title]);
  return `${head({ lang, pageKey: 'privacy', title: c.metaTitle, description: c.metaDescription, breadcrumbItems: crumbs, extraSchema: [articleSchema(c, lang, 'privacy')], pageType: 'article' })}
${renderHeader(lang, 'privacy')}<main id="main"><section class="page-hero"><div class="container">${renderBreadcrumbs(crumbs, lang)}<span class="eyebrow">${lang === 'ko' ? '개인정보 안내' : 'Privacy notice'}</span><h1>${esc(c.title)}</h1><p class="page-intro">${esc(c.intro)}</p></div></section>
<section class="section"><div class="container article-layout"><article class="article-body">${c.sections.map((section) => `<section id="${esc(section.id)}"><h2>${esc(section.title)}</h2>${section.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</section>`).join('')}
</article><aside class="toc"><strong>${esc(UI[lang].toc)}</strong><ol>${toc.map(([id, label]) => `<li><a href="#${esc(id)}">${esc(label)}</a></li>`).join('')}</ol></aside></div></section></main>${renderFooter(lang)}`;
}

function render404() {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>404 | ChessStep</title><meta name="robots" content="noindex,follow"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/styles.css"></head><body><main class="not-found"><div><div class="not-found-mark">404</div><h1>페이지를 찾을 수 없습니다</h1><p>The page could not be found.</p><div class="action-row"><a class="button" href="/">한국어 홈</a><a class="button button-secondary" href="/en/">English home</a></div></div></main></body></html>`;
}

function pageMeta(key, lang) {
  if (key === 'home') return HOME[lang];
  if (key === 'play') return PLAY[lang];
  if (key === 'learn') return LEARN[lang];
  if (['beginner', 'intermediate', 'advanced'].includes(key)) return COURSES[lang][key];
  if (['rules', 'tactics', 'openings', 'endgames'].includes(key)) return GUIDES[key][lang];
  if (key === 'about') return ABOUT[lang];
  if (key === 'privacy') return PRIVACY[lang];
  return { title: SITE.name, metaTitle: SITE.name, metaDescription: '' };
}

function rssXml(pageKeys) {
  const pubDate = new Date(`${buildDate}T00:00:00.000Z`).toUTCString();
  const channelDescription = '무료 컴퓨터 체스 대국과 한국어·영어 체스 코스를 제공합니다. Play free computer chess and study chess lessons in Korean and English.';
  const items = [];
  for (const key of pageKeys) {
    for (const lang of ['ko', 'en']) {
      const meta = pageMeta(key, lang);
      const url = absolute(route(key, lang));
      const itemLanguage = UI[lang].locale;
      items.push(`    <item>
      <title>${esc(meta.title || meta.metaTitle)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <description>${esc(meta.metaDescription || meta.intro || '')}</description>
      <dc:language>${esc(itemLanguage)}</dc:language>
      <pubDate>${pubDate}</pubDate>
    </item>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE.name)} | Korean and English chess lessons</title>
    <link>${esc(siteUrl)}/</link>
    <description>${esc(channelDescription)}</description>
    <language>ko-KR</language>
    <dc:language>ko-KR</dc:language>
    <dc:language>en-US</dc:language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${esc(absolute('/rss.xml'))}" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>
`;
}

async function writeRoute(urlPath, html) {
  const relative = urlPath === '/' ? 'index.html' : path.join(urlPath.replace(/^\//, ''), 'index.html');
  const target = path.join(dist, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
}

async function build() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(path.join(root, 'src/assets'), path.join(dist, 'assets'), { recursive: true });
  await cp(path.join(root, 'public'), dist, { recursive: true });

  const pageBuilders = {
    home: renderHome,
    play: renderPlay,
    learn: renderLearn,
    beginner: (lang) => renderCourse(lang, 'beginner'),
    intermediate: (lang) => renderCourse(lang, 'intermediate'),
    advanced: (lang) => renderCourse(lang, 'advanced'),
    rules: (lang) => renderGuide(lang, 'rules'),
    tactics: (lang) => renderGuide(lang, 'tactics'),
    openings: (lang) => renderGuide(lang, 'openings'),
    endgames: (lang) => renderGuide(lang, 'endgames'),
    about: renderAbout,
    privacy: renderPrivacy
  };

  for (const lang of ['ko', 'en']) {
    for (const [key, builder] of Object.entries(pageBuilders)) {
      await writeRoute(route(key, lang), builder(lang));
    }
  }

  await writeFile(path.join(dist, '404.html'), render404(), 'utf8');
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');

  const sitemapEntries = Object.keys(pageBuilders).map((key) => {
    const ko = absolute(route(key, 'ko'));
    const en = absolute(route(key, 'en'));
    return `  <url>\n    <loc>${esc(ko)}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <xhtml:link rel="alternate" hreflang="ko" href="${esc(ko)}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${esc(en)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(ko)}"/>\n  </url>\n  <url>\n    <loc>${esc(en)}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <xhtml:link rel="alternate" hreflang="ko" href="${esc(ko)}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${esc(en)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(ko)}"/>\n  </url>`;
  }).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries}\n</urlset>\n`;
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(path.join(dist, 'rss.xml'), rssXml(Object.keys(pageBuilders)), 'utf8');
  await writeFile(path.join(dist, 'humans.txt'), `ChessStep\nBuilt: ${buildDate}\nLanguages: Korean, English\nStack: static HTML, CSS, JavaScript, Node build script\n`, 'utf8');

  console.log(`Built ${Object.keys(pageBuilders).length * 2} localized pages at ${dist}`);
  console.log(`Canonical base URL: ${siteUrl}`);
}

await build();

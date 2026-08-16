import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const failures = [];
const warnings = [];

async function loadEnvFile(filename) {
  const raw = await readFile(path.join(root, filename), 'utf8').catch(() => '');
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

const siteUrl = (process.env.SITE_URL || 'https://www.gameonchess.com').replace(/\/+$/, '');
const siteOrigin = new URL(siteUrl).origin;

function envBool(name, fallback = false) {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  return String(raw).trim().toLowerCase() === 'true';
}

const adfitEnabled = envBool('ADFIT_ENABLED', false);
const adfitEnableKo = envBool('ADFIT_ENABLE_KO', true);
const adfitEnableEn = envBool('ADFIT_ENABLE_EN', true);
const adfitUnits = {
  landingDesktop: (process.env.ADFIT_LANDING_DESKTOP_728X90 || '').trim(),
  landingMobile: (process.env.ADFIT_LANDING_MOBILE_320X100 || '').trim(),
  contentDesktop: (process.env.ADFIT_CONTENT_DESKTOP_300X250 || '').trim(),
  contentTablet: (process.env.ADFIT_CONTENT_TABLET_728X90 || '').trim(),
  contentMobile: (process.env.ADFIT_CONTENT_MOBILE_320X100 || '').trim(),
  playDesktop: (process.env.ADFIT_PLAY_DESKTOP_160X600 || '').trim(),
  playTablet: (process.env.ADFIT_PLAY_TABLET_728X90 || '').trim(),
  playMobile: (process.env.ADFIT_PLAY_MOBILE_320X50 || '').trim()
};
const adfitUnitValues = [...new Set(Object.values(adfitUnits).filter(Boolean))];
const adfitPageGroups = {
  landing: new Set(['/', '/en/', '/learn/', '/en/learn/', '/about/', '/en/about/']),
  play: new Set(['/play/', '/en/play/']),
  content: new Set([
    '/learn/beginner/',
    '/en/learn/beginner/',
    '/learn/intermediate/',
    '/en/learn/intermediate/',
    '/learn/advanced/',
    '/en/learn/advanced/',
    '/rules/',
    '/en/rules/',
    '/tactics/',
    '/en/tactics/',
    '/openings/',
    '/en/openings/',
    '/endgames/',
    '/en/endgames/'
  ]),
  excluded: new Set(['/privacy/', '/en/privacy/', '/404.html'])
};
const monetizedRoutes = new Set([
  ...adfitPageGroups.landing,
  ...adfitPageGroups.play,
  ...adfitPageGroups.content
]);
const adfitModulePattern = /<script\s+type="module"\s+src="\/assets\/adfit\.js"><\/script>/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function countMatches(text, expression) {
  expression.lastIndex = 0;
  const matches = [...text.matchAll(expression)].length;
  expression.lastIndex = 0;
  return matches;
}

function firstMatch(text, expression) {
  return text.match(expression)?.[1]?.trim() || '';
}

function charLength(value) {
  return [...value].length;
}

function routeFromFile(filename) {
  const relative = path.relative(dist, filename).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'/index.html'.length)}/`;
  return `/${relative}`;
}

function languageFromRoute(route) {
  return route.startsWith('/en/') || route === '/en/' ? 'en' : 'ko';
}

function isAdfitLanguageEnabledForRoute(route) {
  const lang = languageFromRoute(route);
  if (!adfitEnabled) return false;
  return lang === 'ko' ? adfitEnableKo : adfitEnableEn;
}

function adfitGroupForRoute(route) {
  for (const [group, routes] of Object.entries(adfitPageGroups)) {
    if (routes.has(route)) return group;
  }
  return 'excluded';
}

const allFiles = await walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const pageFiles = htmlFiles.filter((file) => path.basename(file) !== '404.html');
const validRoutes = new Set(pageFiles.map(routeFromFile));
const pageHtml = new Map();

for (const file of pageFiles) {
  const html = await readFile(file, 'utf8');
  const route = routeFromFile(file);
  const label = route === '/' ? '/' : route;
  pageHtml.set(route, html);

  if (!/^<!doctype html>/i.test(html)) failures.push(`${label}: doctype missing`);
  if (!/<html\s+lang="(?:ko|en)"/i.test(html)) failures.push(`${label}: html lang must be ko or en`);
  if (countMatches(html, /<title>[^<]+<\/title>/gi) !== 1) failures.push(`${label}: exactly one title is required`);
  if (countMatches(html, /<h1(?:\s|>)/gi) !== 1) failures.push(`${label}: exactly one h1 is required`);
  if (countMatches(html, /<meta\s+name="description"\s+content="[^"]+"/gi) !== 1) failures.push(`${label}: meta description missing`);
  if (countMatches(html, /<link\s+rel="canonical"\s+href="https?:\/\/[^"]+"/gi) !== 1) failures.push(`${label}: canonical missing`);
  const canonicalHref = firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (canonicalHref) {
    try {
      if (new URL(canonicalHref).origin !== siteOrigin) failures.push(`${label}: canonical host does not match SITE_URL`);
    } catch {
      failures.push(`${label}: canonical URL is invalid`);
    }
  }
  if (!/<link\s+rel="alternate"\s+type="application\/rss\+xml"\s+title="[^"]+"\s+href="https?:\/\/[^"]+\/rss\.xml"/i.test(html)) {
    failures.push(`${label}: RSS discovery link missing`);
  }
  for (const language of ['ko', 'en', 'x-default']) {
    const expression = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${language}"\\s+href="https?:\\/\\/[^\"]+"`, 'i');
    if (!expression.test(html)) failures.push(`${label}: hreflang ${language} missing`);
  }
  if (!/<script\s+type="application\/ld\+json">[\s\S]+?<\/script>/i.test(html)) failures.push(`${label}: JSON-LD missing`);
  if (!/<meta\s+property="og:title"/i.test(html)) failures.push(`${label}: Open Graph metadata missing`);
  if (/<ins\b[^>]*class="[^"]*\bkakao_ad_area\b/i.test(html)) failures.push(`${label}: AdFit <ins> must be created only at runtime`);
  if (/https:\/\/t1\.kakaocdn\.net\/kas\/static\/ba\.min\.js/.test(html)) failures.push(`${label}: Kakao AdFit SDK must be loaded only by assets/adfit.js`);

  const adfitRootCount = countMatches(html, /\sdata-adfit-root(?:\s|>)/g);
  const adfitScriptCount = countMatches(html, adfitModulePattern);
  const inlineHostCount = countMatches(html, /data-adfit-host="inline"/g);
  const railHostCount = countMatches(html, /data-adfit-host="rail"/g);
  const group = adfitGroupForRoute(route);
  const shouldHaveAdfit = monetizedRoutes.has(route) && isAdfitLanguageEnabledForRoute(route);

  if (shouldHaveAdfit) {
    if (adfitRootCount !== 1) failures.push(`${label}: expected exactly one data-adfit-root`);
    if (adfitScriptCount !== 1) failures.push(`${label}: expected exactly one /assets/adfit.js module`);
    if (!html.includes(`data-adfit-page-group="${group}"`)) failures.push(`${label}: AdFit page group must be ${group}`);
    if (inlineHostCount !== 1) failures.push(`${label}: expected exactly one inline AdFit host`);
    if (group === 'play' || group === 'content') {
      if (railHostCount !== 1) failures.push(`${label}: expected exactly one rail AdFit host`);
    } else if (railHostCount !== 0) {
      failures.push(`${label}: landing pages must not include a rail AdFit host`);
    }
  } else {
    if (adfitRootCount !== 0) failures.push(`${label}: AdFit root must not be emitted`);
    if (adfitScriptCount !== 0) failures.push(`${label}: AdFit module must not be emitted`);
    if (inlineHostCount !== 0 || railHostCount !== 0) failures.push(`${label}: AdFit hosts must not be emitted`);
  }

  if (inlineHostCount > 1) failures.push(`${label}: at most one inline AdFit host is allowed`);
  if (railHostCount > 1) failures.push(`${label}: at most one rail AdFit host is allowed`);

  const title = firstMatch(html, /<title>([^<]+)<\/title>/i);
  const description = firstMatch(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const ogTitle = firstMatch(html, /<meta\s+property="og:title"\s+content="([^"]+)"/i);
  const ogDescription = firstMatch(html, /<meta\s+property="og:description"\s+content="([^"]+)"/i);
  const titleLength = charLength(title);
  const descriptionLength = charLength(description);
  const ogTitleLength = charLength(ogTitle);
  const ogDescriptionLength = charLength(ogDescription);
  if (titleLength > 40) failures.push(`${label}: title is ${titleLength} characters; keep it within 40 for Naver`);
  if (descriptionLength > 80) failures.push(`${label}: description is ${descriptionLength} characters; keep it within 80 for Naver`);
  if (ogTitleLength > 40) failures.push(`${label}: Open Graph title is ${ogTitleLength} characters; keep it within 40 for Naver`);
  if (ogDescriptionLength > 80) failures.push(`${label}: Open Graph description is ${ogDescriptionLength} characters; keep it within 80 for Naver`);
  if (descriptionLength < 40) warnings.push(`${label}: description is ${descriptionLength} characters`);

  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split('#')[0].split('?')[0];
    if (!href || href.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(href)) continue;
    const normalized = href === '/' ? '/' : `${href.replace(/\/+$/, '')}/`;
    if (!validRoutes.has(normalized)) failures.push(`${label}: broken internal link ${href}`);
  }
}

const requiredFiles = [
  'index.html', 'en/index.html', 'robots.txt', 'sitemap.xml', 'rss.xml', 'site.webmanifest',
  'favicon.svg', 'og-default.png', 'assets/styles.css', 'assets/adfit.js', 'assets/chess-engine.js',
  'assets/chess-ai.js', 'assets/chess-worker.js', 'assets/game.js', 'assets/site.js'
];
for (const relative of requiredFiles) {
  try {
    const info = await stat(path.join(dist, relative));
    if (!info.isFile()) failures.push(`${relative}: not a file`);
  } catch {
    failures.push(`${relative}: required output missing`);
  }
}

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8').catch(() => '');
if (!/^User-agent:\s*\*/m.test(robots)) failures.push('robots.txt: User-agent directive missing');
if (!/^Allow:\s*\/$/m.test(robots)) failures.push('robots.txt: Allow directive missing');
if (!/^Sitemap:\s*https?:\/\//m.test(robots)) failures.push('robots.txt: absolute Sitemap directive missing');

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8').catch(() => '');
const urlCount = countMatches(sitemap, /<url>/g);
if (urlCount !== pageFiles.length) failures.push(`sitemap.xml: expected ${pageFiles.length} URLs, found ${urlCount}`);
if (!/xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/.test(sitemap)) failures.push('sitemap.xml: xhtml namespace missing');
if (countMatches(sitemap, /hreflang="ko"/g) !== urlCount) failures.push('sitemap.xml: ko alternates incomplete');
if (countMatches(sitemap, /hreflang="en"/g) !== urlCount) failures.push('sitemap.xml: en alternates incomplete');

const rss = await readFile(path.join(dist, 'rss.xml'), 'utf8').catch(() => '');
const rssItemCount = countMatches(rss, /<item>/g);
if (!/<rss\s+version="2\.0"/.test(rss)) failures.push('rss.xml: RSS 2.0 root missing');
if (!/xmlns:dc="http:\/\/purl\.org\/dc\/elements\/1\.1\/"/.test(rss)) failures.push('rss.xml: dc namespace missing');
if (!/<channel>/.test(rss)) failures.push('rss.xml: channel missing');
if (!/<atom:link[^>]+rel="self"[^>]+type="application\/rss\+xml"/.test(rss)) failures.push('rss.xml: atom self link missing');
if (rssItemCount !== pageFiles.length) failures.push(`rss.xml: expected ${pageFiles.length} items, found ${rssItemCount}`);
if (countMatches(rss, /<item>[\s\S]*?<dc:language>ko-KR<\/dc:language>[\s\S]*?<\/item>/g) !== pageFiles.length / 2) failures.push('rss.xml: ko-KR item language count mismatch');
if (countMatches(rss, /<item>[\s\S]*?<dc:language>en-US<\/dc:language>[\s\S]*?<\/item>/g) !== pageFiles.length / 2) failures.push('rss.xml: en-US item language count mismatch');

const notFoundHtml = await readFile(path.join(dist, '404.html'), 'utf8').catch(() => '');
if (/\sdata-adfit-root(?:\s|>)/.test(notFoundHtml)) failures.push('404.html: AdFit root must not be emitted');
if (adfitModulePattern.test(notFoundHtml)) failures.push('404.html: AdFit module must not be emitted');
adfitModulePattern.lastIndex = 0;
if (/data-adfit-host="(?:inline|rail)"/.test(notFoundHtml)) failures.push('404.html: AdFit hosts must not be emitted');
if (/<ins\b[^>]*class="[^"]*\bkakao_ad_area\b/i.test(notFoundHtml)) failures.push('404.html: AdFit <ins> must be created only at runtime');
if (/https:\/\/t1\.kakaocdn\.net\/kas\/static\/ba\.min\.js/.test(notFoundHtml)) failures.push('404.html: Kakao AdFit SDK must not be emitted');

if (adfitEnabled && adfitEnableKo && adfitEnableEn) {
  let monetizedRootCount = 0;
  let monetizedScriptCount = 0;
  for (const route of monetizedRoutes) {
    const html = pageHtml.get(route) || '';
    monetizedRootCount += countMatches(html, /\sdata-adfit-root(?:\s|>)/g);
    monetizedScriptCount += countMatches(html, adfitModulePattern);
  }
  if (monetizedRootCount !== 22) failures.push(`AdFit: expected 22 monetized roots, found ${monetizedRootCount}`);
  if (monetizedScriptCount !== 22) failures.push(`AdFit: expected 22 monetized module scripts, found ${monetizedScriptCount}`);
}

const searchableFiles = allFiles.filter((file) => /\.(?:html|js|css|xml|txt|json|webmanifest|svg)$/i.test(file));
const searchableText = (await Promise.all(searchableFiles.map((file) => readFile(file, 'utf8').catch(() => '')))).join('\n');
if (!adfitEnabled) {
  for (const value of adfitUnitValues) {
    if (searchableText.includes(value)) failures.push('dist: AdFit unit ID leaked while ADFIT_ENABLED=false');
  }
}
if (adfitEnabled && !adfitEnableKo) {
  const koText = [...pageHtml.entries()]
    .filter(([route]) => languageFromRoute(route) === 'ko')
    .map(([, html]) => html)
    .join('\n');
  for (const value of adfitUnitValues) {
    if (koText.includes(value)) failures.push('dist: AdFit unit ID leaked while ADFIT_ENABLE_KO=false');
  }
}
if (adfitEnabled && !adfitEnableEn) {
  const enText = [...pageHtml.entries()]
    .filter(([route]) => languageFromRoute(route) === 'en')
    .map(([, html]) => html)
    .join('\n');
  for (const value of adfitUnitValues) {
    if (enText.includes(value)) failures.push('dist: AdFit unit ID leaked while ADFIT_ENABLE_EN=false');
  }
}

const adfitAsset = await readFile(path.join(dist, 'assets/adfit.js'), 'utf8').catch(() => '');
if (/innerHTML\s*=/.test(adfitAsset)) failures.push('assets/adfit.js: do not build ad markup with innerHTML');
if (/addEventListener\(\s*['"](?:resize|orientationchange)['"]/.test(adfitAsset)) failures.push('assets/adfit.js: do not remount ads on resize or orientationchange');
if (countMatches(adfitAsset, /createElement\(\s*['"]ins['"]\s*\)/g) !== 1) failures.push('assets/adfit.js: expected one runtime <ins> creation path');
if (!/dataset\.adOnfail\s*=\s*['"]gameOnChessAdfitNoAd['"]/.test(adfitAsset)) failures.push('assets/adfit.js: AdFit no-ad callback must be declared on the <ins>');
if (!/querySelector\(\s*['"]\.kakao_ad_area['"]\s*\)/.test(adfitAsset)) failures.push('assets/adfit.js: existing AdFit <ins> guard is required');
if (!/querySelector\(\s*`script\[src="\$\{SDK_SRC\}"\]`\s*\)/.test(adfitAsset)) failures.push('assets/adfit.js: existing SDK script guard is required');
if (!/document\.querySelector\(\s*['"]\[data-adfit-root\]['"]\s*\)/.test(adfitAsset)) failures.push('assets/adfit.js: expected data-adfit-root configuration lookup');
if (/data-adfit-play/.test(adfitAsset)) failures.push('assets/adfit.js: play-only AdFit selectors must not remain');

if (warnings.length) {
  console.warn(`SEO warnings (${warnings.length}):`);
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

if (failures.length) {
  console.error(`SEO check failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`SEO check passed: ${pageFiles.length} indexable HTML pages, ${urlCount} sitemap URLs, ${rssItemCount} RSS items, no broken internal routes.`);

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const failures = [];
const warnings = [];

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
  return [...text.matchAll(expression)].length;
}

function firstMatch(text, expression) {
  return text.match(expression)?.[1]?.trim() || '';
}

function routeFromFile(filename) {
  const relative = path.relative(dist, filename).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'/index.html'.length)}/`;
  return `/${relative}`;
}

const allFiles = await walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const pageFiles = htmlFiles.filter((file) => path.basename(file) !== '404.html');
const validRoutes = new Set(pageFiles.map(routeFromFile));

for (const file of pageFiles) {
  const html = await readFile(file, 'utf8');
  const route = routeFromFile(file);
  const label = route === '/' ? '/' : route;

  if (!/^<!doctype html>/i.test(html)) failures.push(`${label}: doctype missing`);
  if (!/<html\s+lang="(?:ko|en)"/i.test(html)) failures.push(`${label}: html lang must be ko or en`);
  if (countMatches(html, /<title>[^<]+<\/title>/gi) !== 1) failures.push(`${label}: exactly one title is required`);
  if (countMatches(html, /<h1(?:\s|>)/gi) !== 1) failures.push(`${label}: exactly one h1 is required`);
  if (countMatches(html, /<meta\s+name="description"\s+content="[^"]+"/gi) !== 1) failures.push(`${label}: meta description missing`);
  if (countMatches(html, /<link\s+rel="canonical"\s+href="https?:\/\/[^"]+"/gi) !== 1) failures.push(`${label}: canonical missing`);
  if (!/<link\s+rel="alternate"\s+type="application\/rss\+xml"\s+title="[^"]+"\s+href="https?:\/\/[^"]+\/rss\.xml"/i.test(html)) {
    failures.push(`${label}: RSS discovery link missing`);
  }
  for (const language of ['ko', 'en', 'x-default']) {
    const expression = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${language}"\\s+href="https?:\\/\\/[^\"]+"`, 'i');
    if (!expression.test(html)) failures.push(`${label}: hreflang ${language} missing`);
  }
  if (!/<script\s+type="application\/ld\+json">[\s\S]+?<\/script>/i.test(html)) failures.push(`${label}: JSON-LD missing`);
  if (!/<meta\s+property="og:title"/i.test(html)) failures.push(`${label}: Open Graph metadata missing`);

  const title = firstMatch(html, /<title>([^<]+)<\/title>/i);
  const description = firstMatch(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  if (title.length > 65) warnings.push(`${label}: title is ${title.length} characters`);
  if (description.length < 60 || description.length > 180) warnings.push(`${label}: description is ${description.length} characters`);

  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split('#')[0].split('?')[0];
    if (!href || href.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(href)) continue;
    const normalized = href === '/' ? '/' : `${href.replace(/\/+$/, '')}/`;
    if (!validRoutes.has(normalized)) failures.push(`${label}: broken internal link ${href}`);
  }
}

const requiredFiles = [
  'index.html', 'en/index.html', 'robots.txt', 'sitemap.xml', 'rss.xml', 'site.webmanifest',
  'favicon.svg', 'og-default.png', 'assets/styles.css', 'assets/chess-engine.js',
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

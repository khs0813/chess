import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const adfitSource = await readFile(path.join(root, 'dist/assets/adfit.js'), 'utf8');
const sdkSrc = 'https://t1.kakaocdn.net/kas/static/ba.min.js';
const failures = [];
const viewports = [
  [320, 568],
  [360, 800],
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1440, 900]
];

const expectedByGroup = {
  landing(width) {
    return width >= 760
      ? { host: 'inline', width: 728, height: 90 }
      : { host: 'inline', width: 320, height: 100 };
  },
  play(width) {
    if (width >= 1240) return { host: 'rail', width: 160, height: 600 };
    if (width >= 760) return { host: 'inline', width: 728, height: 90 };
    return { host: 'inline', width: 320, height: 50 };
  },
  content(width) {
    if (width >= 1120) return { host: 'rail', width: 300, height: 250 };
    if (width >= 760) return { host: 'inline', width: 728, height: 90 };
    return { host: 'inline', width: 320, height: 100 };
  }
};

class StyleMap {
  constructor() {
    this.props = new Map();
  }

  setProperty(name, value) {
    this.props.set(name, value);
  }

  getPropertyValue(name) {
    return this.props.get(name) || '';
  }
}

class Element {
  constructor(tagName) {
    this.tagName = tagName.toLowerCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = new Map();
    this.dataset = {};
    this.style = new StyleMap();
    this.className = '';
    this.classList = {
      add: (...names) => {
        const current = new Set(this.className.split(/\s+/).filter(Boolean));
        for (const name of names) current.add(name);
        this.className = [...current].join(' ');
      },
      contains: (name) => this.className.split(/\s+/).includes(name)
    };
    this.hidden = false;
    this.textContent = '';
  }

  append(...nodes) {
    for (const node of nodes) {
      node.parentNode = this;
      this.children.push(node);
    }
  }

  replaceChildren(...nodes) {
    for (const child of this.children) child.parentNode = null;
    this.children = [];
    this.append(...nodes);
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  querySelector(selector) {
    return walk(this).find((node) => node !== this && matches(node, selector)) || null;
  }

  querySelectorAll(selector) {
    return walk(this).filter((node) => node !== this && matches(node, selector));
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (matches(current, selector)) return current;
      current = current.parentNode;
    }
    return null;
  }
}

function walk(node) {
  const nodes = [node];
  for (const child of node.children) nodes.push(...walk(child));
  return nodes;
}

function matches(node, selector) {
  if (selector.startsWith('.')) {
    return node.className.split(/\s+/).includes(selector.slice(1));
  }
  if (selector === '[data-adfit-root]') return Object.hasOwn(node.dataset, 'adfitRoot');
  const hostMatch = selector.match(/^\[data-adfit-host="([^"]+)"\]$/);
  if (hostMatch) return node.dataset.adfitHost === hostMatch[1];
  const scriptMatch = selector.match(/^script\[src="([^"]+)"\]$/);
  if (scriptMatch) return node.tagName === 'script' && node.src === scriptMatch[1];
  return false;
}

function createDocument(width) {
  const documentElement = new Element('html');
  documentElement.clientWidth = width;
  const body = new Element('body');
  documentElement.append(body);
  return {
    readyState: 'complete',
    documentElement,
    body,
    createElement: (tagName) => new Element(tagName),
    querySelector: (selector) => documentElement.querySelector(selector),
    querySelectorAll: (selector) => documentElement.querySelectorAll(selector),
    addEventListener() {}
  };
}

function addAdfitDom(document, group, unitOverrides = {}) {
  const root = new Element('div');
  root.dataset.adfitRoot = '';
  root.dataset.adfitPageGroup = group;
  root.dataset.adfitLabel = 'Advertisement';
  root.dataset.adfitLandingDesktopUnit = 'LANDING_DESKTOP';
  root.dataset.adfitLandingMobileUnit = 'LANDING_MOBILE';
  root.dataset.adfitContentDesktopUnit = 'CONTENT_DESKTOP';
  root.dataset.adfitContentTabletUnit = 'CONTENT_TABLET';
  root.dataset.adfitContentMobileUnit = 'CONTENT_MOBILE';
  root.dataset.adfitPlayDesktopUnit = 'PLAY_DESKTOP';
  root.dataset.adfitPlayTabletUnit = 'PLAY_TABLET';
  root.dataset.adfitPlayMobileUnit = 'PLAY_MOBILE';
  root.dataset.adfitPlayDesktopSticky = 'true';
  Object.assign(root.dataset, unitOverrides);

  const inline = new Element('div');
  inline.dataset.adfitHost = 'inline';
  const rail = new Element('div');
  rail.dataset.adfitHost = 'rail';
  document.body.append(root, inline, rail);
  return { root, inline, rail };
}

function runAdfit({ group, width, unitOverrides = {} }) {
  const document = createDocument(width);
  const window = {
    document,
    innerWidth: width,
    location: { hostname: 'www.gameonchess.com' }
  };
  addAdfitDom(document, group, unitOverrides);
  vm.runInNewContext(adfitSource, { window, document, console });
  return { document, window };
}

function fail(label, message) {
  failures.push(`${label}: ${message}`);
}

for (const group of ['landing', 'play', 'content']) {
  for (const [width, height] of viewports) {
    const label = `${group} ${width}x${height}`;
    const { document, window } = runAdfit({ group, width });
    const expected = expectedByGroup[group](width);
    const ads = document.querySelectorAll('.kakao_ad_area');
    const sdkScripts = document.querySelectorAll(`script[src="${sdkSrc}"]`);
    if (ads.length !== 1) fail(label, `expected one .kakao_ad_area, found ${ads.length}`);
    if (sdkScripts.length !== 1) fail(label, `expected one ba.min.js script, found ${sdkScripts.length}`);
    const ad = ads[0];
    if (!ad) continue;
    if (ad.dataset.adWidth !== String(expected.width)) fail(label, `expected width ${expected.width}, found ${ad.dataset.adWidth}`);
    if (ad.dataset.adHeight !== String(expected.height)) fail(label, `expected height ${expected.height}, found ${ad.dataset.adHeight}`);
    if (ad.dataset.adOnfail !== 'gameOnChessAdfitNoAd') fail(label, 'missing no-ad callback');
    const slot = ad.closest('.adfit-slot');
    if (!slot?.className.split(/\s+/).includes(`adfit-slot--${expected.host}`)) fail(label, `expected ${expected.host} slot`);
    if (expected.host === 'rail' && group === 'play' && !slot.className.split(/\s+/).includes('is-sticky')) {
      fail(label, 'expected sticky play rail slot');
    }
    window.innerWidth = width === 320 ? 1440 : 320;
    if (document.querySelectorAll('.kakao_ad_area').length !== 1) fail(label, 'resize simulation changed ad count');
    window.gameOnChessAdfitNoAd(ad);
    if (document.querySelectorAll('.kakao_ad_area').length !== 1) fail(label, 'no-ad callback changed ad count');
    if (slot.dataset.adfitState !== 'no-ad') fail(label, 'no-ad callback did not mark slot state');
  }
}

const blankCases = [
  ['landing', 320, { adfitLandingMobileUnit: '' }],
  ['play', 1440, { adfitPlayDesktopUnit: '' }],
  ['content', 1024, { adfitContentTabletUnit: '' }]
];

for (const [group, width, unitOverrides] of blankCases) {
  const label = `${group} ${width}px blank unit`;
  const { document } = runAdfit({ group, width, unitOverrides });
  if (document.querySelectorAll('.kakao_ad_area').length !== 0) fail(label, 'empty selected unit must not create an ad');
  if (document.querySelectorAll(`script[src="${sdkSrc}"]`).length !== 0) fail(label, 'empty selected unit must not load SDK');
}

if (failures.length) {
  console.error(`AdFit runtime check failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`AdFit runtime check passed: ${viewports.length} viewports across landing, play, and content groups.`);

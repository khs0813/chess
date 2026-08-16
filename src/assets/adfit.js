const SDK_SRC = 'https://t1.kakaocdn.net/kas/static/ba.min.js';

const UNIT_DATASET_KEYS = {
  landingDesktop: 'adfitLandingDesktopUnit',
  landingMobile: 'adfitLandingMobileUnit',
  contentDesktop: 'adfitContentDesktopUnit',
  contentTablet: 'adfitContentTabletUnit',
  contentMobile: 'adfitContentMobileUnit',
  playDesktop: 'adfitPlayDesktopUnit',
  playTablet: 'adfitPlayTabletUnit',
  playMobile: 'adfitPlayMobileUnit'
};

let mounted = false;

function isDevelopmentHost() {
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '';
}

function warn(message) {
  if (isDevelopmentHost()) console.warn(`[AdFit] ${message}`);
}

function data(root, key) {
  return (root.dataset[key] || '').trim();
}

function viewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth || 0;
}

function selectPlacement(group, width) {
  if (group === 'landing') {
    return width >= 760
      ? { unitKey: 'landingDesktop', width: 728, height: 90, host: 'inline' }
      : { unitKey: 'landingMobile', width: 320, height: 100, host: 'inline' };
  }

  if (group === 'play') {
    if (width >= 1240) {
      return { unitKey: 'playDesktop', width: 160, height: 600, host: 'rail' };
    }
    if (width >= 760) {
      return { unitKey: 'playTablet', width: 728, height: 90, host: 'inline' };
    }
    return { unitKey: 'playMobile', width: 320, height: 50, host: 'inline' };
  }

  if (group === 'content') {
    if (width >= 1120) {
      return { unitKey: 'contentDesktop', width: 300, height: 250, host: 'rail' };
    }
    if (width >= 760) {
      return { unitKey: 'contentTablet', width: 728, height: 90, host: 'inline' };
    }
    return { unitKey: 'contentMobile', width: 320, height: 100, host: 'inline' };
  }

  return null;
}

function createSlot({ host, unit, width, height }, label, sticky) {
  const slot = document.createElement('aside');
  slot.className = `adfit-slot adfit-slot--${host}`;
  if (host === 'rail' && sticky) slot.classList.add('is-sticky');
  slot.setAttribute('aria-label', label);

  const labelElement = document.createElement('span');
  labelElement.className = 'adfit-label';
  labelElement.textContent = label;

  const frame = document.createElement('div');
  frame.className = 'adfit-frame';
  frame.style.setProperty('--adfit-width', `${width}px`);
  frame.style.setProperty('--adfit-height', `${height}px`);

  const ins = document.createElement('ins');
  ins.className = 'kakao_ad_area';
  ins.style.display = 'none';
  ins.style.width = '100%';
  ins.dataset.adUnit = unit;
  ins.dataset.adWidth = String(width);
  ins.dataset.adHeight = String(height);
  ins.dataset.adOnfail = 'gameOnChessAdfitNoAd';

  frame.append(ins);
  slot.append(labelElement, frame);
  return slot;
}

function loadSdk() {
  if (window.__GameOnChessAdfitSdkLoaded || document.querySelector(`script[src="${SDK_SRC}"]`)) return;
  window.__GameOnChessAdfitSdkLoaded = true;

  const sdk = document.createElement('script');
  sdk.async = true;
  sdk.type = 'text/javascript';
  sdk.charset = 'utf-8';
  sdk.src = SDK_SRC;
  document.body.append(sdk);
}

window.gameOnChessAdfitNoAd = function gameOnChessAdfitNoAd(ins) {
  const slot = ins?.closest?.('.adfit-slot');
  if (!slot) return;
  slot.dataset.adfitState = 'no-ad';
  const label = slot.querySelector('.adfit-label');
  if (label) label.hidden = true;
};

function mountAdfit() {
  if (mounted || window.__GameOnChessAdfitMounted) return;

  try {
    if (document.querySelector('.kakao_ad_area')) {
      mounted = true;
      window.__GameOnChessAdfitMounted = true;
      return;
    }

    const root = document.querySelector('[data-adfit-root]');
    if (!root || root.dataset.adfitMounted === 'true') return;

    const group = data(root, 'adfitPageGroup');
    if (!group || group === 'excluded') return;

    const placement = selectPlacement(group, viewportWidth());
    if (!placement) return;

    const unitKey = UNIT_DATASET_KEYS[placement.unitKey];
    const adUnit = unitKey ? data(root, unitKey) : '';
    if (!adUnit) {
      warn('No AdFit unit configured for the selected placement.');
      return;
    }

    const host = document.querySelector(`[data-adfit-host="${placement.host}"]`);
    if (!host || host.dataset.adfitMounted === 'true') return;

    const label = data(root, 'adfitLabel') || 'Advertisement';
    const sticky = data(root, 'adfitPlayDesktopSticky') === 'true';
    const slot = createSlot({ ...placement, unit: adUnit }, label, sticky);

    root.dataset.adfitMounted = 'true';
    host.dataset.adfitMounted = 'true';
    host.replaceChildren(slot);
    mounted = true;
    window.__GameOnChessAdfitMounted = true;
    loadSdk();
  } catch (error) {
    warn(error instanceof Error ? error.message : 'AdFit mount failed.');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAdfit, { once: true });
} else {
  mountAdfit();
}

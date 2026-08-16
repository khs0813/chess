const SDK_SRC = 'https://t1.kakaocdn.net/kas/static/ba.min.js';

let mounted = false;

function isDevelopmentHost() {
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '';
}

function warn(message) {
  if (isDevelopmentHost()) console.warn(`[AdFit] ${message}`);
}

function unit(root, key) {
  return (root.dataset[key] || '').trim();
}

function choosePlacement(root) {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  const units = {
    desktop: unit(root, 'adfitDesktopUnit'),
    tablet: unit(root, 'adfitTabletUnit'),
    mobile: unit(root, 'adfitMobileUnit')
  };

  if (viewportWidth >= 1240) {
    if (units.desktop) return { host: 'rail', modifier: 'rail', unit: units.desktop, width: 160, height: 600 };
    if (units.tablet) return { host: 'inline', modifier: 'inline', unit: units.tablet, width: 728, height: 90 };
    if (units.mobile) return { host: 'inline', modifier: 'inline', unit: units.mobile, width: 320, height: 50 };
    return null;
  }

  if (viewportWidth >= 760) {
    if (units.tablet) return { host: 'inline', modifier: 'inline', unit: units.tablet, width: 728, height: 90 };
    if (units.mobile) return { host: 'inline', modifier: 'inline', unit: units.mobile, width: 320, height: 50 };
    return null;
  }

  if (units.mobile) return { host: 'inline', modifier: 'inline', unit: units.mobile, width: 320, height: 50 };
  return null;
}

function createSlot({ modifier, unit: adUnit, width, height }, label, sticky) {
  const slot = document.createElement('aside');
  slot.className = `adfit-slot adfit-slot--${modifier}`;
  if (modifier === 'rail' && sticky) slot.classList.add('is-sticky');
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
  ins.dataset.adUnit = adUnit;
  ins.dataset.adWidth = String(width);
  ins.dataset.adHeight = String(height);

  frame.append(ins);
  slot.append(labelElement, frame);
  return slot;
}

function loadSdk() {
  if (window.__ChessStepAdfitSdkLoaded || document.querySelector(`script[src="${SDK_SRC}"]`)) return;
  window.__ChessStepAdfitSdkLoaded = true;

  const sdk = document.createElement('script');
  sdk.async = true;
  sdk.type = 'text/javascript';
  sdk.src = SDK_SRC;
  document.body.append(sdk);
}

function mountAdfit() {
  if (mounted || window.__ChessStepAdfitMounted) return;

  try {
    const root = document.querySelector('[data-adfit-play="true"]');
    if (!root || root.dataset.adfitMounted === 'true') return;

    const placement = choosePlacement(root);
    if (!placement) {
      warn('No safe ad unit configured for this viewport.');
      return;
    }

    const host = root.querySelector(`[data-adfit-host="${placement.host}"]`);
    if (!host || host.dataset.adfitMounted === 'true') return;

    const label = unit(root, 'adfitLabel') || 'Advertisement';
    const sticky = unit(root, 'adfitDesktopSticky') === 'true';
    const slot = createSlot(placement, label, sticky);

    root.dataset.adfitMounted = 'true';
    host.dataset.adfitMounted = 'true';
    host.replaceChildren(slot);
    mounted = true;
    window.__ChessStepAdfitMounted = true;
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

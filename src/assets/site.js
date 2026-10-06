const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu?.toggleAttribute('data-open', !expanded);
});

navMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navMenu?.removeAttribute('data-open');
  });
});

for (const course of document.querySelectorAll('[data-course-progress]')) {
  const courseKey = course.dataset.courseProgress;
  const boxes = [...course.querySelectorAll('[data-lesson-check]')];
  const meter = course.querySelector('[data-progress-meter]');
  const label = course.querySelector('[data-progress-label]');
  const storageKey = `chessstep:course:${courseKey}`;

  let completed = [];
  try {
    completed = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(completed)) completed = [];
  } catch {
    completed = [];
  }

  function update() {
    const checked = boxes.filter((box) => box.checked).map((box) => box.value);
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      // Progress remains usable for this session when storage is unavailable.
    }
    const percent = boxes.length ? Math.round((checked.length / boxes.length) * 100) : 0;
    if (meter) meter.style.setProperty('--progress', `${percent}%`);
    if (meter) meter.setAttribute('aria-valuenow', String(percent));
    if (label) label.textContent = `${checked.length}/${boxes.length} · ${percent}%`;
  }

  for (const box of boxes) {
    box.checked = completed.includes(box.value);
    box.addEventListener('change', update);
  }
  update();
}

for (const copyButton of document.querySelectorAll('[data-copy-value]')) {
  copyButton.addEventListener('click', async () => {
    const value = copyButton.dataset.copyValue || '';
    try {
      await navigator.clipboard.writeText(value);
      const original = copyButton.textContent;
      copyButton.textContent = copyButton.dataset.copiedLabel || 'Copied';
      setTimeout(() => { copyButton.textContent = original; }, 1600);
    } catch {
      // The value remains visible next to the button for manual copying.
    }
  });
}

for (const explorer of document.querySelectorAll('[data-piece-explorer]')) {
  const tabs = [...explorer.querySelectorAll('[data-piece-target]')];
  const panels = [...explorer.querySelectorAll('[data-piece-panel]')];

  function activate(targetId) {
    tabs.forEach((tab) => {
      const active = tab.dataset.pieceTarget === targetId;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    panels.forEach((panel) => {
      const active = panel.dataset.piecePanel === targetId;
      panel.classList.toggle('is-active', active);
      if (active) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activate(tab.dataset.pieceTarget);
    });

    tab.addEventListener('keydown', (e) => {
      let nextIndex = index;
      if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') nextIndex = 0;
      else if (e.key === 'End') nextIndex = tabs.length - 1;
      else return;

      e.preventDefault();
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.pieceTarget);
    });
  });

  const activeTab = tabs.find((t) => t.classList.contains('is-active')) || tabs[0];
  if (activeTab) {
    activate(activeTab.dataset.pieceTarget);
  }
}

function initCoupangFloatingBanner() {
  const banner = document.querySelector('[data-coupang-floating]');
  if (!banner) return;

  const container = banner.querySelector('[data-coupang-container]');
  const content = banner.querySelector('[data-coupang-content]');
  const collapseBtn = banner.querySelector('[data-coupang-collapse]');
  const collapseLabel = banner.querySelector('[data-coupang-collapse-label]');
  const chevronIcon = banner.querySelector('.coupang-icon-chevron');
  const closeBtn = banner.querySelector('[data-coupang-close]');
  const reopenSlot = document.querySelector('[data-coupang-reopen-slot]');
  const reopenBtn = document.querySelector('[data-coupang-reopen]');

  const isKo = document.documentElement.lang !== 'en';
  const txtCollapse = isKo ? '접기' : 'Collapse';
  const txtExpand = isKo ? '펼치기' : 'Expand';
  const ariaCollapse = isKo ? '광고 접기' : 'Collapse ad';
  const ariaExpand = isKo ? '광고 펼치기' : 'Expand ad';

  let isCollapsed = false;

  collapseBtn?.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    banner.classList.toggle('is-collapsed', isCollapsed);
    if (content) content.hidden = isCollapsed;
    if (collapseBtn) collapseBtn.setAttribute('aria-label', isCollapsed ? ariaExpand : ariaCollapse);
    if (collapseLabel) collapseLabel.textContent = isCollapsed ? txtExpand : txtCollapse;
    if (chevronIcon) chevronIcon.classList.toggle('is-reversed', isCollapsed);
  });

  closeBtn?.addEventListener('click', () => {
    banner.hidden = true;
    if (reopenSlot) reopenSlot.hidden = false;
  });

  reopenBtn?.addEventListener('click', () => {
    banner.hidden = false;
    if (reopenSlot) reopenSlot.hidden = true;
  });

  if (typeof window !== 'undefined' && window.navigator && window.navigator.webdriver) {
    return;
  }

  const COUPANG_SCRIPT_SRC = 'https://ads-partners.coupang.com/g.js';
  let initialized = false;

  function initWidget() {
    if (initialized || !container || !window.PartnersCoupang?.G) return;
    try {
      new window.PartnersCoupang.G({
        id: 1031229,
        template: 'carousel',
        trackingCode: 'AF4791224',
        width: '100%',
        height: '140',
        tsource: '',
        container: container,
      });
      initialized = true;
    } catch (err) {
      console.error('Failed to initialize Coupang Partners floating banner:', err);
    }
  }

  if (window.PartnersCoupang?.G) {
    initWidget();
  } else {
    let script = document.querySelector(`script[src="${COUPANG_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = COUPANG_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', initWidget, { once: true });
  }
}

initCoupangFloatingBanner();



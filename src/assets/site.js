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


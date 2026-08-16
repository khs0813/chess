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

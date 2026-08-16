export const SITE = Object.freeze({
  name: 'ChessStep',
  legalName: 'ChessStep',
  defaultUrl: 'https://chessstep-static.onrender.com',
  foundingYear: 2026,
  themeColor: '#184b35',
  locale: {
    ko: 'ko_KR',
    en: 'en_US'
  }
});

export const ROUTES = Object.freeze({
  home: { ko: '/', en: '/en/' },
  play: { ko: '/play/', en: '/en/play/' },
  learn: { ko: '/learn/', en: '/en/learn/' },
  beginner: { ko: '/learn/beginner/', en: '/en/learn/beginner/' },
  intermediate: { ko: '/learn/intermediate/', en: '/en/learn/intermediate/' },
  advanced: { ko: '/learn/advanced/', en: '/en/learn/advanced/' },
  rules: { ko: '/rules/', en: '/en/rules/' },
  tactics: { ko: '/tactics/', en: '/en/tactics/' },
  openings: { ko: '/openings/', en: '/en/openings/' },
  endgames: { ko: '/endgames/', en: '/en/endgames/' },
  about: { ko: '/about/', en: '/en/about/' }
});

export function route(key, lang) {
  return ROUTES[key][lang];
}

export function counterpartPath(key, lang) {
  return ROUTES[key][lang === 'ko' ? 'en' : 'ko'];
}

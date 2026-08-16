export const UI = {
  ko: {
    htmlLang: 'ko', locale: 'ko-KR', languageName: '한국어', alternateName: 'English',
    brandTagline: '배우고, 두고, 복기하는 체스',
    skip: '본문으로 바로가기', nav: { home: '홈', play: '컴퓨터 대국', learn: '학습 코스', rules: '체스 규칙', tactics: '전술', openings: '오프닝', about: '소개' },
    playNow: '지금 대국하기', learnNow: '코스 시작하기', readMore: '자세히 보기',
    breadcrumbHome: '홈', toc: '이 페이지의 내용', complete: '학습 완료로 표시', progress: '코스 진행률',
    minutes: '분', lessons: '개 레슨', free: '무료', noLogin: '로그인 불필요', localSave: '진행률은 이 기기에 저장됩니다.',
    footerIntro: '컴퓨터와 체스를 두고, 단계별 코스로 원리를 익히며, 스스로 복기할 수 있도록 만든 무료 정적 학습 사이트입니다.',
    footerLearn: '학습', footerPractice: '연습', footerInfo: '안내', copyright: '모든 권리 보유.',
    updated: '최종 업데이트', backToCourses: '전체 코스로 돌아가기', nextCourse: '다음 코스',
    faq: '자주 묻는 질문', outcomes: '이 코스에서 배우는 것', curriculum: '커리큘럼', routine: '추천 연습 루틴', mistakes: '자주 하는 실수',
    lesson: '레슨', practice: '실전 과제', keyPoint: '핵심 포인트', copied: '복사됨'
  },
  en: {
    htmlLang: 'en', locale: 'en-US', languageName: 'English', alternateName: '한국어',
    brandTagline: 'Learn, play, and review chess',
    skip: 'Skip to main content', nav: { home: 'Home', play: 'Play the Computer', learn: 'Courses', rules: 'Rules', tactics: 'Tactics', openings: 'Openings', about: 'About' },
    playNow: 'Play now', learnNow: 'Start a course', readMore: 'Read more',
    breadcrumbHome: 'Home', toc: 'On this page', complete: 'Mark lesson complete', progress: 'Course progress',
    minutes: 'min', lessons: 'lessons', free: 'Free', noLogin: 'No sign-in required', localSave: 'Progress is stored on this device.',
    footerIntro: 'A free static learning site where you can play the computer, study chess by level, and build a habit of reviewing your games.',
    footerLearn: 'Learn', footerPractice: 'Practice', footerInfo: 'Info', copyright: 'All rights reserved.',
    updated: 'Last updated', backToCourses: 'Back to all courses', nextCourse: 'Next course',
    faq: 'Frequently asked questions', outcomes: 'What you will learn', curriculum: 'Curriculum', routine: 'Suggested practice routine', mistakes: 'Common mistakes',
    lesson: 'Lesson', practice: 'Practice', keyPoint: 'Key point', copied: 'Copied'
  }
};

export const HOME = {
  ko: {
    metaTitle: '컴퓨터와 무료 체스 두기 | 초급·중급·고급 체스 코스 - ChessStep',
    metaDescription: '로그인 없이 컴퓨터와 무료 체스를 두고 초급·중급·고급 코스로 규칙, 전술, 오프닝, 엔드게임을 단계별로 배우세요. 모바일과 PC 모두 지원합니다.',
    eyebrow: '무료 체스 학습 · 브라우저에서 바로 실행',
    h1: '한 판 두고,<br>한 단계씩<br><em>강해지는 체스</em>',
    lead: '설치도 회원가입도 필요 없습니다. 초급·중급·고급 AI와 대국하고, 수준별 코스를 따라가며 “왜 이 수가 좋은지”를 이해해 보세요.',
    primary: '컴퓨터와 체스 두기', secondary: '초급 코스부터 시작',
    proof: [['3단계', '컴퓨터 난이도'], ['18개', '핵심 레슨'], ['0원', '전 기능 무료']],
    benefitsHeading: '대국과 학습이 한 흐름으로 이어집니다',
    benefitsLead: '규칙만 읽고 끝나는 대신, 배운 개념을 즉시 체스판에서 시험하고 다시 코스로 돌아와 약점을 보완하도록 설계했습니다.',
    benefits: [
      { icon: '♞', title: '난이도별 컴퓨터 대국', text: '초급은 실수를 허용하고, 중급은 기본 전술을 계산하며, 고급은 더 깊은 수읽기로 대응합니다.' },
      { icon: '◎', title: '수준별 학습 코스', text: '기물 이동부터 후보수 비교, 포지션 평가까지 초급·중급·고급 순서로 쌓아갑니다.' },
      { icon: '↺', title: '되돌리기와 힌트', text: '잘못 둔 수를 되돌리고 추천 수를 확인하면서 결과보다 사고 과정을 훈련할 수 있습니다.' }
    ],
    coursesHeading: '현재 실력에 맞는 코스를 고르세요',
    coursesLead: '각 코스는 짧은 레슨, 예시 포지션, 실전 과제로 구성됩니다. 완료 표시는 브라우저에 자동 저장됩니다.',
    stats: [['100%', '정적 HTML로 검색엔진 수집 가능'], ['2개', '한국어·영어 독립 URL'], ['64칸', '키보드 접근 가능한 체스판'], ['0개', '외부 데이터 요청']],
    faq: [
      ['정말 무료인가요?', '네. 대국, 힌트, 되돌리기, 모든 학습 코스를 무료로 사용할 수 있습니다. 별도의 계정이나 결제 정보가 필요하지 않습니다.'],
      ['휴대폰에서도 체스를 둘 수 있나요?', '안드로이드와 아이폰의 최신 브라우저에서 기물을 끌어 이동할 수 있도록 반응형으로 만들었습니다. 탭 선택 방식도 보조로 동작합니다.'],
      ['고급 컴퓨터는 어느 정도 강한가요?', '브라우저에서 제한된 시간 동안 여러 수를 탐색하는 학습용 AI입니다. 전용 체스 엔진이나 대회 수준의 강도를 목표로 하기보다 초·중급자의 연습 상대에 초점을 둡니다.'],
      ['학습 기록은 어디에 저장되나요?', '레슨 완료 상태와 선택한 난이도는 현재 브라우저의 로컬 저장소에만 보관됩니다. 서버나 데이터베이스로 전송하지 않습니다.']
    ]
  },
  en: {
    metaTitle: 'Play Free Computer Chess and Learn | ChessStep',
    metaDescription: 'Play free chess against beginner, intermediate, or advanced computer opponents. Learn rules, tactics, openings, and endgames through English courses on mobile or desktop.',
    eyebrow: 'Free chess learning · Runs in your browser',
    h1: 'Play one game. Get <em>one step stronger.</em>',
    lead: 'No installation and no account. Play against three computer opponents, then follow structured courses that explain not only which move works, but why it works.',
    primary: 'Play the computer', secondary: 'Start the beginner course',
    proof: [['3 levels', 'computer opponents'], ['18', 'core lessons'], ['$0', 'all features']],
    benefitsHeading: 'Practice and learning work as one loop',
    benefitsLead: 'Instead of reading rules and stopping there, you can test every idea on the board, review the result, and return to the exact skill that needs work.',
    benefits: [
      { icon: '♞', title: 'Three computer opponents', text: 'The beginner opponent makes forgiving moves, intermediate catches basic tactics, and advanced searches deeper before replying.' },
      { icon: '◎', title: 'Level-based courses', text: 'Build from legal moves and king safety to candidate moves, positional evaluation, and practical planning.' },
      { icon: '↺', title: 'Undo and hints', text: 'Take back a move and reveal a suggestion so you can train the thinking process, not just protect a score.' }
    ],
    coursesHeading: 'Choose the course that fits your game',
    coursesLead: 'Every course combines short lessons, example positions, and board assignments. Completion is saved locally in your browser.',
    stats: [['100%', 'crawlable static HTML'], ['2', 'separate language URL sets'], ['64', 'keyboard-accessible squares'], ['0', 'external data requests']],
    faq: [
      ['Is everything really free?', 'Yes. Games, hints, takebacks, and all courses are free. No account or payment information is required.'],
      ['Can I play on a phone?', 'Yes. The board is responsive and supports drag-to-move play in modern Android and iPhone browsers, with tap selection as a fallback.'],
      ['How strong is the advanced computer?', 'It is a learning-oriented browser AI that searches several plies within a time limit. It is designed as a practical opponent for beginner and intermediate players, not as a tournament engine.'],
      ['Where is my course progress stored?', 'Lesson completion and your selected settings stay in this browser’s local storage. They are not sent to a server or database.']
    ]
  }
};

export const COURSE_SUMMARIES = {
  ko: [
    { key: 'beginner', level: '초급', title: '처음 시작하는 체스', description: '기물 이동, 체크와 체크메이트, 안전한 전개, 기본 엔드게임을 익힙니다.', duration: '약 90분', lessonCount: 6, topics: ['규칙과 기물 가치', '킹 안전', '기본 메이트'] },
    { key: 'intermediate', level: '중급', title: '전술과 후보수 훈련', description: '포크·핀·스큐어를 찾고, 상대의 위협을 읽으며, 매 수 후보수를 비교합니다.', duration: '약 120분', lessonCount: 6, topics: ['전술 패턴', '계산 순서', '오프닝 원칙'] },
    { key: 'advanced', level: '고급', title: '포지션 평가와 계획', description: '폰 구조, 약점, 기물 활동성, 전환 타이밍을 평가해 장기 계획을 세웁니다.', duration: '약 150분', lessonCount: 6, topics: ['포지션 평가', '프로필락시스', '엔드게임 전환'] }
  ],
  en: [
    { key: 'beginner', level: 'Beginner', title: 'Chess from the first move', description: 'Learn piece movement, check and mate, safe development, and essential endgames.', duration: 'About 90 min', lessonCount: 6, topics: ['Rules and values', 'King safety', 'Basic mates'] },
    { key: 'intermediate', level: 'Intermediate', title: 'Tactics and candidate moves', description: 'Spot forks, pins, and skewers, read threats, and compare candidate moves every turn.', duration: 'About 120 min', lessonCount: 6, topics: ['Tactical patterns', 'Calculation order', 'Opening principles'] },
    { key: 'advanced', level: 'Advanced', title: 'Evaluation and planning', description: 'Assess pawn structure, weaknesses, activity, and the right moment to transform the position.', duration: 'About 150 min', lessonCount: 6, topics: ['Position evaluation', 'Prophylaxis', 'Endgame transitions'] }
  ]
};

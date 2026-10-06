export const PLAY = {
  ko: {
    metaTitle: '컴퓨터와 무료 체스 두기 | ChessStep',
    metaDescription: '설치와 로그인 없이 브라우저에서 무료 체스를 두세요. 난이도 선택, 힌트, 되돌리기를 지원합니다.',
    title: '컴퓨터와 무료 체스 두기',
    intro: '난이도와 진영을 고른 뒤 기물을 끌어 도착 칸에 놓으세요. 대국은 서버로 전송되지 않고 현재 브라우저에서만 계산됩니다. 결과보다 매 수의 후보수와 상대 위협을 확인하는 연습에 활용해 보세요.',
    difficulty: [
      { title: '초급', text: '좋은 수와 실수를 섞어 두는 입문용 상대입니다. 규칙과 기본 전개를 익힐 때 적합합니다.' },
      { title: '중급', text: '기본 전술과 짧은 수읽기를 사용합니다. 한 수짜리 실수를 줄이고 후보수를 비교하는 훈련에 좋습니다.' },
      { title: '고급', text: '더 긴 시간과 깊이로 수를 탐색합니다. 포지션 계획을 세운 뒤 상대의 반박을 검증할 때 사용하세요.' }
    ],
    steps: [
      ['난이도와 진영 선택', '초급·중급·고급 중 하나와 백·흑·무작위를 선택합니다. 진영 변경은 새 대국부터 적용됩니다.'],
      ['기물 끌어서 놓기', '이동 가능한 칸이 표시됩니다. 폰이 마지막 랭크에 도달하면 승격 기물을 고를 수 있습니다.'],
      ['힌트는 생각한 뒤 사용', '먼저 후보수를 두세 개 만든 다음 힌트를 눌러 추천 수와 비교하면 학습 효과가 높습니다.'],
      ['대국 후 첫 실수 복기', '수 목록과 되돌리기를 이용해 처음 평가가 크게 나빠진 수를 찾아 대안을 생각합니다.']
    ],
    faq: [
      ['컴퓨터가 오프라인에서도 동작하나요?', '첫 페이지 로딩에 필요한 파일이 브라우저에 캐시되어 있다면 일부 환경에서 다시 열 수 있지만, 완전한 오프라인 앱을 보장하지는 않습니다. 대국 계산 자체는 외부 체스 API를 사용하지 않습니다.'],
      ['AI 난이도는 레이팅으로 얼마인가요?', '고정 레이팅을 제공하지 않습니다. 기기 성능과 포지션 복잡도에 따라 탐색 깊이가 달라지므로 학습 단계별 상대라고 보는 것이 정확합니다.'],
      ['대국을 저장할 수 있나요?', '현재 버전은 계정이나 서버 저장을 사용하지 않습니다. 대신 수 목록과 되돌리기 기능으로 한 판 안에서 복기할 수 있고, 전체 기보 내보내기는 확장하기 쉽도록 코드가 분리되어 있습니다.']
    ]
  },
  en: {
    metaTitle: 'Play Chess vs Computer | ChessStep',
    metaDescription: 'Play browser chess against the computer with levels, hints, and undo.',
    title: 'Play free chess against the computer',
    intro: 'Choose a level and side, then drag a piece to its destination. The game runs locally in your browser and is not sent to a server. Use it to practice candidate moves and threat awareness, not just to chase a result.',
    difficulty: [
      { title: 'Beginner', text: 'Makes a mix of reasonable moves and mistakes. Best for learning legal moves, development, and basic checkmates.' },
      { title: 'Intermediate', text: 'Calculates short lines and catches basic tactics. Good for reducing one-move blunders and comparing candidates.' },
      { title: 'Advanced', text: 'Searches deeper before choosing a reply. Use it to test a positional plan against a more demanding opponent.' }
    ],
    steps: [
      ['Choose a difficulty and side', 'Select beginner, intermediate, or advanced and play White, Black, or a random side. Side changes apply to the next game.'],
      ['Drag a piece to move', 'Legal destinations are highlighted. When a pawn reaches the last rank, choose the promotion piece.'],
      ['Think before asking for a hint', 'Generate two or three candidates first, then compare your choice with the suggested move.'],
      ['Review the first serious mistake', 'Use the move list and undo to locate the first move that seriously changed the position, then calculate an alternative.']
    ],
    faq: [
      ['Does the computer work offline?', 'The chess calculation itself uses no external chess API. A previously cached page may reopen in some environments, but this version does not guarantee a fully offline app.'],
      ['What rating is each AI level?', 'There is no fixed rating. Search depth varies with device speed and position complexity, so the levels are better understood as learning stages.'],
      ['Can I save a game?', 'This version uses no account or server storage. You can review the current game with the move list and undo, and the code is structured so PGN export can be added later.']
    ]
  }
};

export const LEARN = {
  ko: {
    metaTitle: '무료 체스 학습 코스 | ChessStep',
    metaDescription: '체스 규칙부터 전술, 오프닝, 포지션 평가, 엔드게임까지 18개 무료 레슨으로 배우세요.',
    title: '초급부터 고급까지 체스 학습 로드맵',
    intro: '레이팅 숫자보다 현재 반복되는 실수에 맞춰 코스를 선택하세요. 각 단계는 여섯 개 핵심 레슨으로 구성되며, 읽기와 대국, 복기를 하나의 주기로 연결합니다.',
    path: [
      ['1', '초급: 합법적인 수와 킹 안전', '기물 이동을 자동화하고, 중앙 전개와 캐슬링, 기본 메이트, 블런더 체크를 습관으로 만듭니다.'],
      ['2', '중급: 전술 탐색과 후보수', '포크·핀·제거를 패턴으로 인식하고 체크·잡기·위협 순서로 계산합니다.'],
      ['3', '고급: 평가와 계획', '폰 구조와 기물 활동성, 상대 계획, 교환 후 포지션을 비교해 장기 계획을 세웁니다.']
    ],
    diagnosticTitle: '어느 코스부터 시작할까요?',
    diagnostic: [
      ['초급이 맞는 경우', '캐슬링 조건이 헷갈리거나, 한 수에 기물을 자주 잃거나, 퀸·룩 메이트가 아직 불안합니다.'],
      ['중급이 맞는 경우', '규칙은 알지만 전술이 있는지 없는지 찾는 절차가 없고, 첫 수를 직감으로 바로 두는 편입니다.'],
      ['고급이 맞는 경우', '전술 실수는 줄었지만 조용한 포지션에서 계획을 세우기 어렵고, 교환과 폰 브레이크 판단을 체계화하고 싶습니다.']
    ],
    methodTitle: '가장 효과적인 사용 순서',
    method: ['레슨을 읽고 핵심 포인트를 한 문장으로 요약합니다.', '관련 난이도의 컴퓨터와 한 판 둡니다.', '힌트를 보기 전에 자신의 후보수와 계산을 기록합니다.', '첫 번째 큰 실수를 해당 코스 주제로 분류해 다음 목표로 사용합니다.']
  },
  en: {
    metaTitle: 'Free Chess Courses | ChessStep',
    metaDescription: 'Learn rules, tactics, openings, evaluation, and endgames in 18 free lessons.',
    title: 'A chess learning roadmap from beginner to advanced',
    intro: 'Choose your starting point by the mistakes you repeat, not by a rating label. Each stage has six focused lessons and connects reading, playing, and review in one cycle.',
    path: [
      ['1', 'Beginner: Legal moves and king safety', 'Make piece movement automatic, then add central development, castling, basic mates, and a final blunder check.'],
      ['2', 'Intermediate: Tactical search and candidates', 'Recognize forks, pins, and removal, then calculate checks, captures, and threats in order.'],
      ['3', 'Advanced: Evaluation and planning', 'Compare pawn structure, activity, the opponent’s plan, and the resulting position after exchanges.']
    ],
    diagnosticTitle: 'Where should you start?',
    diagnostic: [
      ['Start with beginner', 'Castling conditions are unclear, pieces are often lost in one move, or queen and rook mates are not yet reliable.'],
      ['Start with intermediate', 'You know the rules but have no process for detecting tactics and often play the first move that looks natural.'],
      ['Start with advanced', 'Tactical errors are less frequent, but quiet positions, exchanges, and pawn-break decisions still feel unstructured.']
    ],
    methodTitle: 'The most effective study loop',
    method: ['Read one lesson and summarize the key point in one sentence.', 'Play one game against the matching computer difficulty.', 'Record your candidates before using a hint.', 'Classify the first major mistake by course topic and use it as the next game goal.']
  }
};

export const GUIDES = {
  rules: {
    ko: {
      metaTitle: '체스 규칙 총정리 | ChessStep',
      metaDescription: '체스판 배치, 기물별 이동, 체크·체크메이트, 캐슬링, 앙파상, 폰 승격, 무승부 규칙을 직관적인 다이어그램과 함께 배우세요.',
      title: '체스 규칙: 처음 두기 전에 알아야 할 모든 것',
      intro: '체스는 상대 킹을 실제로 잡는 게임이 아니라, 피할 수 없는 외통수인 체크메이트(Checkmate)를 완성하는 게임입니다. 아래 가이드를 따라 기물의 이동과 핵심 규칙을 한눈에 익혀보세요.',
      sections: [
        {
          id: 'setup',
          title: '1. 체스판과 초기 배치',
          paragraphs: [
            '체스판은 가로 8열(파일 a~h)과 세로 8행(랭크 1~8)으로 이루어진 총 64개의 격자 칸입니다. 체스를 시작하기 전 반드시 기억해야 할 3가지 기본 세팅 원칙이 있습니다.'
          ],
          setupRules: [
            { badge: '원칙 1', title: '오른쪽 아래는 밝은 칸 (h1)', text: '체스판을 마주보았을 때 각 플레이어 기준 오른쪽 맨 아래 구석 칸(백 h1, 흑 a8)은 항상 밝은색 칸이어야 합니다 (White on right is light).' },
            { badge: '원칙 2', title: '퀸은 자기 색 칸에 (d1, d8)', text: '백 퀸은 밝은 칸(d1), 흑 퀸은 어두운 칸(d8)에 서로 정면으로 마주보게 놓입니다 (Queen on her color). 킹은 그 옆인 e열에 놓입니다.' },
            { badge: '원칙 3', title: '백(White)의 항상 선공', text: '체스는 항상 백이 첫 수를 두며, 양 플레이어가 번갈아가며 한 수씩 둡니다. 자신의 차례를 건너뛰는(패스) 것은 불가능합니다.' }
          ],
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          marks: { h1: 'highlight', d1: 'highlight', d8: 'highlight' },
          caption: '표준 초기 배치. 오른쪽 아래 구석(h1)과 퀸의 시작 위치(백 d1, 흑 d8)가 하이라이트로 강조되어 있습니다.',
          bullets: [
            '1랭크(백)와 8랭크(흑)에 주요 기물(양 끝부터 룩·나이트·비숍·퀸·킹·비숍·나이트·룩)이 놓입니다.',
            '2랭크(백)와 7랭크(흑)에는 8개의 폰이 빈틈없이 일렬로 배치됩니다.',
            '기물 배치가 끝나면 백부터 첫 수를 시작합니다.'
          ]
        },
        {
          id: 'pieces',
          title: '2. 기물별 이동 방식과 가치',
          paragraphs: [
            '체스의 6가지 기물은 각각 고유한 이동 방식과 점수(가치)를 지닙니다. 아래 탭에서 기물을 선택하면 이동할 수 있는 칸(초록 점)과 잡을 수 있는 상대 말(붉은 링)이 체스판에 직관적으로 표시됩니다.',
            '기물은 아군 기물이 있는 칸으로 갈 수 없으며, 상대 기물이 있는 칸에 착지하면 그 기물을 잡고(Capture) 판에서 제거합니다.'
          ],
          pieces: [
            {
              id: 'pawn',
              icon: '♙',
              name: '폰 (Pawn)',
              value: '1점',
              type: '전진 이동 & 대각선 잡기',
              fen: '8/8/8/8/8/3p1n2/4P3/8 w - - 0 1',
              marks: { e2: 'selected', e3: 'legal', e4: 'legal', d3: 'capture', f3: 'capture' },
              caption: 'e2 백 폰: 앞으로 1칸(e3) 또는 첫 수에 2칸(e4) 전진할 수 있고(초록 점), 대각선 앞(d3, f3)의 적을 잡을 수 있습니다(붉은 링).',
              moveText: '앞으로만 1칸씩 전진합니다. 단, 아직 한 번도 움직이지 않은 시작 랭크(2랭크)에서는 첫 수에 한해 앞으로 2칸을 한 번에 전진할 수 있습니다. 뒤나 옆으로는 절대 갈 수 없습니다.',
              captureText: '직진할 때는 상대 기물을 잡을 수 없습니다! 오직 대각선 앞 1칸(d3, f3)에 있는 상대 기물만 잡을 수 있습니다. 바로 앞 칸이 막혀 있으면 전진할 수 없습니다.',
              tip: '폰은 점수가 1점으로 가장 낮지만, 반대편 끝(8랭크)에 도달하면 가장 강력한 퀸으로 승격(Promotion)할 수 있는 무한한 잠재력을 가집니다.'
            },
            {
              id: 'knight',
              icon: '♘',
              name: '나이트 (Knight)',
              value: '3점',
              type: 'L자 점프 (기물 뛰어넘기)',
              fen: '8/8/5p2/2r1p3/4N3/4P3/8/8 w - - 0 1',
              marks: { e4: 'selected', c3: 'legal', d2: 'legal', d6: 'legal', f2: 'legal', g3: 'legal', g5: 'legal', c5: 'capture', f6: 'capture' },
              caption: 'e4 나이트가 점프할 수 있는 8개의 L자 착지 칸. e3·e5의 폰을 뛰어넘어 빈 칸(초록 점)으로 이동하거나 적 기물(c5, f6 붉은 링)을 잡습니다.',
              moveText: '‘L자’ 모양으로 움직입니다: 한 방향으로 2칸 직진 후 수직으로 1칸 꺾이거나, 1칸 직진 후 2칸 꺾입니다. 착지 칸의 색상은 항상 출발 칸과 반대 색상(밝은 칸↔어두운 칸)이 됩니다.',
              captureText: '체스에서 유일하게 다른 기물을 뛰어넘을 수 있는 특수 능력이 있습니다! 중간에 아군이나 적군이 길을 막고 있어도 무시하고 최종 L자 도착 칸의 상대 기물을 잡습니다.',
              tip: '중앙에 위치한 나이트는 8개 칸을 제어하지만, 구석(a1 등)에 있는 나이트는 2개 칸밖에 제어하지 못합니다. 나이트는 중앙으로 전개하는 것이 핵심입니다.'
            },
            {
              id: 'bishop',
              icon: '♗',
              name: '비숍 (Bishop)',
              value: '3점',
              type: '대각선 무제한',
              fen: '8/1r6/8/8/4B3/8/6P1/8 w - - 0 1',
              marks: { e4: 'selected', b7: 'capture', d5: 'legal', c6: 'legal', f5: 'legal', g6: 'legal', h7: 'legal', d3: 'legal', c2: 'legal', b1: 'legal', f3: 'legal' },
              caption: 'e4 비숍은 대각선을 따라 전진합니다. b7의 적 룩을 잡을 수 있고(붉은 링), 장애물(g2 아군 폰, b7 너머 a8) 뒤로는 뛰어넘을 수 없습니다.',
              moveText: '자신이 놓여 있는 대각선 4방향으로 원하는 칸 수만큼 자유롭게 전진하거나 후퇴할 수 있습니다. 다른 기물을 뛰어넘을 수는 없습니다.',
              captureText: '대각선 이동 경로상에 위치한 첫 번째 상대 기물을 잡고 그 자리에 멈춰 섭니다.',
              tip: '비숍은 게임 내내 자신이 처음 시작한 칸의 색깔(밝은 칸 또는 어두운 칸)로만 영원히 다닙니다. 두 비숍(비숍 페어)을 보존하면 판 전체의 모든 대각선을 지배할 수 있습니다.'
            },
            {
              id: 'rook',
              icon: '♖',
              name: '룩 (Rook)',
              value: '5점',
              type: '가로·세로 직선 무제한',
              fen: '8/4n3/8/8/1P2R3/8/8/8 w - - 0 1',
              marks: { e4: 'selected', e7: 'capture', e5: 'legal', e6: 'legal', c4: 'legal', d4: 'legal', f4: 'legal', g4: 'legal', h4: 'legal', e3: 'legal', e2: 'legal', e1: 'legal' },
              caption: 'e4 룩은 가로와 세로 십자 방향으로 뻗어나갑니다. e7의 적 나이트를 잡을 수 있으며(붉은 링), b4 아군 폰이나 e7 너머로는 갈 수 없습니다.',
              moveText: '가로 방향과 세로 방향 직선으로 장애물이 없는 한 원하는 칸 수만큼 끝까지 이동할 수 있습니다.',
              captureText: '직선 이동 경로상에 놓인 첫 번째 상대 기물을 잡고 그 위치를 차지합니다.',
              tip: '룩은 5점의 높은 가치를 지닌 중기물(Major Piece)입니다. 폰이 없는 ‘열린 파일(Open File)’이나 7랭크에 룩을 배치하면 상대 진영을 맹폭할 수 있습니다.'
            },
            {
              id: 'queen',
              icon: '♕',
              name: '퀸 (Queen)',
              value: '9점',
              type: '직선 + 대각선 (최강 기물)',
              fen: '8/4r3/6n1/8/4Q3/8/8/8 w - - 0 1',
              marks: { e4: 'selected', e7: 'capture', g6: 'capture', e5: 'legal', e6: 'legal', a4: 'legal', b4: 'legal', c4: 'legal', d4: 'legal', f4: 'legal', g4: 'legal', h4: 'legal', e3: 'legal', e2: 'legal', e1: 'legal', d5: 'legal', c6: 'legal', b7: 'legal', a8: 'legal', f5: 'legal', d3: 'legal', c2: 'legal', b1: 'legal', f3: 'legal', g2: 'legal', h1: 'legal' },
              caption: '체스 최강의 기물 e4 퀸. 룩의 십자 이동과 비숍의 대각선 이동을 합쳐 무려 8방향 25개 칸을 장악하며 e7과 g6의 적을 잡을 수 있습니다.',
              moveText: '룩(가로·세로 직선)과 비숍(대각선)의 능력을 동시에 지닌 체스 최강의 기물입니다. 8방향 어디로든 원하는 만큼 이동합니다(뛰어넘기는 불가).',
              captureText: '가로, 세로, 대각선 경로상에서 마주치는 첫 번째 상대 기물을 잡을 수 있습니다.',
              tip: '가장 강력하고 가치가 높은(9점) 기물이므로, 오프닝 초반에 너무 일찍 꺼내면 상대 나이트나 폰에게 쫓겨 소중한 전개 템포를 잃을 수 있습니다.'
            },
            {
              id: 'king',
              icon: '♔',
              name: '킹 (King)',
              value: '무한대 (승패 직결)',
              type: '모든 방향 1칸 (절대 보호)',
              fen: '3r4/8/8/4p3/4K3/8/8/8 w - - 0 1',
              marks: { e4: 'selected', e5: 'capture', d3: 'danger', d4: 'danger', d5: 'danger', e3: 'legal', f3: 'legal', f4: 'legal', f5: 'legal' },
              caption: 'e4 킹은 사방 1칸씩 이동합니다. e5 적 폰을 잡을 수 있지만(붉은 링), d열(d3, d4, d5)은 적 룩의 공격선(위험 칸)이므로 스스로 들어갈 수 없습니다.',
              moveText: '가로, 세로, 대각선 모든 방향으로 딱 1칸씩만 이동할 수 있습니다.',
              captureText: '인접한 칸에 있는 상대 기물을 잡을 수 있습니다. 단, 그 기물이 다른 상대 기물의 보호를 받고 있다면 잡을 수 없습니다(자신이 체크당하기 때문).',
              tip: '절대 규칙: 킹은 상대 기물에게 공격받는 위험한 칸으로 스스로 걸어 들어갈 수 없습니다! 킹이 체크메이트당하면 게임이 즉시 패배로 끝납니다.'
            }
          ]
        },
        {
          id: 'check',
          title: '3. 체크, 체크메이트, 스테일메이트',
          paragraphs: [
            '체크는 내 킹이 상대 기물에게 직접 공격받고 있다는 강력한 경고입니다. 체크를 당하면 다른 작전은 모두 중단하고 반드시 그 공격부터 해결해야 합니다.',
            '체크를 벗어나는 방법은 전 세계 공통의 3가지 공식, 즉 CPR 법칙(Capture 잡기, Protect 막기, Run 피하기)뿐입니다. 이 세 가지가 모두 불가능한 상황이 바로 ‘체크메이트’입니다.'
          ],
          cprCards: [
            { letter: 'C', title: 'Capture (공격자 잡기)', text: '내 킹을 위협하고 있는 상대 기물을 킹이나 다른 내 기물로 직접 잡아서 위협을 원천 제거합니다.' },
            { letter: 'P', title: 'Protect (공격선 막기)', text: '원거리 공격 기물(퀸·룩·비숍)과 킹 사이의 길목에 내 기물을 끼워 넣어 방패로 막습니다. (나이트는 뛰어넘으므로 막기 불가!)' },
            { letter: 'R', title: 'Run (안전한 칸으로 피하기)', text: '공격받지 않는 인접한 안전한 빈 칸으로 킹을 직접 이동시켜 대피합니다.' }
          ],
          compareCards: [
            { type: 'is-check', title: '체크 (Check)', tag: '위험 경고', formula: '킹 공격당함 + CPR 탈출 가능', text: '게임이 끝나지 않습니다. 다음 한 수에서 잡기, 막기, 피하기 중 하나로 킹을 반드시 안전하게 만들어야 합니다.' },
            { type: 'is-mate', title: '체크메이트 (Checkmate)', tag: '게임 종료 (승리/패배)', formula: '킹 공격당함 + CPR 탈출 불가', text: '피할 수 없는 완벽한 공격! 체크를 건 쪽이 즉시 승리하며 대국이 종료됩니다. 기보 표기는 #' },
            { type: 'is-stalemate', title: '스테일메이트 (Stalemate)', tag: '무승부 (비김)', formula: '킹 공격 안 당함 + 둘 수 있는 수 0개', text: '체크가 아닌데 합법적인 수가 전혀 없습니다! 아무리 기물이 많아도 즉시 무승부로 판정되는 초보자 최대 함정입니다.' }
          ],
          fen: '7k/6Q1/5K2/8/8/8/8/8 b - - 0 1',
          marks: { h8: 'check', g7: 'selected' },
          caption: '체크메이트 상황: 백 퀸(g7)이 흑 킹(h8)을 체크했고, 백 킹(f6)이 퀸을 지키고 있어 흑은 잡을 수도, 막을 수도, 피할 칸도 없어 백의 승리입니다.'
        },
        {
          id: 'special',
          title: '4. 특수 규칙 3가지 (캐슬링·앙파상·승격)',
          paragraphs: [
            '체스에는 일반적인 기물 이동과 다른 세 가지 특별한 규칙이 존재합니다. 킹을 안전하게 숨기는 ‘캐슬링’, 스쳐 지나간 폰을 잡는 ‘앙파상’, 그리고 폰이 최강 기물로 진화하는 ‘승격’입니다.'
          ],
          specialRules: [
            {
              title: '1. 캐슬링 (Castling: 킹과 룩의 동시 이동)',
              boards: [
                {
                  label: '캐슬링 준비 상태',
                  fen: 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1',
                  marks: { e1: 'selected', g1: 'legal', c1: 'legal', h1: 'highlight', a1: 'highlight' },
                  caption: '백 킹(e1)과 룩(a1, h1)이 아직 움직이지 않았고 사이의 길이 비어 있습니다.'
                },
                {
                  label: '킹사이드 캐슬링 완료 (O-O)',
                  fen: 'r3k2r/8/8/8/8/8/8/R4RK1 b kq - 1 1',
                  marks: { e1: 'from', g1: 'to', h1: 'from', f1: 'to' },
                  caption: '킹이 오른쪽으로 2칸(g1) 대피하고, h1 룩이 킹을 뛰어넘어 f1에 배치되었습니다.'
                }
              ],
              paragraphs: [
                '한 번의 수로 킹과 룩을 동시에 움직여, 킹을 안전한 구석으로 대피시키고 룩을 중앙으로 출격시키는 유일한 특수 수입니다.'
              ],
              bullets: [
                '킹사이드 캐슬링 (O-O, 짧은 캐슬링): 백 킹이 오른쪽으로 2칸(g1) 이동하고, h1 룩이 킹을 뛰어넘어 f1에 착지합니다.',
                '퀸사이드 캐슬링 (O-O-O, 긴 캐슬링): 백 킹이 왼쪽으로 2칸(c1) 이동하고, a1 룩이 킹을 뛰어넘어 d1에 착지합니다.',
                '❌ 3대 금지 조건: ① 킹이나 해당 룩이 이미 움직인 적이 있을 때 ② 현재 킹이 체크 상태일 때 ③ 킹이 지나가거나 도착할 칸이 상대에게 공격받고 있을 때. (단, 룩이 공격받는 것은 캐슬링에 지장이 없습니다!)'
              ]
            },
            {
              title: '2. 앙파상 (En Passant: 스쳐 지나간 폰 잡기)',
              boards: [
                {
                  label: '흑 폰의 2칸 전진 직후',
                  fen: '8/8/8/3pP3/8/8/8/8 w - d6 0 1',
                  marks: { e5: 'selected', d6: 'legal', d5: 'capture' },
                  caption: '흑이 d7에서 d5로 2칸 급전진한 바로 그 순간, 백 폰(e5)이 d6으로 가면서 d5 폰을 잡을 수 있습니다.'
                },
                {
                  label: '앙파상 포획 완료',
                  fen: '8/8/3P4/8/8/8/8/8 b - - 0 1',
                  marks: { e5: 'from', d6: 'to' },
                  caption: '백 폰이 d6에 착지하고, 스쳐 지나갔던 d5 흑 폰은 체스판에서 완전히 제거되었습니다.'
                }
              ],
              paragraphs: [
                '상대 폰이 시작 위치에서 2칸 전진하여 내 폰(e5) 바로 옆(d5)에 나란히 도착했을 때 발생하는 특별한 포획 규칙입니다.'
              ],
              bullets: [
                '내 폰(e5)이 상대 폰이 스쳐 지나간 대각선 뒤 칸(d6)으로 이동하면서 d5의 상대 폰을 체스판에서 제거합니다.',
                '⚠️ 엄격한 타이밍: 상대 폰이 2칸 전진한 ‘바로 그 다음 한 수’에만 행사할 수 있습니다! 다른 수를 두면 앙파상 권리는 영구히 사라집니다.'
              ]
            },
            {
              title: '3. 폰 승격 (Promotion: 폰의 궁극적 진화)',
              boards: [
                {
                  label: '승격 1칸 전',
                  fen: '4k3/4P3/8/8/8/8/8/4K3 w - - 0 1',
                  marks: { e7: 'selected', e8: 'legal' },
                  caption: 'e7 백 폰이 상대 끝선인 8랭크(e8)로 1칸만 전진하면 그 즉시 승격이 발동합니다.'
                },
                {
                  label: '퀸으로 즉시 변신',
                  fen: '4Qk2/8/8/8/8/8/8/4K3 b - - 0 1',
                  marks: { e7: 'from', e8: 'to' },
                  caption: '가장 약한 1점짜리 폰이 8랭크에 닿아 최강의 9점짜리 퀸으로 진화하여 적 킹을 위협합니다.'
                }
              ],
              paragraphs: [
                '가장 약한 1점짜리 폰이 상대 진영 끝(백은 8랭크, 흑은 1랭크)까지 완주하면, 그 즉시 퀸, 룩, 비숍, 나이트 중 원하는 기물로 변신합니다.'
              ],
              bullets: [
                '판 위에 이미 퀸이 살아있어도 두 번째, 세 번째 퀸을 새로 만들 수 있습니다.',
                '실전에서는 95% 이상 가장 강력한 퀸을 선택하지만, 스테일메이트를 피하기 위해 나이트로 승격하는 절묘한 전술도 존재합니다.'
              ]
            }
          ]
        },
        {
          id: 'draws',
          title: '5. 무승부 조건 5가지',
          paragraphs: [
            '체스는 어느 한쪽의 승리로 끝나지 않고 무승부(Draw)로 끝나는 경우가 자주 발생합니다. 무승부 조건을 정확히 알아야 불리한 판을 비기거나, 다 이긴 판을 비기는 참사를 막을 수 있습니다.'
          ],
          fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1',
          marks: { h8: 'danger', f7: 'selected' },
          caption: '대표적인 스테일메이트: 흑 킹은 체크가 아니지만, 둘 수 있는 합법적인 수가 전혀 없어 즉시 무승부로 끝납니다.',
          bullets: [
            '1. 스테일메이트 (Stalemate): 킹이 체크 상태가 아닌데 합법적인 수가 하나도 없을 때 (초보자가 가장 많이 범하는 무승부)',
            '2. 기물 부족 무승부 (Insufficient Material): 킹 대 킹, 킹+비숍 대 킹, 킹+나이트 대 킹처럼 양쪽 모두 체크메이트가 불가능한 기물만 남았을 때',
            '3. 3회 동형반복 (Threefold Repetition): 판의 기물 배치와 둘 수 있는 권리가 완전히 동일하게 3번 반복되었을 때',
            '4. 50수 규칙 (Fifty-Move Rule): 양 플레이어가 폰의 이동이나 기물 잡기 없이 연속 50수를 두었을 때',
            '5. 합의 무승부 (Draw by Agreement): 두 대국자가 대국 도중 무승부에 상호 합의했을 때'
          ]
        },
        {
          id: 'notation',
          title: '6. 체스 기보(표기법) 읽기',
          paragraphs: [
            '체스 기보(대수 표기법, Algebraic Notation)는 체스판에서 일어나는 모든 수를 전 세계 공통으로 기록하는 언어입니다. 기보를 읽을 줄 알면 자신의 대국을 복기하고 체스 책과 강좌를 쉽게 이해할 수 있습니다.'
          ],
          notationTable: [
            { sym: 'K / Q / R / B / N', meaning: '기물 약자', example: 'Nf3', desc: '킹(K), 퀸(Q), 룩(R), 비숍(B), 나이트(N). 폰은 기호 없이 칸 이름만 표기.' },
            { sym: 'e4 / d5', meaning: '폰 이동', example: '1. e4 e5', desc: '폰은 기물 글자 없이 도착 칸의 좌표만 적습니다.' },
            { sym: 'x', meaning: '기물 잡기 (Capture)', example: 'Bxf7', desc: '비숍이 f7 칸의 상대 기물을 잡았음을 의미합니다.' },
            { sym: '+', meaning: '체크 (Check)', example: 'Qh7+', desc: '퀸이 h7으로 이동하여 상대 킹을 체크했습니다.' },
            { sym: '#', meaning: '체크메이트 (Checkmate)', example: 'Qxf7#', desc: 'f7에서 기물을 잡으며 체크메이트로 게임이 끝났습니다.' },
            { sym: 'O-O', meaning: '킹사이드 캐슬링', example: 'O-O', desc: '오른쪽 짧은 캐슬링 (킹이 g열로 이동).' },
            { sym: 'O-O-O', meaning: '퀸사이드 캐슬링', example: 'O-O-O', desc: '왼쪽 긴 캐슬링 (킹이 c열로 이동).' },
            { sym: '=Q', meaning: '폰 승격 (Promotion)', example: 'e8=Q', desc: 'e8에 도달한 폰이 퀸으로 승격되었습니다.' }
          ],
          fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
          marks: { e4: 'selected', f3: 'selected' },
          caption: '백의 1. e4(폰 전진)와 2. Nf3(나이트 전개)가 적용된 포지션입니다.'
        }
      ],
      faq: [
        ['킹을 실제로 체스판에서 잡나요?', '아니요. 킹은 결코 물리적으로 잡히지 않습니다. 피할 수 없는 체크인 체크메이트가 완성되는 순간 대국이 즉시 종료됩니다.'],
        ['캐슬링할 때 룩이 공격받고 있어도 되나요?', '네, 가능합니다! 킹의 출발 칸, 지나가는 칸, 도착 칸만 안전하다면 룩이 공격받고 있어도 캐슬링할 수 있습니다.'],
        ['폰은 언제 두 칸 움직일 수 있나요?', '각 폰이 게임 시작 위치인 자신의 초기 랭크(백은 2랭크, 흑은 7랭크)에 있고 앞의 두 칸이 모두 비어 있을 때 첫 이동에 한해 두 칸 전진할 수 있습니다.'],
        ['스테일메이트와 체크메이트의 결정적 차이는 무엇인가요?', '현재 킹이 “체크를 당하고 있는가”입니다. 체크를 당하고 있는데 피할 수 없으면 체크메이트(패배), 체크를 당하지 않았는데 둘 수 있는 수가 전혀 없으면 스테일메이트(무승부)입니다.']
      ]
    },
    en: {
      metaTitle: 'Chess Rules Guide | ChessStep',
      metaDescription: 'Learn board setup, piece moves, checkmate, castling, en passant, and draws.',
      title: 'Chess rules: Everything before your first game',
      intro: 'Chess is not won by capturing the king physically. The goal is checkmate: an inescapable attack against the king. Follow this visual guide to master the rules at a glance.',
      sections: [
        {
          id: 'setup',
          title: '1. Board and starting position',
          paragraphs: [
            'A chessboard consists of 64 light and dark squares in an 8×8 grid with files a through h along the bottom and ranks 1 through 8 on the side. Keep three setup principles in mind before every game.'
          ],
          setupRules: [
            { badge: 'Rule 1', title: 'White on right is light (h1)', text: 'From each player’s view, the bottom-right corner square (h1 for White, a8 for Black) must always be a light-colored square.' },
            { badge: 'Rule 2', title: 'Queen on her own color (d1, d8)', text: 'White queen begins on light d1 and Black queen on dark d8, facing each other directly across the board. Kings stand on the e-file.' },
            { badge: 'Rule 3', title: 'White always moves first', text: 'White always plays the opening move. Players alternate one move at a time, and neither player may pass a turn.' }
          ],
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          marks: { h1: 'highlight', d1: 'highlight', d8: 'highlight' },
          caption: 'Standard starting position. The lower-right corner (h1) and queen home squares (White d1, Black d8) are highlighted.',
          bullets: [
            'Major and minor pieces occupy the 1st (White) and 8th (Black) ranks: R, N, B, Q, K, B, N, R from left to right.',
            'Eight pawns line up along the 2nd (White) and 7th (Black) ranks.',
            'Once setup is complete, White plays the first move.'
          ]
        },
        {
          id: 'pieces',
          title: '2. How the pieces move and their values',
          paragraphs: [
            'Each of the six chess pieces has a distinct movement pattern, capture mechanism, and strategic point value. Click any piece tab below to view legal destination squares (green dots) and capture targets (red rings).',
            'Pieces cannot land on squares occupied by friendly pieces. When landing on an enemy square, the enemy piece is captured and removed from play.'
          ],
          pieces: [
            {
              id: 'pawn',
              icon: '♙',
              name: 'Pawn',
              value: '1 pt',
              type: 'Forward move & diagonal capture',
              fen: '8/8/8/8/8/3p1n2/4P3/8 w - - 0 1',
              marks: { e2: 'selected', e3: 'legal', e4: 'legal', d3: 'capture', f3: 'capture' },
              caption: 'White pawn on e2: Advances 1 square (e3) or 2 squares on its first move (e4, green dots), and captures diagonally forward on d3 and f3 (red rings).',
              moveText: 'Moves straight forward one square at a time. From its starting rank (2nd for White, 7th for Black), it has the option to advance two squares forward. Pawns can never move backward.',
              captureText: 'Cannot capture moving straight ahead! Pawns capture exclusively one square diagonally forward. If a piece blocks the square directly in front, the pawn cannot advance.',
              tip: 'Although worth only 1 point, pawns possess game-changing potential: reaching the 8th rank promotes them into a Queen!'
            },
            {
              id: 'knight',
              icon: '♘',
              name: 'Knight',
              value: '3 pts',
              type: 'L-shape jump (can leap)',
              fen: '8/8/5p2/2r1p3/4N3/4P3/8/8 w - - 0 1',
              marks: { e4: 'selected', c3: 'legal', d2: 'legal', d6: 'legal', f2: 'legal', g3: 'legal', g5: 'legal', c5: 'capture', f6: 'capture' },
              caption: 'Knight on e4 commands 8 L-shaped squares. It leaps over intervening pawns on e3 and e5 to reach legal squares (green dots) and capture enemy targets (c5, f6 in red rings).',
              moveText: 'Moves in an L-shape: two squares along a rank/file and one square perpendicularly. The landing square always alternates between light and dark.',
              captureText: 'The only piece in chess that can jump over other pieces! It captures enemy pieces that sit on its final landing square.',
              tip: 'A centralized knight controls up to 8 squares, whereas a corner knight controls only 2. Always develop knights toward the center.'
            },
            {
              id: 'bishop',
              icon: '♗',
              name: 'Bishop',
              value: '3 pts',
              type: 'Unlimited diagonal rays',
              fen: '8/1r6/8/8/4B3/8/6P1/8 w - - 0 1',
              marks: { e4: 'selected', b7: 'capture', d5: 'legal', c6: 'legal', f5: 'legal', g6: 'legal', h7: 'legal', d3: 'legal', c2: 'legal', b1: 'legal', f3: 'legal' },
              caption: 'Bishop on e4 sweeps along diagonals. It captures the rook on b7 (red ring) but cannot leap past obstacles (blocked at g2 and behind b7).',
              moveText: 'Moves diagonally across open squares for any distance forward or backward. It cannot jump over other pieces.',
              captureText: 'Captures the first enemy piece along its diagonal ray, coming to rest on that square.',
              tip: 'A bishop is forever locked to its starting square color. Preserving both bishops (the bishop pair) gives you dominion over all 64 squares.'
            },
            {
              id: 'rook',
              icon: '♖',
              name: 'Rook',
              value: '5 pts',
              type: 'Unlimited horizontal & vertical rays',
              fen: '8/4n3/8/8/1P2R3/8/8/8 w - - 0 1',
              marks: { e4: 'selected', e7: 'capture', e5: 'legal', e6: 'legal', c4: 'legal', d4: 'legal', f4: 'legal', g4: 'legal', h4: 'legal', e3: 'legal', e2: 'legal', e1: 'legal' },
              caption: 'Rook on e4 projects orthogonal power along ranks and files. It captures the knight on e7 (red ring) but cannot pass through b4 or behind e7.',
              moveText: 'Moves along open ranks and files for any number of squares until an obstacle is reached.',
              captureText: 'Captures the first enemy piece on its rank or file and occupies that square.',
              tip: 'Rooks are major pieces (5 pts). Place them on open files with no pawns, or penetrate onto the 7th rank to terrorize the enemy position.'
            },
            {
              id: 'queen',
              icon: '♕',
              name: 'Queen',
              value: '9 pts',
              type: 'Orthogonal + diagonal (most powerful)',
              fen: '8/4r3/6n1/8/4Q3/8/8/8 w - - 0 1',
              marks: { e4: 'selected', e7: 'capture', g6: 'capture', e5: 'legal', e6: 'legal', a4: 'legal', b4: 'legal', c4: 'legal', d4: 'legal', f4: 'legal', g4: 'legal', h4: 'legal', e3: 'legal', e2: 'legal', e1: 'legal', d5: 'legal', c6: 'legal', b7: 'legal', a8: 'legal', f5: 'legal', d3: 'legal', c2: 'legal', b1: 'legal', f3: 'legal', g2: 'legal', h1: 'legal' },
              caption: 'Queen on e4 combines rook and bishop movements to control 25 squares across 8 directions, ready to capture on e7 and g6 (red rings).',
              moveText: 'Combines the movement of both Rook and Bishop. She glides along ranks, files, and diagonals for any distance without leaping.',
              captureText: 'Captures along any of its 8 radiating rays, taking the place of the target piece.',
              tip: 'Because the Queen is your most valuable piece (9 pts), avoid deploying her too early where enemy minor pieces can chase her with tempo.'
            },
            {
              id: 'king',
              icon: '♔',
              name: 'King',
              value: 'Infinite (vital)',
              type: 'One square any direction',
              fen: '3r4/8/8/4p3/4K3/8/8/8 w - - 0 1',
              marks: { e4: 'selected', e5: 'capture', d3: 'danger', d4: 'danger', d5: 'danger', e3: 'legal', f3: 'legal', f4: 'legal', f5: 'legal' },
              caption: 'King on e4 steps 1 square in any direction. It can capture e5 (red ring), but can NEVER step onto squares on the d-file (d3, d4, d5 in red) attacked by the d8 rook.',
              moveText: 'Moves exactly one square in any direction: horizontally, vertically, or diagonally.',
              captureText: 'Can capture any adjacent unprotected enemy piece.',
              tip: 'Absolute rule: The King may NEVER move onto a square attacked by an enemy piece. If your king is checkmated, the game is over.'
            }
          ]
        },
        {
          id: 'check',
          title: '3. Check, checkmate, and stalemate',
          paragraphs: [
            'Check is an urgent warning that your King is under direct attack. When in check, all other plans are put on hold; your next move must resolve the threat.',
            'There are only three legal methods to escape check, known worldwide as the CPR rule: Capture, Protect, Run. If none of these three exists, it is Checkmate!'
          ],
          cprCards: [
            { letter: 'C', title: 'Capture the attacker', text: 'Capture the attacking piece using your king or another friendly piece to eliminate the threat.' },
            { letter: 'P', title: 'Protect / Block the line', text: 'Interpose a friendly piece between the checking piece (Q, R, B) and your king. (Knight checks cannot be blocked!)' },
            { letter: 'R', title: 'Run to safety', text: 'Step your king to an adjacent square that is free from enemy attack.' }
          ],
          compareCards: [
            { type: 'is-check', title: 'Check', tag: 'Alert', formula: 'King attacked + CPR escape possible', text: 'The game continues. The player must resolve the check immediately on their turn.' },
            { type: 'is-mate', title: 'Checkmate', tag: 'Game Over', formula: 'King attacked + No CPR escape', text: 'An inescapable attack on the king. The attacking side wins the game immediately! Notation: #' },
            { type: 'is-stalemate', title: 'Stalemate', tag: 'Draw', formula: 'King NOT attacked + 0 legal moves', text: 'The player to move is not in check, yet has no legal move anywhere. An immediate technical draw!' }
          ],
          fen: '7k/6Q1/5K2/8/8/8/8/8 b - - 0 1',
          marks: { h8: 'check', g7: 'selected' },
          caption: 'Checkmate: White queen on g7 checks Black king on h8. Protected by f6 king, Black cannot capture, block, or flee.'
        },
        {
          id: 'special',
          title: '4. Three special rules (Castling, En Passant, Promotion)',
          paragraphs: [
            'Chess includes three special moves that bend normal piece movement: Castling for king protection, En Passant for passing pawns, and Promotion for pawn evolution.'
          ],
          specialRules: [
            {
              title: '1. Castling (Dual move of King and Rook)',
              boards: [
                {
                  label: 'Ready to castle',
                  fen: 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1',
                  marks: { e1: 'selected', g1: 'legal', c1: 'legal', h1: 'highlight', a1: 'highlight' },
                  caption: 'White king (e1) and rooks (a1, h1) have not moved and all squares between them are open.'
                },
                {
                  label: 'After kingside castling (O-O)',
                  fen: 'r3k2r/8/8/8/8/8/8/R4RK1 b kq - 1 1',
                  marks: { e1: 'from', g1: 'to', h1: 'from', f1: 'to' },
                  caption: 'King steps two squares right to g1, and the h1 rook hops over to f1.'
                }
              ],
              paragraphs: [
                'The only move in chess where two pieces move together in one turn: the King tucks into safety while the Rook enters play toward the center.'
              ],
              bullets: [
                'Kingside Castling (O-O, Short): King moves two squares right (g1), and the h1 rook hops over to f1.',
                'Queenside Castling (O-O-O, Long): King moves two squares left (c1), and the a1 rook hops over to d1.',
                '❌ Forbidden conditions: ① King or rook has moved before; ② King is currently in check; ③ King passes through or lands on an attacked square. (The rook being attacked does not prevent castling!)'
              ]
            },
            {
              title: '2. En Passant (Capturing a passing pawn)',
              boards: [
                {
                  label: 'Black advances 2 squares',
                  fen: '8/8/8/3pP3/8/8/8/8 w - d6 0 1',
                  marks: { e5: 'selected', d6: 'legal', d5: 'capture' },
                  caption: 'Immediately after Black advances d7 to d5, White’s e5 pawn can capture en passant onto d6, removing d5.'
                },
                {
                  label: 'En passant completed',
                  fen: '8/8/3P4/8/8/8/8/8 b - - 0 1',
                  marks: { e5: 'from', d6: 'to' },
                  caption: 'White pawn lands on d6, and the passed enemy pawn on d5 is captured and removed from the board.'
                }
              ],
              paragraphs: [
                'A special capture that occurs when an enemy pawn uses its two-square first move to land directly beside your pawn.'
              ],
              bullets: [
                'Your pawn moves diagonally behind the enemy pawn (to d6), capturing and removing the enemy pawn on d5.',
                '⚠️ Strict timing: En passant is ONLY valid on the very next turn immediately after the enemy pawn moves two squares. If you play another move, the right expires permanently.'
              ]
            },
            {
              title: '3. Pawn Promotion (Pawn evolution)',
              boards: [
                {
                  label: 'One move to promotion',
                  fen: '4k3/4P3/8/8/8/8/8/4K3 w - - 0 1',
                  marks: { e7: 'selected', e8: 'legal' },
                  caption: 'White pawn on e7 is one step from reaching the 8th rank (e8) to trigger immediate promotion.'
                },
                {
                  label: 'Promoted to Queen',
                  fen: '4Qk2/8/8/8/8/8/8/4K3 b - - 0 1',
                  marks: { e7: 'from', e8: 'to' },
                  caption: 'The 1-point pawn transforms into a 9-point Queen, instantly delivering dominant attacking power.'
                }
              ],
              paragraphs: [
                'When a pawn completes its journey to the farthest rank (8th for White, 1st for Black), it immediately transforms into a Queen, Rook, Bishop, or Knight.'
              ],
              bullets: [
                'You may have multiple Queens on the board simultaneously through promotion.',
                'Over 95% of promotions choose the Queen, but underpromoting to a Knight can deliver vital checks or avoid stalemates.'
              ]
            }
          ]
        },
        {
          id: 'draws',
          title: '5. Five draw conditions',
          paragraphs: [
            'A chess game can end in a draw (tie) instead of a win or loss. Understanding draw rules prevents losing a won game to stalemate and helps you salvage half a point from difficult positions.'
          ],
          fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1',
          marks: { h8: 'danger', f7: 'selected' },
          caption: 'Stalemate: Black king is not in check, but has zero legal moves. Despite White’s queen advantage, the result is a draw.',
          bullets: [
            '1. Stalemate: The player to move is not in check, but has no legal moves anywhere.',
            '2. Insufficient material: Neither side has enough material to checkmate (K vs K, K+B vs K, K+N vs K).',
            '3. Threefold repetition: The exact same board position and player turn occur three times.',
            '4. Fifty-move rule: 50 consecutive moves played by each side without a pawn move or capture.',
            '5. Draw by agreement: Both players mutually agree to end the game in a draw.'
          ]
        },
        {
          id: 'notation',
          title: '6. Reading algebraic notation',
          paragraphs: [
            'Algebraic notation is the universal language of chess. Knowing notation allows you to record your games, review mistakes, and study master games.'
          ],
          notationTable: [
            { sym: 'K / Q / R / B / N', meaning: 'Piece letters', example: 'Nf3', desc: 'King (K), Queen (Q), Rook (R), Bishop (B), Knight (N). Pawns use no letter.' },
            { sym: 'e4 / d5', meaning: 'Pawn move', example: '1. e4 e5', desc: 'Pawn moves list only destination coordinates.' },
            { sym: 'x', meaning: 'Capture', example: 'Bxf7', desc: 'Bishop captured the piece on f7.' },
            { sym: '+', meaning: 'Check', example: 'Qh7+', desc: 'Queen moved to h7, placing the enemy king in check.' },
            { sym: '#', meaning: 'Checkmate', example: 'Qxf7#', desc: 'Move delivers checkmate and concludes the game.' },
            { sym: 'O-O', meaning: 'Kingside Castle', example: 'O-O', desc: 'Short castling toward the king’s wing.' },
            { sym: 'O-O-O', meaning: 'Queenside Castle', example: 'O-O-O', desc: 'Long castling toward the queen’s wing.' },
            { sym: '=Q', meaning: 'Promotion', example: 'e8=Q', desc: 'Pawn promoted to Queen upon reaching e8.' }
          ],
          fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
          marks: { e4: 'selected', f3: 'selected' },
          caption: 'White position after 1. e4 and 2. Nf3.'
        }
      ],
      faq: [
        ['Do you physically capture the king?', 'No. The game ends the instant checkmate is delivered; the king is never removed from the board.'],
        ['Can you castle if the rook is attacked?', 'Yes! As long as the king’s transit and landing squares are safe and neither piece has moved, the rook being attacked does not prevent castling.'],
        ['When may a pawn move two squares?', 'Only on its very first move from its home rank (2nd for White, 7th for Black), provided both squares in front are clear.'],
        ['What is the key difference between checkmate and stalemate?', 'Whether the king is currently in check. If checked with no legal escape, it is Checkmate (loss). If NOT in check with zero legal moves, it is Stalemate (draw).']
      ]
    }
  },

  tactics: {
    ko: {
      metaTitle: '체스 전술 패턴 8가지 | ChessStep',
      metaDescription: '포크, 핀, 스큐어, 발견 공격, 제거, 유인, 과부하, 백랭크 메이트를 탐색 순서로 배우세요.',
      title: '체스 전술: 실전에서 찾는 8가지 핵심 패턴',
      intro: '전술은 우연히 떠오르는 묘수가 아니라 기물의 공격 관계가 만든 강제 수순입니다. 패턴 이름을 외우고, 매 수 체크·잡기·위협을 확인하면 실전에서도 발견 확률이 높아집니다.',
      sections: [
        { id: 'search', title: '전술을 찾는 기본 순서', paragraphs: ['전술을 잘 찾는 사람은 감으로만 두지 않습니다. 먼저 체크가 있는지 보고, 그다음 공짜로 잡히는 기물이나 가치가 큰 기물 잡기를 찾고, 마지막으로 다음 수에 큰 위협을 만드는 수를 봅니다.', '후보수를 찾았으면 바로 두지 말고 “상대가 가장 잘 막으면 어떻게 되지?”를 한 수만 더 계산하세요. 이 습관만으로도 한 수짜리 실수가 크게 줄어듭니다.'], bullets: ['내 킹이 안전한지 먼저 확인합니다.', '상대의 보호받지 않는 기물과 같은 선에 놓인 기물을 찾습니다.', '수순이 끝난 뒤 남는 물질과 킹 안전을 비교합니다.'], fen: '7k/8/8/3q4/8/8/4Q3/4K3 w - - 0 1', caption: '전술 탐색은 체크, 잡기, 위협 순서로 봅니다. 두 퀸처럼 가치가 큰 기물이 마주 보이면 먼저 계산 후보로 표시하세요.' },
        { id: 'fork', title: '1. 포크와 더블 어택', paragraphs: ['포크는 한 기물이 동시에 두 목표를 공격하는 전술입니다. 상대는 한 번에 두 기물을 모두 구하기 어렵기 때문에, 보통 다음 수에 더 가치 있는 기물을 얻게 됩니다.', '초보자는 나이트 포크부터 익히면 좋습니다. 나이트는 뛰어넘어 이동하므로 상대가 미리 보지 못하는 체크 포크가 자주 나옵니다.'], bullets: ['체크가 포함된 포크를 우선 탐색합니다.', '포크를 두는 칸이 상대 폰이나 킹에게 잡히는지 확인합니다.', '킹과 퀸, 킹과 룩처럼 가치 차이가 큰 두 목표를 찾습니다.'], fen: '4k3/5q2/3N4/8/8/8/8/4K3 b - - 0 1', caption: '백 나이트가 d6에서 흑 킹 e8과 흑 퀸 f7을 동시에 공격합니다. 이것이 대표적인 나이트 포크입니다.' },
        { id: 'pin', title: '2. 핀', paragraphs: ['핀은 앞의 기물이 움직이면 뒤의 더 중요한 기물이 공격받는 구조입니다. 뒤에 킹이 있으면 앞 기물은 움직이는 순간 킹을 노출하므로 사실상 묶입니다.', '핀을 발견하면 바로 잡기보다 한 번 더 공격할 방법을 찾으세요. 움직이지 못하는 기물은 좋은 공격 대상입니다.'], bullets: ['핀된 기물을 한 번 더 공격합니다.', '핀을 만든 기물이 상대에게 쉽게 잡히지 않는지 확인합니다.', '비숍·룩·퀸처럼 긴 선을 쓰는 기물이 핀을 만듭니다.'], fen: '4r1k1/8/8/8/8/8/4N3/4K3 w - - 0 1', caption: '흑 룩이 e파일을 따라 백 나이트를 백 킹 앞에 묶고 있습니다. 나이트가 움직이면 킹이 공격받습니다.' },
        { id: 'skewer', title: '3. 스큐어', paragraphs: ['스큐어는 핀과 방향이 반대입니다. 앞에 더 중요한 기물이 있고, 그 뒤에 덜 중요한 기물이 있습니다. 앞 기물이 피하면 뒤 기물이 잡힙니다.', '체크로 시작하는 스큐어는 특히 강합니다. 킹은 반드시 피해야 하므로 뒤의 퀸이나 룩을 잃는 흐름이 강제됩니다.'], bullets: ['룩·비숍·퀸의 직선 끝까지 추적합니다.', '앞 기물이 체크를 받으면 수순이 강제됩니다.', '킹 뒤에 퀸이나 룩이 있는지 확인합니다.'], fen: '4q3/4k3/8/8/8/8/8/4R1K1 b - - 0 1', caption: '백 룩이 e파일에서 흑 킹을 체크합니다. 흑 킹이 움직이면 뒤의 흑 퀸이 룩에게 잡힙니다.' },
        { id: 'discovery', title: '4. 발견 공격과 더블 체크', paragraphs: ['발견 공격은 앞 기물이 비켜나면서 뒤의 룩, 비숍, 퀸의 공격선이 열리는 전술입니다. 앞 기물은 이동하면서 새 목표를 공격하고, 뒤 기물은 열린 선으로 또 다른 목표를 공격합니다.', '더블 체크는 두 기물이 동시에 체크하는 형태입니다. 공격 기물을 잡거나 막는 방식이 통하지 않아 킹 이동만 가능합니다.'], bullets: ['앞 기물이 이동하면서 체크나 퀸 공격을 동시에 만들 수 있는지 봅니다.', '열리는 선 뒤에 있는 긴 기물이 안전한지 확인합니다.', '상대 킹과 퀸이 같은 선에 있으면 발견 공격 후보입니다.'], fen: '4k3/8/8/8/8/8/4B3/4R1K1 w - - 0 1', caption: '백 비숍이 e2에서 비켜나면 e파일이 열리고, 뒤의 백 룩이 흑 킹을 공격할 수 있습니다.' },
        { id: 'remove', title: '5. 수비 기물 제거', paragraphs: ['수비 기물 제거는 목표를 직접 공격하기 전에 그 목표를 지키는 말을 없애는 전술입니다. “무엇을 잡을까?”보다 “누가 지키고 있지?”를 먼저 묻는 것이 핵심입니다.', '메이트 공격에서는 특히 중요합니다. 체크메이트 칸을 지키는 기물 하나만 제거해도 갑자기 방어가 무너질 수 있습니다.'], bullets: ['목표보다 수비자를 먼저 표시합니다.', '제거 후 상대의 다른 기물이 대신 수비할 수 있는지 계산합니다.', '희생이 필요하다면 뒤의 체크나 메이트가 강제인지 확인합니다.'], fen: '6k1/6pp/5n2/7Q/8/3B4/8/6K1 w - - 0 1', caption: '흑 나이트 f6은 h7 주변을 지키는 수비자입니다. 공격 전에 어떤 말이 핵심 칸을 방어하는지 표시해 보세요.' },
        { id: 'deflection', title: '6. 유인과 디플렉션', paragraphs: ['디플렉션은 상대 기물을 중요한 방어 임무에서 떼어내는 전술입니다. 상대가 지키던 선이나 칸을 강제로 포기하게 만드는 것이 목표입니다.', '유인은 상대 기물을 불리한 칸으로 끌어들이는 생각입니다. 희생처럼 보이는 수라도 상대가 받으면 더 큰 손해나 메이트가 따라오면 좋은 전술입니다.'], bullets: ['상대가 제안을 거절할 수 있는지 확인합니다.', '끌려간 기물이 원래 막고 있던 선과 지키던 칸을 봅니다.', '첫 수보다 두 번째 수의 이득이 명확해야 합니다.'], fen: '4k3/4q3/8/8/8/8/8/4R1K1 w - - 0 1', caption: '흑 퀸은 e파일에서 킹 앞을 막고 있습니다. 백이 그 수비자를 끌어내거나 제거하면 뒤의 킹이 노출됩니다.' },
        { id: 'overload', title: '7. 과부하', paragraphs: ['과부하는 수비 기물 하나가 두 가지 중요한 일을 동시에 맡은 상태입니다. 한쪽을 지키면 다른 쪽이 무너지고, 다른 쪽을 지키면 첫 번째 목표가 떨어집니다.', '찾는 방법은 단순합니다. 상대 퀸, 룩, 비숍이 여러 기물이나 메이트 칸을 동시에 지키고 있는지 보세요. 그중 하나를 강제로 선택하게 만들면 전술이 시작됩니다.'], bullets: ['수비 기물 하나가 지키는 대상을 두 개 이상 표시합니다.', '교환 순서를 바꾸면 방어가 끊기는지 시험합니다.', '과부하 전술은 잡기 순서가 핵심입니다.'], fen: '4r1k1/4qppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1', caption: 'e파일에 기물이 몰려 있습니다. 한 수비자가 여러 임무를 맡고 있는지 확인하면 과부하 전술을 찾기 쉽습니다.' },
        { id: 'backrank', title: '8. 백랭크 메이트', paragraphs: ['백랭크 메이트는 킹이 자기 폰에 막혀 도망갈 칸이 없을 때, 룩이나 퀸이 마지막 랭크를 공격해 메이트하는 패턴입니다.', '입문자는 공격할 때뿐 아니라 방어할 때도 이 패턴을 자주 놓칩니다. 내 킹 앞 폰이 모두 그대로라면 h3, h6 같은 탈출 칸을 만드는 수가 필요할 수 있습니다.'], bullets: ['상대뿐 아니라 내 백랭크도 매 수 확인합니다.', '룩이나 퀸이 마지막 랭크로 침투할 길이 있는지 봅니다.', 'h3, h6 같은 루프트가 필요한지 판단합니다.'], fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1', caption: '흑 킹은 자기 폰에 막혀 있습니다. 백 룩이 e8로 들어가면 마지막 랭크에서 메이트 위협이 생깁니다.' }
      ],
      faq: [['전술 공부는 하루 몇 문제면 충분한가요?', '정답률을 유지할 수 있는 10~20문제를 꾸준히 푸는 편이 무작정 많은 문제를 빠르게 넘기는 것보다 좋습니다.'], ['정답을 못 찾으면 바로 해설을 봐도 되나요?', '몇 분간 후보수를 만들고 상대의 최선 방어를 계산한 뒤 보세요. 해설 후에는 첫 수만 외우지 말고 패턴과 탐색 단서를 요약하세요.']]
    },
    en: {
      metaTitle: '8 Chess Tactics | ChessStep',
      metaDescription: 'Learn forks, pins, skewers, discovered attacks, overload, and mate patterns.',
      title: 'Chess tactics: Eight patterns to find in real games',
      intro: 'A tactic is not a lucky flash of brilliance. It is a forcing sequence created by the attacking relationships between pieces. Learn the patterns and scan checks, captures, and threats every turn.',
      sections: [
        { id: 'search', title: 'A practical tactical search order', paragraphs: ['Strong tactical players do not rely only on instinct. First list every check, then captures of valuable or loose pieces, then moves that create a direct threat on the next turn.', 'After finding a candidate, do not play it immediately. Ask, “What is the opponent’s best defense?” Calculating just one defensive reply prevents many one-move mistakes.'], bullets: ['Confirm your own king is safe first.', 'Find loose pieces and pieces aligned on the same line.', 'Evaluate material and king safety after the line ends.'], fen: '7k/8/8/3q4/8/8/4Q3/4K3 w - - 0 1', caption: 'Scan checks, captures, and threats. When high-value pieces such as queens face each other, mark them as candidate tactics.' },
        { id: 'fork', title: '1. Forks and double attacks', paragraphs: ['A fork is one piece attacking two targets at the same time. The opponent usually cannot save both, so you often win the more valuable target on the next move.', 'Beginners should learn knight forks first. Knights jump, so checking forks can appear even when the board looks blocked.'], bullets: ['Search first for forks that include check.', 'Verify that the fork square is not simply captured by a pawn or king.', 'Look for pairs such as king and queen or king and rook.'], fen: '4k3/5q2/3N4/8/8/8/8/4K3 b - - 0 1', caption: 'White’s knight on d6 attacks the black king on e8 and the black queen on f7. This is a classic knight fork.' },
        { id: 'pin', title: '2. Pins', paragraphs: ['A pin happens when a front piece cannot move without exposing a more important piece behind it. If the king is behind it, the front piece may be unable to move legally at all.', 'When you notice a pin, do not rush. Look for a way to attack the pinned piece again, because a piece that cannot move is an excellent target.'], bullets: ['Attack a pinned piece again.', 'Check that the pinning piece itself cannot be captured easily.', 'Bishops, rooks, and queens create pins because they attack along lines.'], fen: '4r1k1/8/8/8/8/8/4N3/4K3 w - - 0 1', caption: 'Black’s rook pins the white knight to the white king along the e-file. If the knight moves, the king is exposed.' },
        { id: 'skewer', title: '3. Skewers', paragraphs: ['A skewer is the reverse of a pin. The more valuable piece is in front, and a less valuable piece sits behind it. When the front piece moves away, the back piece falls.', 'Skewers that begin with check are especially strong. The king must move, so the piece behind it can often be captured by force.'], bullets: ['Trace every rook, bishop, and queen ray to the end.', 'A skewer with check forces the sequence.', 'Look for a queen or rook behind the king.'], fen: '4q3/4k3/8/8/8/8/8/4R1K1 b - - 0 1', caption: 'White’s rook checks the black king on the e-file. After the king moves, the black queen behind it is exposed.' },
        { id: 'discovery', title: '4. Discovered attacks and double check', paragraphs: ['A discovered attack appears when a front piece moves away and opens a rook, bishop, or queen line behind it. The moving piece can make one threat while the revealed piece makes another.', 'Double check means two pieces give check at once. Capturing one attacker or blocking one line is not enough, so the king must move.'], bullets: ['See whether the front piece can also check or attack the queen.', 'Make sure the revealed long-range piece stays safe.', 'Aligned kings and queens are common discovery clues.'], fen: '4k3/8/8/8/8/8/4B3/4R1K1 w - - 0 1', caption: 'If White’s bishop moves away from e2, the e-file opens and the rook behind it can attack the black king.' },
        { id: 'remove', title: '5. Removing the defender', paragraphs: ['Removing the defender means you do not attack the target first. You first remove the piece that protects the target.', 'This is very common in mating attacks. If one defender protects the mating square, eliminating that defender can suddenly make the whole defense collapse.'], bullets: ['Identify the defender before the target.', 'Calculate whether another defender can replace it.', 'If a sacrifice is needed, confirm the follow-up check or mate is forcing.'], fen: '6k1/6pp/5n2/7Q/8/3B4/8/6K1 w - - 0 1', caption: 'Black’s knight on f6 helps defend the h7 area. Before attacking, mark which piece protects the key square.' },
        { id: 'deflection', title: '6. Attraction and deflection', paragraphs: ['Deflection pulls a piece away from an important defensive job. The goal is to make the defender abandon a line, square, or piece it was protecting.', 'Attraction draws a piece onto a bad square. A move that looks like a sacrifice can be correct if accepting it allows a stronger second move.'], bullets: ['Check whether the opponent can decline the offer.', 'Notice the line or square the deflected piece abandons.', 'The second move must give a clear gain.'], fen: '4k3/4q3/8/8/8/8/8/4R1K1 w - - 0 1', caption: 'The black queen blocks the e-file in front of the king. If that defender is pulled away or removed, the king is exposed.' },
        { id: 'overload', title: '7. Overload', paragraphs: ['Overload means one defender has two essential jobs and cannot keep both. If you force it to choose one duty, the other target becomes vulnerable.', 'To find it, look at enemy queens, rooks, and bishops that defend several pieces or mating squares. Then test capture orders that make the defender choose.'], bullets: ['Mark two or more things protected by the same defender.', 'Test whether changing the capture order breaks the defense.', 'Overload tactics often depend on the exact move order.'], fen: '4r1k1/4qppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1', caption: 'The e-file is crowded with attackers and defenders. Check whether one defender has too many jobs.' },
        { id: 'backrank', title: '8. Back-rank mate', paragraphs: ['Back-rank mate happens when a king is trapped by its own pawns and a rook or queen attacks along the final rank.', 'Beginners miss this pattern on both attack and defense. If your king’s pawns have not moved, a small escape-square move such as h3 or h6 may be necessary.'], bullets: ['Check your own back rank as well as the opponent’s.', 'Look for a rook or queen path to the final rank.', 'Decide whether a move such as h3 or h6 creates a useful escape square.'], fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1', caption: 'Black’s king is boxed in by its own pawns. If White’s rook reaches e8, the back rank becomes a mating target.' }
      ],
      faq: [['How many tactics should I solve per day?', 'Ten to twenty problems with careful calculation and stable accuracy are more useful than rushing through a large batch.'], ['Should I reveal the answer when I am stuck?', 'First spend a few minutes generating candidates and calculating the best defense. After revealing it, summarize the pattern and the clue that should have triggered your search.']]
    }
  },

  openings: {
    ko: {
      metaTitle: '체스 오프닝 원칙 | ChessStep',
      metaDescription: '중앙 장악, 기물 전개, 캐슬링, 초보자 실수, 이탈리안 게임과 퀸즈 갬빗 계획을 배우세요.',
      title: '체스 오프닝: 수순 암기보다 먼저 배울 원칙',
      intro: '오프닝은 정답 수를 외우는 시험이 아니라 좋은 미들게임을 준비하는 단계입니다. 낯선 수를 만나도 중앙, 전개, 킹 안전이라는 기준으로 판단할 수 있어야 합니다.',
      sections: [
        { id: 'goals', title: '오프닝의 네 가지 목표', paragraphs: ['오프닝의 목표는 멋진 이름을 외우는 것이 아니라 좋은 출발 위치를 만드는 것입니다. 중앙을 점유하거나 통제하고, 나이트와 비숍을 활동적인 칸으로 꺼내며, 캐슬링으로 킹을 안전하게 만들고, 두 룩이 서로 보이게 연결합니다.', '한 수를 둘 때마다 “이 수가 중앙, 전개, 킹 안전 중 무엇을 돕는가?”라고 물어보세요. 답이 없다면 보통 급한 위협을 막는 수이거나 다시 생각해야 할 수입니다.'], bullets: ['중앙 폰을 한두 개 사용합니다.', '같은 기물을 이유 없이 반복 이동하지 않습니다.', '퀸보다 나이트와 비숍을 먼저 전개합니다.', '상대의 직접적인 위협은 원칙보다 우선합니다.'], fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 5 5', caption: '백은 캐슬링을 마쳤고 나이트와 비숍을 전개했습니다. 중앙, 전개, 킹 안전이라는 오프닝 목표를 한 번에 볼 수 있습니다.' },
        { id: 'mistakes', title: '초보자가 자주 하는 오프닝 실수', paragraphs: ['초보자는 빠른 체크나 퀸 공격이 좋아 보일 때가 많습니다. 하지만 퀸이 너무 일찍 나오면 상대가 기물을 전개하면서 퀸을 공격해 템포를 벌 수 있습니다.', '측면 폰을 많이 밀거나 같은 기물을 계속 움직이는 것도 흔한 실수입니다. 그동안 상대는 중앙을 차지하고 캐슬링까지 끝내므로, 내 킹만 중앙에 남아 위험해집니다.'], bullets: ['목적 없는 폰 이동', '체크라는 이유만으로 두는 약한 수', '캐슬링을 미루고 중앙에서 킹을 움직이는 것', '외운 수가 끝난 뒤 계획 없이 기물을 교환하는 것'], fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P2Q/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2', caption: '백 퀸이 너무 빨리 나왔습니다. 흑은 자연스럽게 전개하면서 퀸을 공격할 수 있어 백이 시간을 잃기 쉽습니다.' },
        { id: 'italian', title: '입문용 예시: 이탈리안 게임', paragraphs: ['1.e4 e5 2.Nf3 Nc6 3.Bc4는 입문자에게 좋은 오프닝입니다. 백은 중앙 폰을 움직였고, 나이트를 꺼냈고, 비숍이 흑의 약한 f7 칸을 바라봅니다.', '이 위치에서 바로 무리한 공격을 하기보다 캐슬링, d3 또는 d4, 룩 e1 배치처럼 다음 목표를 준비하세요. 오프닝은 첫 공격보다 좋은 기물 배치가 먼저입니다.'], bullets: ['Bc4는 흑의 약한 f7을 바라봅니다.', '빠른 퀸 공격보다 캐슬링과 중앙 준비가 우선입니다.', '중앙이 열리면 전개 속도가 중요해집니다.'], fen: 'r1bqkbnr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', caption: '이탈리안 게임의 기본 형태입니다. 백 비숍 c4와 나이트 f3가 중앙과 f7 주변을 압박합니다.' },
        { id: 'queens', title: '입문용 예시: 퀸즈 갬빗 구조', paragraphs: ['1.d4 d5 2.c4는 흑의 중앙 폰에 질문을 던지는 오프닝입니다. 백은 c폰으로 d5 폰을 압박해 더 넓은 중앙을 만들려고 합니다.', '이름은 갬빗이지만 무조건 폰을 버리는 뜻은 아닙니다. 많은 수순에서 백은 폰을 되찾거나, 흑이 폰을 지키는 동안 더 빠른 전개와 좋은 중앙 구조를 얻습니다.'], bullets: ['c폰과 d폰의 긴장을 성급히 해소하지 않습니다.', 'Nc3, Nf3, e3, Bd3 같은 안정적 전개를 사용합니다.', '흑의 ...c5 또는 ...e5 브레이크를 예상합니다.'], fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4', caption: '백 d4와 c4 폰이 흑 d5 폰을 압박합니다. 퀸즈 갬빗은 폰 구조와 중앙 긴장을 이해하는 데 좋은 예입니다.' },
        { id: 'after', title: '이론이 끝난 뒤 계획 찾기', paragraphs: ['외운 수순이 끝났을 때 멈추지 않으려면 세 가지 질문을 사용하세요. 가장 활동이 낮은 내 기물은 무엇인지, 어떤 폰 이동이 파일이나 대각선을 여는지, 상대가 다음에 원하는 계획은 무엇인지 봅니다.', '초보자는 “무엇을 공격하지?”보다 “가장 나쁜 내 기물을 어떻게 좋게 만들지?”를 먼저 묻는 편이 안전합니다. 좋은 오프닝은 전술이 없을 때도 자연스러운 다음 수를 찾게 해 줍니다.'], bullets: ['내 가장 활동이 낮은 기물은 무엇인가?', '어떤 폰 이동이 파일이나 대각선을 여는가?', '상대가 다음에 원하는 교환이나 브레이크는 무엇인가?'], fen: 'r2q1rk1/ppp2ppp/2npbn2/4p3/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', caption: '양쪽이 어느 정도 전개를 마친 뒤에는 가장 활동이 낮은 기물과 가능한 중앙 폰 브레이크를 찾습니다.' }
      ],
      faq: [['오프닝은 몇 수까지 외워야 하나요?', '입문자는 5~8수의 자연스러운 전개와 그 이유를 아는 것으로 충분합니다. 수보다 폰 구조와 기물 배치의 목적을 기억하세요.'], ['하나의 오프닝만 계속 둬도 되나요?', '초기에는 같은 구조를 반복해 계획을 익히는 것이 좋습니다. 이후 다른 중앙 구조를 경험하며 범위를 넓히세요.']]
    },
    en: {
      metaTitle: 'Chess Opening Principles | ChessStep',
      metaDescription: 'Learn center control, development, castling, common mistakes, and starter plans.',
      title: 'Chess openings: Principles before memorized moves',
      intro: 'The opening is not a test of exact recall. It prepares a playable middlegame. Center control, development, and king safety let you respond sensibly even when the opponent leaves theory.',
      sections: [
        { id: 'goals', title: 'Four opening goals', paragraphs: ['The opening is not about memorizing impressive names. It is about reaching a healthy starting position: control the center, develop knights and bishops, castle the king, and connect the rooks.', 'After each move, ask what it helps: center control, development, or king safety. If it helps none of them, it should either answer a concrete threat or be reconsidered.'], bullets: ['Use one or two central pawns.', 'Do not repeat a piece move without a reason.', 'Develop knights and bishops before the queen.', 'A concrete opponent threat overrides a general principle.'], fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 5 5', caption: 'White has castled and developed pieces. Center control, development, and king safety are visible in one position.' },
        { id: 'mistakes', title: 'Common beginner opening mistakes', paragraphs: ['Beginners are often tempted by quick checks and early queen attacks. But an early queen can be chased while the opponent develops pieces with tempo.', 'Too many wing-pawn moves and repeated moves with the same piece cause the same problem. The opponent gains the center and castles while your king remains in danger.'], bullets: ['Purpose-free pawn moves', 'Weak checks played only because they are checks', 'Delaying castling and moving the king in the center', 'Trading pieces without a plan after memorized theory ends'], fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P2Q/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2', caption: 'White’s queen came out very early. Black can develop while attacking it, so White may lose time.' },
        { id: 'italian', title: 'Starter example: The Italian Game', paragraphs: ['After 1.e4 e5 2.Nf3 Nc6 3.Bc4, White has moved a central pawn, developed a knight, and placed the bishop toward the sensitive f7 square.', 'From here, avoid forcing an attack too soon. Castling, d3 or d4, and Re1 are natural ways to improve the position before opening the center.'], bullets: ['Bc4 looks toward the vulnerable f7 square.', 'Castle and prepare the center before launching a queen attack.', 'Development speed matters when the center opens.'], fen: 'r1bqkbnr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', caption: 'A basic Italian Game position. White’s bishop on c4 and knight on f3 influence the center and f7 area.' },
        { id: 'queens', title: 'Starter example: Queen’s Gambit structure', paragraphs: ['After 1.d4 d5 2.c4, White asks a direct question of Black’s central pawn. The c-pawn pressures d5 so White can fight for a broader center.', 'Despite the name, the Queen’s Gambit is not simply giving away a pawn. In many lines White regains it, or gains faster development and a healthier central structure while Black tries to keep it.'], bullets: ['Do not release the c-pawn and d-pawn tension automatically.', 'Use stable development such as Nc3, Nf3, e3, and Bd3.', 'Expect Black’s ...c5 or ...e5 break.'], fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4', caption: 'White’s d4 and c4 pawns pressure Black’s d5 pawn. The Queen’s Gambit teaches central tension and pawn structure.' },
        { id: 'after', title: 'Find a plan when theory ends', paragraphs: ['When your memorized line ends, use three questions: which piece is least active, which pawn move opens a file or diagonal, and what plan does the opponent want next?', 'For beginners, “How do I improve my worst piece?” is usually safer than “What can I attack?” A good opening gives you natural moves even when there is no immediate tactic.'], bullets: ['Which of my pieces is least active?', 'Which pawn move opens a file or diagonal?', 'What exchange or break does the opponent want next?'], fen: 'r2q1rk1/ppp2ppp/2npbn2/4p3/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7', caption: 'After both sides develop, look for your least active piece and the central pawn break that can improve your position.' }
      ],
      faq: [['How many opening moves should I memorize?', 'For a beginner, five to eight natural moves with their reasons are enough. Remember the pawn structure and piece goals rather than a long sequence.'], ['May I play one opening every game?', 'Repeating one structure is useful at first because you learn recurring plans. Later, add different center structures to broaden your understanding.']]
    }
  },

  endgames: {
    ko: {
      metaTitle: '체스 엔드게임 기초 | ChessStep',
      metaDescription: '킹 활성화, 오포지션, 패스드 폰, 폰 레이스, 룩 활동성, 기본 체크메이트를 배우세요.',
      title: '체스 엔드게임: 작은 차이를 승리로 바꾸는 법',
      intro: '기물이 줄어들면 킹이 강해지고 한 번의 폰 이동이 되돌릴 수 없는 결정을 만듭니다. 정확한 계산과 기본 포지션 지식이 미들게임보다 더 직접적으로 결과를 좌우합니다.',
      sections: [
        { id: 'king', title: '1. 킹을 활성화하기', paragraphs: ['엔드게임에서는 메이트 공격 위험이 줄어 킹이 중앙으로 나와 폰을 공격하고 승격을 지원해야 합니다. 상대보다 먼저 중앙에 도착한 킹은 여러 템포의 이득을 만듭니다.'], bullets: ['퀸이 교환되면 킹 중앙화를 검토합니다.', '상대 패스드 폰 앞에 킹을 배치합니다.', '킹의 이동 경로가 체크에 막히지 않는지 봅니다.'] },
        { id: 'opposition', title: '2. 오포지션과 핵심 칸', paragraphs: ['두 킹이 한 칸을 사이에 두고 마주 보며 상대에게 움직임을 넘기는 개념이 오포지션입니다. 폰 엔드게임에서는 킹이 핵심 칸에 들어갈 수 있는지를 결정합니다.'], bullets: ['직접 오포지션뿐 아니라 먼 오포지션도 있습니다.', '누구 차례인지가 같은 배치의 결과를 바꿉니다.'], fen: '8/8/4k3/8/4P3/4K3/8/8 w - - 0 1', caption: '백의 킹이 e폰의 핵심 칸으로 들어가는 경로를 계산해야 합니다.' },
        { id: 'passed', title: '3. 패스드 폰과 폰 레이스', paragraphs: ['앞 파일과 인접 파일에 상대 폰이 없는 패스드 폰은 승격 가능성 때문에 상대 기물을 묶습니다. 하지만 무조건 전진하기보다 킹과 룩의 지원을 준비해야 합니다.'], bullets: ['양쪽 폰 레이스는 승격까지 수를 정확히 셉니다.', '승격 직후 체크가 되는지 확인합니다.', '멀리 떨어진 패스드 폰으로 상대 킹을 유인할 수 있습니다.'] },
        { id: 'rook', title: '4. 룩은 활동적으로', paragraphs: ['룩은 패스드 폰 뒤에서 가장 효율적인 경우가 많고, 상대 킹을 파일이나 랭크에서 차단하면 내 킹이 자유롭게 움직입니다. 수동적 방어만 하는 룩은 폰 하나 우세도 지키기 어렵습니다.'], bullets: ['뒤쪽 체크를 위한 거리를 확보합니다.', '룩을 폰 앞에 묶어 두지 않을 방법을 찾습니다.', '상대 킹 컷오프를 물질과 비교합니다.'] },
        { id: 'mates', title: '5. 반드시 알아야 할 기본 메이트', paragraphs: ['퀸+킹, 룩+킹 메이트는 우세한 게임을 실제 승리로 끝내기 위한 필수 기술입니다. 공간을 줄이고 킹을 접근시킨 뒤 보호된 체크로 마무리합니다.'], bullets: ['큰 기물을 상대 킹 옆에 보호 없이 두지 않습니다.', '스테일메이트를 피하도록 이동 칸을 남깁니다.', '비숍+나이트 메이트는 더 높은 단계에서 별도로 연습합니다.'] }
      ],
      faq: [['엔드게임을 언제부터 공부해야 하나요?', '기물 이동을 익힌 직후 퀸·룩 메이트와 기본 폰 엔드게임부터 시작하는 것이 좋습니다.'], ['폰이 하나 많으면 항상 이기나요?', '아닙니다. 킹 위치, 폰 구조, 룩 활동성에 따라 무승부이거나 오히려 불리할 수 있습니다.']]
    },
    en: {
      metaTitle: 'Chess Endgame Basics | ChessStep',
      metaDescription: 'Learn king activity, opposition, passed pawns, rook activity, and basic mates.',
      title: 'Chess endgames: Convert small advantages',
      intro: 'With fewer pieces, the king becomes strong and every pawn move is an irreversible decision. Accurate calculation and knowledge of key positions directly determine the result.',
      sections: [
        { id: 'king', title: '1. Activate the king', paragraphs: ['With fewer mating threats, the king should enter the center, attack pawns, and support promotion. A king that arrives first can gain several tempi.'], bullets: ['After queens are exchanged, consider centralizing the king.', 'Place the king in front of an enemy passed pawn.', 'Check whether enemy rook checks can block the route.'] },
        { id: 'opposition', title: '2. Opposition and key squares', paragraphs: ['Opposition describes kings facing each other with one square between them, using the move order to gain access. It decides whether a king can reach key squares in pawn endings.'], bullets: ['Direct and distant opposition both matter.', 'The side to move can change the result of the same placement.'], fen: '8/8/4k3/8/4P3/4K3/8/8 w - - 0 1', caption: 'Calculate how White’s king can reach the key squares of the e-pawn.' },
        { id: 'passed', title: '3. Passed pawns and pawn races', paragraphs: ['A passed pawn has no opposing pawn ahead on its file or neighboring files. Its promotion threat ties pieces down, but support from king or rook often matters more than immediate advance.'], bullets: ['Count every move to promotion in a pawn race.', 'Check whether promotion comes with check.', 'A distant passer can distract the enemy king.'] },
        { id: 'rook', title: '4. Keep the rook active', paragraphs: ['Rooks often belong behind passed pawns. Cutting the enemy king off along a file or rank frees your king. A passive rook may fail to convert even an extra pawn.'], bullets: ['Maintain checking distance from the side or rear.', 'Find a way to avoid tying the rook in front of a pawn.', 'Compare a king cutoff with material gain.'] },
        { id: 'mates', title: '5. Essential basic mates', paragraphs: ['Queen-and-king and rook-and-king mate are required to turn an advantage into a win. Reduce space, approach with the king, and finish with a protected check.'], bullets: ['Do not leave the major piece unprotected next to the king.', 'Avoid stalemate by preserving a legal move before the final check.', 'Bishop-and-knight mate is a later specialized topic.'] }
      ],
      faq: [['When should I start studying endgames?', 'Begin with queen mate, rook mate, and basic pawn endings as soon as piece movement is comfortable.'], ['Does an extra pawn always win?', 'No. King placement, pawn structure, and rook activity can make the position drawn or even worse.']]
    }
  }
};

export const ABOUT = {
  ko: {
    metaTitle: 'ChessStep 소개 | 무료 체스 학습',
    metaDescription: 'ChessStep의 학습 설계, 개인정보 처리 방식, 브라우저 체스 AI 범위와 활용법을 안내합니다.',
    title: '대국과 학습을 한곳에 연결한 ChessStep',
    intro: 'ChessStep은 체스를 처음 배우는 사람부터 포지션 계획을 연습하는 플레이어까지, 별도 설치와 로그인 없이 사용할 수 있도록 만든 한국어·영어 정적 학습 프로젝트입니다.',
    principles: [
      ['즉시 실행', '대국판과 코스가 모두 브라우저에서 열리며 계정 생성이나 앱 설치를 요구하지 않습니다.'],
      ['설명 가능한 학습', '정답 수만 제시하지 않고 후보수, 상대 위협, 결과 포지션 평가의 순서를 반복합니다.'],
      ['개인정보 최소화', '대국과 진행률은 서버 데이터베이스를 사용하지 않습니다. 레슨 완료 상태는 현재 기기의 로컬 저장소에만 남고, 광고 제공 시에는 별도 개인정보처리방침에서 외부 스크립트 이용을 안내합니다.'],
      ['검색 친화적 콘텐츠', '한국어와 영어를 별도 URL의 완전한 HTML로 제공해 사용자와 검색엔진 모두 동일한 핵심 내용을 읽을 수 있게 설계했습니다.']
    ],
    limitsTitle: '브라우저 AI의 범위',
    limits: ['학습용 상대이며 전문 대회 엔진의 강도나 정확한 레이팅을 보장하지 않습니다.', '고급 난이도도 기기 성능과 포지션 복잡도에 따라 탐색 깊이가 달라집니다.', '추천 수는 학습 보조 수단이며 먼저 자신의 후보수와 이유를 만든 뒤 비교하는 방식이 좋습니다.'],
    privacyTitle: '데이터와 개인정보',
    privacy: '대국과 레슨 진행 데이터는 현재 브라우저의 로컬 저장소에만 보관됩니다. 외부 제휴 배너 로드 과정에서 기본 접속 정보가 처리될 수 있으며, 실제 운영 정책은 개인정보처리방침에서 안내합니다.'
  },
  en: {
    metaTitle: 'About ChessStep | Chess Learning',
    metaDescription: 'Learn ChessStep goals, learning design, privacy approach, and browser AI limits.',
    title: 'ChessStep connects practice and learning',
    intro: 'ChessStep is a static chess learning site in Korean and English, built for first-time players through students working on positional planning, without requiring installation or an account.',
    principles: [
      ['Start immediately', 'The board and courses open in the browser without account creation or app installation.'],
      ['Explain the process', 'Lessons repeat candidate generation, opponent threats, and evaluation of the resulting position instead of presenting a move alone.'],
      ['Minimize personal data', 'Games and progress use no server database. Lesson completion remains in local storage on the current device, and external partner resources are described in the privacy policy when enabled.'],
      ['Search-friendly content', 'Korean and English pages use separate URLs with complete HTML so users and search engines receive the same core content.']
    ],
    limitsTitle: 'Scope of the browser AI',
    limits: ['It is a learning opponent, not a tournament engine, and no exact rating is promised.', 'Advanced search depth varies by device performance and position complexity.', 'Hints work best after you first create your own candidates and explanations.'],
    privacyTitle: 'Data and privacy',
    privacy: 'Game and lesson progress data is stored only in this browser’s local storage. Basic access data may be processed when loading external affiliate resources, and the live operating policy is described in the privacy policy.'
  }
};

export const PRIVACY = {
  ko: {
    metaTitle: '개인정보처리방침 | ChessStep',
    metaDescription: 'ChessStep의 로컬 저장, 광고, 분석 도구 관련 개인정보 안내입니다.',
    title: '개인정보처리방침',
    intro: '이 문서는 ChessStep 운영 시 확정해야 할 개인정보 처리 항목을 안내하는 초안입니다. 실제 배포 전 TODO 항목을 운영 정보에 맞게 확인해야 합니다.',
    sections: [
      {
        id: 'operator',
        title: '1. 운영자와 문의',
        paragraphs: [
          'TODO: 운영자명 또는 사업자명, 책임자명, 연락 가능한 이메일 주소를 실제 운영 정보에 맞게 확정합니다.',
          '개인정보 관련 문의와 요청은 확정된 문의 수단으로 접수하고 처리 절차를 별도로 안내합니다.'
        ]
      },
      {
        id: 'items',
        title: '2. 처리하는 항목',
        paragraphs: [
          'ChessStep은 회원가입을 요구하지 않으며 대국 기록, 레슨 완료 상태, 선택한 난이도와 진영 설정을 서버 데이터베이스로 전송하지 않습니다. 이러한 정보는 현재 브라우저의 로컬 저장소에만 보관됩니다.',
          '외부 제휴 배너가 포함된 페이지에서는 제휴 서비스 제공, 부정 이용 방지, 성과 측정을 위해 접속 정보, 기기 정보, 브라우저 정보, 쿠키 또는 식별 관련 정보가 처리될 수 있습니다.',
          'TODO: Google Analytics 등 분석 도구를 실제로 사용하는 경우 측정 ID, 수집 항목, 익명화 설정, 보유 기간을 운영 설정에 맞게 명시합니다.'
        ]
      },
      {
        id: 'purpose',
        title: '3. 처리 목적',
        paragraphs: [
          '로컬 저장 데이터는 레슨 완료 상태와 대국 설정을 같은 브라우저에서 다시 사용할 수 있도록 하기 위해 사용됩니다.',
          '외부 제휴 배너 관련 정보는 광고 제공, 노출 및 성과 측정, 서비스 악용 방지를 위해 처리될 수 있습니다.',
          'TODO: 실제 운영자가 추가로 사용하는 문의, 통계, 장애 분석 목적이 있다면 별도로 구체화합니다.'
        ]
      },
      {
        id: 'retention',
        title: '4. 보유 기간',
        paragraphs: [
          '브라우저 로컬 저장소에 저장된 레슨 완료 상태와 대국 설정은 사용자가 브라우저 데이터를 삭제하거나 사이트 데이터 삭제 기능을 사용할 때까지 해당 기기에 남을 수 있습니다.',
          '광고 및 분석 제공자가 처리하는 정보의 보유 기간은 각 제공자의 정책과 운영자가 설정한 보존 기간에 따릅니다.',
          'TODO: 운영자가 별도로 보관하는 문의 내역, 로그, 분석 데이터가 있다면 항목별 보유 기간을 확정합니다.'
        ]
      },
      {
        id: 'third-parties',
        title: '5. 제3자 제공 및 처리위탁',
        paragraphs: [
          '외부 제휴 배너 제공 과정에서 해당 제휴 서비스 관련 도메인으로 외부 요청이 발생할 수 있습니다.',
          'TODO: 실제 운영 기준으로 제3자 제공 또는 처리위탁 여부, 수탁자, 위탁 업무, 국외 이전 여부를 확인해 확정합니다.'
        ]
      },
      {
        id: 'cookies',
        title: '6. 쿠키와 선택권',
        paragraphs: [
          '광고와 분석 도구는 쿠키 또는 유사 기술을 사용할 수 있습니다. 사용자는 브라우저 설정에서 쿠키를 제한하거나 삭제할 수 있으나 일부 광고 또는 통계 기능이 달라질 수 있습니다.',
          'TODO: 적용 대상 지역의 동의 배너, 거부 절차, 쿠키 목록이 필요한지 검토합니다.'
        ]
      }
    ]
  },
  en: {
    metaTitle: 'Privacy Policy | ChessStep',
    metaDescription: 'Privacy notes for local storage, ads, and analytics on ChessStep.',
    title: 'Privacy Policy',
    intro: 'This page is a draft privacy notice for the information ChessStep must confirm before live operation. Review each TODO against the actual operator and deployment settings.',
    sections: [
      {
        id: 'operator',
        title: '1. Operator and contact',
        paragraphs: [
          'TODO: Confirm the operator or business name, responsible person, and reachable email address for the live service.',
          'Privacy inquiries and requests should be handled through the confirmed contact channel with a clear response process.'
        ]
      },
      {
        id: 'items',
        title: '2. Data processed',
        paragraphs: [
          'ChessStep does not require an account and does not send game records, lesson completion, selected level, or side settings to a server database. These values are stored only in the current browser’s local storage.',
          'On pages with external affiliate banners, access data, device data, browser data, cookies, or identifier-related data may be processed for service delivery, abuse prevention, and performance measurement.',
          'TODO: If Google Analytics or another analytics tool is used, document the measurement ID, collected data, anonymization settings, and retention period according to the live configuration.'
        ]
      },
      {
        id: 'purpose',
        title: '3. Purpose of processing',
        paragraphs: [
          'Local storage data is used to keep lesson completion and play settings available in the same browser.',
          'Affiliate-related data may be processed for banner delivery, impression and performance measurement, and abuse prevention.',
          'TODO: Add any operator-specific contact, statistics, or diagnostics purposes used in production.'
        ]
      },
      {
        id: 'retention',
        title: '4. Retention',
        paragraphs: [
          'Lesson completion and play settings in browser local storage may remain on the device until the user clears browser or site data.',
          'Retention for ad and analytics provider data follows each provider’s policy and the retention settings chosen by the operator.',
          'TODO: Confirm retention periods for any inquiry records, logs, or analytics data separately stored by the operator.'
        ]
      },
      {
        id: 'third-parties',
        title: '5. Third parties and processors',
        paragraphs: [
          'External requests to partner domains may occur during the delivery of affiliate banner services.',
          'TODO: Confirm whether third-party sharing, processing delegation, processors, delegated tasks, or cross-border transfers apply under the live operating setup.'
        ]
      },
      {
        id: 'cookies',
        title: '6. Cookies and choices',
        paragraphs: [
          'Advertising and analytics tools may use cookies or similar technologies. Users can restrict or delete cookies in browser settings, although some ad or analytics behavior may change.',
          'TODO: Review whether the target operating region requires a consent banner, opt-out flow, or cookie list.'
        ]
      }
    ]
  }
};

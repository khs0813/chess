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
      ['컴퓨터가 오프라인에서도 동작하나요?', '첫 페이지 로딩에 필요한 파일이 브라우저에 캐시되어 있다면 일부 환경에서 다시 열 수 있지만, 완전한 오프라인 앱을 보장하지는 않습니다. 대국 계산 자체는 외부 체스 API를 사용하지 않습니다. 광고가 활성화된 페이지에서는 Kakao AdFit 스크립트 요청이 발생할 수 있습니다.'],
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
      ['Does the computer work offline?', 'The chess calculation itself uses no external chess API. A previously cached page may reopen in some environments, but this version does not guarantee a fully offline app. When ads are enabled, the page may request the Kakao AdFit script.'],
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
      metaDescription: '체스판 배치, 기물 이동, 체크메이트, 캐슬링, 앙파상, 승격, 무승부 조건을 쉽게 정리했습니다.',
      title: '체스 규칙: 처음 두기 전에 알아야 할 모든 것',
      intro: '체스는 상대 킹을 실제로 잡는 게임이 아니라 피할 수 없는 공격인 체크메이트를 만드는 게임입니다. 아래 순서대로 읽으면 바로 첫 대국을 시작할 수 있습니다.',
      sections: [
        { id: 'setup', title: '1. 체스판과 초기 배치', paragraphs: ['체스판은 8×8, 총 64칸입니다. 백에서 보았을 때 오른쪽 아래는 밝은색 칸이며, 두 번째 랭크에 백 폰 여덟 개가 놓입니다.', '1랭크의 순서는 룩, 나이트, 비숍, 퀸, 킹, 비숍, 나이트, 룩입니다. 퀸은 자기 색 칸에 놓이므로 백 퀸은 밝은 d1, 흑 퀸은 어두운 d8에서 시작합니다.'], bullets: ['백이 항상 먼저 둡니다.', '한 번씩 번갈아 한 수를 둡니다.', '자기 차례를 건너뛸 수 없습니다.'], fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', caption: '표준 초기 배치입니다.' },
        { id: 'pieces', title: '2. 기물별 이동', paragraphs: ['기물 이동은 “선으로 가는 기물”과 “점프하는 기물”로 나누면 쉽습니다. 룩은 가로·세로 직선, 비숍은 대각선, 퀸은 직선과 대각선을 모두 사용합니다. 이 세 기물은 중간에 다른 기물이 있으면 그 너머로 갈 수 없습니다.', '나이트는 ㄱ자 모양으로 움직이며 중간 기물을 뛰어넘습니다. 킹은 모든 방향으로 한 칸만 움직이고, 폰은 앞으로 전진하지만 잡을 때만 대각선 앞으로 갑니다.'], bullets: ['먼저 기물이 가는 “선”을 눈으로 따라가세요.', '내 기물이 길을 막고 있으면 그 뒤 칸은 갈 수 없습니다.', '킹은 공격받는 칸으로 이동할 수 없습니다.'], fen: '7k/8/3n4/8/2B1Q3/4P3/8/R3K2R w KQ - 0 1', caption: '룩은 직선, 비숍은 대각선, 퀸은 둘 다, 나이트는 ㄱ자로 움직인다는 차이를 한 그림에서 비교해 보세요.' },
        { id: 'check', title: '3. 체크와 체크메이트', paragraphs: ['체크는 내 킹이 공격받고 있다는 경고입니다. 체크를 받으면 다른 계획을 세울 수 없고, 반드시 그 공격부터 해결해야 합니다.', '해결 방법은 세 가지입니다. 킹을 안전한 칸으로 옮기거나, 공격하는 기물을 잡거나, 룩·비숍·퀸의 공격선 사이를 막습니다. 세 방법이 모두 불가능하면 체크메이트입니다.'], bullets: ['나이트 체크는 중간을 막을 수 없습니다.', '더블 체크는 킹 이동으로만 피할 수 있습니다.', '체크 표시는 기보에서 +, 체크메이트는 #를 사용합니다.'], fen: '7k/6Q1/5K2/8/8/8/8/8 b - - 0 1', caption: '흑 킹은 체크를 받았고, 도망갈 칸도 퀸을 잡을 방법도 없어 체크메이트입니다.' },
        { id: 'special', title: '4. 캐슬링·앙파상·승격', paragraphs: ['특수 규칙은 처음에는 어렵게 느껴지지만 모두 안전과 폰의 움직임에서 나온 규칙입니다. 캐슬링은 킹을 안전하게 옮기고 룩을 중앙 쪽으로 데려오는 수입니다.', '앙파상은 상대 폰이 두 칸 전진해 내 폰 옆을 지나간 바로 다음 수에만 가능합니다. 승격은 폰이 끝까지 전진했을 때 더 강한 기물로 바꾸는 보상입니다.'], bullets: ['캐슬링은 킹과 룩이 이전에 움직이지 않았고 사이 칸이 비어 있어야 합니다.', '킹이 체크 중이거나 지나가는 칸이 공격받으면 캐슬링할 수 없습니다.', '승격은 대부분 퀸을 고르지만 나이트 승격이 더 좋은 예외도 있습니다.'], fen: 'r3k2r/8/8/3pP3/8/8/8/R3K2R w KQkq d6 0 1', caption: '양쪽 킹과 룩은 캐슬링 형태를 보여 주고, e5 폰은 d6으로 앙파상을 할 수 있는 상황입니다.' },
        { id: 'draws', title: '5. 무승부 조건', paragraphs: ['무승부는 “아무도 이길 수 없는 상태” 또는 “둘 수가 없는 상태”에서 생깁니다. 가장 헷갈리는 예는 스테일메이트입니다. 킹이 체크는 아니지만 합법적인 수가 하나도 없으면 게임은 무승부입니다.', '기물이 너무 적어 체크메이트를 만들 수 없거나, 같은 포지션이 세 번 반복되거나, 폰 이동과 잡기 없이 50수씩 진행되는 경우도 무승부와 관련됩니다.'], bullets: ['킹 대 킹, 킹+비숍 대 킹 등은 메이트가 불가능합니다.', '크게 이기고 있을수록 상대 킹에게 최소 한 수가 남아 있는지 확인하세요.', '스테일메이트는 승리가 아니라 무승부입니다.'], fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1', caption: '흑 킹은 체크가 아니지만 갈 수 있는 칸이 없어 스테일메이트, 즉 무승부입니다.' },
        { id: 'notation', title: '6. 기보 표기 읽기', paragraphs: ['기보는 체스 수를 짧게 적는 방법입니다. 먼저 기물 문자를 보고, 그다음 도착 칸을 읽으면 됩니다. Nf3는 나이트가 f3로 이동했다는 뜻입니다.', '폰은 별도 문자 없이 e4처럼 도착 칸만 적습니다. 잡기는 x, 체크는 +, 체크메이트는 #를 붙입니다. 기보를 읽을 수 있으면 자신의 대국을 복기하고 레슨의 수순을 그대로 따라갈 수 있습니다.'], bullets: ['킹 K, 퀸 Q, 룩 R, 비숍 B, 나이트 N을 사용합니다.', '폰 이동은 e4처럼 칸 이름만 씁니다.', '캐슬링은 O-O 또는 O-O-O입니다.'], fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', caption: '이 그림은 백이 e4와 Nf3를 둔 뒤의 형태입니다. 기보의 문자와 실제 말 위치를 연결해 보세요.' }
      ],
      faq: [['킹을 실제로 잡나요?', '아니요. 피할 수 없는 체크인 체크메이트가 만들어지는 순간 게임이 끝납니다.'], ['캐슬링 중 룩이 공격받아도 되나요?', '네. 킹의 출발·통과·도착 칸이 안전하면 룩이 공격받고 있어도 캐슬링할 수 있습니다.'], ['폰은 언제 두 칸 움직일 수 있나요?', '각 폰이 자신의 시작 랭크에 있고 앞의 두 칸이 모두 비어 있을 때 한 번에 두 칸 전진할 수 있습니다.']]
    },
    en: {
      metaTitle: 'Chess Rules Guide | ChessStep',
      metaDescription: 'Learn setup, piece moves, checkmate, castling, en passant, promotion, and draws.',
      title: 'Chess rules: Everything before your first game',
      intro: 'Chess is not won by physically capturing the king. The goal is checkmate: an attack the king cannot escape. Follow the sections in order and you will be ready to play.',
      sections: [
        { id: 'setup', title: '1. Board and starting position', paragraphs: ['A chessboard has 64 squares in an 8×8 grid. From White’s side, the lower-right corner is light, and White’s eight pawns begin on the second rank.', 'The first-rank order is rook, knight, bishop, queen, king, bishop, knight, rook. Queens begin on their own color: White on light d1 and Black on dark d8.'], bullets: ['White always moves first.', 'Players alternate one move at a time.', 'A player may not pass a turn.'], fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', caption: 'The standard starting position.' },
        { id: 'pieces', title: '2. How the pieces move', paragraphs: ['Piece movement is easier if you separate “line pieces” from “jumping pieces.” Rooks move horizontally and vertically, bishops move diagonally, and queens do both. These three cannot pass through another piece.', 'Knights move in an L-shape and can jump over pieces. Kings move one square in any direction, and pawns move forward but capture diagonally forward.'], bullets: ['Trace the line a piece uses before choosing a square.', 'If one of your pieces blocks the path, the squares behind it are not available.', 'The king may never move onto an attacked square.'], fen: '7k/8/3n4/8/2B1Q3/4P3/8/R3K2R w KQ - 0 1', caption: 'Compare the rook’s straight lines, the bishop’s diagonals, the queen’s combined movement, and the knight’s L-shape.' },
        { id: 'check', title: '3. Check and checkmate', paragraphs: ['Check means your king is under attack. When you are in check, every other plan must wait; your move must solve the check first.', 'There are three answers: move the king, capture the attacking piece, or block a rook, bishop, or queen line. If none of those answers exists, it is checkmate.'], bullets: ['A knight check cannot be blocked.', 'A double check can only be answered by moving the king.', 'Notation uses + for check and # for checkmate.'], fen: '7k/6Q1/5K2/8/8/8/8/8 b - - 0 1', caption: 'Black is in check, cannot capture the queen, and has no safe square, so this is checkmate.' },
        { id: 'special', title: '4. Castling, en passant, and promotion', paragraphs: ['Special rules feel unusual at first, but each one follows from king safety or pawn movement. Castling moves the king toward safety and brings the rook closer to the center.', 'En passant is available only on the move immediately after an enemy pawn advances two squares beside your pawn. Promotion rewards a pawn that reaches the final rank by turning it into a stronger piece.'], bullets: ['For castling, the king and rook must not have moved and the squares between them must be empty.', 'You cannot castle out of check, through check, or into check.', 'Most promotions become queens, but knight promotion can be the best exception.'], fen: 'r3k2r/8/8/3pP3/8/8/8/R3K2R w KQkq d6 0 1', caption: 'The kings and rooks show castling shapes, while White’s e5 pawn can capture en passant on d6.' },
        { id: 'draws', title: '5. Draw conditions', paragraphs: ['A draw happens when neither side can win or when the side to move has no legal move without being in check. The most confusing example is stalemate: the king is not attacked, but there is no legal move.', 'Too little mating material, threefold repetition, and fifty moves by each side without a pawn move or capture are also draw mechanisms.'], bullets: ['King versus king and king plus bishop versus king cannot force mate.', 'When you are far ahead, make sure the enemy king still has at least one legal move before the final mate net.', 'Stalemate is a draw, not a win.'], fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1', caption: 'Black is not in check, but every legal square is covered. That makes the position stalemate.' },
        { id: 'notation', title: '6. Read algebraic notation', paragraphs: ['Notation is a compact way to write chess moves. Read the piece letter first, then the destination square. Nf3 means a knight moved to f3.', 'Pawns use no letter, so e4 is simply a pawn move. Captures use x, check uses +, and checkmate uses #. Once you can read notation, you can review your own games and follow lesson lines.'], bullets: ['Use K, Q, R, B, and N for the pieces.', 'Pawn moves use only the square name, such as e4.', 'Castling is O-O or O-O-O.'], fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', caption: 'This position shows White after e4 and Nf3. Connect the notation letters with the pieces on the board.' }
      ],
      faq: [['Do you actually capture the king?', 'No. The game ends as soon as an unavoidable checkmate is established.'], ['May the rook be attacked during castling?', 'Yes. Only the king’s starting, transit, and destination squares must be safe.'], ['When may a pawn move two squares?', 'Only from its starting rank, and only when both squares in front are empty.']]
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
    privacy: '대국과 레슨 진행 데이터는 현재 브라우저의 로컬 저장소에만 보관됩니다. 광고 제공을 위해 Kakao AdFit 외부 스크립트가 로드될 수 있으며, 광고 제공과 성과 측정 과정에서 접속·기기 정보 또는 쿠키 등이 처리될 수 있습니다. 실제 운영 정책은 개인정보처리방침에서 안내합니다.'
  },
  en: {
    metaTitle: 'About ChessStep | Chess Learning',
    metaDescription: 'Learn ChessStep goals, learning design, privacy approach, and browser AI limits.',
    title: 'ChessStep connects practice and learning',
    intro: 'ChessStep is a static chess learning site in Korean and English, built for first-time players through students working on positional planning, without requiring installation or an account.',
    principles: [
      ['Start immediately', 'The board and courses open in the browser without account creation or app installation.'],
      ['Explain the process', 'Lessons repeat candidate generation, opponent threats, and evaluation of the resulting position instead of presenting a move alone.'],
      ['Minimize personal data', 'Games and progress use no server database. Lesson completion remains in local storage on the current device, and ad-related external scripts are described in the privacy policy when enabled.'],
      ['Search-friendly content', 'Korean and English pages use separate URLs with complete HTML so users and search engines receive the same core content.']
    ],
    limitsTitle: 'Scope of the browser AI',
    limits: ['It is a learning opponent, not a tournament engine, and no exact rating is promised.', 'Advanced search depth varies by device performance and position complexity.', 'Hints work best after you first create your own candidates and explanations.'],
    privacyTitle: 'Data and privacy',
    privacy: 'Game and lesson progress data is stored only in this browser’s local storage. Kakao AdFit external scripts may load to provide ads, and access, device, or cookie data may be processed for ad delivery and measurement. The live operating policy is described in the privacy policy.'
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
          '광고가 활성화된 홈, 컴퓨터 대국, 학습 코스, 세부 레슨, 체스 가이드 및 소개 페이지에서는 Kakao AdFit 외부 스크립트가 로드될 수 있습니다. 이 과정에서 광고 제공, 부정 이용 방지, 성과 측정을 위해 접속 정보, 기기 정보, 브라우저 정보, 쿠키 또는 광고 식별 관련 정보가 처리될 수 있습니다.',
          'TODO: Google Analytics 등 분석 도구를 실제로 사용하는 경우 측정 ID, 수집 항목, 익명화 설정, 보유 기간을 운영 설정에 맞게 명시합니다.'
        ]
      },
      {
        id: 'purpose',
        title: '3. 처리 목적',
        paragraphs: [
          '로컬 저장 데이터는 레슨 완료 상태와 대국 설정을 같은 브라우저에서 다시 사용할 수 있도록 하기 위해 사용됩니다.',
          'Kakao AdFit 관련 정보는 광고 제공, 광고 노출 및 성과 측정, 서비스 악용 방지를 위해 처리될 수 있습니다.',
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
          '광고가 활성화된 경우 Kakao AdFit 서비스 제공 과정에서 카카오 관련 도메인으로 외부 요청이 발생할 수 있습니다.',
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
          'When ads are enabled on home, play, course, detailed lesson, chess guide, and about pages, the Kakao AdFit external script may load. During ad delivery, fraud prevention, and measurement, access data, device data, browser data, cookies, or ad identifier-related data may be processed.',
          'TODO: If Google Analytics or another analytics tool is used, document the measurement ID, collected data, anonymization settings, and retention period according to the live configuration.'
        ]
      },
      {
        id: 'purpose',
        title: '3. Purpose of processing',
        paragraphs: [
          'Local storage data is used to keep lesson completion and play settings available in the same browser.',
          'Kakao AdFit-related data may be processed for ad delivery, impression and performance measurement, and abuse prevention.',
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
          'When ads are enabled, Kakao AdFit may cause external requests to Kakao-related domains during ad service delivery.',
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

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
      ['컴퓨터가 오프라인에서도 동작하나요?', '첫 페이지 로딩에 필요한 파일이 브라우저에 캐시되어 있다면 일부 환경에서 다시 열 수 있지만, 완전한 오프라인 앱을 보장하지는 않습니다. 대국 계산 자체는 외부 API를 사용하지 않습니다.'],
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
      ['Does the computer work offline?', 'The calculation itself uses no external API. A previously cached page may reopen in some environments, but this version does not guarantee a fully offline app.'],
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
        { id: 'pieces', title: '2. 기물별 이동', paragraphs: ['룩은 파일과 랭크를 따라 직선으로, 비숍은 대각선으로, 퀸은 두 방향 모두 이동합니다. 이 기물들은 다른 기물을 뛰어넘을 수 없습니다.', '나이트는 가로 두 칸과 세로 한 칸 또는 반대로 움직이며 중간 기물을 뛰어넘습니다. 킹은 모든 방향으로 한 칸 이동하지만 공격받는 칸으로 갈 수 없습니다.'], bullets: ['폰은 한 칸 앞으로 이동하고 대각선 앞으로 잡습니다.', '시작 위치의 폰은 앞이 비어 있으면 두 칸 전진할 수 있습니다.', '폰은 뒤로 이동하거나 뒤쪽 기물을 잡을 수 없습니다.'] },
        { id: 'check', title: '3. 체크와 체크메이트', paragraphs: ['킹이 상대 기물의 공격을 받으면 체크입니다. 체크를 받은 쪽은 킹 이동, 공격 기물 잡기, 공격선 막기 중 하나로 즉시 해결해야 합니다.', '어떤 방법으로도 체크를 피할 수 없으면 체크메이트이고 게임이 끝납니다. 킹을 공격받는 상태로 남기는 수와 자기 킹을 공격선에 노출하는 수는 처음부터 합법적이지 않습니다.'], bullets: ['더블 체크는 킹 이동으로만 피할 수 있습니다.', '나이트 체크는 중간을 막을 수 없습니다.', '체크 표시는 기보에서 +, 체크메이트는 #를 사용합니다.'] },
        { id: 'special', title: '4. 캐슬링·앙파상·승격', paragraphs: ['캐슬링은 킹과 룩을 동시에 움직이는 유일한 수입니다. 두 기물이 움직인 적이 없고 사이가 비어 있으며 킹의 출발·통과·도착 칸이 안전해야 합니다.', '앙파상은 상대 폰의 두 칸 전진 직후에만 가능하고, 승격은 폰이 마지막 랭크에 도달했을 때 퀸·룩·비숍·나이트 중 하나로 바꾸는 규칙입니다.'], bullets: ['킹사이드 캐슬링 표기는 O-O입니다.', '퀸사이드 캐슬링 표기는 O-O-O입니다.', '승격은 보통 퀸을 선택하지만 상황에 따라 나이트가 더 좋을 수 있습니다.'] },
        { id: 'draws', title: '5. 무승부 조건', paragraphs: ['킹이 체크가 아니지만 합법적인 수가 없으면 스테일메이트입니다. 양쪽이 체크메이트를 만들 수 없는 기물만 남아도 무승부입니다.', '동일한 포지션이 세 번 반복되거나, 폰 이동과 잡기 없이 50수씩 진행되는 조건도 무승부와 관련됩니다. 실제 대회 규칙은 선언 절차가 있으나 이 사이트에서는 연습 편의를 위해 자동 판정합니다.'], bullets: ['합의 무승부도 가능합니다.', '킹 대 킹, 킹+비숍 대 킹 등은 메이트 불가능 기물입니다.', '우세할 때 스테일메이트를 피하도록 상대 킹의 합법 수를 확인합니다.'] },
        { id: 'notation', title: '6. 기보 표기 읽기', paragraphs: ['대수 기보법은 기물 문자와 도착 칸을 사용합니다. Nf3는 나이트가 f3로 이동했다는 뜻이며, Bxe6는 비숍이 e6의 기물을 잡았다는 뜻입니다.', '폰은 별도 문자 없이 e4처럼 도착 칸만 적고, 승격은 e8=Q처럼 표시합니다. 기보를 읽으면 자신의 대국을 기록하고 교재의 수순을 따라갈 수 있습니다.'], bullets: ['킹 K, 퀸 Q, 룩 R, 비숍 B, 나이트 N을 사용합니다.', '잡기는 x, 체크는 +, 메이트는 #를 붙입니다.', '캐슬링은 O-O 또는 O-O-O입니다.'] }
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
        { id: 'pieces', title: '2. How the pieces move', paragraphs: ['Rooks move along files and ranks, bishops move diagonally, and queens combine both. These long-range pieces cannot jump over other pieces.', 'Knights move two squares in one direction and one perpendicular to it, jumping over intervening pieces. Kings move one square in any direction but never onto an attacked square.'], bullets: ['Pawns move forward and capture one square diagonally forward.', 'From the starting rank, a pawn may advance two squares if both are empty.', 'Pawns never move or capture backward.'] },
        { id: 'check', title: '3. Check and checkmate', paragraphs: ['A king under attack is in check. The player must immediately move the king, capture the attacker, or block the attacking line.', 'If none is possible, it is checkmate and the game ends. A move that leaves your king attacked is illegal from the start.'], bullets: ['A double check can only be answered by moving the king.', 'A knight check cannot be blocked.', 'Notation uses + for check and # for checkmate.'] },
        { id: 'special', title: '4. Castling, en passant, and promotion', paragraphs: ['Castling is the only move that moves king and rook together. Neither may have moved, the path must be clear, and the king’s start, transit, and destination squares must be safe.', 'En passant is available only immediately after an opposing pawn advances two squares beside your pawn. Promotion replaces a pawn on the last rank with a queen, rook, bishop, or knight.'], bullets: ['Kingside castling is written O-O.', 'Queenside castling is written O-O-O.', 'Queen promotion is common, but underpromotion to a knight can be best.'] },
        { id: 'draws', title: '5. Draw conditions', paragraphs: ['Stalemate occurs when the side to move is not in check but has no legal move. A position is also drawn when neither side has enough material to create checkmate.', 'Threefold repetition and fifty moves by each side without a pawn move or capture are additional draw mechanisms. Tournament rules include claim procedures; this practice site detects them automatically.'], bullets: ['Players may also agree to a draw.', 'King versus king and king plus bishop versus king cannot produce mate.', 'When ahead, prevent stalemate by checking the opponent’s remaining legal squares.'] },
        { id: 'notation', title: '6. Read algebraic notation', paragraphs: ['Algebraic notation combines a piece letter and destination. Nf3 means a knight moved to f3; Bxe6 means a bishop captured on e6.', 'Pawns use no letter, so e4 is simply a pawn move. Promotion appears as e8=Q. Notation lets you record your games and follow lessons.'], bullets: ['Use K, Q, R, B, and N for the pieces.', 'Use x for capture, + for check, and # for mate.', 'Castling is O-O or O-O-O.'] }
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
        { id: 'search', title: '전술을 찾는 기본 순서', paragraphs: ['먼저 모든 체크를 찾고, 다음으로 가치가 큰 기물 잡기, 마지막으로 직접적인 위협을 찾습니다. 각 후보수마다 상대의 가장 강한 방어를 한 수 이상 계산합니다.'], bullets: ['내 킹이 안전한지 먼저 확인합니다.', '상대의 느슨한 기물과 겹쳐 있는 기물을 찾습니다.', '수순이 끝난 뒤 남는 물질과 킹 안전을 평가합니다.'] },
        { id: 'fork', title: '1. 포크와 더블 어택', paragraphs: ['한 기물이 두 목표를 동시에 공격합니다. 나이트가 킹과 퀸을 함께 공격하는 형태가 대표적이지만 폰과 퀸의 더블 어택도 매우 흔합니다.'], bullets: ['체크가 포함된 포크를 우선 탐색합니다.', '포크 칸이 상대 폰에 의해 통제되는지 확인합니다.'] },
        { id: 'pin', title: '2. 핀', paragraphs: ['앞 기물이 움직이면 뒤의 더 중요한 기물이 노출됩니다. 킹에 대한 절대 핀은 기물이 합법적으로 움직이지 못하게 만들 수 있습니다.'], bullets: ['핀된 기물을 한 번 더 공격합니다.', '핀을 만든 기물의 뒤가 안전한지 봅니다.'] },
        { id: 'skewer', title: '3. 스큐어', paragraphs: ['가치가 큰 앞 기물을 공격해 이동시킨 뒤 뒤의 기물을 잡습니다. 킹과 퀸, 퀸과 룩이 같은 선에 놓였을 때 자주 발생합니다.'], bullets: ['룩·비숍·퀸의 직선 끝까지 추적합니다.', '앞 기물이 체크를 받으면 수순이 강제됩니다.'] },
        { id: 'discovery', title: '4. 발견 공격과 더블 체크', paragraphs: ['앞 기물이 움직이면서 뒤의 직선 기물 공격선을 엽니다. 발견 체크라면 앞 기물이 다른 목표를 자유롭게 공격할 수 있고, 더블 체크는 킹 이동만 허용합니다.'], bullets: ['앞 기물이 체크나 퀸 공격을 동시에 만들 수 있는지 봅니다.', '발견 공격 후 뒤 기물이 잡히지 않는지 확인합니다.'] },
        { id: 'remove', title: '5. 수비 기물 제거', paragraphs: ['목표를 지키는 유일한 기물을 교환하거나 공격해 방어 관계를 끊습니다. 메이트 공격에서 특히 자주 사용됩니다.'], bullets: ['목표보다 수비자를 먼저 표시합니다.', '제거 후 상대의 새로운 수비가 가능한지 계산합니다.'] },
        { id: 'deflection', title: '6. 유인과 디플렉션', paragraphs: ['상대 기물을 불리한 칸으로 끌어들이거나 중요한 방어 임무에서 떼어냅니다. 희생이 포함되더라도 뒤의 강제 이득이 충분하면 성립합니다.'], bullets: ['상대가 제안을 거절할 수 있는지 확인합니다.', '유인된 기물이 막고 있던 선과 지키던 칸을 봅니다.'] },
        { id: 'overload', title: '7. 과부하', paragraphs: ['한 수비 기물이 두 중요한 임무를 동시에 맡고 있어 둘 다 유지할 수 없는 상태입니다. 한쪽 임무를 강제하면 다른 목표가 무너집니다.'], bullets: ['퀸이 여러 기물을 동시에 지키는 위치를 찾습니다.', '교환 순서를 바꾸면 방어가 끊기는지 시험합니다.'] },
        { id: 'backrank', title: '8. 백랭크 메이트', paragraphs: ['자기 폰에 막힌 킹과 열린 마지막 랭크를 룩이나 퀸이 공격하는 패턴입니다. 한 칸의 루프트가 없으면 작은 전술도 메이트 위협으로 커집니다.'], bullets: ['상대뿐 아니라 내 백랭크도 매 수 확인합니다.', 'h3, h6 같은 루프트가 필요한지 판단합니다.'] }
      ],
      faq: [['전술 공부는 하루 몇 문제면 충분한가요?', '정답률을 유지할 수 있는 10~20문제를 꾸준히 푸는 편이 무작정 많은 문제를 빠르게 넘기는 것보다 좋습니다.'], ['정답을 못 찾으면 바로 해설을 봐도 되나요?', '몇 분간 후보수를 만들고 상대의 최선 방어를 계산한 뒤 보세요. 해설 후에는 첫 수만 외우지 말고 패턴과 탐색 단서를 요약하세요.']]
    },
    en: {
      metaTitle: '8 Chess Tactics | ChessStep',
      metaDescription: 'Learn forks, pins, skewers, discovered attacks, overload, and mate patterns.',
      title: 'Chess tactics: Eight patterns to find in real games',
      intro: 'A tactic is not a lucky flash of brilliance. It is a forcing sequence created by the attacking relationships between pieces. Learn the patterns and scan checks, captures, and threats every turn.',
      sections: [
        { id: 'search', title: 'A practical tactical search order', paragraphs: ['List every check, then major capture, then direct threat. For each candidate, calculate at least the opponent’s strongest defensive reply.'], bullets: ['Confirm your own king is safe first.', 'Find loose and aligned pieces.', 'Evaluate material and king safety after the line ends.'] },
        { id: 'fork', title: '1. Forks and double attacks', paragraphs: ['One piece attacks two targets. A knight fork of king and queen is famous, but pawn and queen double attacks are just as practical.'], bullets: ['Search first for forks that include check.', 'Verify that an enemy pawn does not control the fork square.'] },
        { id: 'pin', title: '2. Pins', paragraphs: ['Moving the front piece would expose something more valuable behind it. An absolute pin to the king can make a move illegal.'], bullets: ['Attack a pinned piece again.', 'Check that the pinning piece itself is safe.'] },
        { id: 'skewer', title: '3. Skewers', paragraphs: ['Attack the more valuable front piece, then capture the piece behind after it moves. Kings and queens or queens and rooks often form the alignment.'], bullets: ['Trace every rook, bishop, and queen ray to the end.', 'A skewer with check forces the sequence.'] },
        { id: 'discovery', title: '4. Discovered attacks and double check', paragraphs: ['A front piece moves and opens a rook, bishop, or queen line. With discovered check, the moving piece can create a second threat; a double check can only be answered by moving the king.'], bullets: ['See whether the front piece can also check or attack the queen.', 'Make sure the revealed long-range piece stays safe.'] },
        { id: 'remove', title: '5. Removing the defender', paragraphs: ['Exchange or attack the only piece protecting a target. The pattern is especially common in mating attacks.'], bullets: ['Identify the defender before the target.', 'Calculate whether a replacement defender appears.'] },
        { id: 'deflection', title: '6. Attraction and deflection', paragraphs: ['Draw a piece onto a bad square or pull it away from a critical defensive duty. A sacrifice works only when the follow-up is forcing enough.'], bullets: ['Check whether the opponent can decline the offer.', 'Notice the line or square the deflected piece abandons.'] },
        { id: 'overload', title: '7. Overload', paragraphs: ['One defender has two essential jobs and cannot maintain both. Force it to commit to one task, and the other target falls.'], bullets: ['Look for queens or rooks defending several targets.', 'Test whether changing the capture order breaks the defense.'] },
        { id: 'backrank', title: '8. Back-rank mate', paragraphs: ['A king trapped by its own pawns is attacked along the final rank by a rook or queen. Without an escape square, a small tactical threat can become mate.'], bullets: ['Check your own back rank as well as the opponent’s.', 'Decide whether a move such as h3 or h6 creates a useful escape square.'] }
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
        { id: 'goals', title: '오프닝의 네 가지 목표', paragraphs: ['중앙을 점유하거나 통제하고, 나이트와 비숍을 활동적인 칸에 전개하며, 캐슬링으로 킹을 안전하게 만들고, 룩을 연결합니다.'], bullets: ['중앙 폰을 한두 개 사용합니다.', '같은 기물을 이유 없이 반복 이동하지 않습니다.', '퀸보다 가벼운 기물을 먼저 전개합니다.', '상대의 직접적인 위협은 원칙보다 우선합니다.'] },
        { id: 'mistakes', title: '초보자가 자주 하는 오프닝 실수', paragraphs: ['퀸으로 빠른 메이트를 노리거나 측면 폰을 많이 밀면 전개가 늦어집니다. 상대가 공격할 때마다 같은 기물을 움직이면 템포를 잃고 중앙과 킹 안전에서 뒤처집니다.'], bullets: ['목적 없는 폰 이동', '체크라는 이유만으로 두는 약한 수', '캐슬링을 미루고 중앙에서 킹을 움직이는 것', '외운 수가 끝난 뒤 계획 없이 기물을 교환하는 것'] },
        { id: 'italian', title: '입문용 예시: 이탈리안 게임', paragraphs: ['1.e4 e5 2.Nf3 Nc6 3.Bc4로 양쪽이 중앙과 f7·f2 주변을 압박합니다. 이후 캐슬링, d3 또는 d4, 룩 e1 배치가 자연스럽습니다.'], bullets: ['Bc4는 흑의 약한 f7을 바라봅니다.', '빠른 퀸 공격보다 캐슬링과 중앙 준비가 우선입니다.', '중앙이 열리면 전개 속도가 중요해집니다.'], fen: 'r1bqkbnr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', caption: '이탈리안 게임의 기본 형태입니다.' },
        { id: 'queens', title: '입문용 예시: 퀸즈 갬빗 구조', paragraphs: ['1.d4 d5 2.c4는 흑 중앙 폰에 압박을 가해 백이 더 넓은 중앙을 만들려는 선택입니다. 이름은 갬빗이지만 많은 수순에서 백은 폰을 되찾거나 구조적 보상을 얻습니다.'], bullets: ['c폰과 d폰의 긴장을 성급히 해소하지 않습니다.', 'Nc3, Nf3, e3, Bd3 같은 안정적 전개를 사용합니다.', '흑의 ...c5 또는 ...e5 브레이크를 예상합니다.'] },
        { id: 'after', title: '이론이 끝난 뒤 계획 찾기', paragraphs: ['전개가 끝나면 가장 나쁜 기물, 가능한 폰 브레이크, 상대의 위협을 차례로 봅니다. 수순을 기억하지 못해도 이 세 질문으로 플레이 가능한 수를 찾을 수 있습니다.'], bullets: ['내 가장 활동이 낮은 기물은 무엇인가?', '어떤 폰 이동이 파일이나 대각선을 여는가?', '상대가 다음에 원하는 교환이나 브레이크는 무엇인가?'] }
      ],
      faq: [['오프닝은 몇 수까지 외워야 하나요?', '입문자는 5~8수의 자연스러운 전개와 그 이유를 아는 것으로 충분합니다. 수보다 폰 구조와 기물 배치의 목적을 기억하세요.'], ['하나의 오프닝만 계속 둬도 되나요?', '초기에는 같은 구조를 반복해 계획을 익히는 것이 좋습니다. 이후 다른 중앙 구조를 경험하며 범위를 넓히세요.']]
    },
    en: {
      metaTitle: 'Chess Opening Principles | ChessStep',
      metaDescription: 'Learn center control, development, castling, common mistakes, and starter plans.',
      title: 'Chess openings: Principles before memorized moves',
      intro: 'The opening is not a test of exact recall. It prepares a playable middlegame. Center control, development, and king safety let you respond sensibly even when the opponent leaves theory.',
      sections: [
        { id: 'goals', title: 'Four opening goals', paragraphs: ['Occupy or control the center, develop knights and bishops, castle, and connect the rooks.'], bullets: ['Use one or two central pawns.', 'Do not repeat a piece move without a reason.', 'Develop minor pieces before the queen.', 'A concrete opponent threat overrides a general principle.'] },
        { id: 'mistakes', title: 'Common beginner opening mistakes', paragraphs: ['Early queen attacks and many wing-pawn moves lose development time. Repeatedly moving the same piece lets the opponent build central control and king safety.'], bullets: ['Purpose-free pawn moves', 'Weak checks played only because they are checks', 'Delaying castling and moving the king in the center', 'Trading pieces without a plan after memorized theory ends'] },
        { id: 'italian', title: 'Starter example: The Italian Game', paragraphs: ['After 1.e4 e5 2.Nf3 Nc6 3.Bc4, both sides influence the center and the sensitive f7 and f2 squares. Castling, d3 or d4, and Re1 are natural next steps.'], bullets: ['Bc4 looks toward the vulnerable f7 square.', 'Castle and prepare the center before launching a queen attack.', 'Development speed matters when the center opens.'], fen: 'r1bqkbnr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', caption: 'A basic Italian Game position.' },
        { id: 'queens', title: 'Starter example: Queen’s Gambit structure', paragraphs: ['After 1.d4 d5 2.c4, White pressures the central d5 pawn and seeks broader central control. Despite the name, White often regains the pawn or receives structural compensation.'], bullets: ['Do not release the c-pawn and d-pawn tension automatically.', 'Use stable development such as Nc3, Nf3, e3, and Bd3.', 'Expect Black’s ...c5 or ...e5 break.'] },
        { id: 'after', title: 'Find a plan when theory ends', paragraphs: ['Once developed, look at your worst piece, available pawn breaks, and the opponent’s plan. Those three questions produce useful moves even without memorized theory.'], bullets: ['Which of my pieces is least active?', 'Which pawn move opens a file or diagonal?', 'What exchange or break does the opponent want next?'] }
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
      ['개인정보 최소화', '대국과 진행률은 서버 데이터베이스를 사용하지 않습니다. 레슨 완료 상태는 현재 기기의 로컬 저장소에만 남습니다.'],
      ['검색 친화적 콘텐츠', '한국어와 영어를 별도 URL의 완전한 HTML로 제공해 사용자와 검색엔진 모두 동일한 핵심 내용을 읽을 수 있게 설계했습니다.']
    ],
    limitsTitle: '브라우저 AI의 범위',
    limits: ['학습용 상대이며 전문 대회 엔진의 강도나 정확한 레이팅을 보장하지 않습니다.', '고급 난이도도 기기 성능과 포지션 복잡도에 따라 탐색 깊이가 달라집니다.', '추천 수는 학습 보조 수단이며 먼저 자신의 후보수와 이유를 만든 뒤 비교하는 방식이 좋습니다.'],
    privacyTitle: '데이터와 개인정보',
    privacy: '기본 프로젝트에는 회원가입, 서버 로그 저장, 광고 SDK, 외부 체스 API가 없습니다. 선택적으로 GA 측정 ID를 설정할 수 있으므로 실제 운영 시에는 사용하는 분석 도구에 맞춘 개인정보처리방침을 추가해야 합니다.'
  },
  en: {
    metaTitle: 'About ChessStep | Chess Learning',
    metaDescription: 'Learn ChessStep goals, learning design, privacy approach, and browser AI limits.',
    title: 'ChessStep connects practice and learning',
    intro: 'ChessStep is a static chess learning site in Korean and English, built for first-time players through students working on positional planning, without requiring installation or an account.',
    principles: [
      ['Start immediately', 'The board and courses open in the browser without account creation or app installation.'],
      ['Explain the process', 'Lessons repeat candidate generation, opponent threats, and evaluation of the resulting position instead of presenting a move alone.'],
      ['Minimize personal data', 'Games and progress use no server database. Lesson completion remains in local storage on the current device.'],
      ['Search-friendly content', 'Korean and English pages use separate URLs with complete HTML so users and search engines receive the same core content.']
    ],
    limitsTitle: 'Scope of the browser AI',
    limits: ['It is a learning opponent, not a tournament engine, and no exact rating is promised.', 'Advanced search depth varies by device performance and position complexity.', 'Hints work best after you first create your own candidates and explanations.'],
    privacyTitle: 'Data and privacy',
    privacy: 'The base project has no sign-up, server database, ad SDK, or external chess API. GA can be enabled with an optional measurement ID, so a production deployment should add a privacy policy matching the analytics tools actually used.'
  }
};

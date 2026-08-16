export const COURSES = {
  ko: {
    beginner: {
      metaTitle: '체스 초급 코스 | 규칙부터 체크메이트까지 - ChessStep',
      metaDescription: '체스 입문자를 위한 무료 초급 코스입니다. 기물 이동, 기물 가치, 체크와 체크메이트, 캐슬링, 실수 줄이기, 기본 메이트를 6개 레슨으로 배웁니다.',
      title: '초급 코스: 처음 시작하는 체스',
      level: '초급', duration: '약 90분', lessonCount: 6,
      intro: '말의 움직임을 외우는 데서 끝내지 않고, 매 수 무엇을 확인해야 하는지까지 익히는 입문 과정입니다. 레슨을 순서대로 읽은 뒤 초급 컴퓨터와 짧게 대국하면 가장 빠르게 감각을 만들 수 있습니다.',
      outcomes: ['모든 기물의 합법적인 이동과 특수 규칙을 설명할 수 있습니다.', '체크를 피하고 간단한 체크메이트를 완성할 수 있습니다.', '초반에 중앙을 차지하고 기물을 안전하게 전개할 수 있습니다.', '한 수짜리 기물 손실을 줄이는 확인 습관을 만듭니다.'],
      lessons: [
        {
          title: '체스판 읽기와 기물 이동', duration: 15,
          summary: '좌표, 백과 흑의 방향, 폰·나이트·비숍·룩·퀸·킹의 이동을 한 번에 정리합니다.',
          paragraphs: [
            '체스판은 가로 파일 a부터 h, 세로 랭크 1부터 8로 좌표를 표시합니다. 백 진영에서 오른쪽 아래 칸은 항상 밝은색이며, 백은 1랭크와 2랭크에서 출발합니다.',
            '룩은 직선, 비숍은 대각선, 퀸은 두 움직임을 모두 사용합니다. 나이트는 다른 기물을 뛰어넘을 수 있고, 킹은 한 칸씩 이동합니다. 폰은 앞으로 이동하지만 대각선 앞으로만 잡는다는 점이 가장 자주 헷갈립니다.'
          ],
          bullets: ['기물은 자기 편 기물이 있는 칸으로 이동할 수 없습니다.', '상대 기물이 있는 칸으로 이동하면 그 기물을 잡습니다.', '킹을 체크 상태로 남기는 수는 합법적인 수가 아닙니다.'],
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          caption: '초기 배치. 퀸은 자기 색과 같은 색 칸에서 시작합니다. 백 퀸은 d1, 흑 퀸은 d8입니다.',
          keyPoint: '기물을 움직이기 전에 출발 칸과 도착 칸의 좌표를 소리 내어 읽어 보세요.',
          practice: '빈 체스판을 떠올리고 a1, d4, h8의 위치를 손가락으로 찾아 보세요.'
        },
        {
          title: '기물 가치와 안전한 전개', duration: 15,
          summary: '기물의 상대적 가치를 이해하고, 초반에 같은 기물을 반복해서 움직이지 않는 이유를 배웁니다.',
          paragraphs: [
            '보통 폰 1, 나이트와 비숍 3, 룩 5, 퀸 9 정도로 가치를 비교합니다. 킹은 잡히면 게임이 끝나므로 숫자로 환산하지 않습니다. 이 값은 절대적인 가격표가 아니라 교환을 판단하는 출발점입니다.',
            '초반에는 중앙 폰을 움직이고, 나이트와 비숍을 한 번씩 전개한 뒤 캐슬링하는 것이 안전합니다. 퀸을 너무 일찍 꺼내면 약한 기물에게 쫓기면서 상대만 전개를 돕게 됩니다.'
          ],
          bullets: ['중앙의 e4, d4, e5, d5를 점유하거나 통제합니다.', '나이트는 보통 c3·f3 또는 c6·f6로 전개합니다.', '한 기물을 여러 번 움직이기 전에 다른 기물도 게임에 참여시킵니다.'],
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
          caption: '백은 e4와 Nf3로 중앙을 압박하고, 흑은 e5와 Nc6로 대응했습니다. 양쪽 모두 자연스러운 전개입니다.',
          keyPoint: '초반 목표는 즉시 공격이 아니라 더 많은 기물을 좋은 칸에 배치하는 것입니다.',
          practice: '초급 AI와 10수를 두되, 퀸을 움직이기 전에 두 나이트와 두 비숍 중 세 기물을 전개해 보세요.'
        },
        {
          title: '체크, 체크메이트, 스테일메이트', duration: 15,
          summary: '체크를 받았을 때의 세 가지 대응과 게임이 끝나는 조건을 구분합니다.',
          paragraphs: [
            '체크를 받으면 킹을 피하거나, 공격 기물을 잡거나, 공격선 사이를 막아야 합니다. 이 세 방법 중 하나도 가능하지 않으면 체크메이트이며 공격한 쪽이 승리합니다.',
            '킹이 체크는 아니지만 합법적인 수가 하나도 없으면 스테일메이트입니다. 이 경우 우세한 기물이 많아도 무승부이므로, 마무리 단계에서는 상대 킹에게 최소 한 칸의 이동 공간을 남길지 확인해야 합니다.'
          ],
          bullets: ['체크를 무시하고 다른 공격을 하는 수는 둘 수 없습니다.', '나이트 체크는 공격선을 막을 수 없어 킹 이동 또는 나이트 잡기만 가능합니다.', '체크메이트와 스테일메이트의 차이는 현재 킹이 공격받고 있는지입니다.'],
          fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
          caption: '흑 킹은 체크를 받고 있고 피할 칸도, 퀸을 잡을 방법도 없습니다. 초보자에게 유명한 빠른 메이트 형태입니다.',
          keyPoint: '내 수를 두기 전 “상대 킹에게 체크인가?”보다 먼저 “내 킹은 안전한가?”를 확인하세요.',
          practice: '대국 중 체크를 받으면 세 대응 방식인 이동·잡기·막기를 차례대로 점검해 보세요.'
        },
        {
          title: '캐슬링, 앙파상, 폰 승격', duration: 15,
          summary: '일반 이동과 다른 세 가지 특수 규칙을 실제 조건과 함께 익힙니다.',
          paragraphs: [
            '캐슬링은 킹을 두 칸 옮기고 룩을 킹 옆으로 이동시키는 한 번의 수입니다. 킹과 해당 룩이 움직인 적이 없어야 하고, 사이가 비어 있어야 하며, 킹이 체크 중이거나 공격받는 칸을 지나갈 수 없습니다.',
            '앙파상은 상대 폰이 시작 위치에서 두 칸 전진해 내 폰 옆에 온 직후에만 가능한 특별한 잡기입니다. 폰 승격은 폰이 마지막 랭크에 도달할 때 퀸·룩·비숍·나이트 중 하나로 바꾸는 규칙입니다.'
          ],
          bullets: ['룩이 공격받는 것은 캐슬링을 막지 않지만 킹이 지나는 칸의 공격은 막습니다.', '앙파상 기회는 바로 다음 한 수에만 존재합니다.', '승격은 이미 퀸이 남아 있어도 새 퀸을 선택할 수 있습니다.'],
          fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 5',
          caption: '백 킹과 h1 룩 사이가 비었고 경로가 안전하다면 백은 O-O로 킹사이드 캐슬링할 수 있습니다.',
          keyPoint: '대부분의 입문 대국에서는 10수 안에 캐슬링하는 것이 킹 안전과 룩 연결에 도움이 됩니다.',
          practice: '새 대국에서 백과 흑 어느 쪽을 잡아도 캐슬링을 먼저 완성해 보세요.'
        },
        {
          title: '한 수짜리 실수 줄이기', duration: 15,
          summary: '매 수 직전 사용할 수 있는 짧은 확인 절차로 공짜 기물 손실을 줄입니다.',
          paragraphs: [
            '초보 대국의 대부분은 복잡한 전략보다 한 수 만에 기물을 잃어서 결정됩니다. 수를 떠올린 뒤 바로 두지 말고 상대가 다음 수에 할 수 있는 체크, 잡기, 공격을 살펴보세요.',
            '특히 움직이려는 기물이 지키고 있던 다른 기물과 칸을 확인해야 합니다. 공격하러 나간 기물 때문에 뒤의 퀸이나 룩이 노출되는 경우가 많습니다.'
          ],
          bullets: ['상대의 모든 체크를 먼저 찾습니다.', '상대가 잡을 수 있는 내 기물을 찾습니다.', '내가 두려는 수 뒤에 상대의 가장 강한 응수를 한 번 상상합니다.', '수의 목적을 한 문장으로 설명할 수 없으면 다시 검토합니다.'],
          keyPoint: '“체크·잡기·위협”을 매 수 5초만 확인해도 승률이 크게 달라집니다.',
          practice: '초급 AI와 대국하며 매 수를 두기 전 5초를 세고, 상대의 체크 후보를 하나씩 말해 보세요.'
        },
        {
          title: '퀸과 룩으로 기본 체크메이트', duration: 15,
          summary: '킹을 몰아내고 내 킹을 가까이 가져오는 기본 마무리 절차를 배웁니다.',
          paragraphs: [
            '퀸이나 룩만으로는 상대 킹을 완전히 가둘 수 있어도 보호받지 못하면 잡힐 수 있습니다. 먼저 큰 기물로 상대 킹의 활동 공간을 줄이고, 내 킹을 가까이 가져와 마무리해야 합니다.',
            '룩 메이트에서는 상대 킹을 한 줄로 제한한 뒤 두 킹이 마주 보도록 접근합니다. 마지막에 룩이 옆줄에서 체크하면 상대 킹이 뒤로 물러날 칸이 없어집니다.'
          ],
          bullets: ['큰 기물을 상대 킹 바로 옆에 보호 없이 두지 않습니다.', '스테일메이트를 피하려면 체크가 아닌 수를 둘 때 상대의 이동 칸을 확인합니다.', '킹도 엔드게임에서는 적극적인 공격 기물입니다.'],
          fen: '8/8/8/8/8/4K3/6R1/7k w - - 0 1',
          caption: '백은 킹으로 접근해 흑 킹을 가장자리에서 가둔 뒤 룩 체크로 마무리할 수 있습니다.',
          keyPoint: '공간 줄이기 → 내 킹 접근 → 마지막 체크의 세 단계로 생각하세요.',
          practice: '위 포지션을 보며 공간 줄이기, 내 킹 접근, 마지막 체크 순서로 룩 메이트 절차를 말해 보세요.'
        }
      ],
      routine: ['레슨 하나를 읽고 핵심 문장을 소리 내어 요약합니다.', '초급 컴퓨터와 10~15분 대국을 한 판 둡니다.', '가장 먼저 기물을 잃은 수를 찾아 다른 후보수를 적습니다.', '같은 실수를 다음 대국의 한 가지 목표로 설정합니다.'],
      mistakes: ['퀸을 너무 일찍 움직여 상대 기물에게 쫓기는 것', '체크를 만들 수 있다는 이유만으로 기물을 희생하는 것', '캐슬링 전에 중앙 폰을 지나치게 많이 움직이는 것', '상대의 마지막 수가 만든 위협을 확인하지 않는 것'],
      faq: [
        ['체스 기물 가치를 꼭 외워야 하나요?', '정확한 숫자보다 폰 1, 가벼운 기물 3, 룩 5, 퀸 9의 대략적인 관계를 기억하면 교환 판단에 충분합니다.'],
        ['처음에는 백과 흑 중 어느 쪽이 좋나요?', '백이 먼저 두기 때문에 계획을 연습하기 조금 편합니다. 하지만 같은 원칙을 익히려면 양쪽을 번갈아 두는 것이 좋습니다.'],
        ['초급 코스를 마친 기준은 무엇인가요?', '합법적인 수를 헷갈리지 않고, 대국 대부분에서 10수 안에 캐슬링하며, 한 수짜리 기물 손실이 눈에 띄게 줄었다면 중급으로 넘어가도 좋습니다.']
      ]
    },

    intermediate: {
      metaTitle: '체스 중급 코스 | 전술과 후보수 계산 훈련 - ChessStep',
      metaDescription: '포크, 핀, 스큐어, 제거, 후보수 계산, 오프닝 계획, 폰 엔드게임을 배우는 무료 체스 중급 코스입니다. 실전에서 놓치는 전술을 줄여 보세요.',
      title: '중급 코스: 전술과 후보수 훈련',
      level: '중급', duration: '약 120분', lessonCount: 6,
      intro: '규칙은 알지만 좋은 수를 꾸준히 찾기 어려운 플레이어를 위한 과정입니다. 패턴을 외우는 데 그치지 않고, 체크·잡기·위협을 후보수로 만들고 상대의 최선 응수까지 계산하는 순서를 훈련합니다.',
      outcomes: ['포크·핀·스큐어·제거·과부하 패턴을 실제 포지션에서 찾습니다.', '후보수를 2~3개 만들고 강제수부터 계산합니다.', '오프닝 원칙을 구체적인 계획으로 연결합니다.', '기본 폰 엔드게임에서 오포지션과 돌파를 활용합니다.'],
      lessons: [
        {
          title: '후보수와 강제수 계산 순서', duration: 20,
          summary: '눈에 들어온 첫 수를 바로 두지 않고 체크, 잡기, 위협 순서로 후보수를 만드는 법을 익힙니다.',
          paragraphs: [
            '계산은 모든 합법적인 수를 보는 작업이 아닙니다. 먼저 상대가 반드시 반응해야 하는 체크와 큰 기물 잡기를 찾고, 그다음 직접적인 위협과 조용한 개선 수를 후보로 만듭니다.',
            '각 후보수마다 상대의 가장 불편한 응수가 아니라 가장 강한 응수를 가정해야 합니다. 내 계획이 성공하는 그림만 보는 희망 계산을 피하려면 마지막에 “상대가 내 수를 반박하는 체크나 잡기가 있는가?”를 묻습니다.'
          ],
          bullets: ['후보수는 보통 2~4개면 충분합니다.', '강제수라고 항상 좋은 수는 아니므로 결과 포지션을 평가합니다.', '계산이 끝난 뒤 수를 두기 전에 마지막 블런더 체크를 합니다.'],
          keyPoint: '후보수 생성과 수읽기를 분리하면 계산이 훨씬 안정됩니다.',
          practice: '중급 AI와 대국하며 매 수 최소 두 개의 후보수를 마음속으로 이름 붙인 뒤 선택하세요.'
        },
        {
          title: '포크와 더블 어택', duration: 20,
          summary: '한 기물이 두 목표를 동시에 공격해 상대의 대응 능력을 넘기는 전술을 배웁니다.',
          paragraphs: [
            '나이트 포크가 가장 잘 알려져 있지만 폰, 퀸, 룩도 더블 어택을 만들 수 있습니다. 핵심은 상대가 한 수에 두 위협을 모두 해결할 수 없는 배치를 찾는 것입니다.',
            '포크 칸이 현재 비어 있는지만 보지 말고 그 칸을 상대 폰이 지키는지, 포크 이후 공격 기물이 안전하게 빠져나올 수 있는지 확인해야 합니다.'
          ],
          bullets: ['체크가 포함된 포크는 상대의 대응을 강제합니다.', '킹과 퀸, 퀸과 룩처럼 가치가 높은 목표 조합을 먼저 찾습니다.', '내 기물이 포크를 당할 수 있는 같은 색 칸과 나이트 점프를 점검합니다.'],
          fen: 'r3k3/ppN2ppp/8/8/8/8/PPP2PPP/4K3 w - - 0 1',
          caption: 'c7의 백 나이트는 흑 킹 e8을 체크하면서 a8의 룩도 공격합니다. 흑은 체크에 먼저 대응해야 합니다.',
          keyPoint: '전술은 공격 기물보다 두 개의 목표가 만드는 관계에서 시작됩니다.',
          practice: '대국 복기에서 한 수마다 상대 퀸과 룩을 동시에 공격할 수 있었던 칸이 있는지 찾아보세요.'
        },
        {
          title: '핀, 스큐어, 발견 공격', duration: 20,
          summary: '한 선 위에 놓인 기물의 순서를 이용하는 직선 전술을 구분합니다.',
          paragraphs: [
            '핀은 앞 기물이 움직이면 뒤의 더 중요한 기물이 노출되는 상황입니다. 킹 뒤의 기물은 합법적으로 움직이지 못하는 절대 핀이 되고, 퀸이나 룩 뒤의 기물은 손해를 감수하면 움직일 수 있는 상대 핀이 됩니다.',
            '스큐어는 더 가치 높은 앞 기물을 먼저 공격해 이동시킨 뒤 뒤 기물을 잡습니다. 발견 공격은 앞 기물이 움직이면서 뒤의 룩·비숍·퀸 공격선을 여는 전술입니다.'
          ],
          bullets: ['상대 킹과 퀸이 같은 파일·랭크·대각선에 있는지 확인합니다.', '핀된 기물을 한 번 더 공격하면 방어가 무너질 수 있습니다.', '발견 체크는 앞 기물이 자유롭게 강한 공격을 만들 수 있어 특히 위력적입니다.'],
          fen: '4k3/4qppp/8/8/8/8/PPP2PPP/4R1K1 w - - 0 1',
          caption: 'e7의 흑 퀸은 e8의 킹 앞에 놓여 룩의 공격선에 핀되어 있습니다. 백은 이 정렬을 이용할 수 있습니다.',
          keyPoint: '직선 기물 전술은 목표 세 개의 정렬을 찾는 습관에서 보입니다.',
          practice: '각 포지션에서 룩·비숍·퀸이 바라보는 선을 끝까지 따라가며 두 기물이 겹치는 곳을 표시하세요.'
        },
        {
          title: '수비 기물 제거와 과부하', duration: 20,
          summary: '공격 목표를 직접 노리기보다 그 목표를 지키는 기물을 무너뜨리는 방법을 배웁니다.',
          paragraphs: [
            '강하게 지켜진 기물을 바로 잡으려 하지 말고 어떤 기물이 방어를 담당하는지 찾습니다. 그 수비 기물을 교환하거나 다른 임무를 강요하면 원래 목표가 무방비가 됩니다.',
            '한 기물이 두 중요한 지점을 동시에 지키고 있다면 과부하 상태입니다. 한쪽에서 교환을 강제한 뒤 다른 쪽을 공격하면 수비 기물은 두 역할을 모두 수행할 수 없습니다.'
          ],
          bullets: ['메이트 칸을 지키는 유일한 기물을 먼저 찾습니다.', '수비 기물을 유인해 원래 자리에서 떼어내는 수를 계산합니다.', '교환 후 남는 기물 수와 킹 안전까지 확인합니다.'],
          keyPoint: '보이는 목표보다 그 목표를 가능하게 하는 수비 관계를 공격하세요.',
          practice: '전술 퍼즐을 풀 때 정답 수를 보기 전에 “가장 중요한 수비 기물은 무엇인가?”를 먼저 적으세요.'
        },
        {
          title: '오프닝 원칙에서 미들게임 계획으로', duration: 20,
          summary: '외운 수가 끝난 뒤 폰 구조와 기물 배치를 바탕으로 다음 계획을 세웁니다.',
          paragraphs: [
            '오프닝의 목적은 특정 수순을 암기하는 것이 아니라 중앙, 전개, 킹 안전을 확보해 플레이 가능한 미들게임을 만드는 것입니다. 상대가 책에 없는 수를 두면 원칙으로 돌아오면 됩니다.',
            '전개가 끝난 뒤에는 가장 활동이 나쁜 기물을 찾고 개선합니다. 중앙이 닫혀 있으면 측면 공격이 가능하고, 중앙이 열려 있으면 킹 안전과 직선 기물의 활동성이 더 중요해집니다.'
          ],
          bullets: ['같은 기물을 반복 이동한 이유가 구체적인 이득인지 확인합니다.', '폰을 밀기 전에 뒤로 되돌릴 수 없다는 점을 고려합니다.', '상대의 위협이 없다면 가장 나쁜 기물부터 개선합니다.'],
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 6 6',
          caption: '양쪽 모두 캐슬링과 기본 전개를 마쳤습니다. 이제 중앙의 d폰 전진과 룩 배치처럼 구조에 맞는 계획이 필요합니다.',
          keyPoint: '오프닝이 끝났는지 묻기보다 모든 기물이 역할을 얻었는지 확인하세요.',
          practice: '대국 10수째에 멈추고 가장 활동이 나쁜 내 기물 하나와 개선할 칸 하나를 적으세요.'
        },
        {
          title: '오포지션과 폰 엔드게임', duration: 20,
          summary: '킹의 맞대면, 핵심 칸, 패스드 폰을 이용해 단순한 폰 엔드게임을 계산합니다.',
          paragraphs: [
            '폰이 적은 엔드게임에서는 킹이 가장 강한 기물입니다. 두 킹이 한 칸을 사이에 두고 마주 볼 때 상대에게 차례를 넘겨 길을 확보하는 개념을 오포지션이라고 합니다.',
            '폰을 바로 전진하기보다 킹이 먼저 핵심 칸을 차지해야 승격을 지원할 수 있습니다. 계산할 때는 폰 레이스의 수를 세고, 상대가 체크를 넣을 수 있는 템포까지 포함합니다.'
          ],
          bullets: ['킹을 폰 앞쪽에 배치하는 것이 보통 유리합니다.', '패스드 폰은 반드시 전진해야 하지만 서두르면 잡힐 수 있습니다.', '폰 이동은 되돌릴 수 없으므로 먼저 킹 수를 검토합니다.'],
          fen: '8/8/4k3/8/4P3/4K3/8/8 w - - 0 1',
          caption: '백은 킹을 전진시켜 핵심 칸을 차지한 뒤 e폰 승격을 지원해야 합니다. 누가 오포지션을 얻는지가 중요합니다.',
          keyPoint: '엔드게임에서는 수를 두기 전에 폰보다 킹을 먼저 움직일 수 있는지 확인하세요.',
          practice: '이 포지션을 백 차례와 흑 차례로 각각 분석해 결과가 어떻게 달라지는지 설명해 보세요.'
        }
      ],
      routine: ['매일 전술 퍼즐 10개를 속도보다 정확도 중심으로 풉니다.', '중급 AI와 15+0에 해당하는 충분한 생각 시간을 갖고 한 판 둡니다.', '승패와 무관하게 가장 오래 고민한 세 포지션을 다시 계산합니다.', '놓친 전술을 포크·핀·제거 등 패턴 이름으로 분류합니다.'],
      mistakes: ['전술 패턴을 보자마자 상대의 최선 응수를 계산하지 않는 것', '공격 중이라 킹 안전과 백랭크 약점을 무시하는 것', '오프닝 수순을 모르면 무조건 나쁜 포지션이라고 생각하는 것', '유리한 포지션에서 불필요하게 복잡성을 키우는 것'],
      faq: [
        ['전술 퍼즐을 많이 풀어도 실전에서 안 보이는 이유는 무엇인가요?', '퍼즐은 전술이 있다는 사실을 알고 시작하지만 실전은 그렇지 않습니다. 매 수 체크·잡기·위협을 찾는 탐색 절차를 함께 연습해야 전이가 됩니다.'],
        ['오프닝을 몇 개나 외워야 하나요?', '중급 단계에서는 백 오프닝 하나, 흑으로 e4와 d4에 대한 기본 대응 하나씩의 구조와 계획을 아는 것으로 충분합니다.'],
        ['고급 코스로 넘어갈 시점은 언제인가요?', '한 수짜리 전술 실수가 드물고, 후보수 두세 개를 비교하며, 오프닝 이후 가장 나쁜 기물을 개선하는 계획을 스스로 세울 수 있다면 적절합니다.']
      ]
    },

    advanced: {
      metaTitle: '체스 고급 코스 | 포지션 평가와 계획 세우기 - ChessStep',
      metaDescription: '폰 구조, 약점, 기물 활동성, 프로필락시스, 교환 판단, 룩 엔드게임을 다루는 무료 체스 고급 코스입니다. 후보수와 장기 계획을 연결하세요.',
      title: '고급 코스: 포지션 평가와 계획',
      level: '고급', duration: '약 150분', lessonCount: 6,
      intro: '전술이 즉시 보이지 않는 포지션에서 무엇을 해야 할지 판단하는 과정입니다. 정적 요소와 동적 요소를 분리해 평가하고, 상대 계획을 예방하며, 유리한 형태의 엔드게임으로 전환하는 실전 의사결정을 다룹니다.',
      outcomes: ['물질, 킹 안전, 폰 구조, 공간, 기물 활동성을 순서대로 평가합니다.', '상대의 최선 계획을 예상해 프로필락시스 수를 찾습니다.', '교환이 남는 포지션의 성격을 어떻게 바꾸는지 판단합니다.', '룩 엔드게임의 활동성, 패스드 폰, 컷오프를 활용합니다.'],
      lessons: [
        {
          title: '정적 평가와 동적 기회', duration: 25,
          summary: '현재 포지션의 장기적 특징과 당장 사용할 수 있는 시간·주도권을 분리해 봅니다.',
          paragraphs: [
            '정적 요소에는 폰 구조, 약한 칸, 좋은 비숍과 나쁜 비숍, 공간 우세처럼 쉽게 사라지지 않는 특징이 포함됩니다. 동적 요소는 전개 우위, 킹 노출, 전술적 주도권처럼 빠르게 사용하지 않으면 사라지는 기회입니다.',
            '정적 약점을 가진 쪽은 활동적인 반격을 찾아야 하고, 정적으로 우세한 쪽은 상대의 동적 가능성을 줄이면서 장기 우세를 유지하려 합니다. 평가가 곧 계획의 방향을 결정합니다.'
          ],
          bullets: ['물질 → 킹 안전 → 폰 구조 → 기물 활동성 → 공간 순서로 빠르게 스캔합니다.', '우세 요소가 일시적인지 영구적인지 구분합니다.', '평가 문장을 “나는 좋다”가 아니라 “왜, 어디에서”로 구체화합니다.'],
          keyPoint: '포지션 평가의 목적은 점수를 매기는 것이 아니라 다음 후보수의 종류를 좁히는 것입니다.',
          practice: '대국 중 15수째에 멈춰 양측의 정적 우세 한 가지와 동적 기회 한 가지를 적으세요.'
        },
        {
          title: '폰 구조와 브레이크', duration: 25,
          summary: '폰 사슬의 방향, 약한 폰, 오픈 파일을 바탕으로 적절한 폰 브레이크를 찾습니다.',
          paragraphs: [
            '폰 구조는 기물이 활동할 수 있는 길과 공격 방향을 결정합니다. 고립폰은 약점이 될 수 있지만 열린 파일과 전초기지를 제공하며, 뒤처진 폰은 전진하기 어렵고 같은 파일에서 압박받기 쉽습니다.',
            '폰 브레이크는 구조를 의도적으로 충돌시켜 선을 여는 수입니다. 브레이크 전에 어떤 파일과 대각선이 열리고 어느 쪽 기물이 더 잘 배치되어 있는지 계산해야 합니다.'
          ],
          bullets: ['폰 사슬의 밑부분을 공격하면 전체 구조가 흔들립니다.', '공간이 좁은 쪽은 교환이나 브레이크로 기물 숨통을 엽니다.', '브레이크 후 생기는 약한 칸을 상대보다 먼저 점유할 수 있는지 확인합니다.'],
          fen: 'r2q1rk1/pp2bppp/2n1bn2/3pp3/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 10',
          caption: '중앙 폰 구조가 앞으로의 계획을 결정합니다. 백은 e4 또는 dxe5, 흑은 e4 같은 브레이크의 결과를 기물 배치와 함께 평가해야 합니다.',
          keyPoint: '폰을 움직이기 전에 그 수가 열어 주는 선과 남기는 약한 칸을 동시에 보세요.',
          practice: '자신의 최근 대국에서 결정적인 폰 이동 하나를 골라 이동 전후의 열린 파일과 약한 칸을 표시하세요.'
        },
        {
          title: '프로필락시스: 상대 계획부터 보기', duration: 25,
          summary: '내 계획만 밀어붙이지 않고 상대가 원하는 수를 제한하는 사고 습관을 만듭니다.',
          paragraphs: [
            '프로필락시스는 수동적으로 방어한다는 뜻이 아닙니다. 상대의 가장 강한 계획을 이해하고 낮은 비용으로 막아 내 계획의 성공 가능성을 높이는 적극적인 기술입니다.',
            '상대의 다음 수를 한 개만 맞히려 하기보다 어떤 기물을 개선하고 어떤 브레이크를 준비하는지 봅니다. 때로는 한 칸의 루프트를 만들거나 교환을 피하는 조용한 수가 전술보다 강합니다.'
          ],
          bullets: ['상대의 가장 나쁜 기물이 어디로 가고 싶은지 묻습니다.', '상대의 유일한 반격원을 제거할 수 있는지 확인합니다.', '예방 수가 내 포지션을 약화시키거나 템포를 낭비하지 않는지 비교합니다.'],
          keyPoint: '후보수를 만들기 전에 “내가 상대라면 무엇을 두고 싶은가?”를 먼저 묻습니다.',
          practice: '고급 AI 대국에서 매 수 상대의 다음 계획을 한 문장으로 예측하고 실제 수와 비교하세요.'
        },
        {
          title: '교환 판단과 포지션 전환', duration: 25,
          summary: '단순히 가치가 같은 기물을 바꾸는 것이 아니라 교환 후 남는 구조와 역할을 평가합니다.',
          paragraphs: [
            '유리할 때 교환하라는 규칙은 불완전합니다. 보통 물질 우세에서는 기물 교환이 도움이 되지만 폰 교환은 상대의 무승부 가능성을 높일 수 있습니다. 반대로 공간 우세에서는 기물을 유지해야 상대가 답답함을 느낍니다.',
            '좋은 기물과 상대의 나쁜 기물을 교환하면 오히려 상대 구조가 편해질 수 있습니다. 교환 전에는 남는 기물의 좋은 칸, 폰 약점의 방어 가능성, 킹 활동성을 비교해야 합니다.'
          ],
          bullets: ['교환 전후 가장 좋은 기물과 가장 나쁜 기물을 다시 평가합니다.', '퀸 교환이 킹 안전 문제를 끝내는지, 공격 기회를 없애는지 확인합니다.', '엔드게임 전환 후 상대의 유일한 패스드 폰을 막을 수 있는지 계산합니다.'],
          keyPoint: '교환은 점수를 없애는 수가 아니라 포지션의 규칙을 바꾸는 수입니다.',
          practice: '최근 대국의 기물 교환 세 번을 찾아 “누가 더 편해졌는가”를 교환 직후 기준으로 평가하세요.'
        },
        {
          title: '룩 엔드게임의 활동성', duration: 25,
          summary: '룩을 폰 뒤에 배치하고 상대 킹을 차단하며 체크 거리를 확보하는 핵심 원리를 익힙니다.',
          paragraphs: [
            '룩 엔드게임은 폰 하나 차이보다 룩과 킹의 활동성이 더 중요할 때가 많습니다. 룩은 내 패스드 폰이든 상대 패스드 폰이든 뒤에서 압박할 때 가장 효율적인 경우가 많습니다.',
            '상대 킹을 파일이나 랭크에서 잘라내면 내 킹이 자유롭게 접근할 수 있습니다. 체크는 가까이에서 반복하기보다 옆이나 뒤에서 충분한 거리를 확보해야 상대 킹의 공격을 피할 수 있습니다.'
          ],
          bullets: ['수동적으로 폰만 지키는 룩을 활동적인 위치로 바꿀 기회를 찾습니다.', '패스드 폰을 전진하기 전에 상대 룩의 뒤쪽 체크를 계산합니다.', '킹을 차단하는 룩의 위치가 폰 하나보다 가치 있을 수 있습니다.'],
          fen: '8/5pk1/3r2p1/3P4/5P2/4K3/7R/8 w - - 0 1',
          caption: '양쪽 룩의 활동성과 킹 접근이 결과를 좌우합니다. 백은 패스드 폰만 밀기보다 흑 킹과 룩의 체크 경로를 고려해야 합니다.',
          keyPoint: '룩 엔드게임에서 수동성은 작은 물질 우세를 쉽게 무효화합니다.',
          practice: '룩 엔드게임 포지션을 잡고 폰 수를 세기 전에 각 룩의 활동 가능한 파일 수를 비교하세요.'
        },
        {
          title: '실전 수읽기와 시간 배분', duration: 25,
          summary: '모든 수에 같은 시간을 쓰지 않고 결정적 순간을 식별해 계산 자원을 집중합니다.',
          paragraphs: [
            '포지션에 접촉이 생기거나 폰 구조가 바뀌거나 기물 교환이 가능한 순간은 결정적일 가능성이 큽니다. 이런 순간에는 직관적으로 두지 말고 후보수를 넓게 만든 뒤 구체적으로 계산해야 합니다.',
            '반대로 강제적인 리캡처나 익숙한 전개에서는 시간을 아껴야 합니다. 계산 마지막에는 결과 포지션을 정적으로 평가하고, 선택한 수를 실제 체스판에서 다시 한 번 블런더 체크합니다.'
          ],
          bullets: ['결정적 순간의 신호: 긴장된 폰, 킹 주변 선 개방, 큰 교환, 전술적 접촉.', '복잡한 후보수 하나에 매몰되면 다른 후보수를 최소 한 번 비교합니다.', '시간이 부족할수록 체크와 잡기를 먼저 보고 단순한 안전 수를 선택합니다.'],
          keyPoint: '깊이 계산해야 할 순간을 고르는 능력도 계산력의 일부입니다.',
          practice: '고급 AI 한 판에서 오래 생각한 수를 표시하고, 실제로 포지션의 성격이 바뀐 결정적 순간이었는지 복기하세요.'
        }
      ],
      routine: ['고급 AI와 긴 생각 시간으로 한 판을 두고 중요한 순간을 메모합니다.', '엔진이나 힌트를 보기 전에 스스로 후보수와 평가를 기록합니다.', '정적 평가와 전술 검증을 분리해 복기합니다.', '한 주에 한 번 룩 또는 폰 엔드게임 한 유형을 반복 훈련합니다.'],
      mistakes: ['정적 우세가 있다는 이유로 상대의 동적 반격을 과소평가하는 것', '좋아 보이는 예방 수를 두면서 내 기물 활동성을 잃는 것', '물질 우세만 보고 불리한 엔드게임으로 자동 전환하는 것', '계산을 길게 했다는 이유로 첫 후보수를 버리지 못하는 것'],
      faq: [
        ['고급 코스의 “고급”은 레이팅 몇 점 정도인가요?', '정확한 레이팅 기준보다는 전술 실수가 줄고 포지션 계획을 배우려는 단계에 맞춥니다. 온라인 기준 대략 중급 이상 플레이어가 특히 도움이 될 수 있습니다.'],
        ['포지션 평가는 어떻게 검증하나요?', '먼저 자신의 평가와 계획을 기록한 뒤 대국 결과, 컴퓨터 힌트, 강한 플레이어의 해설과 비교하세요. 숫자보다 어떤 요소를 놓쳤는지가 중요합니다.'],
        ['고급 AI만 계속 두는 것이 좋은가요?', '강한 상대는 약점을 드러내지만 생각 없이 빠르게 반복하면 학습 효과가 낮습니다. 긴 대국, 자기 복기, 주제별 훈련을 함께 사용하는 것이 좋습니다.']
      ]
    }
  },

  en: {
    beginner: {
      metaTitle: 'Beginner Chess Course | Rules to Checkmate - ChessStep',
      metaDescription: 'A free six-lesson beginner chess course covering legal moves, piece values, check and mate, castling, blunder prevention, and basic checkmates.',
      title: 'Beginner course: Chess from the first move',
      level: 'Beginner', duration: 'About 90 min', lessonCount: 6,
      intro: 'This course goes beyond memorizing how the pieces move. You will learn a repeatable checklist for every turn, then apply each lesson immediately against the beginner computer.',
      outcomes: ['Explain every legal piece move and the special rules.', 'Escape check and finish simple checkmates.', 'Control the center, develop safely, and castle early.', 'Build a habit that prevents one-move piece losses.'],
      lessons: [
        {
          title: 'Read the board and move every piece', duration: 15,
          summary: 'Learn coordinates, board orientation, and the movement of pawns, knights, bishops, rooks, queens, and kings.',
          paragraphs: [
            'Files run from a to h and ranks run from 1 to 8. From White’s side, the lower-right corner is always a light square, and White begins on ranks one and two.',
            'Rooks move in straight lines, bishops move diagonally, and queens combine both patterns. Knights can jump over pieces, while kings move one square. Pawns are unusual: they move forward but capture one square diagonally forward.'
          ],
          bullets: ['A piece cannot move onto a square occupied by a friendly piece.', 'Moving onto an enemy piece captures it.', 'A move that leaves your own king in check is illegal.'],
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          caption: 'The starting position. Each queen begins on a square matching its own color: White on d1 and Black on d8.',
          keyPoint: 'Say the starting and destination coordinates aloud before moving a piece.',
          practice: 'Picture an empty board and point to a1, d4, and h8 without counting every square.'
        },
        {
          title: 'Piece values and safe development', duration: 15,
          summary: 'Use relative piece values and understand why early development matters more than repeated moves with one piece.',
          paragraphs: [
            'A useful guide is pawn 1, knight or bishop 3, rook 5, and queen 9. The king has no exchange value because losing it ends the game. These values are a starting point, not a fixed price list.',
            'In the opening, move a central pawn, develop knights and bishops, and castle. An early queen often becomes a target for less valuable pieces, giving the opponent free development.'
          ],
          bullets: ['Occupy or control e4, d4, e5, and d5.', 'Knights often develop naturally to c3 and f3 or c6 and f6.', 'Bring more pieces into the game before moving the same piece again.'],
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
          caption: 'White uses e4 and Nf3 to influence the center, while Black answers with e5 and Nc6. Both sides are developing naturally.',
          keyPoint: 'The early goal is not an immediate attack; it is placing more pieces on useful squares.',
          practice: 'Play ten moves against the beginner AI and develop at least three minor pieces before moving your queen.'
        },
        {
          title: 'Check, checkmate, and stalemate', duration: 15,
          summary: 'Separate the three ways to answer check from the two different no-move endings.',
          paragraphs: [
            'When checked, move the king, capture the attacking piece, or block the attack line. If none of these is legal, it is checkmate and the attacking side wins.',
            'If the king is not checked but the side to move has no legal move, the game is a stalemate and therefore a draw. Even a huge material advantage can disappear if you trap the king without giving check.'
          ],
          bullets: ['You may not ignore check to create a threat elsewhere.', 'A knight check cannot be blocked; move the king or capture the knight.', 'The difference between mate and stalemate is whether the king is currently attacked.'],
          fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
          caption: 'Black is in check and cannot escape or capture the queen. This is a famous early mating pattern.',
          keyPoint: 'Before asking whether you can give check, confirm that your own king is safe.',
          practice: 'Whenever you are checked, name all three response types—move, capture, block—before choosing.'
        },
        {
          title: 'Castling, en passant, and promotion', duration: 15,
          summary: 'Learn the exact conditions for the three special chess rules.',
          paragraphs: [
            'Castling moves the king two squares and places the rook next to it in one move. Neither piece may have moved, the path must be empty, and the king may not castle out of, through, or into check.',
            'En passant is available only immediately after an enemy pawn advances two squares from its starting rank to land beside your pawn. Promotion occurs when a pawn reaches the last rank and becomes a queen, rook, bishop, or knight.'
          ],
          bullets: ['An attacked rook does not prevent castling, but an attacked king transit square does.', 'The en passant opportunity lasts for one reply only.', 'You may promote to a second queen even if your original queen remains.'],
          fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 5',
          caption: 'If the path is safe and both pieces are unmoved, White can castle kingside with O-O.',
          keyPoint: 'In most beginner games, castling within the first ten moves improves king safety and connects the rooks.',
          practice: 'Start a fresh game and make castling your first structural goal with either color.'
        },
        {
          title: 'Prevent one-move blunders', duration: 15,
          summary: 'Use a short pre-move scan to stop giving pieces away for free.',
          paragraphs: [
            'Beginner games are usually decided by a piece lost in one move, not by a deep strategy. After choosing a move, pause and inspect every check, capture, and direct threat available to your opponent.',
            'Also notice what the moving piece was protecting. A piece that attacks something new may uncover your queen or rook behind it.'
          ],
          bullets: ['Find every opponent check first.', 'Identify your pieces that can be captured.', 'Imagine the opponent’s strongest reply to your intended move.', 'If you cannot explain the purpose of your move, reconsider it.'],
          keyPoint: 'A five-second checks-captures-threats scan changes more games than another opening line.',
          practice: 'Count five seconds before every move against the beginner AI and name one possible opponent check.'
        },
        {
          title: 'Basic checkmate with a queen or rook', duration: 15,
          summary: 'Restrict the enemy king, bring your king closer, and deliver the final protected check.',
          paragraphs: [
            'A queen or rook can restrict the enemy king, but it can still be captured if it is not protected. First reduce the king’s space, then approach with your own king, and only then finish the mate.',
            'For rook mate, confine the king to one rank or file and bring the kings into opposition. A sideways rook check then removes the final escape squares.'
          ],
          bullets: ['Do not place the major piece next to the enemy king without protection.', 'When making a non-checking move, verify that the enemy still has a legal square.', 'Your king becomes an active attacking piece in the endgame.'],
          fen: '8/8/8/8/8/4K3/6R1/7k w - - 0 1',
          caption: 'White can approach with the king, confine Black to the edge, and finish with a protected rook check.',
          keyPoint: 'Think in three phases: reduce space, approach with the king, deliver the final check.',
          practice: 'Use the diagram above to name the three rook-mate phases: reduce space, approach with the king, deliver the final check.'
        }
      ],
      routine: ['Read one lesson and summarize its key sentence aloud.', 'Play one 10–15 minute game against the beginner computer.', 'Find the first move where you lost material and write one alternative.', 'Turn that mistake into one goal for the next game.'],
      mistakes: ['Bringing the queen out early and losing time when it is attacked', 'Sacrificing a piece simply because the move gives check', 'Pushing too many pawns before castling', 'Ignoring the threat created by the opponent’s last move'],
      faq: [
        ['Must I memorize exact piece values?', 'The rough relationship—pawn 1, minor piece 3, rook 5, queen 9—is enough to guide early exchange decisions.'],
        ['Should a beginner play White or Black?', 'White is slightly easier for practicing a plan because it moves first, but alternating colors builds a more complete understanding.'],
        ['How do I know I have finished the beginner level?', 'Move on when legal moves feel natural, you castle in most games, and one-move piece losses have become noticeably less frequent.']
      ]
    },

    intermediate: {
      metaTitle: 'Intermediate Chess Course | Tactics and Calculation - ChessStep',
      metaDescription: 'A free intermediate chess course on forks, pins, skewers, removing defenders, candidate moves, opening plans, and pawn endgames.',
      title: 'Intermediate course: Tactics and candidate moves',
      level: 'Intermediate', duration: 'About 120 min', lessonCount: 6,
      intro: 'For players who know the rules but struggle to find strong moves consistently. You will turn tactical patterns into a repeatable search process and calculate the opponent’s best response, not the reply you hope to see.',
      outcomes: ['Recognize forks, pins, skewers, removal, and overload in real positions.', 'Create two or three candidate moves and calculate forcing lines first.', 'Turn opening principles into a concrete middlegame plan.', 'Use opposition and pawn breakthroughs in basic king-and-pawn endings.'],
      lessons: [
        {
          title: 'Candidate moves and forcing-move order', duration: 20,
          summary: 'Stop playing the first attractive move and generate checks, captures, and threats in a reliable order.',
          paragraphs: [
            'Calculation does not mean examining every legal move. Start with checks and major captures that force a response, then add direct threats and quiet improving moves.',
            'For each candidate, assume the opponent finds the strongest reply. To avoid wishful calculation, finish by asking whether the opponent can refute your idea with a check, capture, or counter-threat.'
          ],
          bullets: ['Two to four serious candidates are usually enough.', 'A forcing move is not automatically good; evaluate the resulting position.', 'After calculating, perform one final blunder check before moving.'],
          keyPoint: 'Separating candidate generation from line calculation makes your thinking more stable.',
          practice: 'Against the intermediate AI, name at least two candidates before every non-forced move.'
        },
        {
          title: 'Forks and double attacks', duration: 20,
          summary: 'Use one piece to attack two targets and exceed the opponent’s ability to answer both threats.',
          paragraphs: [
            'Knight forks are famous, but pawns, queens, and rooks also create double attacks. The key is finding two targets that cannot both be saved in one move.',
            'Before jumping to the fork square, check whether an enemy pawn controls it and whether the attacking piece can escape after winning material.'
          ],
          bullets: ['A fork with check forces the opponent to answer the king threat first.', 'Look first for high-value target pairs such as king and queen or queen and rook.', 'Scan your own position for pieces vulnerable to the same knight jump or pawn fork.'],
          fen: 'r3k3/ppN2ppp/8/8/8/8/PPP2PPP/4K3 w - - 0 1',
          caption: 'The knight on c7 checks the king on e8 and attacks the rook on a8. Black must answer the check first.',
          keyPoint: 'A tactic begins with the relationship between two targets, not with the attacking piece alone.',
          practice: 'During review, search every move for a square that could attack the opposing queen and rook at once.'
        },
        {
          title: 'Pins, skewers, and discovered attacks', duration: 20,
          summary: 'Distinguish the line tactics created by the order of pieces on a file, rank, or diagonal.',
          paragraphs: [
            'In a pin, moving the front piece exposes a more valuable piece behind it. A piece pinned to the king may be legally unable to move; a piece pinned to a queen or rook can move only by accepting material loss.',
            'A skewer attacks the more valuable front piece and wins the piece behind after it moves. A discovered attack opens the line of a rook, bishop, or queen when the front piece moves away.'
          ],
          bullets: ['Check whether king and queen share a file, rank, or diagonal.', 'A pinned piece can often be attacked again until its defense collapses.', 'A discovered check gives the moving piece unusual freedom to create a second threat.'],
          fen: '4k3/4qppp/8/8/8/8/PPP2PPP/4R1K1 w - - 0 1',
          caption: 'The queen on e7 stands in front of the king on e8 along the rook’s line, creating a tactical alignment.',
          keyPoint: 'Line tactics become visible when you trace every rook, bishop, and queen ray to its end.',
          practice: 'In each position, trace the full lines of every long-range piece and mark where two targets align.'
        },
        {
          title: 'Remove defenders and exploit overload', duration: 20,
          summary: 'Attack the relationship protecting a target rather than the target itself.',
          paragraphs: [
            'When a target is well defended, identify the piece doing the essential defensive job. Exchange, deflect, or distract that defender and the original target may collapse.',
            'A defender is overloaded when it must protect two critical points. Force it to commit on one side, then strike the other.'
          ],
          bullets: ['Find the only piece preventing mate or a major capture.', 'Calculate ways to lure a defender away from its post.', 'After the combination, verify the remaining material and king safety.'],
          keyPoint: 'The visible target matters less than the defensive relationship that keeps it safe.',
          practice: 'Before revealing a puzzle answer, write down the most important defensive piece in the position.'
        },
        {
          title: 'From opening principles to a middlegame plan', duration: 20,
          summary: 'Use pawn structure and piece placement when memorized theory ends.',
          paragraphs: [
            'The opening is not a memory test. Its purpose is to secure central influence, development, and king safety. When the opponent leaves theory, return to those principles.',
            'Once development is complete, identify your least active piece and improve it. Closed centers often support wing play, while open centers increase the value of king safety and long-range activity.'
          ],
          bullets: ['Ask whether a repeated piece move earns a concrete gain.', 'Remember that pawn moves cannot be taken back.', 'If there is no urgent threat, improve your worst piece.'],
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 6 6',
          caption: 'Both sides have castled and developed. The next plan should come from central pawn breaks and the placement of the rooks.',
          keyPoint: 'Do not ask whether the opening is over; ask whether every piece has a useful role.',
          practice: 'Pause on move ten and name your least active piece and one square that would improve it.'
        },
        {
          title: 'Opposition and pawn endings', duration: 20,
          summary: 'Use king opposition, key squares, and passed-pawn calculation in simple endings.',
          paragraphs: [
            'With fewer pieces, the king becomes the strongest unit. Opposition describes the kings facing each other with one square between them, using the move order to gain access.',
            'Do not rush the pawn. The king often needs to occupy a key square first. In pawn races, count moves precisely and include checking tempi after promotion.'
          ],
          bullets: ['Placing the king in front of its pawn is usually helpful.', 'A passed pawn must advance eventually, but pushing too early can lose it.', 'Because pawn moves are irreversible, inspect king moves first.'],
          fen: '8/8/4k3/8/4P3/4K3/8/8 w - - 0 1',
          caption: 'White must use the king to occupy key squares and support the e-pawn. The side that controls the opposition matters.',
          keyPoint: 'In king-and-pawn endings, ask whether the king can improve before touching the pawn.',
          practice: 'Analyze this position with White to move and Black to move, then explain why the result changes.'
        }
      ],
      routine: ['Solve ten tactics daily with accuracy before speed.', 'Play one thoughtful game against the intermediate AI.', 'Recalculate the three positions where you spent the most time.', 'Classify every missed tactic by pattern: fork, pin, removal, and so on.'],
      mistakes: ['Recognizing a pattern and moving before calculating the best defense', 'Ignoring king safety and back-rank issues during an attack', 'Assuming an unfamiliar opening position must be bad', 'Creating unnecessary complications while already better'],
      faq: [
        ['Why do tactics appear in puzzles but not in my games?', 'A puzzle tells you that a tactic exists. In games, you need a search habit—checks, captures, threats—to detect when one may be present.'],
        ['How many openings should I memorize?', 'At this stage, one White system and one basic response to both 1.e4 and 1.d4 are enough if you understand the resulting structures and plans.'],
        ['When should I move to the advanced course?', 'Move on when one-move tactics are rare, you compare several candidates, and you can form a plan to improve your least active piece after the opening.']
      ]
    },

    advanced: {
      metaTitle: 'Advanced Chess Course | Evaluation and Planning - ChessStep',
      metaDescription: 'A free advanced chess course on pawn structures, weak squares, activity, prophylaxis, trades, rook endings, and practical calculation.',
      title: 'Advanced course: Evaluation and planning',
      level: 'Advanced', duration: 'About 150 min', lessonCount: 6,
      intro: 'Learn what to do when there is no immediate tactic. Separate static and dynamic factors, anticipate the opponent’s plan, and choose transformations that lead to favorable endings.',
      outcomes: ['Evaluate material, king safety, pawn structure, space, and activity in order.', 'Anticipate the opponent’s best plan and find useful prophylaxis.', 'Judge how trades change the character of the position.', 'Use activity, passed pawns, and cutoffs in rook endings.'],
      lessons: [
        {
          title: 'Static evaluation and dynamic chances', duration: 25,
          summary: 'Separate long-term structural features from time-sensitive initiative.',
          paragraphs: [
            'Static factors include pawn structure, weak squares, bishop quality, and space—features that tend to persist. Dynamic factors include a lead in development, an exposed king, and tactical initiative that may disappear if not used quickly.',
            'The side with a static weakness often needs active counterplay. The side with a lasting advantage should reduce the opponent’s dynamic resources without giving up the long-term edge.'
          ],
          bullets: ['Scan material, king safety, pawn structure, activity, and space in that order.', 'Classify each advantage as temporary or lasting.', 'Replace “I am better” with a specific statement of why and where.'],
          keyPoint: 'Evaluation is not about assigning a number; it narrows the kind of candidate moves you should seek.',
          practice: 'On move fifteen, write one static edge and one dynamic resource for each side.'
        },
        {
          title: 'Pawn structures and breaks', duration: 25,
          summary: 'Use pawn-chain direction, weaknesses, and open files to select the right pawn break.',
          paragraphs: [
            'Pawn structure determines where pieces can operate. An isolated pawn can be weak but may grant open files and outposts; a backward pawn can be difficult to advance and easy to pressure.',
            'A pawn break deliberately changes the structure to open lines. Before playing it, calculate which files and diagonals open and whose pieces are better placed for the new position.'
          ],
          bullets: ['Attack the base of a pawn chain to undermine the structure.', 'The cramped side often seeks exchanges or breaks to create room.', 'Check who can occupy the weak squares created after the break.'],
          fen: 'r2q1rk1/pp2bppp/2n1bn2/3pp3/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 10',
          caption: 'The central pawn structure defines the plans. Breaks such as e4, dxe5, or ...e4 must be evaluated together with piece placement.',
          keyPoint: 'Before moving a pawn, see both the line it opens and the square it can no longer protect.',
          practice: 'Choose one critical pawn move from a recent game and map the open lines and weak squares before and after it.'
        },
        {
          title: 'Prophylaxis: See the opponent’s plan first', duration: 25,
          summary: 'Improve your own plan by restricting what the opponent wants to achieve.',
          paragraphs: [
            'Prophylaxis is not passive defense. It is the active skill of understanding the opponent’s strongest plan and stopping it at low cost, making your own plan more reliable.',
            'Do not guess only the next move. Ask which piece the opponent wants to improve and which pawn break they are preparing. A quiet luft move or a refusal to exchange can be stronger than a direct tactic.'
          ],
          bullets: ['Ask where the opponent’s worst piece wants to go.', 'Look for ways to remove the opponent’s only source of counterplay.', 'Compare the preventive gain with any loss of activity or time.'],
          keyPoint: 'Before generating your candidates, ask: “What would I want here as the opponent?”',
          practice: 'In a game against the advanced AI, predict the opponent’s next plan in one sentence and compare it with the move played.'
        },
        {
          title: 'Exchange decisions and transformation', duration: 25,
          summary: 'Evaluate the remaining position rather than trading simply because piece values match.',
          paragraphs: [
            '“Trade pieces when ahead” is incomplete. Piece exchanges often help a material advantage, while pawn exchanges may increase drawing chances. With a space advantage, keeping pieces can preserve the opponent’s lack of room.',
            'Trading your strong piece for the opponent’s bad piece may solve their problems. Before exchanging, compare the remaining pieces, pawn weaknesses, and king activity.'
          ],
          bullets: ['Re-evaluate the best and worst pieces after the proposed trade.', 'Decide whether a queen trade solves king danger or removes your attack.', 'Calculate whether the opponent’s passed pawn can be contained in the ending.'],
          keyPoint: 'A trade does not simply balance material; it changes the rules of the position.',
          practice: 'Review three exchanges from your last game and decide which side became easier to play immediately afterward.'
        },
        {
          title: 'Activity in rook endings', duration: 25,
          summary: 'Place rooks behind passed pawns, cut off the king, and maintain checking distance.',
          paragraphs: [
            'In rook endings, activity can outweigh a pawn. A rook often works best behind either side’s passed pawn, where it can support or attack while keeping checking options.',
            'Cutting the enemy king off along a file or rank frees your king to approach. Give checks from the side or rear with enough distance to avoid being attacked by the king.'
          ],
          bullets: ['Look for an active rook before accepting a passive pawn-defense role.', 'Before pushing a passer, calculate rear checks from the opposing rook.', 'A rook that cuts off the king may be worth more than an extra pawn.'],
          fen: '8/5pk1/3r2p1/3P4/5P2/4K3/7R/8 w - - 0 1',
          caption: 'Rook activity and king access decide the result. White must consider checking routes, not only pushing the passed pawn.',
          keyPoint: 'Passivity can erase a small material advantage in a rook ending.',
          practice: 'In any rook ending, compare the number of active files available to each rook before counting pawns.'
        },
        {
          title: 'Practical calculation and time allocation', duration: 25,
          summary: 'Spend calculation time on moments that truly change the position.',
          paragraphs: [
            'Pawn tension, an opening line near the king, or a major exchange often signals a critical moment. Widen your candidate list and calculate concretely instead of relying on a quick positional impression.',
            'Save time on forced recaptures and familiar development. At the end of a line, evaluate the resulting position statically and perform a final blunder check on the board.'
          ],
          bullets: ['Critical signals include pawn tension, open king lines, major trades, and tactical contact.', 'If one complex line absorbs all your time, compare at least one alternative.', 'When short on time, prioritize checks and captures, then choose a simple safe move.'],
          keyPoint: 'Knowing when to calculate deeply is part of calculation strength.',
          practice: 'Mark every long calculation in an advanced AI game and later judge whether it was truly a critical moment.'
        }
      ],
      routine: ['Play one long game against the advanced AI and mark critical moments.', 'Record your evaluation and candidates before using a hint.', 'Review static evaluation separately from tactical verification.', 'Repeat one rook or pawn ending theme each week.'],
      mistakes: ['Underestimating dynamic counterplay because of a static edge', 'Playing a preventive move that reduces your own activity too much', 'Entering an unfavorable ending automatically because you are up material', 'Refusing to abandon the first candidate after investing time in it'],
      faq: [
        ['What rating does “advanced” correspond to?', 'The course is skill-based rather than tied to a rating threshold. It is most useful once tactical blunders are less frequent and you want a structured way to make positional plans.'],
        ['How can I verify a positional evaluation?', 'Write your own evaluation first, then compare it with the game result, computer hints, and strong-player commentary. The missed factor matters more than the exact numeric score.'],
        ['Should I only play the advanced computer?', 'A stronger opponent exposes weaknesses, but rapid repetition without review has limited value. Combine long games, self-analysis, and focused endgame work.']
      ]
    }
  }
};

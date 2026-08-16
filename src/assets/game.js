import {
  Chess,
  PIECE_NAMES,
  PIECE_SYMBOLS,
  colorOf,
  indexToSquare,
  squareToIndex,
  typeOf
} from './chess-engine.js';

const COPY = {
  ko: {
    board: '체스판', empty: '빈 칸', whiteTurn: '백 차례', blackTurn: '흑 차례',
    yourTurn: '당신의 차례입니다.', computerTurn: '컴퓨터가 생각하고 있습니다…',
    check: '체크입니다.', checkmateWin: '체크메이트! 당신이 이겼습니다.',
    checkmateLoss: '체크메이트. 컴퓨터가 이겼습니다.', stalemate: '스테일메이트로 무승부입니다.',
    fiftyMove: '50수 규칙으로 무승부입니다.', threefold: '동일 포지션 3회 반복으로 무승부입니다.',
    insufficient: '체크메이트에 필요한 기물이 부족해 무승부입니다.', newGame: '새 대국을 시작했습니다.',
    hint: '추천 수', hintUnavailable: '현재 추천할 수가 없습니다.', workerError: 'AI 계산에 문제가 생겨 간단한 계산으로 전환했습니다.',
    promotion: '승격할 기물을 선택하세요.', move: '수', depth: '깊이', nodes: '노드', time: '시간',
    white: '백', black: '흑', computer: '컴퓨터', you: '나'
  },
  en: {
    board: 'Chessboard', empty: 'empty square', whiteTurn: 'White to move', blackTurn: 'Black to move',
    yourTurn: 'Your turn.', computerTurn: 'The computer is thinking…',
    check: 'Check.', checkmateWin: 'Checkmate! You win.',
    checkmateLoss: 'Checkmate. The computer wins.', stalemate: 'Draw by stalemate.',
    fiftyMove: 'Draw by the fifty-move rule.', threefold: 'Draw by threefold repetition.',
    insufficient: 'Draw by insufficient mating material.', newGame: 'A new game has started.',
    hint: 'Suggested move', hintUnavailable: 'No move is available to suggest.', workerError: 'The AI worker failed, so a simpler fallback calculation was used.',
    promotion: 'Choose a promotion piece.', move: 'Move', depth: 'depth', nodes: 'nodes', time: 'time',
    white: 'White', black: 'Black', computer: 'Computer', you: 'You'
  }
};

const MOVE_LABELS = {
  ko: {
    pieces: { K: '킹', Q: '퀸', R: '룩', B: '비숍', N: '나이트', P: '폰' },
    move: '→',
    capture: '×',
    kingsideCastle: '킹사이드 캐슬링',
    queensideCastle: '퀸사이드 캐슬링',
    enPassant: ' 앙파상',
    check: ' 체크',
    mate: ' 메이트'
  },
  en: {
    pieces: { K: 'King', Q: 'Queen', R: 'Rook', B: 'Bishop', N: 'Knight', P: 'Pawn' },
    move: '→',
    capture: '×',
    kingsideCastle: 'Kingside castle',
    queensideCastle: 'Queenside castle',
    enPassant: ' en passant',
    check: ' check',
    mate: ' mate'
  }
};

const app = document.querySelector('[data-chess-app]');
if (app) {
  const locale = app.dataset.locale === 'en' ? 'en' : 'ko';
  const t = COPY[locale];
  const boardElement = app.querySelector('[data-board]');
  const statusElement = app.querySelector('[data-status]');
  const detailElement = app.querySelector('[data-status-detail]');
  const moveListElement = app.querySelector('[data-move-list]');
  const capturedWhiteElement = app.querySelector('[data-captured-white]');
  const capturedBlackElement = app.querySelector('[data-captured-black]');
  const difficultySelect = app.querySelector('[data-difficulty]');
  const sideSelect = app.querySelector('[data-side]');
  const newButton = app.querySelector('[data-new-game]');
  const undoButton = app.querySelector('[data-undo]');
  const hintButton = app.querySelector('[data-hint]');
  const promotionDialog = app.querySelector('[data-promotion-dialog]');
  const toast = app.querySelector('[data-toast]');

  let game = new Chess();
  let humanColor = 'w';
  let orientation = 'w';
  let selected = null;
  let selectedMoves = [];
  let lastMove = null;
  let hintMove = null;
  let thinking = false;
  let sessionId = 0;
  let pendingPromotion = null;
  let latestAnalysis = null;
  let dragState = null;
  let lastDragEnd = 0;
  let worker = null;
  let requestId = 0;
  const pendingRequests = new Map();
  const COMPUTER_MOVE_DELAY_MS = 1000;

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.hidden = true;
    }, 2600);
  }

  function setupWorker() {
    try {
      worker = new Worker('/assets/chess-worker.js', { type: 'module' });
      worker.addEventListener('message', (event) => {
        const payload = event.data || {};
        const resolver = pendingRequests.get(payload.id);
        if (!resolver) return;
        pendingRequests.delete(payload.id);
        if (payload.ok) resolver.resolve(payload);
        else resolver.reject(new Error(payload.error || 'AI worker error'));
      });
      worker.addEventListener('error', () => {
        for (const resolver of pendingRequests.values()) resolver.reject(new Error('AI worker error'));
        pendingRequests.clear();
        worker?.terminate();
        worker = null;
      });
    } catch {
      worker = null;
    }
  }

  async function analyze(fen, level, mode = 'move', options = {}) {
    if (worker) {
      try {
        const id = ++requestId;
        return await new Promise((resolve, reject) => {
          pendingRequests.set(id, { resolve, reject });
          try {
            worker.postMessage({ id, fen, level, mode, options });
          } catch (error) {
            pendingRequests.delete(id);
            reject(error);
          }
        });
      } catch {
        worker?.terminate();
        worker = null;
      }
    }

    const [{ Chess: FallbackChess }, { chooseBestMove }] = await Promise.all([
      import('./chess-engine.js'),
      import('./chess-ai.js')
    ]);
    const fallback = new FallbackChess(fen);
    const fallbackOptions = {
      maxDepth: level === 'advanced' ? 3 : 2,
      timeMs: 350,
      ...options
    };
    const result = chooseBestMove(fallback, level === 'beginner' ? 'beginner' : 'intermediate', fallbackOptions);
    showToast(t.workerError);
    return { ok: true, mode, ...result };
  }

  function displayOrder() {
    const order = Array.from({ length: 64 }, (_, index) => index);
    return orientation === 'w' ? order : order.reverse();
  }

  function pieceLabel(piece, square) {
    if (!piece) return `${square}, ${t.empty}`;
    return `${square}, ${PIECE_NAMES[piece][locale]}`;
  }

  function squareFromPoint(clientX, clientY) {
    if (!boardElement) return null;
    const rect = boardElement.getBoundingClientRect();
    const style = getComputedStyle(boardElement);
    const left = rect.left + parseFloat(style.borderLeftWidth || '0');
    const top = rect.top + parseFloat(style.borderTopWidth || '0');
    const width = boardElement.clientWidth;
    const height = boardElement.clientHeight;
    if (clientX < left || clientX > left + width || clientY < top || clientY > top + height) return null;
    const column = Math.min(7, Math.max(0, Math.floor((clientX - left) / (width / 8))));
    const row = Math.min(7, Math.max(0, Math.floor((clientY - top) / (height / 8))));
    const displayIndex = row * 8 + column;
    return orientation === 'w' ? displayIndex : 63 - displayIndex;
  }

  function updateDragGhost(event) {
    if (!dragState?.ghost) return;
    dragState.ghost.style.left = `${event.clientX}px`;
    dragState.ghost.style.top = `${event.clientY}px`;
  }

  function createDragGhost(event) {
    if (!dragState) return;
    const squareSize = boardElement ? boardElement.clientWidth / 8 : 72;
    const ghost = document.createElement('span');
    ghost.className = `piece piece-${colorOf(dragState.piece)} drag-piece`;
    ghost.textContent = PIECE_SYMBOLS[dragState.piece];
    ghost.setAttribute('aria-hidden', 'true');
    ghost.style.width = `${squareSize}px`;
    ghost.style.height = `${squareSize}px`;
    ghost.style.fontSize = `${squareSize * 0.68}px`;
    document.body.append(ghost);
    dragState.ghost = ghost;
    updateDragGhost(event);
  }

  function removeDragListeners() {
    window.removeEventListener('pointermove', handleDragMove);
    window.removeEventListener('pointerup', handleDragEnd);
    window.removeEventListener('pointercancel', handleDragCancel);
  }

  function cleanupDrag() {
    dragState?.ghost?.remove();
    dragState = null;
    boardElement?.classList.remove('is-dragging');
    removeDragListeners();
  }

  function renderBoard() {
    if (!boardElement) return;
    boardElement.replaceChildren();
    boardElement.setAttribute('aria-label', t.board);
    const legalTargets = new Map(selectedMoves.map((move) => [move.to, move]));
    const boardStatus = game.status();
    const checkedKing = boardStatus.inCheck ? game.kingIndex(game.turn) : -1;

    displayOrder().forEach((index, displayIndex) => {
      const square = indexToSquare(index);
      const piece = game.board[index];
      const button = document.createElement('button');
      const displayColumn = displayIndex % 8;
      const boardRow = Math.floor(index / 8);
      const boardFile = index % 8;
      const isLight = (boardRow + boardFile) % 2 === 0;
      const canMovePiece = Boolean(piece && colorOf(piece) === humanColor && !thinking && game.turn === humanColor && !boardStatus.over);
      button.type = 'button';
      button.className = `chess-square ${isLight ? 'is-light' : 'is-dark'}`;
      button.dataset.square = square;
      button.setAttribute('aria-label', pieceLabel(piece, square));
      button.setAttribute('aria-pressed', selected === index ? 'true' : 'false');

      if (canMovePiece) button.classList.add('is-draggable');
      if (selected === index) button.classList.add('is-selected');
      if (dragState?.active && dragState.from === index) button.classList.add('is-drag-origin');
      if (dragState?.active && dragState.target === index) button.classList.add('is-drop-target');
      if (legalTargets.has(index)) {
        button.classList.add(piece ? 'is-capture' : 'is-legal');
        button.dataset.legal = 'true';
      }
      if (lastMove && (lastMove.from === index || lastMove.to === index)) button.classList.add('is-last');
      if (hintMove && (hintMove.from === index || hintMove.to === index)) button.classList.add('is-hint');
      if (checkedKing === index) button.classList.add('is-check');

      if (piece) {
        const glyph = document.createElement('span');
        glyph.className = `piece piece-${colorOf(piece)}`;
        glyph.textContent = PIECE_SYMBOLS[piece];
        glyph.setAttribute('aria-hidden', 'true');
        button.append(glyph);
      }
      if (displayColumn === 0) {
        const rankLabel = document.createElement('span');
        rankLabel.className = 'coord coord-rank';
        rankLabel.textContent = square[1];
        rankLabel.setAttribute('aria-hidden', 'true');
        button.append(rankLabel);
      }

      button.disabled = thinking || game.turn !== humanColor || boardStatus.over;
      button.addEventListener('pointerdown', (event) => handleSquarePointerDown(event, index));
      button.addEventListener('click', () => {
        if (performance.now() - lastDragEnd < 250) return;
        handleSquareClick(index);
      });
      boardElement.append(button);
    });
  }

  function statusCopy() {
    const status = game.status();
    if (status.over) {
      if (status.reason === 'checkmate') {
        const winner = game.turn === 'w' ? 'b' : 'w';
        return winner === humanColor ? t.checkmateWin : t.checkmateLoss;
      }
      if (status.reason === 'stalemate') return t.stalemate;
      if (status.reason === 'fifty-move') return t.fiftyMove;
      if (status.reason === 'threefold') return t.threefold;
      if (status.reason === 'insufficient') return t.insufficient;
    }
    if (thinking) return t.computerTurn;
    const base = game.turn === humanColor ? t.yourTurn : t.computerTurn;
    return status.inCheck ? `${base} ${t.check}` : base;
  }

  function renderStatus() {
    if (statusElement) statusElement.textContent = statusCopy();
    if (detailElement) {
      const turnName = game.turn === 'w' ? t.whiteTurn : t.blackTurn;
      if (latestAnalysis) {
        detailElement.textContent = `${turnName} · ${t.depth} ${latestAnalysis.depth} · ${latestAnalysis.nodes.toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US')} ${t.nodes} · ${latestAnalysis.elapsedMs}ms`;
      } else {
        detailElement.textContent = turnName;
      }
    }
  }

  function moveSuffix(move) {
    const labels = MOVE_LABELS[locale];
    const suffix = [];
    if (move.promotion) suffix.push(`=${labels.pieces[typeOf(move.promotion)]}`);
    if (move.flags?.includes('e')) suffix.push(labels.enPassant.trim());
    if (move.san?.endsWith('#')) suffix.push(labels.mate.trim());
    else if (move.san?.endsWith('+')) suffix.push(labels.check.trim());
    return suffix.length ? ` ${suffix.join(' ')}` : '';
  }

  function readableMove(move) {
    if (!move) return '';
    const labels = MOVE_LABELS[locale];
    if (move.flags?.includes('k')) return `${labels.kingsideCastle}${moveSuffix(move)}`;
    if (move.flags?.includes('q')) return `${labels.queensideCastle}${moveSuffix(move)}`;
    const pieceName = labels.pieces[typeOf(move.piece)] || move.san || move.uci || '';
    const from = indexToSquare(move.from);
    const to = indexToSquare(move.to);
    const separator = move.captured || move.flags?.includes('e') ? labels.capture : labels.move;
    return `${pieceName} ${from}${separator}${to}${moveSuffix(move)}`;
  }

  function renderMoves() {
    if (!moveListElement) return;
    moveListElement.replaceChildren();
    const history = game.getMoveHistory();
    if (!history.length) {
      const empty = document.createElement('p');
      empty.className = 'move-list-empty';
      empty.textContent = locale === 'ko' ? '아직 둔 수가 없습니다.' : 'No moves yet.';
      moveListElement.append(empty);
      return;
    }

    const list = document.createElement('ol');
    list.className = 'move-pairs';
    for (let index = 0; index < history.length; index += 2) {
      const item = document.createElement('li');
      const number = document.createElement('span');
      number.className = 'move-number';
      number.textContent = `${Math.floor(index / 2) + 1}.`;
      const white = document.createElement('span');
      white.textContent = readableMove(history[index]) || '—';
      const black = document.createElement('span');
      black.textContent = readableMove(history[index + 1]);
      item.append(number, white, black);
      list.append(item);
    }
    moveListElement.append(list);
    moveListElement.scrollTop = moveListElement.scrollHeight;
  }

  function renderCaptured() {
    const capturedByWhite = [];
    const capturedByBlack = [];
    for (const entry of game.getMoveHistory()) {
      if (!entry.captured) continue;
      if (colorOf(entry.piece) === 'w') capturedByWhite.push(entry.captured);
      else capturedByBlack.push(entry.captured);
    }
    const capturedByHuman = humanColor === 'w' ? capturedByWhite : capturedByBlack;
    const capturedByComputer = humanColor === 'w' ? capturedByBlack : capturedByWhite;
    if (capturedWhiteElement) capturedWhiteElement.textContent = capturedByHuman.map((piece) => PIECE_SYMBOLS[piece]).join(' ') || '—';
    if (capturedBlackElement) capturedBlackElement.textContent = capturedByComputer.map((piece) => PIECE_SYMBOLS[piece]).join(' ') || '—';
  }

  function renderControls() {
    const status = game.status();
    if (undoButton) undoButton.disabled = thinking || game.history.length === 0;
    if (hintButton) hintButton.disabled = thinking || status.over || game.turn !== humanColor;
    if (difficultySelect) difficultySelect.disabled = thinking;
    if (sideSelect) sideSelect.disabled = thinking;
  }

  function render({ board = true, moves = true, captured = true } = {}) {
    if (board) renderBoard();
    renderStatus();
    if (moves) renderMoves();
    if (captured) renderCaptured();
    renderControls();
  }

  function clearSelection() {
    selected = null;
    selectedMoves = [];
  }

  function selectSquare(index) {
    selected = index;
    selectedMoves = game.legalMovesFrom(index);
    hintMove = null;
    renderBoard();
  }

  function openPromotion(moves) {
    pendingPromotion = moves;
    if (promotionDialog?.showModal) {
      promotionDialog.showModal();
    } else {
      makeHumanMove(moves.find((move) => move.promotion === 'q') || moves[0]);
    }
  }

  function finishMoveTo(index) {
    const candidates = selectedMoves.filter((move) => move.to === index);
    if (candidates.length > 1) {
      openPromotion(candidates);
      return true;
    }
    if (candidates.length === 1) {
      makeHumanMove(candidates[0]);
      return true;
    }
    return false;
  }

  function handleSquareClick(index) {
    if (thinking || game.turn !== humanColor || game.status().over) return;
    const piece = game.board[index];

    if (selected !== null) {
      if (finishMoveTo(index)) return;
      if (piece && colorOf(piece) === humanColor) {
        selectSquare(index);
        return;
      }
      clearSelection();
      renderBoard();
      return;
    }

    if (piece && colorOf(piece) === humanColor) selectSquare(index);
  }

  function handleSquarePointerDown(event, index) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (thinking || game.turn !== humanColor || game.status().over) return;
    const piece = game.board[index];
    if (!piece || colorOf(piece) !== humanColor) return;

    event.preventDefault();
    selected = index;
    selectedMoves = game.legalMovesFrom(index);
    hintMove = null;
    dragState = {
      from: index,
      piece,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      active: false,
      target: index,
      ghost: null
    };
    renderBoard();
    window.addEventListener('pointermove', handleDragMove, { passive: false });
    window.addEventListener('pointerup', handleDragEnd);
    window.addEventListener('pointercancel', handleDragCancel);
  }

  function handleDragMove(event) {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    event.preventDefault();
    const distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
    if (!dragState.active && distance < 5) return;
    if (!dragState.active) {
      dragState.active = true;
      boardElement?.classList.add('is-dragging');
      createDragGhost(event);
    }

    updateDragGhost(event);
    const target = squareFromPoint(event.clientX, event.clientY);
    if (target !== dragState.target) {
      dragState.target = target;
      renderBoard();
    }
  }

  function handleDragEnd(event) {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    const wasActive = dragState.active;
    const target = wasActive ? squareFromPoint(event.clientX, event.clientY) : null;
    cleanupDrag();

    if (!wasActive) return;
    lastDragEnd = performance.now();
    if (target !== null && finishMoveTo(target)) return;
    clearSelection();
    renderBoard();
  }

  function handleDragCancel(event) {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    cleanupDrag();
    clearSelection();
    renderBoard();
  }

  function makeHumanMove(move) {
    const result = game.move(move);
    if (!result) return;
    lastMove = { from: result.from, to: result.to };
    hintMove = null;
    latestAnalysis = null;
    clearSelection();
    render();
    void maybeComputerMove();
  }

  async function maybeComputerMove() {
    const status = game.status();
    if (status.over || game.turn === humanColor) return;
    const currentSession = sessionId;
    const fen = game.fen();
    thinking = true;
    render({ board: false, moves: false, captured: false });

    try {
      const level = difficultySelect?.value || 'intermediate';
      const [result] = await Promise.all([
        analyze(fen, level, 'move'),
        wait(COMPUTER_MOVE_DELAY_MS)
      ]);
      if (currentSession !== sessionId || game.fen() !== fen) return;
      if (result.uci) {
        const move = game.move(result.uci);
        if (move) {
          lastMove = { from: move.from, to: move.to };
          latestAnalysis = result;
        }
      }
    } catch (error) {
      console.error(error);
      showToast(t.workerError);
    } finally {
      if (currentSession === sessionId) {
        thinking = false;
        render();
      }
    }
  }

  function chooseHumanColor() {
    const side = sideSelect?.value || 'white';
    if (side === 'random') return Math.random() < 0.5 ? 'w' : 'b';
    return side === 'black' ? 'b' : 'w';
  }

  function startNewGame() {
    sessionId += 1;
    game = new Chess();
    humanColor = chooseHumanColor();
    orientation = humanColor;
    selected = null;
    selectedMoves = [];
    lastMove = null;
    hintMove = null;
    thinking = false;
    latestAnalysis = null;
    if (difficultySelect) localStorage.setItem('chessstep:difficulty', difficultySelect.value);
    if (sideSelect) localStorage.setItem('chessstep:side', sideSelect.value);
    render();
    showToast(t.newGame);
    void maybeComputerMove();
  }

  function undoTurn() {
    if (thinking || !game.history.length) return;
    sessionId += 1;
    game.undo();
    while (game.history.length && game.turn !== humanColor) game.undo();
    const history = game.getMoveHistory();
    const previous = history[history.length - 1];
    lastMove = previous ? { from: previous.from, to: previous.to } : null;
    hintMove = null;
    latestAnalysis = null;
    clearSelection();
    render();
  }

  async function requestHint() {
    if (thinking || game.turn !== humanColor || game.status().over) return;
    const currentSession = sessionId;
    const fen = game.fen();
    thinking = true;
    render({ board: false, moves: false, captured: false });
    try {
      const level = difficultySelect?.value === 'beginner' ? 'intermediate' : 'advanced';
      const result = await analyze(fen, level, 'hint', { timeMs: 900, maxDepth: 4 });
      if (currentSession !== sessionId || game.fen() !== fen) return;
      if (!result.uci) {
        showToast(t.hintUnavailable);
      } else {
        hintMove = {
          from: squareToIndex(result.uci.slice(0, 2)),
          to: squareToIndex(result.uci.slice(2, 4))
        };
        latestAnalysis = result;
        showToast(`${t.hint}: ${result.uci.slice(0, 2)} → ${result.uci.slice(2, 4)}${result.uci[4] ? `=${result.uci[4].toUpperCase()}` : ''}`);
      }
    } catch (error) {
      console.error(error);
      showToast(t.hintUnavailable);
    } finally {
      if (currentSession === sessionId) {
        thinking = false;
        render();
      }
    }
  }

  promotionDialog?.querySelectorAll('[data-promotion]').forEach((button) => {
    button.addEventListener('click', () => {
      const promotion = button.dataset.promotion;
      const move = pendingPromotion?.find((candidate) => candidate.promotion === promotion);
      pendingPromotion = null;
      promotionDialog.close();
      if (move) makeHumanMove(move);
    });
  });
  promotionDialog?.addEventListener('cancel', () => {
    pendingPromotion = null;
  });

  newButton?.addEventListener('click', startNewGame);
  undoButton?.addEventListener('click', undoTurn);
  hintButton?.addEventListener('click', requestHint);
  difficultySelect?.addEventListener('change', () => localStorage.setItem('chessstep:difficulty', difficultySelect.value));
  sideSelect?.addEventListener('change', () => localStorage.setItem('chessstep:side', sideSelect.value));

  const savedDifficulty = localStorage.getItem('chessstep:difficulty');
  const savedSide = localStorage.getItem('chessstep:side');
  if (savedDifficulty && difficultySelect?.querySelector(`option[value="${savedDifficulty}"]`)) difficultySelect.value = savedDifficulty;
  if (savedSide && sideSelect?.querySelector(`option[value="${savedSide}"]`)) sideSelect.value = savedSide;

  setupWorker();
  startNewGame();
}

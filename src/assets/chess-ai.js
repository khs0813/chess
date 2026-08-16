import { colorOf, typeOf } from './chess-engine.js';

const VALUES = Object.freeze({ P: 100, N: 320, B: 335, R: 500, Q: 900, K: 0 });
const MATE_SCORE = 100000;
const INF = 1000000;

class SearchTimeout extends Error {
  constructor() {
    super('Search time limit reached');
    this.name = 'SearchTimeout';
  }
}

function rowOf(index) {
  return Math.floor(index / 8);
}

function fileOf(index) {
  return index % 8;
}

function centerScore(index) {
  const row = rowOf(index);
  const file = fileOf(index);
  return 7 - (Math.abs(3.5 - row) + Math.abs(3.5 - file));
}

function whiteRelativeRank(index, color) {
  const row = rowOf(index);
  return color === 'w' ? 7 - row : row;
}

function positionalScore(piece, index, game, nonPawnMaterial) {
  const color = colorOf(piece);
  const type = typeOf(piece);
  const rank = whiteRelativeRank(index, color);
  const center = centerScore(index);
  const file = fileOf(index);

  switch (type) {
    case 'P': {
      let score = rank * 8 + center * 2;
      if (file === 3 || file === 4) score += 6;
      if (rank === 6) score += 22;
      return score;
    }
    case 'N':
      return center * 11 - (rank === 0 ? 8 : 0);
    case 'B':
      return center * 7 + rank * 2;
    case 'R':
      return rank === 6 ? 20 : rank * 2;
    case 'Q':
      return center * 3 - (rank > 2 && nonPawnMaterial > 4200 ? 8 : 0);
    case 'K': {
      if (nonPawnMaterial > 2400) {
        const homeRank = color === 'w' ? 7 : 0;
        const row = rowOf(index);
        let score = -center * 7;
        if (row === homeRank && (file === 6 || file === 2)) score += 35;
        if (row === homeRank && file === 4) score += 5;
        return score;
      }
      return center * 10 + rank * 2;
    }
    default:
      return 0;
  }
}

function pawnStructureScore(game, color) {
  const pawn = color === 'w' ? 'P' : 'p';
  const pawnsByFile = Array(8).fill(0);
  const pawnSquares = [];

  for (let index = 0; index < 64; index += 1) {
    if (game.board[index] === pawn) {
      pawnsByFile[fileOf(index)] += 1;
      pawnSquares.push(index);
    }
  }

  let score = 0;
  for (let file = 0; file < 8; file += 1) {
    if (pawnsByFile[file] > 1) score -= (pawnsByFile[file] - 1) * 13;
  }

  for (const index of pawnSquares) {
    const file = fileOf(index);
    const left = file > 0 ? pawnsByFile[file - 1] : 0;
    const right = file < 7 ? pawnsByFile[file + 1] : 0;
    if (!left && !right) score -= 11;

    let passed = true;
    const enemyPawn = color === 'w' ? 'p' : 'P';
    const row = rowOf(index);
    for (let enemyIndex = 0; enemyIndex < 64; enemyIndex += 1) {
      if (game.board[enemyIndex] !== enemyPawn) continue;
      const enemyFile = fileOf(enemyIndex);
      if (Math.abs(enemyFile - file) > 1) continue;
      const enemyRow = rowOf(enemyIndex);
      if ((color === 'w' && enemyRow < row) || (color === 'b' && enemyRow > row)) {
        passed = false;
        break;
      }
    }
    if (passed) {
      const rank = whiteRelativeRank(index, color);
      score += 10 + rank * rank * 3;
    }
  }

  return score;
}

export function evaluateWhite(game) {
  let score = 0;
  let whiteBishops = 0;
  let blackBishops = 0;
  let nonPawnMaterial = 0;

  for (const piece of game.board) {
    if (!piece) continue;
    const type = typeOf(piece);
    if (type !== 'P' && type !== 'K') nonPawnMaterial += VALUES[type];
  }

  for (let index = 0; index < 64; index += 1) {
    const piece = game.board[index];
    if (!piece) continue;
    const sign = colorOf(piece) === 'w' ? 1 : -1;
    const type = typeOf(piece);
    score += sign * (VALUES[type] + positionalScore(piece, index, game, nonPawnMaterial));
    if (piece === 'B') whiteBishops += 1;
    if (piece === 'b') blackBishops += 1;
  }

  if (whiteBishops >= 2) score += 28;
  if (blackBishops >= 2) score -= 28;
  score += pawnStructureScore(game, 'w');
  score -= pawnStructureScore(game, 'b');

  if (game.isKingInCheck('w')) score -= 24;
  if (game.isKingInCheck('b')) score += 24;
  return score;
}

function evaluateForTurn(game) {
  const whiteScore = evaluateWhite(game);
  return game.turn === 'w' ? whiteScore : -whiteScore;
}

function moveOrderingScore(move, ttMoveUci = null, game = null) {
  let score = 0;
  const uci = game ? game.moveToUci(move) : null;
  if (ttMoveUci && uci === ttMoveUci) score += 100000;
  if (move.promotion) score += 15000 + VALUES[move.promotion.toUpperCase()];
  if (move.captured) score += 10000 + VALUES[typeOf(move.captured)] * 12 - VALUES[typeOf(move.piece)];
  if (move.flags.includes('e')) score += 10000 + VALUES.P * 11;
  if (move.flags.includes('k') || move.flags.includes('q')) score += 600;
  return score;
}

function orderedMoves(game, moves, ttMoveUci = null) {
  return [...moves].sort((a, b) => (
    moveOrderingScore(b, ttMoveUci, game) - moveOrderingScore(a, ttMoveUci, game)
  ));
}

function checkTime(context) {
  context.nodes += 1;
  if ((context.nodes & 1023) === 0 && performance.now() >= context.deadline) {
    throw new SearchTimeout();
  }
}

function isDraw(game) {
  return game.halfmove >= 100 || game.isThreefoldRepetition() || game.isInsufficientMaterial();
}

function quiescence(game, alpha, beta, context, ply, depthLeft = 5) {
  checkTime(context);
  if (isDraw(game)) return 0;

  const inCheck = game.isKingInCheck(game.turn);
  const allMoves = inCheck ? game.generateLegalMoves() : null;
  if (inCheck && allMoves.length === 0) return -MATE_SCORE + ply;

  let standPat = evaluateForTurn(game);
  if (!inCheck) {
    if (standPat >= beta) return beta;
    if (standPat > alpha) alpha = standPat;
    if (depthLeft <= 0) return alpha;
  }

  const moves = inCheck ? allMoves : game.generateLegalMoves({ capturesOnly: true });
  for (const move of orderedMoves(game, moves)) {
    game.push(move);
    const score = -quiescence(game, -beta, -alpha, context, ply + 1, depthLeft - 1);
    game.undo();
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
  }
  return alpha;
}

function negamax(game, depth, alpha, beta, context, ply) {
  checkTime(context);
  if (isDraw(game)) return 0;

  const key = `${game.positionKey()}|${depth}`;
  const cached = context.table.get(key);
  if (cached && cached.depth >= depth) {
    if (cached.flag === 'exact') return cached.score;
    if (cached.flag === 'lower') alpha = Math.max(alpha, cached.score);
    if (cached.flag === 'upper') beta = Math.min(beta, cached.score);
    if (alpha >= beta) return cached.score;
  }

  if (depth <= 0) return quiescence(game, alpha, beta, context, ply);

  const moves = game.generateLegalMoves();
  if (moves.length === 0) {
    return game.isKingInCheck(game.turn) ? -MATE_SCORE + ply : 0;
  }

  const originalAlpha = alpha;
  let bestScore = -INF;
  let bestMoveUci = null;
  const ttMove = cached?.bestMoveUci || null;

  for (const move of orderedMoves(game, moves, ttMove)) {
    game.push(move);
    const score = -negamax(game, depth - 1, -beta, -alpha, context, ply + 1);
    game.undo();

    if (score > bestScore) {
      bestScore = score;
      bestMoveUci = game.moveToUci(move);
    }
    if (score > alpha) alpha = score;
    if (alpha >= beta) break;
  }

  const flag = bestScore <= originalAlpha ? 'upper' : bestScore >= beta ? 'lower' : 'exact';
  context.table.set(key, { depth, score: bestScore, flag, bestMoveUci });
  return bestScore;
}

function searchAtDepth(game, depth, context, preferredMoveUci = null) {
  const moves = orderedMoves(game, game.generateLegalMoves(), preferredMoveUci);
  let bestMove = null;
  let bestScore = -INF;
  let alpha = -INF;
  const beta = INF;

  for (const move of moves) {
    checkTime(context);
    game.push(move);
    const score = -negamax(game, depth - 1, -beta, -alpha, context, 1);
    game.undo();
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
    if (score > alpha) alpha = score;
  }

  return { move: bestMove, score: bestScore };
}

function beginnerMove(game) {
  const moves = game.generateLegalMoves();
  if (!moves.length) return { move: null, score: 0, depth: 0, nodes: 0 };

  const rootColor = game.turn;
  const scored = moves.map((move) => {
    game.push(move);
    let score = evaluateWhite(game) * (rootColor === 'w' ? 1 : -1);
    game.undo();
    if (move.captured) score += VALUES[typeOf(move.captured)] * 0.35;
    if (move.promotion) score += VALUES[move.promotion.toUpperCase()] * 0.4;
    score += Math.random() * 90 - 45;
    return { move, score };
  }).sort((a, b) => b.score - a.score);

  const roll = Math.random();
  let poolSize;
  if (roll < 0.18) poolSize = 1;
  else if (roll < 0.58) poolSize = Math.min(5, scored.length);
  else poolSize = Math.max(1, Math.ceil(scored.length * 0.7));

  const choice = scored[Math.floor(Math.random() * poolSize)];
  return { move: choice.move, score: choice.score, depth: 1, nodes: moves.length };
}

export function chooseBestMove(game, level = 'intermediate', options = {}) {
  const started = performance.now();
  const legalMoves = game.generateLegalMoves();
  if (!legalMoves.length) {
    return { move: null, uci: null, score: 0, depth: 0, nodes: 0, elapsedMs: 0 };
  }

  if (level === 'beginner') {
    const result = beginnerMove(game);
    return {
      ...result,
      uci: result.move ? game.moveToUci(result.move) : null,
      elapsedMs: Math.round(performance.now() - started)
    };
  }

  const settings = level === 'advanced'
    ? { maxDepth: 5, timeMs: 2200 }
    : { maxDepth: 3, timeMs: 800 };
  const maxDepth = options.maxDepth || settings.maxDepth;
  const timeMs = options.timeMs || settings.timeMs;
  const context = {
    deadline: started + timeMs,
    nodes: 0,
    table: new Map()
  };

  let completed = {
    move: legalMoves[0],
    score: 0,
    depth: 0
  };
  let preferredMoveUci = null;

  for (let depth = 1; depth <= maxDepth; depth += 1) {
    try {
      const result = searchAtDepth(game, depth, context, preferredMoveUci);
      if (result.move) {
        completed = { ...result, depth };
        preferredMoveUci = game.moveToUci(result.move);
      }
      if (Math.abs(result.score) > MATE_SCORE - 1000) break;
    } catch (error) {
      if (error instanceof SearchTimeout) break;
      throw error;
    }
  }

  return {
    move: completed.move,
    uci: completed.move ? game.moveToUci(completed.move) : null,
    score: completed.score,
    depth: completed.depth,
    nodes: context.nodes,
    elapsedMs: Math.round(performance.now() - started)
  };
}

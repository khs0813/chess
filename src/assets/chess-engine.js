/**
 * ChessStep browser chess engine.
 * Full legal move generation: castling, en passant, promotion, check,
 * checkmate, stalemate, fifty-move rule, repetition and basic dead positions.
 * No third-party runtime dependency.
 */

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const PIECE_SYMBOLS = Object.freeze({
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟'
});

export const PIECE_NAMES = Object.freeze({
  K: { ko: '백 킹', en: 'white king' },
  Q: { ko: '백 퀸', en: 'white queen' },
  R: { ko: '백 룩', en: 'white rook' },
  B: { ko: '백 비숍', en: 'white bishop' },
  N: { ko: '백 나이트', en: 'white knight' },
  P: { ko: '백 폰', en: 'white pawn' },
  k: { ko: '흑 킹', en: 'black king' },
  q: { ko: '흑 퀸', en: 'black queen' },
  r: { ko: '흑 룩', en: 'black rook' },
  b: { ko: '흑 비숍', en: 'black bishop' },
  n: { ko: '흑 나이트', en: 'black knight' },
  p: { ko: '흑 폰', en: 'black pawn' }
});

const FILES = 'abcdefgh';
const KNIGHT_STEPS = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1]
];
const KING_STEPS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
];
const BISHOP_DIRS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const ROOK_DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const QUEEN_DIRS = [...BISHOP_DIRS, ...ROOK_DIRS];
const PROMOTIONS = ['q', 'r', 'b', 'n'];

export function opposite(color) {
  return color === 'w' ? 'b' : 'w';
}

export function colorOf(piece) {
  if (!piece) return null;
  return piece === piece.toUpperCase() ? 'w' : 'b';
}

export function typeOf(piece) {
  return piece ? piece.toUpperCase() : null;
}

export function indexToSquare(index) {
  if (!Number.isInteger(index) || index < 0 || index > 63) return null;
  const file = FILES[index % 8];
  const rank = 8 - Math.floor(index / 8);
  return `${file}${rank}`;
}

export function squareToIndex(square) {
  if (typeof square !== 'string' || !/^[a-h][1-8]$/.test(square)) return -1;
  const file = FILES.indexOf(square[0]);
  const rank = Number(square[1]);
  return (8 - rank) * 8 + file;
}

function rowOf(index) {
  return Math.floor(index / 8);
}

function fileOf(index) {
  return index % 8;
}

function inside(row, file) {
  return row >= 0 && row < 8 && file >= 0 && file < 8;
}

function sameMove(a, b) {
  return a.from === b.from && a.to === b.to && (a.promotion || null) === (b.promotion || null);
}

function cloneMove(move) {
  return {
    from: move.from,
    to: move.to,
    piece: move.piece,
    captured: move.captured || null,
    promotion: move.promotion || null,
    flags: move.flags || ''
  };
}

export class Chess {
  constructor(fen = START_FEN) {
    this.board = Array(64).fill(null);
    this.turn = 'w';
    this.castling = { K: false, Q: false, k: false, q: false };
    this.epSquare = -1;
    this.halfmove = 0;
    this.fullmove = 1;
    this.history = [];
    this.positionHistory = [];
    this.load(fen);
  }

  load(fen) {
    const parts = String(fen).trim().split(/\s+/);
    if (parts.length < 4) throw new Error('Invalid FEN: expected at least 4 fields');

    const rows = parts[0].split('/');
    if (rows.length !== 8) throw new Error('Invalid FEN board');

    const nextBoard = [];
    for (const row of rows) {
      let count = 0;
      for (const token of row) {
        if (/^[1-8]$/.test(token)) {
          const empty = Number(token);
          for (let i = 0; i < empty; i += 1) nextBoard.push(null);
          count += empty;
        } else if (/^[prnbqkPRNBQK]$/.test(token)) {
          nextBoard.push(token);
          count += 1;
        } else {
          throw new Error(`Invalid FEN token: ${token}`);
        }
      }
      if (count !== 8) throw new Error('Invalid FEN row width');
    }
    if (nextBoard.length !== 64) throw new Error('Invalid FEN board size');

    const nextTurn = parts[1];
    if (nextTurn !== 'w' && nextTurn !== 'b') throw new Error('Invalid FEN turn');

    this.board = nextBoard;
    this.turn = nextTurn;
    this.castling = {
      K: parts[2].includes('K'),
      Q: parts[2].includes('Q'),
      k: parts[2].includes('k'),
      q: parts[2].includes('q')
    };
    this.epSquare = parts[3] === '-' ? -1 : squareToIndex(parts[3]);
    if (parts[3] !== '-' && this.epSquare < 0) throw new Error('Invalid FEN en passant square');
    this.halfmove = parts[4] ? Number(parts[4]) : 0;
    this.fullmove = parts[5] ? Number(parts[5]) : 1;
    if (!Number.isFinite(this.halfmove) || !Number.isFinite(this.fullmove)) {
      throw new Error('Invalid FEN move counters');
    }
    this.history = [];
    this.positionHistory = [this.positionKey()];

    if (this.kingIndex('w') < 0 || this.kingIndex('b') < 0) {
      throw new Error('Invalid FEN: both kings are required');
    }
    return this;
  }

  reset() {
    return this.load(START_FEN);
  }

  clone() {
    const copy = new Chess(this.fen());
    copy.positionHistory = [...this.positionHistory];
    return copy;
  }

  fen() {
    const rows = [];
    for (let row = 0; row < 8; row += 1) {
      let encoded = '';
      let empties = 0;
      for (let file = 0; file < 8; file += 1) {
        const piece = this.board[row * 8 + file];
        if (!piece) {
          empties += 1;
        } else {
          if (empties) encoded += String(empties);
          empties = 0;
          encoded += piece;
        }
      }
      if (empties) encoded += String(empties);
      rows.push(encoded);
    }
    const rights = ['K', 'Q', 'k', 'q'].filter((right) => this.castling[right]).join('') || '-';
    const ep = this.epSquare >= 0 ? indexToSquare(this.epSquare) : '-';
    return `${rows.join('/')} ${this.turn} ${rights} ${ep} ${this.halfmove} ${this.fullmove}`;
  }

  positionKey() {
    return this.fen().split(' ').slice(0, 4).join(' ');
  }

  pieceAt(squareOrIndex) {
    const index = typeof squareOrIndex === 'string' ? squareToIndex(squareOrIndex) : squareOrIndex;
    if (!Number.isInteger(index) || index < 0 || index > 63) return null;
    return this.board[index];
  }

  kingIndex(color) {
    return this.board.indexOf(color === 'w' ? 'K' : 'k');
  }

  isSquareAttacked(square, byColor) {
    const targetRow = rowOf(square);
    const targetFile = fileOf(square);

    // Pawns: locate possible source squares that attack the target.
    const pawn = byColor === 'w' ? 'P' : 'p';
    const pawnSourceRow = targetRow + (byColor === 'w' ? 1 : -1);
    for (const deltaFile of [-1, 1]) {
      const sourceFile = targetFile + deltaFile;
      if (inside(pawnSourceRow, sourceFile) && this.board[pawnSourceRow * 8 + sourceFile] === pawn) {
        return true;
      }
    }

    const knight = byColor === 'w' ? 'N' : 'n';
    for (const [dr, df] of KNIGHT_STEPS) {
      const row = targetRow + dr;
      const file = targetFile + df;
      if (inside(row, file) && this.board[row * 8 + file] === knight) return true;
    }

    const king = byColor === 'w' ? 'K' : 'k';
    for (const [dr, df] of KING_STEPS) {
      const row = targetRow + dr;
      const file = targetFile + df;
      if (inside(row, file) && this.board[row * 8 + file] === king) return true;
    }

    const bishop = byColor === 'w' ? 'B' : 'b';
    const rook = byColor === 'w' ? 'R' : 'r';
    const queen = byColor === 'w' ? 'Q' : 'q';

    for (const [dr, df] of BISHOP_DIRS) {
      let row = targetRow + dr;
      let file = targetFile + df;
      while (inside(row, file)) {
        const piece = this.board[row * 8 + file];
        if (piece) {
          if (piece === bishop || piece === queen) return true;
          break;
        }
        row += dr;
        file += df;
      }
    }

    for (const [dr, df] of ROOK_DIRS) {
      let row = targetRow + dr;
      let file = targetFile + df;
      while (inside(row, file)) {
        const piece = this.board[row * 8 + file];
        if (piece) {
          if (piece === rook || piece === queen) return true;
          break;
        }
        row += dr;
        file += df;
      }
    }

    return false;
  }

  isKingInCheck(color = this.turn) {
    const king = this.kingIndex(color);
    if (king < 0) return true;
    return this.isSquareAttacked(king, opposite(color));
  }

  _addPawnMove(moves, from, to, piece, captured = null, flags = '') {
    const promotionRow = colorOf(piece) === 'w' ? 0 : 7;
    if (rowOf(to) === promotionRow) {
      for (const promotion of PROMOTIONS) {
        moves.push({ from, to, piece, captured, promotion, flags: `${flags}p` });
      }
    } else {
      moves.push({ from, to, piece, captured, promotion: null, flags });
    }
  }

  _generatePseudoMoves(color = this.turn) {
    const moves = [];

    for (let from = 0; from < 64; from += 1) {
      const piece = this.board[from];
      if (!piece || colorOf(piece) !== color) continue;

      const type = typeOf(piece);
      const fromRow = rowOf(from);
      const fromFile = fileOf(from);

      if (type === 'P') {
        const direction = color === 'w' ? -1 : 1;
        const startRow = color === 'w' ? 6 : 1;
        const oneRow = fromRow + direction;

        if (inside(oneRow, fromFile)) {
          const one = oneRow * 8 + fromFile;
          if (!this.board[one]) {
            this._addPawnMove(moves, from, one, piece);
            const twoRow = fromRow + direction * 2;
            const two = twoRow * 8 + fromFile;
            if (fromRow === startRow && !this.board[two]) {
              moves.push({ from, to: two, piece, captured: null, promotion: null, flags: 'b' });
            }
          }
        }

        for (const df of [-1, 1]) {
          const toRow = fromRow + direction;
          const toFile = fromFile + df;
          if (!inside(toRow, toFile)) continue;
          const to = toRow * 8 + toFile;
          const target = this.board[to];
          if (target && colorOf(target) !== color && typeOf(target) !== 'K') {
            this._addPawnMove(moves, from, to, piece, target, 'c');
          } else if (to === this.epSquare) {
            const capturedIndex = to + (color === 'w' ? 8 : -8);
            const captured = this.board[capturedIndex];
            if (captured && typeOf(captured) === 'P' && colorOf(captured) !== color) {
              this._addPawnMove(moves, from, to, piece, captured, 'e');
            }
          }
        }
        continue;
      }

      if (type === 'N') {
        for (const [dr, df] of KNIGHT_STEPS) {
          const row = fromRow + dr;
          const file = fromFile + df;
          if (!inside(row, file)) continue;
          const to = row * 8 + file;
          const target = this.board[to];
          if (!target) {
            moves.push({ from, to, piece, captured: null, promotion: null, flags: '' });
          } else if (colorOf(target) !== color && typeOf(target) !== 'K') {
            moves.push({ from, to, piece, captured: target, promotion: null, flags: 'c' });
          }
        }
        continue;
      }

      if (type === 'B' || type === 'R' || type === 'Q') {
        const directions = type === 'B' ? BISHOP_DIRS : type === 'R' ? ROOK_DIRS : QUEEN_DIRS;
        for (const [dr, df] of directions) {
          let row = fromRow + dr;
          let file = fromFile + df;
          while (inside(row, file)) {
            const to = row * 8 + file;
            const target = this.board[to];
            if (!target) {
              moves.push({ from, to, piece, captured: null, promotion: null, flags: '' });
            } else {
              if (colorOf(target) !== color && typeOf(target) !== 'K') {
                moves.push({ from, to, piece, captured: target, promotion: null, flags: 'c' });
              }
              break;
            }
            row += dr;
            file += df;
          }
        }
        continue;
      }

      if (type === 'K') {
        for (const [dr, df] of KING_STEPS) {
          const row = fromRow + dr;
          const file = fromFile + df;
          if (!inside(row, file)) continue;
          const to = row * 8 + file;
          const target = this.board[to];
          if (!target) {
            moves.push({ from, to, piece, captured: null, promotion: null, flags: '' });
          } else if (colorOf(target) !== color && typeOf(target) !== 'K') {
            moves.push({ from, to, piece, captured: target, promotion: null, flags: 'c' });
          }
        }

        // Castling legality includes empty transit squares and attacked squares.
        if (color === 'w' && from === 60 && piece === 'K') {
          if (
            this.castling.K && this.board[63] === 'R' && !this.board[61] && !this.board[62] &&
            !this.isSquareAttacked(60, 'b') && !this.isSquareAttacked(61, 'b') && !this.isSquareAttacked(62, 'b')
          ) {
            moves.push({ from: 60, to: 62, piece, captured: null, promotion: null, flags: 'k' });
          }
          if (
            this.castling.Q && this.board[56] === 'R' && !this.board[57] && !this.board[58] && !this.board[59] &&
            !this.isSquareAttacked(60, 'b') && !this.isSquareAttacked(59, 'b') && !this.isSquareAttacked(58, 'b')
          ) {
            moves.push({ from: 60, to: 58, piece, captured: null, promotion: null, flags: 'q' });
          }
        } else if (color === 'b' && from === 4 && piece === 'k') {
          if (
            this.castling.k && this.board[7] === 'r' && !this.board[5] && !this.board[6] &&
            !this.isSquareAttacked(4, 'w') && !this.isSquareAttacked(5, 'w') && !this.isSquareAttacked(6, 'w')
          ) {
            moves.push({ from: 4, to: 6, piece, captured: null, promotion: null, flags: 'k' });
          }
          if (
            this.castling.q && this.board[0] === 'r' && !this.board[1] && !this.board[2] && !this.board[3] &&
            !this.isSquareAttacked(4, 'w') && !this.isSquareAttacked(3, 'w') && !this.isSquareAttacked(2, 'w')
          ) {
            moves.push({ from: 4, to: 2, piece, captured: null, promotion: null, flags: 'q' });
          }
        }
      }
    }

    return moves;
  }

  _snapshot() {
    return {
      board: [...this.board],
      turn: this.turn,
      castling: { ...this.castling },
      epSquare: this.epSquare,
      halfmove: this.halfmove,
      fullmove: this.fullmove,
      positionHistoryLength: this.positionHistory.length
    };
  }

  _restore(snapshot) {
    this.board = [...snapshot.board];
    this.turn = snapshot.turn;
    this.castling = { ...snapshot.castling };
    this.epSquare = snapshot.epSquare;
    this.halfmove = snapshot.halfmove;
    this.fullmove = snapshot.fullmove;
    this.positionHistory.length = snapshot.positionHistoryLength;
  }

  _applyMove(move, trackPosition = true) {
    const snapshot = this._snapshot();
    const movingColor = this.turn;
    const piece = this.board[move.from];
    if (!piece) throw new Error('Cannot move an empty square');

    let capturedPiece = this.board[move.to];
    const capturedSquare = move.flags.includes('e')
      ? move.to + (movingColor === 'w' ? 8 : -8)
      : move.to;

    if (move.flags.includes('e')) {
      capturedPiece = this.board[capturedSquare];
      this.board[capturedSquare] = null;
    }

    this.board[move.to] = piece;
    this.board[move.from] = null;

    if (move.promotion) {
      this.board[move.to] = movingColor === 'w' ? move.promotion.toUpperCase() : move.promotion.toLowerCase();
    }

    if (move.flags.includes('k')) {
      if (movingColor === 'w') {
        this.board[61] = this.board[63];
        this.board[63] = null;
      } else {
        this.board[5] = this.board[7];
        this.board[7] = null;
      }
    } else if (move.flags.includes('q')) {
      if (movingColor === 'w') {
        this.board[59] = this.board[56];
        this.board[56] = null;
      } else {
        this.board[3] = this.board[0];
        this.board[0] = null;
      }
    }

    // Moving a king or rook removes its own castling rights.
    if (piece === 'K') {
      this.castling.K = false;
      this.castling.Q = false;
    } else if (piece === 'k') {
      this.castling.k = false;
      this.castling.q = false;
    } else if (piece === 'R') {
      if (move.from === 63) this.castling.K = false;
      if (move.from === 56) this.castling.Q = false;
    } else if (piece === 'r') {
      if (move.from === 7) this.castling.k = false;
      if (move.from === 0) this.castling.q = false;
    }

    // Capturing a rook on its original square removes that side's right.
    if (capturedPiece === 'R') {
      if (capturedSquare === 63) this.castling.K = false;
      if (capturedSquare === 56) this.castling.Q = false;
    } else if (capturedPiece === 'r') {
      if (capturedSquare === 7) this.castling.k = false;
      if (capturedSquare === 0) this.castling.q = false;
    }

    this.epSquare = -1;
    if (typeOf(piece) === 'P' && Math.abs(move.to - move.from) === 16) {
      this.epSquare = (move.from + move.to) / 2;
    }

    if (typeOf(piece) === 'P' || capturedPiece) this.halfmove = 0;
    else this.halfmove += 1;

    if (movingColor === 'b') this.fullmove += 1;
    this.turn = opposite(movingColor);

    if (trackPosition) this.positionHistory.push(this.positionKey());
    return snapshot;
  }

  generateLegalMoves({ capturesOnly = false } = {}) {
    const color = this.turn;
    const pseudo = this._generatePseudoMoves(color);
    const legal = [];

    for (const move of pseudo) {
      if (capturesOnly && !move.captured && !move.flags.includes('e') && !move.promotion) continue;
      const snapshot = this._applyMove(move, false);
      const leavesKingSafe = !this.isKingInCheck(color);
      this._restore(snapshot);
      if (leavesKingSafe) legal.push(move);
    }
    return legal;
  }

  legalMovesFrom(squareOrIndex) {
    const index = typeof squareOrIndex === 'string' ? squareToIndex(squareOrIndex) : squareOrIndex;
    return this.generateLegalMoves().filter((move) => move.from === index);
  }

  findLegalMove(input) {
    const legalMoves = this.generateLegalMoves();
    if (typeof input === 'string') {
      const normalized = input.trim().toLowerCase();
      if (!/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(normalized)) return null;
      const from = squareToIndex(normalized.slice(0, 2));
      const to = squareToIndex(normalized.slice(2, 4));
      const promotion = normalized[4] || null;
      return legalMoves.find((move) => move.from === from && move.to === to && (move.promotion || null) === promotion) || null;
    }
    if (input && Number.isInteger(input.from) && Number.isInteger(input.to)) {
      return legalMoves.find((move) => sameMove(move, input)) || null;
    }
    return null;
  }

  _sanBase(move, legalMoves) {
    if (move.flags.includes('k')) return 'O-O';
    if (move.flags.includes('q')) return 'O-O-O';

    const pieceType = typeOf(move.piece);
    const isPawn = pieceType === 'P';
    const isCapture = Boolean(move.captured) || move.flags.includes('e');
    let san = '';

    if (!isPawn) {
      san += pieceType;
      const ambiguous = legalMoves.filter((candidate) => (
        candidate.from !== move.from &&
        candidate.to === move.to &&
        typeOf(candidate.piece) === pieceType
      ));
      if (ambiguous.length) {
        const sameFile = ambiguous.some((candidate) => fileOf(candidate.from) === fileOf(move.from));
        const sameRank = ambiguous.some((candidate) => rowOf(candidate.from) === rowOf(move.from));
        if (!sameFile) san += FILES[fileOf(move.from)];
        else if (!sameRank) san += String(8 - rowOf(move.from));
        else san += indexToSquare(move.from);
      }
    } else if (isCapture) {
      san += FILES[fileOf(move.from)];
    }

    if (isCapture) san += 'x';
    san += indexToSquare(move.to);
    if (move.promotion) san += `=${move.promotion.toUpperCase()}`;
    return san;
  }

  moveToSan(move, legalMoves = this.generateLegalMoves()) {
    let san = this._sanBase(move, legalMoves);
    const snapshot = this._applyMove(move, false);
    if (this.isKingInCheck(this.turn)) {
      san += this.generateLegalMoves().length === 0 ? '#' : '+';
    }
    this._restore(snapshot);
    return san;
  }

  move(input) {
    const legalMoves = this.generateLegalMoves();
    let selected = null;

    if (typeof input === 'string') {
      const normalized = input.trim().toLowerCase();
      if (/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(normalized)) {
        const from = squareToIndex(normalized.slice(0, 2));
        const to = squareToIndex(normalized.slice(2, 4));
        const promotion = normalized[4] || null;
        selected = legalMoves.find((move) => move.from === from && move.to === to && (move.promotion || null) === promotion);
      }
    } else if (input && Number.isInteger(input.from) && Number.isInteger(input.to)) {
      selected = legalMoves.find((move) => sameMove(move, input));
    }

    if (!selected) return null;
    const san = this.moveToSan(selected, legalMoves);
    const snapshot = this._applyMove(selected, true);
    const entry = { snapshot, move: cloneMove(selected), san };
    this.history.push(entry);
    return { ...cloneMove(selected), san, uci: this.moveToUci(selected) };
  }

  push(move) {
    const snapshot = this._applyMove(move, true);
    this.history.push({ snapshot, move: cloneMove(move), san: null });
    return move;
  }

  undo() {
    const entry = this.history.pop();
    if (!entry) return null;
    this._restore(entry.snapshot);
    return { ...cloneMove(entry.move), san: entry.san, uci: this.moveToUci(entry.move) };
  }

  moveToUci(move) {
    return `${indexToSquare(move.from)}${indexToSquare(move.to)}${move.promotion || ''}`;
  }

  getMoveHistory() {
    return this.history.map((entry) => ({
      ...cloneMove(entry.move),
      san: entry.san,
      uci: this.moveToUci(entry.move)
    }));
  }

  isThreefoldRepetition() {
    const current = this.positionKey();
    let count = 0;
    for (const key of this.positionHistory) {
      if (key === current) count += 1;
      if (count >= 3) return true;
    }
    return false;
  }

  isInsufficientMaterial() {
    const pieces = [];
    const bishops = [];

    for (let index = 0; index < 64; index += 1) {
      const piece = this.board[index];
      if (!piece || typeOf(piece) === 'K') continue;
      const type = typeOf(piece);
      if (type === 'P' || type === 'R' || type === 'Q') return false;
      pieces.push({ piece, index, type });
      if (type === 'B') bishops.push({ piece, index });
    }

    if (pieces.length === 0) return true;
    if (pieces.length === 1 && (pieces[0].type === 'B' || pieces[0].type === 'N')) return true;
    if (pieces.every((entry) => entry.type === 'B')) {
      const colors = bishops.map(({ index }) => (rowOf(index) + fileOf(index)) % 2);
      return colors.every((color) => color === colors[0]);
    }
    return false;
  }

  status() {
    const legalMoves = this.generateLegalMoves();
    const inCheck = this.isKingInCheck(this.turn);

    if (legalMoves.length === 0) {
      return inCheck
        ? { over: true, result: this.turn === 'w' ? '0-1' : '1-0', reason: 'checkmate', inCheck, legalMoves: 0 }
        : { over: true, result: '1/2-1/2', reason: 'stalemate', inCheck, legalMoves: 0 };
    }
    if (this.halfmove >= 100) {
      return { over: true, result: '1/2-1/2', reason: 'fifty-move', inCheck, legalMoves: legalMoves.length };
    }
    if (this.isThreefoldRepetition()) {
      return { over: true, result: '1/2-1/2', reason: 'threefold', inCheck, legalMoves: legalMoves.length };
    }
    if (this.isInsufficientMaterial()) {
      return { over: true, result: '1/2-1/2', reason: 'insufficient', inCheck, legalMoves: legalMoves.length };
    }
    return { over: false, result: null, reason: null, inCheck, legalMoves: legalMoves.length };
  }

  perft(depth) {
    if (depth === 0) return 1;
    let nodes = 0;
    for (const move of this.generateLegalMoves()) {
      this.push(move);
      nodes += this.perft(depth - 1);
      this.undo();
    }
    return nodes;
  }
}

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

export const PIECE_SVGS = Object.freeze({
  P: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#ffffff" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round"/></svg>',
  N: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="none" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#ffffff"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2s-4 1-4-4c0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-3.1 3.05-4 3.05-4s4.13.53 5.45 3c-1 4.5-5.5 4.5-5.5 4.5l7 4z" fill="#ffffff"/><circle cx="9" cy="25" r="0.8" fill="#1c251f"/><path d="M15 15.5a.5 1.5 0 1 1-1 0 .5 1.5 0 1 1 1 0z" fill="#1c251f" transform="matrix(.866 .5 -.5 .866 9.693 -5.173)"/></g></svg>',
  B: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="none" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#ffffff" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M12 36c.27-1.12.29-2.85 1-6 1-6 3-9 9.5-13 6.5 4 8.5 7 9.5 13 .71 3.15.73 4.88 1 6-3.39-.97-10.11.43-13.5-2-3.39 2.43-10.11 1.03-13.5 2z"/><path d="M15 32h15"/></g><circle cx="22.5" cy="11.5" r="2.5" fill="#ffffff"/><path d="M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5"/></g></svg>',
  R: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="#ffffff" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17"/><path d="M31 29.5L32.5 32h-20l1.5-2.5"/><path d="M11 14h23" fill="none" stroke="#1c251f"/></g></svg>',
  Q: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="#ffffff" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="11" r="2"/><circle cx="20.5" cy="6.5" r="2"/><circle cx="37" cy="11" r="2"/><circle cx="12" cy="7.5" r="2"/><circle cx="29" cy="7.5" r="2"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5L22.5 10l-3 14.5L14 11v14L7 14l2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-2 2.5 0 0-1 1.5 1 2.5 2 1 21 1 23 0 2-1 1-2.5 1-2.5-.5 0-.5-1.5-2-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0"/></g></svg>',
  K: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="none" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c-1.5-3-4.5-3-6 0-1.5 3 3 10.5 3 10.5" fill="#ffffff"/><path d="M11.5 37c5.5 3.5 16.5 3.5 22 0 3-3 4.5-10.5 4.5-17 0-4.5-2.5-5.5-5.5-5.5s-4.5 3-4.5 3-2.5-3-5.5-3-5.5 3-5.5 3-1.5-3-4.5-3-5.5 1-5.5 5.5c0 6.5 1.5 14 4.5 17z" fill="#ffffff"/><path d="M11.5 30c5.5-3 16.5-3 22 0M11.5 33.5c5.5-3 16.5-3 22 0M11.5 37c5.5-3 16.5-3 22 0"/></g></svg>',
  p: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#222823" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round"/></svg>',
  n: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="none" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#222823"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2s-4 1-4-4c0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-3.1 3.05-4 3.05-4s4.13.53 5.45 3c-1 4.5-5.5 4.5-5.5 4.5l7 4z" fill="#222823"/><circle cx="9" cy="25" r="0.8" fill="#ffffff" stroke="#ffffff"/><path d="M15 15.5a.5 1.5 0 1 1-1 0 .5 1.5 0 1 1 1 0z" fill="#ffffff" stroke="#ffffff" transform="matrix(.866 .5 -.5 .866 9.693 -5.173)"/><path d="M24.55 10.4c-.36-.4-1.08-.65-1.75-.4-.67.25-.96.95-.65 1.5.3.55 1.15.9 1.8.6.65-.3.95-1.3.6-1.7z" fill="#ffffff" stroke="none"/></g></svg>',
  b: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="none" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#222823" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M12 36c.27-1.12.29-2.85 1-6 1-6 3-9 9.5-13 6.5 4 8.5 7 9.5 13 .71 3.15.73 4.88 1 6-3.39-.97-10.11.43-13.5-2-3.39 2.43-10.11 1.03-13.5 2z"/></g><circle cx="22.5" cy="11.5" r="2.5" fill="#222823"/><path d="M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5" stroke="#ffffff"/></g></svg>',
  r: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="#222823" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17"/><path d="M31 29.5L32.5 32h-20l1.5-2.5"/><path d="M11 14h23M12 32h21" fill="none" stroke="#ffffff"/></g></svg>',
  q: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="#222823" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="11" r="2"/><circle cx="20.5" cy="6.5" r="2"/><circle cx="37" cy="11" r="2"/><circle cx="12" cy="7.5" r="2"/><circle cx="29" cy="7.5" r="2"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5L22.5 10l-3 14.5L14 11v14L7 14l2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-2 2.5 0 0-1 1.5 1 2.5 2 1 21 1 23 0 2-1 1-2.5 1-2.5-.5 0-.5-1.5-2-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" stroke="#ffffff"/></g></svg>',
  k: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="chess-svg-piece" aria-hidden="true"><g fill="none" fill-rule="evenodd" stroke="#1c251f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c-1.5-3-4.5-3-6 0-1.5 3 3 10.5 3 10.5" fill="#222823"/><path d="M11.5 37c5.5 3.5 16.5 3.5 22 0 3-3 4.5-10.5 4.5-17 0-4.5-2.5-5.5-5.5-5.5s-4.5 3-4.5 3-2.5-3-5.5-3-5.5 3-5.5 3-1.5-3-4.5-3-5.5 1-5.5 5.5c0 6.5 1.5 14 4.5 17z" fill="#222823"/><path d="M20 8h5M22.5 11.63V6M11.5 30c5.5-3 16.5-3 22 0M11.5 33.5c5.5-3 16.5-3 22 0M11.5 37c5.5-3 16.5-3 22 0" stroke="#ffffff"/></g></svg>'
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

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  Chess,
  START_FEN,
  indexToSquare,
  squareToIndex
} from '../src/assets/chess-engine.js';
import { chooseBestMove } from '../src/assets/chess-ai.js';

function uciMoves(game) {
  return game.generateLegalMoves().map((move) => game.moveToUci(move));
}

test('square conversion and initial FEN are stable', () => {
  assert.equal(squareToIndex('a8'), 0);
  assert.equal(squareToIndex('h1'), 63);
  assert.equal(indexToSquare(0), 'a8');
  assert.equal(indexToSquare(63), 'h1');
  assert.equal(new Chess().fen(), START_FEN);
});

test('initial legal move count and standard perft values are correct', () => {
  const game = new Chess();
  assert.equal(game.generateLegalMoves().length, 20);
  assert.equal(game.perft(1), 20);
  assert.equal(game.perft(2), 400);
  assert.equal(game.perft(3), 8902);
  assert.equal(game.fen(), START_FEN, 'perft must restore the position');
});

test('normal moves, SAN and undo work', () => {
  const game = new Chess();
  assert.equal(game.move('e2e4')?.san, 'e4');
  assert.equal(game.move('e7e5')?.san, 'e5');
  assert.equal(game.move('g1f3')?.san, 'Nf3');
  assert.equal(game.pieceAt('f3'), 'N');
  assert.equal(game.getMoveHistory().length, 3);
  assert.equal(game.undo()?.uci, 'g1f3');
  assert.equal(game.pieceAt('g1'), 'N');
  assert.equal(game.turn, 'w');
});

test("Fool's mate is detected as checkmate", () => {
  const game = new Chess();
  for (const move of ['f2f3', 'e7e5', 'g2g4', 'd8h4']) {
    assert.ok(game.move(move), `expected legal move ${move}`);
  }
  const status = game.status();
  assert.equal(status.over, true);
  assert.equal(status.reason, 'checkmate');
  assert.equal(status.result, '0-1');
  assert.equal(game.getMoveHistory().at(-1).san, 'Qh4#');
});

test('castling moves the rook and removes castling rights', () => {
  const game = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
  const moves = uciMoves(game);
  assert.ok(moves.includes('e1g1'));
  assert.ok(moves.includes('e1c1'));
  assert.equal(game.move('e1g1')?.san, 'O-O');
  assert.equal(game.pieceAt('g1'), 'K');
  assert.equal(game.pieceAt('f1'), 'R');
  assert.equal(game.pieceAt('h1'), null);
  assert.equal(game.castling.K, false);
  assert.equal(game.castling.Q, false);
});

test('castling through an attacked square is illegal', () => {
  const game = new Chess('r3k2r/8/8/8/2b5/8/8/R3K2R w KQkq - 0 1');
  const moves = uciMoves(game);
  assert.equal(moves.includes('e1g1'), false, 'f1 is attacked by the bishop');
  assert.equal(moves.includes('e1c1'), true);
});

test('en passant capture removes the passed pawn', () => {
  const game = new Chess('4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 1');
  assert.ok(uciMoves(game).includes('e5d6'));
  assert.equal(game.move('e5d6')?.san, 'exd6');
  assert.equal(game.pieceAt('d6'), 'P');
  assert.equal(game.pieceAt('d5'), null);
});

test('promotion offers all pieces and applies the selected piece', () => {
  const game = new Chess('4k3/P7/8/8/8/8/8/4K3 w - - 0 1');
  const promotions = uciMoves(game).filter((move) => move.startsWith('a7a8')).sort();
  assert.deepEqual(promotions, ['a7a8b', 'a7a8n', 'a7a8q', 'a7a8r']);
  assert.equal(game.move('a7a8q')?.san, 'a8=Q+');
  assert.equal(game.pieceAt('a8'), 'Q');
});

test('stalemate and insufficient material are recognized', () => {
  const stalemate = new Chess('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1').status();
  assert.equal(stalemate.reason, 'stalemate');
  assert.equal(stalemate.result, '1/2-1/2');

  const bareKings = new Chess('8/8/8/8/8/3k4/8/3K4 w - - 0 1').status();
  assert.equal(bareKings.reason, 'insufficient');
});

test('threefold repetition is tracked across reversible moves', () => {
  const game = new Chess();
  const cycle = ['g1f3', 'g8f6', 'f3g1', 'f6g8'];
  for (let repeat = 0; repeat < 2; repeat += 1) {
    for (const move of cycle) assert.ok(game.move(move));
  }
  assert.equal(game.status().reason, 'threefold');
});

test('all AI levels return a legal move without mutating the game', () => {
  for (const level of ['beginner', 'intermediate', 'advanced']) {
    const game = new Chess();
    const original = game.fen();
    const result = chooseBestMove(game, level, { maxDepth: 2, timeMs: 180 });
    assert.ok(result.uci, `${level} should return a move`);
    assert.ok(game.findLegalMove(result.uci), `${level} should return a legal UCI move`);
    assert.equal(game.fen(), original, `${level} search must restore the position`);
  }
});

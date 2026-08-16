import { Chess } from './chess-engine.js';
import { chooseBestMove } from './chess-ai.js';

self.addEventListener('message', (event) => {
  const { id, fen, level = 'intermediate', mode = 'move', options = {} } = event.data || {};
  try {
    const game = new Chess(fen);
    const result = chooseBestMove(game, level, options);
    self.postMessage({
      id,
      ok: true,
      mode,
      uci: result.uci,
      score: result.score,
      depth: result.depth,
      nodes: result.nodes,
      elapsedMs: result.elapsedMs
    });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      mode,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

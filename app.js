import CluePosition, { ClueDirection } from './models/CluePosition.js';

import './components/xword-puzzle.js';

document.addEventListener('DOMContentLoaded', () => {
  const puzzle = document.querySelector('#puzzle');
  const rauschwordClue = new CluePosition(
    'rauschword',
    'Title 1',
    'rauschword',
    0,
    ClueDirection.Across,
    1,
    2,
  );
  const puzzleClue = new CluePosition('puzzle', 'Title 2', 'puzzle', 1, ClueDirection.Down, 3, 1);

  puzzle.buildGrid([rauschwordClue, puzzleClue]);
});

// Section transition

// When we show the puzzle div, we need to pass in the squares

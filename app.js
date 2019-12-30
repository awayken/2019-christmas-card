import Clue, { ClueDirection } from './models/Clue.js';

import './components/xword-puzzle.js';

document.addEventListener('DOMContentLoaded', () => {
  const puzzle = document.querySelector('#puzzle');
  const rauschwordClue = new Clue(
    'rauschword',
    'Title 1',
    'rauschword',
    ClueDirection.Across,
    0,
    1,
  );
  const puzzleClue = new Clue('puzzle', 'Title 2', 'puzzle', ClueDirection.Down, 2, 0);

  puzzle.buildGrid([rauschwordClue, puzzleClue], 10, 6);
});

// Section transition

// When we show the puzzle div, we need to pass in the squares

import CluePosition, { ClueDirection } from './models/CluePosition.js';

import './components/xword-clue.js';
import './components/xword-puzzle.js';

document.addEventListener('DOMContentLoaded', () => {
  const puzzle = document.querySelector('#puzzle');

  const squares = [
    new CluePosition('rauschword', 'Title 1', 'rauschword', 0, ClueDirection.Across, 1, 2),
    new CluePosition('puzzle', 'Title 2', 'puzzle', 1, ClueDirection.Down, 3, 1),
  ];

  puzzle.populate(squares);
});

// Section transition

// When we show the puzzle div, we need to pass in the squares

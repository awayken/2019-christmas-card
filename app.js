import CluePosition, { ClueDirection } from './models/CluePosition.js';

import './components/xword-clue.js';
import './components/xword-puzzle.js';
import './components/xword-grid.js';
import './components/xword-panel.js';

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

  const squares = [rauschwordClue, puzzleClue];

  puzzle.populate(squares);

  const grid = [
    [
      null,
      null,
      {
        down: { question: puzzleClue.question },
        value: '',
      },
    ],
    [
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        down: { question: puzzleClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
      {
        across: { question: rauschwordClue.question, value: '' },
        value: '',
      },
    ],
    [
      null,
      null,
      {
        down: { question: puzzleClue.question },
        value: '',
      },
    ],
    [
      null,
      null,
      {
        down: { question: puzzleClue.question },
        value: '',
      },
    ],
    [
      null,
      null,
      {
        down: { question: puzzleClue.question },
        value: '',
      },
    ],
    [
      null,
      null,
      {
        down: { question: puzzleClue.question },
        value: '',
      },
    ],
    [
      null,
      null,
      {
        down: { question: puzzleClue.question },
        value: '',
      },
    ],
  ];

  const puzzle2 = document.querySelector('#puzzle2');
  puzzle2.buildGrid(grid);
});

// Section transition

// When we show the puzzle div, we need to pass in the squares

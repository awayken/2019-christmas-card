import { ClueDirection } from './Clue.js';

export function buildGrid(clues, showAnswers = false) {
  const grid = [];
  const gridAnswers = [];

  for (const clue of clues) {
    const answerSize = clue.answer.length;
    const { column, row } = clue.start;

    let x = column;
    let y = row;

    for (let i = 0; i < answerSize; i += 1) {
      if (!grid[y]) {
        grid[y] = [];
        gridAnswers[y] = [];
      }

      if (!grid[y][x]) {
        gridAnswers[y][x] = clue.answer.charAt(i);
        grid[y][x] = { isValid: true, value: showAnswers ? gridAnswers[y][x] : '' };
      }

      grid[y][x][clue.direction] = clue.question;
      grid[y][x][`${clue.direction}id`] = clue.id;

      if (clue.direction === ClueDirection.Across) {
        x += 1;
      } else {
        y += 1;
      }
    }
  }

  return {
    grid,
    gridAnswers,
  };
}

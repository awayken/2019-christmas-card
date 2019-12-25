import Clue from './Clue.js';

export const ClueDirection = {
  Across: 'across',
  Down: 'down',
};

export default class CluePosition {
  constructor(id, question, answer, index, direction, column, row) {
    this.clue = new Clue(id, question, answer);
    this.index = index;
    this.direction = direction;
    this.start = { column, row };
  }
}

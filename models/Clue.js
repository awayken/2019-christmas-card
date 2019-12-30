export const ClueDirection = {
  Across: 'across',
  Down: 'down',
};

export default class Clue {
  constructor(id, question, answer, direction, column, row) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.direction = direction;
    this.start = { column, row };
  }
}

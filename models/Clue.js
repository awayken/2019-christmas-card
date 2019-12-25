export default class Clue {
  constructor(id, question, answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }

  get size() {
    return this.answer.length;
  }

  checkAnswer(possibleAnswer) {
    if (!possibleAnswer) {
      return false;
    }

    return possibleAnswer === this.answer;
  }
}

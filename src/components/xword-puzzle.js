import XwordClue from './xword-clue';

import CluePosition, { ClueDirection } from "../models/CluePosition";

class XwordPuzzle extends HTMLElement {
  static get observedAttributes() {
    return ["height", "width"];
  }

  get height() {
    return this.getAttribute("height") || 50;
  }
  set height(val) {
    this.setAttribute("height", val);
  }

  get width() {
    return this.getAttribute("width") || 50;
  }
  set width(val) {
    this.setAttribute("width", val);
  }

  set squares(squares) {
    const answers = {};
    const invalids = {};
    const clues = {};

    for (let square of squares) {
      if (square && square.clue) {
        invalids[square.clue.id] = null;
        answers[square.clue.id] = "";
        clues[square.clue.id] = square.clue;
      }
    }

    this.answers = answers;
    this.invalid = invalids;
    this.clues = clues;
  }

  constructor() {
    super();

    this.squares = [];

    this.clues = {};
    this.invalid = {};
    this.answers = {};

    this.host = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  validateClue(event, answerKey) {
    const { squareIndex, squareValue } = event.detail;
    const answers = { ...this.answers };
    const invalid = { ...this.invalid };
    const currentAnswer = answers[answerKey];

    const answerArray = currentAnswer.split("");
    answerArray[squareIndex] = squareValue;

    answers[answerKey] = answerArray.join("");
    this.answers = answers;

    invalid[answerKey] = this.clues[answerKey].checkAnswer();
    this.invalid = invalid;
  }

  getStyles() {
    const styles = `
      :host {
        display: block;
      }

      .puzzle {
        /* Squares per side */
        --columns: 10;
        --rows: 10;

        /* Width as a calculation of base size */
        --width: calc(var(--base-size, 1em) * 10);
        --height: var(--height, auto);

        /* Allow clue boxes to honor our puzzle grid */
        --clue-display: contents;

        /* Start column and row for this clue  */
        --column: 1;
        --row: 1;

        /* Color the puzzle */
        background: var(--primary-background);
        border: 2px solid var(--primary-background);

        /* Break puzzle into an even grid */
        display: grid;
        grid-template-columns: repeat(var(--columns), calc(var(--width) / var(--columns)));
        grid-template-rows: repeat(var(--rows), calc(var(--height) / var(--rows)));

        /* Make us a square puzzle */
        height: var(--height);
        width: var(--width);
        margin: 1rem;
      }
    `;

    return styles;
  }

  render() {
    const styles = {
      "--columns": "10",
      "--rows": "6",
      "--primary-background": "#000",
      "--width": "420px"
    };

    const tmpl = `
      <style>${this.getStyles()}</style>
      <p>Xword-Puzzle</p>
    `;

    // return (
    //   <div class="puzzle" style={styles}>
    //     {this.squares.map(square => (
    //       <xword-clue
    //         column={square.start.column}
    //         invalid={this.invalid[square.clue.id]}
    //         isDown={square.direction === ClueDirection.Down}
    //         length={square.clue.size}
    //         onSquareUpdate={ev => {
    //           this.validateClue(ev, square.clue.id);
    //         }}
    //         row={square.start.row}
    //         value={this.answers[square.clue.id]}
    //       ></xword-clue>
    //     ))}
    //   </div>
    // );

    this.host.innerHTML = tmpl;
  }
}

window.customElements.define('xword-puzzle', XwordPuzzle);

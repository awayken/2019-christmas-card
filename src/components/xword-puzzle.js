import { ClueDirection } from '../models/CluePosition.js';

class XwordPuzzle extends HTMLElement {
  static get observedAttributes() {
    return ['height', 'width'];
  }

  get height() {
    return this.getAttribute('height') || 50;
  }

  set height(val) {
    this.setAttribute('height', val);
  }

  get width() {
    return this.getAttribute('width') || 50;
  }

  set width(val) {
    this.setAttribute('width', val);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render();
    }
  }

  constructor() {
    super();

    this.cluePositions = [];

    this.clues = {};
    this.invalid = {};
    this.answers = {};

    this.host = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.cluePositions) {
      this.render();
    }
  }

  populate(cluePositions) {
    const answers = {};
    const invalids = {};
    const clues = {};

    for (const cluePosition of cluePositions) {
      if (cluePosition && cluePosition.clue) {
        invalids[cluePosition.clue.id] = null;
        answers[cluePosition.clue.id] = '';
        clues[cluePosition.clue.id] = cluePosition.clue;
      }
    }

    this.answers = answers;
    this.invalid = invalids;
    this.clues = clues;
    this.cluePositions = cluePositions;

    this.render();
  }

  validateClue(event, answerKey) {
    const { squareIndex, squareValue } = event.detail;
    const answers = { ...this.answers };
    const invalid = { ...this.invalid };
    const currentAnswer = answers[answerKey];

    const answerArray = currentAnswer.split('');
    answerArray[squareIndex] = squareValue;

    answers[answerKey] = answerArray.join('');
    this.answers = answers;

    invalid[answerKey] = this.clues[answerKey].checkAnswer();
    this.invalid = invalid;
  }

  static getStyles() {
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
    let tmpl = ``;

    if (this.cluePositions) {
      const styles = `
        --columns: ${this.width};
        --rows: ${this.height};
        --primary-background: #000;
        --width: 420px
      `;

      const cluePositions = this.cluePositions.reduce(
        (htmlString, square) => `
        ${htmlString}
        <xword-clue
          column="${square.start.column}"
          invalid="${this.invalid[square.clue.id]}"
          isDown="${square.direction === ClueDirection.Down}"
          length="${square.clue.size}"
          row="${square.start.row}"
          value="${this.answers[square.clue.id]}"
        ></xword-clue>
      `,
        '',
      );

      /*
              onSquareUpdate={ev => {
                this.validateClue(ev, square.clue.id);
              }}
            */

      tmpl = `
        <style>${XwordPuzzle.getStyles()}</style>
        <div class="puzzle" style="${styles}">
          ${cluePositions}
        </div>
      `;
    }

    if (this.host) this.host.innerHTML = tmpl;
  }
}

window.customElements.define('xword-puzzle', XwordPuzzle);

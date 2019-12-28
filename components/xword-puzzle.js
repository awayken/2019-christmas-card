import { LitElement, html } from 'lit-element';

import { ClueDirection } from '../models/CluePosition.js';

class XwordPuzzle extends LitElement {
  static get properties() {
    return {
      activeClue: { type: String },
      answers: { type: Object },
      cluePositions: { type: Array },
      clues: { type: Object },
      height: { type: Number },
      invalid: { type: Object },
      width: { type: Number },
    };
  }

  constructor() {
    super();

    this.activeClue = '';
    this.answers = {};
    this.clues = {};
    this.cluePositions = [];
    this.invalid = {};
  }

  updated(changedProperties) {
    if (changedProperties.has('cluePositions') && !this.activeClue) {
      this.updateComplete.then(() => {
        // Get the first clue
        const firstClue = this.shadowRoot.querySelector('xword-clue');

        if (firstClue) {
          // Focus the first clue
          firstClue.focus(); // TODO: figure out why this doesn't work
        }
      });
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
    this.cluePositions = [...cluePositions];
  }

  activateClue(event) {
    this.activeClue = event.detail.clueId;
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

    invalid[answerKey] = !this.clues[answerKey].checkAnswer();
    this.invalid = invalid;
  }

  static getStyles() {
    const styles = `
      :host {
        display: block;
      }

      .puzzle__grid {
        /* Squares per side */
        --columns: 10;
        --rows: 10;

        /* Width as a calculation of base size */
        --width: calc(var(--base-size, 1em) * 10);
        --height-calculated: var(--height, auto);

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
        grid-template-rows: repeat(var(--rows), calc(var(--height-calculated) / var(--rows)));

        /* Make us a square puzzle */
        height: var(--height-calculated);
        width: var(--width);
        margin: 1rem;
      }
    `;

    return styles;
  }

  render() {
    let tmpl = html``;

    if (this.cluePositions) {
      const styles = `
        --columns: ${this.width};
        --rows: ${this.height};
        --primary-background: #000;
        --width: 420px
      `;

      let activeQuestion = '';
      if (this.clues && this.activeClue) {
        activeQuestion = this.clues[this.activeClue].question;
      }

      tmpl = html`
        <style>
          ${XwordPuzzle.getStyles()}
        </style>
        <div class="puzzle">
          <div class="puzzle__grid" style="${styles}">
            ${this.cluePositions.map(
              square => html`
                <xword-clue
                  column="${square.start.column}"
                  ?down="${square.direction === ClueDirection.Down}"
                  @focusClue="${this.activateClue}"
                  id="${square.clue.id}"
                  ?invalid="${this.invalid[square.clue.id] || false}"
                  length="${square.clue.size}"
                  row="${square.start.row}"
                  @updateSquare="${ev => {
                    this.validateClue(ev, square.clue.id);
                  }}"
                  value="${this.answers[square.clue.id]}"
                ></xword-clue>
              `,
            )}
          </div>
          <div class="puzzle__question">${activeQuestion}</div>
        </div>
      `;
    }

    return tmpl;
  }
}

window.customElements.define('xword-puzzle', XwordPuzzle);

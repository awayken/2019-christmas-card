import { LitElement, css, html } from 'lit-element';

import './xword-grid.js';

import { ClueDirection } from '../models/CluePosition.js';

class XwordPuzzle extends LitElement {
  static get properties() {
    return {
      activeSquare: { type: Array },
      direction: { type: String },
      grid: { type: Array },
      gridHeight: { type: Number },
      gridWidth: { type: Number },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();

    this.activeSquare = [];
    this.direction = ClueDirection.Across;
    this.grid = [];
    this.gridHeight = 0;
    this.gridWidth = 0;
  }

  render() {
    return html`
      <xword-grid
        activeSquare="${JSON.stringify(this.activeSquare)}"
        direction="${this.direction}"
        height="${this.gridHeight}"
        grid="${JSON.stringify(this.grid)}"
        width="${this.gridWidth}"
        @setValue="${this.setValue}"
        @setActiveSquare="${this.setActiveSquare}"
      >
        Loading the grid...
      </xword-grid>
      <div>${this.getTitle()}</div>
    `;
  }

  getSquare(x, y) {
    const row = this.grid[y];

    if (!row) {
      return null;
    }

    return row[x];
  }

  getTitle() {
    let title = 'Select a square to play';
    const [x, y] = this.activeSquare;
    const square = this.getSquare(x, y);

    if (square) {
      title = square[this.direction] || '????';
    }

    return title;
  }

  setActiveSquare(event) {
    const { activeSquare } = event.detail;
    const [x, y] = activeSquare;
    const [oldX, oldY] = this.activeSquare;

    if (x !== null && y !== null) {
      const sameSquare = oldX === x && oldY === y;

      let previousSquare;
      let nextSquare;

      if (this.direction === ClueDirection.Across) {
        previousSquare = this.getSquare(x - 1, y);
        nextSquare = this.getSquare(x + 1, y);
      } else {
        previousSquare = this.getSquare(x, y - 1);
        nextSquare = this.getSquare(x, y + 1);
      }

      if (sameSquare || (!previousSquare && !nextSquare)) {
        this.toggleDirection();
      }
    } else {
      this.direction = ClueDirection.Across;
    }

    this.activeSquare = activeSquare;
  }

  setNextSquare() {
    const [x, y] = this.activeSquare;
    let nextActive = [x, y];

    let foundNextSquare = false;
    let switchDirection = false;
    let triedEverything = false;

    let newX = x;
    let newY = y;

    while (!foundNextSquare && !triedEverything) {
      if (this.direction === ClueDirection.Across) {
        newX += 1;
      } else {
        newY += 1;
      }

      if (newX >= this.gridWidth) {
        newX = 0;
        newY += 1;
      }

      if (newY >= this.gridHeight) {
        newX += 1;
        newY = 0;
      }

      const trySquare = this.getSquare(newX, newY);
      if (trySquare && trySquare[this.direction] && trySquare.value === '') {
        nextActive = [newX, newY];
        foundNextSquare = true;
        break;
      }

      if (newX === x && newY === y) {
        if (!switchDirection) {
          switchDirection = true;
        } else {
          triedEverything = true;
        }

        this.toggleDirection();
      }
    }

    this.activeSquare = nextActive;
  }

  setValue(event) {
    const { value } = event.detail;
    const [x, y] = this.activeSquare;
    const square = this.getSquare(x, y);
    square.value = value;

    // If we have any empty squares, go ahead and find the next one
    this.setNextSquare();
    // otherwise, solve!
  }

  setDirection(event) {
    const { direction } = event.detail;

    this.direction = direction;
  }

  toggleDirection() {
    this.direction =
      this.direction === ClueDirection.Across ? ClueDirection.Down : ClueDirection.Across;
  }

  buildGrid(clues) {
    const [rauschwordClue, puzzleClue] = clues;

    // build answer grid

    const grid = [
      [
        null,
        null,
        {
          down: puzzleClue.clue.question,
          value: '',
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          down: puzzleClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
        {
          across: rauschwordClue.clue.question,
          value: '',
        },
      ],
      [
        null,
        null,
        {
          down: puzzleClue.clue.question,
          value: '',
        },
      ],
      [
        null,
        null,
        {
          down: puzzleClue.clue.question,
          value: '',
        },
      ],
      [
        null,
        null,
        {
          down: puzzleClue.clue.question,
          value: '',
        },
      ],
      [
        null,
        null,
        {
          down: puzzleClue.clue.question,
          value: '',
        },
      ],
    ];

    this.grid = grid;
    this.gridHeight = this.grid.length;
    this.gridWidth = this.grid[0].length;
  }
}

window.customElements.define('xword-puzzle', XwordPuzzle);

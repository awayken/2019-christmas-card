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
        @updateActiveSquare="${this.setActiveSquare}"
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
    let title = '';
    const [x, y] = this.activeSquare;

    if (x && y) {
      const square = this.getSquare(x, y);
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

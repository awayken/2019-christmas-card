import { LitElement, css, html } from 'lit-element';

import './xword-grid.js';

import { ClueDirection } from '../models/Clue.js';

class XwordPuzzle extends LitElement {
  static get properties() {
    return {
      activeSquare: { type: Array },
      direction: { type: String },
      grid: { type: Array },
      gridHeight: { type: Number },
      gridWidth: { type: Number },
      isWinner: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }

      xword-grid {
        max-width: 100%;
        overflow: auto;
      }

      .puzzle__title {
        background: #cfd9dfee;
        top: 0;
        padding: 0.5em;
        position: -webkit-sticky;
        position: sticky;
        z-index: 10;
      }
    `;
  }

  constructor() {
    super();

    this.activeSquare = [];
    this.direction = ClueDirection.Across;
    this.grid = [];
    this.gridAnswers = [];
    this.gridHeight = 0;
    this.gridWidth = 0;
    this.isWinner = false;
  }

  render() {
    let title = this.getTitle();

    if (this.isWinner) {
      title = 'You solved the puzzle!';
    }

    return html`
      <div class="puzzle__title">${title}</div>
      <xword-grid
        activeSquare="${JSON.stringify(this.activeSquare)}"
        direction="${this.direction}"
        height="${this.gridHeight}"
        ?isWinner="${this.isWinner}"
        grid="${JSON.stringify(this.grid)}"
        width="${this.gridWidth}"
        @moveNext="${() => {
          this.setNextSquare();
        }}"
        @movePrevious="${() => {
          this.setPrevSquare();
        }}"
        @setValue="${this.setValue}"
        @setActiveSquare="${this.setActiveSquare}"
        @toggleDirection="${this.toggleDirection}"
      >
        Loading the grid...
      </xword-grid>
    `;
  }

  getSquare(x, y, grid = this.grid) {
    const row = grid[y];

    if (!row) {
      return null;
    }

    return row[x];
  }

  getTitle() {
    let title = 'Select a square to start playing.';
    const [x, y] = this.activeSquare;
    const square = this.getSquare(x, y);

    if (square) {
      const squareDirection = square[this.direction];

      if (squareDirection) {
        title = `Clue: ${squareDirection}`;
      } else {
        this.toggleDirection();
        title = this.getTitle();
      }
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

  setPrevSquare() {
    return this.setNextSquare(-1);
  }

  setNextSquare(moveBy = 1) {
    const [x, y] = this.activeSquare;
    let nextActive = [x, y];

    let foundNextSquare = false;
    let switchDirection = false;
    let triedEverything = false;

    const totalTries = this.gridHeight * this.gridWidth;
    let tries = 1;

    let newX = x;
    let newY = y;

    while (!foundNextSquare && !triedEverything && tries <= totalTries) {
      if (this.direction === ClueDirection.Across) {
        newX += moveBy;
      } else {
        newY += moveBy;
      }

      if (newX >= this.gridWidth) {
        newX = 0;
        newY += moveBy;
      }

      if (newX < 0) {
        newX = this.gridWidth - 1;
        newY += moveBy;
      }

      if (newY >= this.gridHeight) {
        newX += moveBy;
        newY = 0;
      }

      if (newY < 0) {
        newX += moveBy;
        newY = this.gridHeight - 1;
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

      tries += 1;
    }

    this.activeSquare = nextActive;

    return triedEverything;
  }

  setValue(event) {
    const { value } = event.detail;
    const [x, y] = this.activeSquare;
    const square = this.getSquare(x, y);
    const oldValue = square.value;

    // Set square's value
    square.value = value;

    // If our square was empty and we send another empty
    if (!value.length && !oldValue.length) {
      // move back and delete that square
    }

    // If we have an value
    if (value.length) {
      // Find next square and check for empties
      const hasNoEmptySquares = this.setNextSquare();

      // If our puzzle is filled
      if (hasNoEmptySquares) {
        // Check puzzle validity
        const isValid = this.checkValues();

        // Declare a winner
        if (isValid) {
          this.isWinner = true;
        }
      }
    }
  }

  checkValue(x, y) {
    const square = this.getSquare(x, y);
    const answer = this.getSquare(x, y, this.gridAnswers);

    if (square) {
      const squareValid = square.value.toLowerCase() === answer.toLowerCase();
      square.isValid = squareValid;

      return squareValid;
    }

    return true;
  }

  checkValues() {
    for (let y = 0; y < this.gridHeight; y += 1) {
      for (let x = 0; x < this.gridWidth; x += 1) {
        const squareValid = this.checkValue(x, y);

        if (!squareValid) {
          return false;
        }
      }
    }

    return true;
  }

  setDirection(event) {
    const { direction } = event.detail;

    this.direction = direction;
  }

  toggleDirection() {
    this.direction =
      this.direction === ClueDirection.Across ? ClueDirection.Down : ClueDirection.Across;
  }

  activateGrid() {
    this.activeSquare = [0, 0];
    const firstSquare = this.getSquare(0, 0);
    if (!firstSquare) {
      this.setNextSquare();
    }
  }
}

window.customElements.define('xword-puzzle', XwordPuzzle);

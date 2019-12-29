import { LitElement, css, html } from 'lit-element';

import { ClueDirection } from '../models/CluePosition.js';

class XwordGrid extends LitElement {
  static get properties() {
    return {
      activeSquare: { type: Array },
      direction: { type: String },
      grid: { type: Array },
      height: { type: Number },
      width: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .puzzle__grid {
        /* Squares per side */
        --columns: 10;
        --rows: 10;

        --base-size: 1.1em;

        /* Width as a calculation of base size */
        --square-size: calc(var(--base-size) * 2);
        --width: calc(var(--square-size) * var(--columns));
        --height: calc(var(--square-size) * var(--rows));

        /* Color the puzzle */
        background: var(--primary-background);
        border: 2px solid var(--primary-background);

        /* Break puzzle into an even grid */
        display: grid;
        grid-template-columns: repeat(var(--columns), calc(100% / var(--columns)));
        grid-template-rows: repeat(var(--rows), calc(100% / var(--rows)));

        /* Make us a square puzzle */
        height: var(--height);
        width: var(--width);
        margin: 1rem auto;
        max-width: 100%;
      }

      @media (min-width: 30em) {
        .puzzle__grid {
          --base-size: 2em;
        }
      }

      .clue__box {
        /* Reset input styles */
        -webkit-appearance: none;
        appearance: none;
        box-sizing: border-box;
        font-family: inherit;
        font-size: var(--base-size, 100%);
        margin: 0;

        /* Color the box */
        background: var(--secondary-background, white);
        border: 1px solid currentColor;
        color: var(--primary-background);

        /* Style the text */
        text-align: center;
        text-transform: uppercase;
      }

      .clue__box:focus {
        /* Color the active clue box specifically */
        background: hsl(220, 100%, 90%);
        outline: 0;
      }

      .clue__box--invalid {
        /* What does it look like when we're wrong? */
        --primary-background: hsl(10, 100%, 65%);
      }

      .clue__box--active {
        /* Color all the clue boxes in this active clue */
        background: cornsilk;
      }
    `;
  }

  constructor() {
    super();

    this.activeSquare = [];
    this.direction = ClueDirection.Across;
    this.grid = [];
  }

  render() {
    let gridHtml = '';

    if (this.grid.length) {
      gridHtml = this.renderGrid();
    }

    const styles = `
      --columns: ${this.width}; --rows: ${this.height}; --primary-background: #000;
    `;

    return html`
      <div class="puzzle__grid" style="${styles}">
        ${gridHtml}
      </div>
    `;
  }

  buildGrid(grid) {
    this.grid = grid;
  }

  blurGrid() {
    this.activeSquare = [];
    this.direction = ClueDirection.Across;
  }

  renderGrid() {
    let gridHtml = '';

    for (let i = 0; i < this.height; i += 1) {
      const gridRow = this.grid[i] || [];

      for (let j = 0; j < this.width; j += 1) {
        const gridItem = gridRow[j];

        if (gridItem) {
          let className = 'clue__box';

          // if (this.invalid) {
          //   className += ' clue--invalid';
          // }

          if (this.isActiveSquare(j, i)) {
            className += ' clue__box--active';
          }

          gridHtml = html`
            ${gridHtml}
            <input
              @blur="${this.blurGrid}"
              class="${className}"
              @click="${() => {
                this.setActiveSquare(j, i);
              }}"
              maxlength="1"
              .value="${gridItem.value || ''}"
            />
          `;
        } else {
          gridHtml = html`
            ${gridHtml}
            <span></span>
          `;
        }
      }
    }

    return gridHtml;
  }

  toggleDirection() {
    if (this.direction === ClueDirection.Across) {
      this.direction = ClueDirection.Down;
    } else {
      this.direction = ClueDirection.Across;
    }
  }

  isActiveSquare(x, y) {
    const activeRow = this.direction === ClueDirection.Across && y === this.activeSquare[1];
    const activeColumn = this.direction === ClueDirection.Down && x === this.activeSquare[0];

    return activeRow || activeColumn;
  }

  getSquare(x, y) {
    const row = this.grid[y];

    if (!row) {
      return null;
    }

    return row[x];
  }

  setActiveSquare(x, y) {
    const [oldX, oldY] = this.activeSquare;
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

    this.activeSquare = [x, y];
  }
}

window.customElements.define('xword-grid', XwordGrid);

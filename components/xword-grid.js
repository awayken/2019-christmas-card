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
        --square-size: 40px;

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

      .clue__box {
        /* Reset input styles */
        -webkit-appearance: none;
        appearance: none;
        box-sizing: border-box;
        font-family: inherit;
        font-size: 100%;
        margin: 0;

        /* Color the box */
        background: var(--secondary-background, white);
        border: 1px solid currentColor;
        color: var(--primary-background);

        /* Style the text */
        text-align: center;
        text-transform: uppercase;

        min-height: var(--square-size, auto);
        min-width: var(--square-size, auto);
      }

      .clue__box:focus {
        /* Color the active clue box specifically */
        background: hsl(220, 100%, 90%);
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
      for (let i = 0; i < this.height; i += 1) {
        const gridRow = this.grid[i] || [];

        for (let j = 0; j < this.width; j += 1) {
          const gridItem = gridRow[j];

          if (gridItem) {
            let className = 'clue__box';

            // if (this.invalid) {
            //   className += ' clue--invalid';
            // }

            const activeRow = this.direction === ClueDirection.Across && j === this.activeSquare[0];
            const activeColumn =
              this.direction === ClueDirection.Down && i === this.activeSquare[1];

            if (activeRow || activeColumn) {
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
    }

    const styles = `
      --columns: ${this.width}; --rows: ${this.height}; --primary-background: #000; --width: 420px;
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

  toggleDirection() {
    if (this.direction === ClueDirection.Across) {
      this.direction = ClueDirection.Down;
    } else {
      this.direction = ClueDirection.Across;
    }
  }

  blurGrid() {
    this.activeSquare = [];
    this.direction = ClueDirection.Across;
  }

  setActiveSquare(x, y) {
    const [oldX, oldY] = this.activeSquare;

    if (oldX === x && oldY === y) {
      this.toggleDirection();
    }

    this.activeSquare = [x, y];
  }
}

window.customElements.define('xword-grid', XwordGrid);

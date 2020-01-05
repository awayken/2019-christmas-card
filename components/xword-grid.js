import { LitElement, css, html } from 'lit-element';

class XwordGrid extends LitElement {
  static get properties() {
    return {
      activeSquare: { type: Array },
      direction: { type: String, reflect: false },
      grid: { type: Array },
      height: { type: Number },
      isWinner: { type: Boolean },
      width: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        box-sizing: border-box;
        display: block;
        margin: 4px;
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
        background: var(--primary-background, #000);
        border: 2px solid var(--primary-background, #000);
        border-radius: 0.35em;

        /* Break puzzle into an even grid */
        display: grid;
        grid-template-columns: repeat(var(--columns), calc(100% / var(--columns)));
        grid-template-rows: repeat(var(--rows), calc(100% / var(--rows)));

        /* Make us a square puzzle */
        height: var(--height);
        width: var(--width);
        margin: 0 auto;
      }

      @media (min-width: 30em) {
        .puzzle__grid {
          --base-size: 1.5em;
        }
      }

      .clue__box {
        /* Reset input styles */
        -webkit-appearance: none;
        appearance: none;
        box-sizing: border-box;
        caret-color: var(--secondary-background, #fff);
        font-size: var(--base-size, 100%);
        line-height: 1.85;
        margin: 0;

        /* Color the box */
        background: var(--secondary-background, #fff);
        border: 1px solid currentColor;
        color: var(--primary-background);

        /* Style the text */
        text-align: center;
        text-transform: uppercase;
      }

      .clue__box:focus {
        outline: 0;
      }

      .clue__box--active {
        --secondary-background: hsl(40, 100%, 75%);
      }

      .clue__box--focus {
        --secondary-background: hsl(220, 100%, 75%);
      }

      .clue__box--invalid,
      .clue__box:invalid {
        --primary-background: hsl(0, 100%, 50%);
      }
    `;
  }

  constructor() {
    super();

    this.activeSquare = [];
    this.grid = [];
    this.isWinner = false;
  }

  render() {
    let gridHtml = '';

    if (this.grid.length) {
      gridHtml = this.renderGrid();
    }

    const styles = `
      --columns: ${this.width}; --rows: ${this.height}; --primary-background: ${
      this.isWinner ? 'green' : 'black'
    };
    `;

    return html`
      <div class="puzzle__grid" style="${styles}">
        ${gridHtml}
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('activeSquare')) {
      const activeSquare = this.shadowRoot.querySelector('.clue__box--focus');
      if (activeSquare) {
        activeSquare.focus();
      }
    }
  }

  blurGrid() {
    this.dispatchEvent(
      new CustomEvent('setActiveSquare', {
        detail: {
          activeSquare: [],
        },
      }),
    );
  }

  renderGrid() {
    let gridHtml = '';

    for (let i = 0; i < this.height; i += 1) {
      const gridRow = this.grid[i] || [];

      for (let j = 0; j < this.width; j += 1) {
        const gridItem = gridRow[j];

        if (gridItem) {
          let className = 'clue__box';

          if (!gridItem.isValid) {
            className += ' clue__box--invalid';
          }

          if (this.isActiveClue(gridItem)) {
            className += ' clue__box--active';
          }

          if (this.isActiveSquare(j, i)) {
            className += ' clue__box--focus';
          }

          gridHtml = html`
            ${gridHtml}
            <input
              autocomplete="off"
              class="${className}"
              @click="${e => {
                e.target.select();
                this.setActiveSquare(j, i);
              }}"
              @input="${e => {
                this.setValue({
                  key: e.data,
                });

                e.target.value = '';
              }}"
              @keyup="${e => {
                this.handleKey(e);
              }}"
              pattern="^[a-zA-Z]$"
              tabindex="-1"
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

  isActiveClue(gridItem) {
    const [x, y] = this.activeSquare;
    const activeItem = (this.grid[y] || [])[x];
    const directionId = `${this.direction}id`;

    if (activeItem && activeItem[directionId] && gridItem && gridItem[directionId]) {
      return activeItem[directionId] === gridItem[directionId];
    }

    return false;
  }

  isActiveSquare(x, y) {
    return y === this.activeSquare[1] && x === this.activeSquare[0];
  }

  setActiveSquare(x, y) {
    this.dispatchEvent(
      new CustomEvent('setActiveSquare', {
        detail: {
          activeSquare: [x, y],
        },
      }),
    );
  }

  setValue(event) {
    const allowedKeys = /^[a-zA-Z]$/;
    const { key } = event;

    if (allowedKeys.test(key)) {
      this.dispatchEvent(
        new CustomEvent('setValue', {
          detail: {
            value: key,
          },
        }),
      );
    }
  }

  handleKey(event) {
    const { code } = event;

    if (code === 'Backspace') {
      this.dispatchEvent(
        new CustomEvent('setValue', {
          detail: {
            value: '',
          },
        }),
      );
    }

    if (code === 'Space') {
      this.dispatchEvent(new CustomEvent('toggleDirection'));
    }
  }
}

window.customElements.define('xword-grid', XwordGrid);

class XwordClue extends HTMLElement {
  static get observedAttributes() {
    return ['column', 'invalid', 'isDown', 'length', 'row', 'squareSize', 'value'];
  }

  get column() {
    return this.getAttribute('column') || 1;
  }

  set column(val) {
    this.setAttribute('column', val);
  }

  get invalid() {
    return this.getAttribute('invalid') || false;
  }

  set invalid(val) {
    this.setAttribute('invalid', val);
  }

  get isDown() {
    return this.getAttribute('isDown') || false;
  }

  set isDown(val) {
    this.setAttribute('isDown', val);
  }

  get length() {
    return this.getAttribute('length');
  }

  set length(val) {
    this.setAttribute('length', val);
  }

  get row() {
    return this.getAttribute('row') || 1;
  }

  set row(val) {
    this.setAttribute('row', val);
  }

  get squareSize() {
    return this.getAttribute('squareSize') || 40;
  }

  set squareSize(val) {
    this.setAttribute('squareSize', val);
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render();
    }
  }

  constructor() {
    super();

    this.squares = [];

    if (!this.squareUpdate) {
      this.squareUpdate = function noop() {};
    }

    this.host = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  nextSquare(target, currentIndex) {
    if (this.value.length === this.length) {
      // next clue
    }

    let nextIndex = currentIndex + 1;

    if (nextIndex >= this.length) {
      nextIndex = 0;
    }

    this.squares[currentIndex].value = target.value;
    this.squares[nextIndex].focus();
  }

  static getStyles() {
    const styles = `
      :host {
        /* Display for puzzle or fallback to flexbox */
        display: var(--clue-display, block);

        /* Reset our font. Not sure if this is necessary */
        font-size: 16px;
      }

      .clue {
        /* Display for puzzle or fallback to flexbox */
        display: var(--clue-display, flex);

        /* Fallback styles when clue is on its own */
        background: var(--primary-background, black);
        border: 1px solid currentColor;
        color: var(--primary-background);
        font-size: var(--base-size);
        height: auto;
        margin: 1rem;
        width: fit-content;
      }

      .clue:focus-within .clue__box {
        /* Color all the clue boxes in this active clue */
        background: cornsilk;

        /* Raise this clue above any overlapping clues */
        z-index: 10;
      }

      .clue__box:focus,
      .clue:focus-within .clue__box:focus {
        /* Color the active clue box specifically */
        background: hsl(220, 100%, 90%);
      }

      .clue--across {
        /* Fallback styles when clue is on its own */
        flex-direction: row;
      }

      .clue--down {
        /* Fallback styles when clue is on its own */
        flex-direction: column;
      }

      .clue--invalid {
        /* What does it look like when we're wrong? */
        --primary-background: hsl(10, 100%, 65%);
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

        /* Place the box in the grid */
        grid-column-start: var(--column);
        grid-row-start: var(--row);
        position: relative;
        z-index: 1;

        /* Style the text */
        text-align: center;
        text-transform: uppercase;

        /* Fallback styles when clue is on its own */
        min-height: var(--square-size, auto);
        min-width: var(--square-size, auto);
      }

      /* Clue / Puzzle alignments */
      .clue--across .clue__box:nth-child(2) {
        grid-column-start: calc(var(--column) + 1);
      }

      .clue--across .clue__box:nth-child(3) {
        grid-column-start: calc(var(--column) + 2);
      }

      .clue--across .clue__box:nth-child(4) {
        grid-column-start: calc(var(--column) + 3);
      }

      .clue--across .clue__box:nth-child(5) {
        grid-column-start: calc(var(--column) + 4);
      }

      .clue--across .clue__box:nth-child(6) {
        grid-column-start: calc(var(--column) + 5);
      }

      .clue--across .clue__box:nth-child(7) {
        grid-column-start: calc(var(--column) + 6);
      }

      .clue--across .clue__box:nth-child(8) {
        grid-column-start: calc(var(--column) + 7);
      }

      .clue--across .clue__box:nth-child(9) {
        grid-column-start: calc(var(--column) + 8);
      }

      .clue--across .clue__box:nth-child(10) {
        grid-column-start: calc(var(--column) + 9);
      }

      .clue--down .clue__box:nth-child(2) {
        grid-row-start: calc(var(--row) + 1);
      }

      .clue--down .clue__box:nth-child(3) {
        grid-row-start: calc(var(--row) + 2);
      }

      .clue--down .clue__box:nth-child(4) {
        grid-row-start: calc(var(--row) + 3);
      }

      .clue--down .clue__box:nth-child(5) {
        grid-row-start: calc(var(--row) + 4);
      }

      .clue--down .clue__box:nth-child(6) {
        grid-row-start: calc(var(--row) + 5);
      }

      .clue--down .clue__box:nth-child(7) {
        grid-row-start: calc(var(--row) + 6);
      }

      .clue--down .clue__box:nth-child(8) {
        grid-row-start: calc(var(--row) + 7);
      }

      .clue--down .clue__box:nth-child(9) {
        grid-row-start: calc(var(--row) + 8);
      }

      .clue--down .clue__box:nth-child(10) {
        grid-row-start: calc(var(--row) + 9);
      }
    `;

    return styles;
  }

  getSquares() {
    this.squares = [];
    const values = this.value.split('') || [];

    for (let i = 0; i < this.length; i += 1) {
      this.squares.push(`
        <input
          class="clue__box"
          maxlength="1"
          value="${values[i] || ''}"
        />
      `);
      /*
onKeyUp={e => {
  if (this.squareUpdate && e.key.length === 1) {
    this.squareUpdate({
      squareIndex: i,
      squareValue: e.key,
    });
  }

  this.nextSquare(e.currentTarget, i);
}}
*/
    }

    return this.squares.join('');
  }

  render() {
    const fontSize = this.squareSize / 30;

    const styleRules = `
      --column: ${this.column || 1};
      --row: ${this.row || 1};
      --square-size: ${this.squareSize}px;

      font-size: ${fontSize}em
    `;

    if (Number(this.length) !== 0) {
      let className = 'clue';

      if (this.isDown) {
        className += ' clue--down';
      } else {
        className += ' clue--across';
      }

      if (this.invalid) {
        className += ' clue--invalid';
      }

      const tmpl = `
        <style>${XwordClue.getStyles()}</style>
        <div class="${className}" style="${styleRules}">
        ${this.getSquares()}
        </div>
      `;

      this.host.innerHTML = tmpl;
    }
  }
}

window.customElements.define('xword-clue', XwordClue);

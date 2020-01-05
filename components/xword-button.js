import { LitElement, css, html } from 'lit-element';

class XwordButton extends LitElement {
  static get properties() {
    return {
      type: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .btn {
        appearance: none;
        -webkit-appearance: none;
        background: var(--bg-color, #fff);
        border: 2px solid #000;
        border-radius: 0.35em;
        display: inline-block;
        font-size: 100%;
        letter-spacing: 0.5ch;
        padding: 0.5ch 0 0.5ch 0.5ch;
        text-transform: uppercase;
      }

      .btn:hover,
      .btn:focus {
        --bg-color: hsl(40, 100%, 75%);
      }

      .btn:active {
        --bg-color: hsl(220, 100%, 75%);
      }

      .btn--solo {
        display: block;
        margin: 1em auto;
        width: fit-content;
      }
    `;
  }

  render() {
    let className = 'btn';

    if (this.type === 'solo') {
      className += ' btn--solo';
    }

    return html`
      <button class="${className}" @click="${this.handleClick}">
        <slot></slot>
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new Event('click'));
  }
}

window.customElements.define('xword-button', XwordButton);

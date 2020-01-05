import { LitElement, css, html } from 'lit-element';

import './xword-button.js';

class XwordModal extends LitElement {
  static get properties() {
    return {
      activeSquare: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        align-items: center;
        background: rgba(0, 0, 0, 0.95);
        bottom: 0;
        display: flex;
        left: 0;
        justify-content: center;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 100;
      }

      .modal__content {
        background: #fff;
        border-radius: 0.35em;
        padding: 0.5em;
        max-width: 90%;
        min-width: 50%;
      }

      .modal__close {
        float: right;
        margin-bottom: 0.5em;
      }

      .modal__children {
        clear: right;
      }
    `;
  }

  render() {
    return html`
      <aside class="modal__content">
        <xword-button class="modal__close" @click="${this.handleClose}" title="Close this modal"
          >X</xword-button
        >

        <div class="modal__children">
          <slot></slot>
        </div>
      </aside>
    `;
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }
}

window.customElements.define('xword-modal', XwordModal);

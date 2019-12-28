import { LitElement, html } from 'lit-element';

class XwordPanel extends LitElement {
  render() {
    return html`
      <p>A paragraph</p>
    `;
  }
}

customElements.define('xword-panel', XwordPanel);

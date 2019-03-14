/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


// Import LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

export class StartLitElement extends LitElement {
  /**
   * Define properties. Properties defined here will be automatically 
   * observed.
   */
  static get properties() {
    return {
      message: { type: String },
      likesPie: { type: Boolean }
    };
  }

  /**  
   * In the element constructor, assign default property values.
   */
  constructor() {
    // Must call superconstructor first.
    super();

    // Initialize properties
    this.loadComplete = false;
    this.message = 'Hello World from LitElement (template)';
    this.likesPie = false;
  }

  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>

      <h1>Start LitElement! (from template)</h1>
      <p>${this.message}</p>

      <input name="myinput" id="myinput" 
        type="checkbox"
        ?checked="${this.likesPie}"
        @change="${this.togglePie}">

      <label for="myinput">I like pie.</label>
      
      ${this.likesPie ? html`<lazy-element message="pie"></lazy-element>` : html``}
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work on first update:
   * - Call a method to load the lazy element if necessary
   * - Focus the checkbox
   */
  firstUpdated() {
    this.loadLazy();

    const myInput = this.shadowRoot.getElementById('myinput');
    myInput.focus();
  }

  /**
   * Event handler. Gets called whenever the checkbox fires a `change` event.
   * - Toggle whether to display <lazy-element>
   * - Call a method to load the lazy element if necessary
   */
  togglePie(e) {
    this.likesPie = !this.likesPie;
    this.loadLazy();
  }

  /**
   * If we need the lazy element && it hasn't already been loaded, 
   * load it and remember that we loaded it.
   */
  async loadLazy() {
    console.log('loadLazy');

    if (this.likesPie && !this.loadComplete) {
      this.loadComplete = true;
      
      return import('./lazy-element.js').then((LazyElement) => {
        console.log("LazyElement loaded");
      }).catch((reason) => {
        console.log("LazyElement failed to load", reason);
      });
    }
  }
}

// Register the element with the browser
customElements.define('start-lit-element', StartLitElement);

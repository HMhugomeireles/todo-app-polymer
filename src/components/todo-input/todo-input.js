import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';

import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

class Input extends PolymerElement {
  static get is() {
    return 'todo-input'
  }

  static get properties () {
    return {
      value: {
        type: String,
        value: ''
      }
    };
  }

  constructor() {
    super();
    setPassiveTouchGestures(true);
  }

  static get template () {
    return html/*html*/`
        <style>
          fieldset {
            position: relative;
            margin: 0;
            border: 0;
            padding: 0;  
          }

          input {
            padding: 10px;
            font-size: 1.5rem;
            border-radius: 12px;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            border: none;
            box-shadow: 0px 2px 5px #090d11;
          }
        </style>

  
        <fieldset>
            <input 
              type="text" 
              name="item" 
              placeholder="Insert new todo" 
              on-keyup="_handleKepUp"
              autocomplete="off"
            />
        </fieldset>
  
    `;
  }

  _handleKepUp(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      window.dispatchEvent(
        new CustomEvent('addItem', {
            detail: {
              newItem: e.target.value
            }
          })
        );
      e.target.value = ''
    }
  }

}

// Register the element with the browser.
customElements.define(Input.is, Input);
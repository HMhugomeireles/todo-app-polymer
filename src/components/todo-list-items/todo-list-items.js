import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

class ListItems extends PolymerElement {
  static get is() {
    return 'todo-list-items'
  }

  static get properties () {
    return {
      dataItems: Array
    };
  }

  constructor() {
    super();
    setPassiveTouchGestures(true); 
    this.getCheckboxValue = this.getCheckboxValue.bind(this)
  }

  ready(){
    super.ready();
  }

  static get template () {
    return html/*html*/`
        <style>
            ul {
              margin: 0;
              padding: 0;
              margin: 15px 0;
              list-style: none;
            }
            li {
              margin: 0;
              padding: 20px;
              margin: 10px;
              background: #3E5C74;
              color: #fff;
              font-family: Arial;
              font-size: 1.4rem;

              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            label {
              display: flex;
              align-items: center;
            }

            .actions {
              background: #202F3B;
              display: none;
              opacity: 0;
              transition: .3s ease-in;
            }

            li:hover .actions {
              display: flex;
              opacity: 1;
            }

            .action {
              padding: 5px;
              font-size: 1rem;
              font-weight: bold;
              cursor: pointer;
            }

            .delete {
              background: red;
              color: #fff;
            }

            .edit {
              color: #333;
              background: yellow;
            }

            .checkbox {
              width: 25px;
              height: 25px;
              margin-right: 15px;
              border: 2px solid #202F3B;
              border-radius: 5px;
              background: #fff;
            }

            .icon-checked {
              content: '&#10004;'
            }
        </style>

        <ul >
          <template is="dom-repeat" items="[[dataItems]]" as="item">
              <li data-id="[[item.id]]" on-click="handleUpdate">
                <label for="[[item.label]]" >
                  <div class="checkbox ">
                    <div is="dom-if">&#10004;</div>
                    [[getCheckboxValue(item)]]
                  </div>
                  [[item.label]]
                </label>
                <div class="actions">
                  <span class="action delete" on-click="handleDelete">Del</span>
                </div>
              </li>
          </template>
        </ul>
    `;
  }

  handleDelete(e) {
    window.dispatchEvent(
      new CustomEvent('removeItem', {
          detail: {
            idToDelete: e.model.__data.index
          }
        })
      );
  }

  handleUpdate(e) {
    console.log("Click", e)
    window.dispatchEvent(
      new CustomEvent('updateItem', {
          detail: {
            itemId: e.model.__data.index
          }
        })
      );
  }

  getCheckboxValue(itemState) {
    return `\\&#10004;`
  }
}

// Register the element with the browser.
customElements.define(ListItems.is, ListItems);
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';

import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

import './components/todo-input/todo-input'
import './components/todo-list-items/todo-list-items'

import InitialTodosItems from './mock/MockTodos'

class App extends PolymerElement {

  static get is() {
    return 'app-start'
  }

  static get properties () {
    return {
      todosItems: {
        type: Array,
        value: []
      }
    };
  }

  constructor() {
    
    super();
    setPassiveTouchGestures(true);

    this.todosItems = InitialTodosItems;
    this.isShowMessageInfo = false;
    this.isTodosEmpty = this.isTodosEmpty.bind(this);
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  ready(){
    window.addEventListener('addItem', (e) => {
      this.handleNewTodo(e.detail.newItem)
      //console.log(e)
    })
    window.addEventListener('removeItem', (e) => {
      this.handleDeleteTodo(e.detail.idToDelete)
      //console.log(e)
    })
    window.addEventListener('updateItem', (e) => {
      this.handleUpdate(e.detail.itemId)
      //console.log(e)
    })
    super.ready();
  }

  static get template () {
    return html/*html*/`
      <style>
        :host {
          display: flex;
          justify-content: center;
          flex-direction: column;
        }

        h1 {
          text-align: center;
          font-size: 1.6rem;
        }

        section {
          background: #32485a;
          color: #333;
          margin: 20px;
          border-radius: 12px;
          box-shadow: 0px 2px 5px #090d11;

        }

        .message-info {
          font-size: .9rem;
          padding: 10px;
          margin: 10px;
          color: #7EC3D4;
          text-align: center;
        }
      </style>

      <h1>Todo app - Polymer 3.0</h1>
      <section>
        
        <todo-input></todo-input>

        <todo-list-items data-items="[[todosItems]]"></todo-list-items>

        <template is="dom-if" if="[[isTodosEmpty()]]">
          <div class="message-info" >
            You don't have Todos
          </div>
        </template>

      </section>
      
    `;
  }

  handleNewTodo(item) {
    console.log("New todo item ->", item)
    const newItem = {
      id: this.todosItems.length - 1,
      label: item,
      isDone: false
    }
    this.todosItems = [...this.todosItems, newItem]
  }

  handleDeleteTodo(id) {
    console.log("Delete todo Id ->", id)
    this.todosItems = this.todosItems.filter(item => item.id !== id)
  }

  isTodosEmpty() {
    if (this.todosItems.length === 0) return true
    return false;
  }

  handleUpdate(id) {
    console.log("Update item id -> ", id)
    this.todosItems[id].isDone = !this.todosItems[id].isDone 
    console.log(this.todosItems)
  }

}

// Register the element with the browser.
customElements.define(App.is, App);
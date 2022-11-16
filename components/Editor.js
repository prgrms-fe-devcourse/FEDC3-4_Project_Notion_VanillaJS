import { CLASS_NAME } from "../util/constants.js";

export default function Editor({ $target, initialState, onEdit }) {
  this.$element = document.createElement('form');
  this.$element.className = CLASS_NAME.EDITOR
  this.$element.innerHTML = `
    <div class="${CLASS_NAME.DOCUMENT_TITLE}" name="title" contenteditable="true" placeholder="Untitled"></div>
    <div class="${CLASS_NAME.DOCUMENT_CONTENT}" name="content" contenteditable="true" placeholder="Empty Content"></div>
  `;

  $target.appendChild(this.$element);

  this.state = initialState;

  this.setState = (nextState) => {
    if (this.state.id === nextState.id) return;
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const { id, title, content } = this.state;
    if (!id) {
      $element.classList.add('hidden');
      return;
    }
    this.$element.classList.remove('hidden')
    this.$element.querySelector('[name=title]').innerText = title;
    this.$element.querySelector('[name=content]').innerText = content;
  };

  this.$element.addEventListener('focusout', (e) => {
    editDocument(e)
  });

  this.$element.querySelector('.document-title').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });

  this.$element.querySelector('.document-title').addEventListener('focusin', (e) => {
    e.target.innerText = e.target.innerText.replaceAll('\n', '');
  });

  this.$element.addEventListener('keyup', (e) => {
    editDocument(e)
  });

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  const editDocument = (e) => {
    const name = e.target.className.replace('document-', '');
    if (this.state[name] === undefined) return;
    const document = {};
    document[name] = e.target.innerText;
    onEdit(document, e.key)
  };
}
export default function Editor({ $target, initialState, onEdit }) {
  const $element = document.createElement('form');
  $element.className = 'editor hidden'
  $element.innerHTML = `
    <div class="document-title" name="title" contenteditable="true" placeholder="Untitled"></div>
    <div class="document-content" name="content" contenteditable="true" placeholder="Empty Content"></div>
  `

  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    if (this.state.id === nextState.id) return;
    this.state = nextState;
    this.render();
  }

  $element.addEventListener('focusout', (e) => {
    editDocument(e)
  });

  $element.querySelector('.document-title').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });

  $element.querySelector('.document-title').addEventListener('focusin', (e) => {
    e.target.innerText = e.target.innerText.replaceAll('\n', '');
  });

  $element.addEventListener('keyup', (e) => {
    editDocument(e)
  });

  $element.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  const editDocument = (e) => {
    const name = e.target.className.replace('document-', '');
    if (this.state[name] === undefined) return;
    const document = {};
    document[name] = e.target.innerText;
    onEdit(document, e.key)
  }

  this.render = () => {
    const { id, title, content } = this.state;
    if (!id) {
      $element.classList.add('hidden');
      return;
    }
    $element.classList.remove('hidden')
    $element.querySelector('[name=title]').innerText = title;
    $element.querySelector('[name=content]').innerText = content;
  }
}
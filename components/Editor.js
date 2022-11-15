export default function Editor({ $target, initialState, onEdit }) {
  const $element = document.createElement('form');
  $element.className = 'editor hidden'
  $element.innerHTML = `
      <input class="document-title" type="text" name="title" placeholder="Untitled">
      <textarea class="document-content" name="content"></textarea>
  `;

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

  $element.addEventListener('keyup', (e) => {
    editDocument(e)
  });

  $element.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  const editDocument = (e) => {
    const { name } = e.target;
    if (this.state[name] === undefined) return;
    const document = {};
    document[name] = e.target.value;
    onEdit(document, e.key)
  }

  this.render = () => {
    const { id, title, content } = this.state;
    if (!id) {
      $element.classList.add('hidden');
      return;
    }
    $element.classList.remove('hidden')
    $element.querySelector('[name=title]').value = title;
    $element.querySelector('[name=content]').value = content;
  }
}
export default function Editor({ $target, initialState, onKeyup }) {
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

  $element.addEventListener('keyup', (e) => {
    const { name } = e.target;
    if (this.state[name] !== undefined) {
      const document = { ...this.state };
      document[name] = e.target.value;
      onKeyup(document, e.key)
    }
  });

  $element.addEventListener('submit', (e) => {
    e.preventDefault();
  });

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
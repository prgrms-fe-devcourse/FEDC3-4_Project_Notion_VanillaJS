export default function DocumentEdit({ $target, initialState, onEditing }) {
  const $element = document.createElement('form');
  $element.className = 'document-wrap'
  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  $element.addEventListener('keyup', (e) => {
    const { name } = e.target;
    if (this.state[name] !== undefined) {
      const document = { ...this.state };
      document[name] = e.target.value;
      onEditing(document);
    }
  });

  this.render = () => {
    if (!this.state) return;

    $element.innerHTML = `
      <input class="document-title" type="text" name="title" value="${this.state.title}">
      <textarea class="document-class" name="content">${this.state.content ? this.state.content : ''}</textarea>
    `;
  }

  this.render();
}
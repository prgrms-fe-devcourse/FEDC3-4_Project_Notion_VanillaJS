export default function DocumentEdit({ $target, initialState, onEditing }) {
  const $element = document.createElement('form');
  $element.className = 'document-wrap'
  $element.innerHTML = `
    <input class="document-title" type="text" name="title" >
    <textarea class="document-class" name="content"></textarea>
  `;

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
    if(!this.state) return;
    $element.querySelector('[name=title]').value = this.state.title;
    $element.querySelector('[name=content]').value = this.state.content;
  }

  this.render();
}
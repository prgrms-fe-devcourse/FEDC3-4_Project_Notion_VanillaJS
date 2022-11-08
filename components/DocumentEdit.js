export default function DocumentEdit({ $target, initialState }) {
  this.$element = document.createElement('div');
  this.$element.className = 'document-wrap'
  $target.appendChild(this.$element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if (!this.state) return;

    this.$element.innerHTML = `
      <input class="document-title" type="text" name="title" value="${this.state.title}">
      <textarea class="document-class" name="content">${this.state.content ? this.state.content : ''}</textarea>
    `;
  }

  this.render();
}
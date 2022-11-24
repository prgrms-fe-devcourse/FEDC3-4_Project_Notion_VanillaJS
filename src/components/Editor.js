export default function Editor({ $target, props }) {
  const { title = '', content = '', onEdit } = props;

  const $editor = document.createElement('div');
  $target.appendChild($editor);

  this.state = { title, content };
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  let isMounted = false;
  this.initialRender = () => {
    $editor.innerHTML = `
		<input type="text" name="title" value="${this.state.title}" style="width:600px;" />
		<textarea name="content" style="width:600px;height:400px;">${this.state.content}</textarea>
	`;
    isMounted = true;
  };
  this.render = () => {
    if (!isMounted) this.initialRender();
    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').value = this.state.content;
  };
  this.render();

  $editor.addEventListener('keyup', ({ target }) => {
    const name = target.getAttribute('name');
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: target.value });
      onEdit(this.state);
    }
  });
}

export default function Editor({ $target, props }) {
  const { title = '', content = '' } = props;

  const $editor = document.createElement('div');
  $target.appendChild($editor);

  this.state = { title, content };
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
    console.log(this.state);
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
  };
  this.render();

  $editor.addEventListener('keyup', (e) => {
    const name = e.target.getAttribute('name');
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: e.target.value });
    }
  });
}

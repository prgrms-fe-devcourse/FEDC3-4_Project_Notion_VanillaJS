export default function Editor({ $container, initialState, onEdit }) {
  const $editor = document.createElement('div');
  $editor.id = 'editor';
  $container.appendChild($editor);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  $editor.innerHTML = `
		<input type="text" id="title" value=${this.state.title}></input>
		<textarea id="content">${this.state.content}</textarea> 
	`;

  this.render = () => {
    $editor.querySelector('input').value = this.state.title;
    $editor.querySelector('textarea').value = this.state.content;
  };

  let timer = null;
  $editor.addEventListener('input', (e) => {
    const { id, value } = e.target;
    if (!id) return;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      const newState = {
        ...this.state,
        [id]: value,
      };
      onEdit(newState);
    }, 2500);
  });
}

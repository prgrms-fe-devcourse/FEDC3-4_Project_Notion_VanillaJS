export default function Editor({ target, initialState = [] }) {
  const editor = document.createElement('div');
  editor.classList.add('editor', 'flex-item');
  target.appendChild(editor);

  this.state = initialState;

  this.setState = () => {};

  this.render = () => {
    editor.innerHTML = `
      editor
    `;
  };

  this.render();
}

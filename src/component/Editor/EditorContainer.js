import Editor from './Editor.js';

export default function EditorContainer({ $target, initialState }) {
  const $editorContainer = document.createElement('section');
  $editorContainer.className = 'editor-container';
  $target.appendChild($editorContainer);

  this.state = { ...initialState, title: '', content: '' };

  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(this.state);
  };

  const editor = new Editor({
    $target: $editorContainer,
    initialState: {
      title: this.state.title,
      content: this.state.content,
    },
  });
}

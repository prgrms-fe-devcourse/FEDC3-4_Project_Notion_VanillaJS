import { request } from '../../api/request.js';
import Editor from './Editor.js';

export default function EditorContainer({ $target, initialState }) {
  const $editorContainer = document.createElement('section');
  $editorContainer.className = 'editor-container';
  $target.appendChild($editorContainer);

  this.state = initialState;

  console.log(this.state);
  this.setState = (nextState) => {
    console.log(nextState);
    if (this.state.id !== undefined) {
      this.state = nextState;
      editor.setState(this.state);
    }
  };

  // 쓰로틀링 사용
  let timer = null;
  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state,
    onEditing: (state) => {
      console.log(state);
      const { id, title, content } = state;
      this.setState(state);
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await request(`/documents/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title,
            content,
          }),
        });
        // history.replaceState(null, null, `/documents/${id}`);
      }, 1000);
    },
  });
}

import NotionApi from '../../api/notionApi.js';
import Editor from './Editor.js';
import InitialEditor from './InitialEditor.js';

export default function EditorPage({ $target, initialState }) {
  const $editorContainer = document.createElement('section');
  $editorContainer.className = 'editor-container';
  $target.appendChild($editorContainer);

  this.state = initialState;

  this.setState = (nextState) => {
    const thisId = this.state.id;
    this.state = nextState;
    if (thisId !== +nextState.id) this.render();
    editor.setState(this.state);
  };

  this.render = () => {
    if (!this.state.id) {
      editor.removeEditor();
      initialEditor.render();
    } else {
      initialEditor.removeMainEditor();
      editor.render();
    }
  };

  const initialEditor = new InitialEditor({ $target: $editorContainer });

  // 쓰로틀링 사용
  let timer = null;
  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state,
    onEditing: (state) => {
      const { id, title, content } = state;
      this.setState(state);
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await NotionApi.editDocument(id, { title, content });
        history.replaceState(null, null, `/documents/${id}`);
      }, 500);
    },
  });

  this.render();
}

import Editor from '../components/Editor.js';
import { request } from '../utils/api.js';

export default function EditorPage({ $target, initialState }) {
  this.state = initialState;

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      const post = await request(`/documents/${this.state.documentId}`);
      editor.setState(post);
      return;
    }
    this.state = nextState;
    editor.setState(this.state.post || { title: '', content: '' });
  };

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: this.state.post,
    onEditing: (state) => {
      console.log(state);
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await request(`/documents/${state.id}`, {
          method: 'PUT',
          body: JSON.stringify(state),
        });
      }, 2000);
    },
  });
}

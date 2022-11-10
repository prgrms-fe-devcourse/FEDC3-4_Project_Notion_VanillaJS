import { request } from "../util/api.js";
import debounce from "../util/debounce.js";
import Editor from "./Editor.js"

export default function DocumentPage({ $target, getDocuments }) {
  const $element = document.createElement('div');
  $element.className = 'document-page';

  $target.appendChild($element);

  this.state = {
    documentId: null,
    document: null
  };

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      if (this.state.documentId) {
        fetchPost()
      } else {
        this.render();
      }
      return;
    }
    this.state = nextState;
    editor.setState(this.state.document);
    this.render();
  }

  const editor = new Editor({
    $target: $element,
    initialState: this.state.document,
    onEditing: debounce(async ({ id, title, content }) => {
      await request(`/documents/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content })
      });
      getDocuments();
    }, 1000),
  });

  this.render = () => {
    if (!this.state.documentId) {
      $target.contains($element) && $target.removeChild($element);
    } else {
      $target.appendChild($element);
    }
  }

  const fetchPost = async () => {
    const document = await request(`/documents/${this.state.documentId}`);
    this.setState({ ...this.state, document });
  }
}
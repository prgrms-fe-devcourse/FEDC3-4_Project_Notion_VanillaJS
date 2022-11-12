import { request } from "../util/api.js";
import Editor from "./Editor.js"

const SAVE_NOW_KEYS = ['Enter', '.'];

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
      this.state = { ...nextState };
      if (this.state.documentId) {
        fetchPost()
      } else {
        this.render();
      }
      return;
    }
    this.state = { ...this.state, ...nextState };
    editor.setState(this.state.document);
    this.render();
  }

  let timeoutId = null;

  const editor = new Editor({
    $target: $element,
    initialState: this.state.document,
    onKeyup: (document, key) => {
      const time = SAVE_NOW_KEYS.includes(key) ? 0 : 2000;

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        updatePost(document)
        getDocuments();
      }, time);
    }
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

  const updatePost = async ({ id, title, content }) => {
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content })
    });
  }
}
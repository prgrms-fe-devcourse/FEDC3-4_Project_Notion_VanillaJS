
import Sidebar from "./Sidebar.js";
import { initRouter, push } from "../util/route.js";
import { request } from "../util/api.js";
import DocumentList from "./DocumentList.js";
import Editor from "./Editor.js";

const SAVE_NOW_KEYS = ['Enter', '.'];

export default function App({ $app }) {

  this.state = {
    documents: [],
    selectedDocument: {
      id: null,
      title: '',
      content: '',
      documents: []
    },
  };

  this.setState = (nextState) => {
    // TODO: Validate
    this.state = { ...nextState };
    const { documents, selectedDocument } = this.state;
    documentList.setState(documents);
    editor.setState(selectedDocument);
  }

  const sidebar = new Sidebar({
    $target: $app,
    onClickHeader: () => {
      push('/')
    },
    onClickAddButton: async () => {
      postDocumnet(null);
    }
  });

  const documentList = new DocumentList({
    $target: sidebar.getElement(),
    initialState: this.state.documents,
    onDocumentClick: async (id) => {
      push(`/documents/${id}`);
    },
    onAddSubDocumentButtonClick: async (parentId) => {
      postDocumnet(Number(parentId));
    },
    onRemoveDocumentButtonClick: async (id) => {
      deleteDocument(Number(id))
    }
  });

  let editorKeyupTimeoutId = null;

  const editor = new Editor({
    $target: $app,
    initialState: this.state.selectedDocument,
    onKeyup: (document, key) => {
      const time = SAVE_NOW_KEYS.includes(key) ? 0 : 2000;

      if (editorKeyupTimeoutId !== null) {
        clearTimeout(editorKeyupTimeoutId);
      }

      editorKeyupTimeoutId = setTimeout(() => {
        updateDocument(document)
        getDocuments();
      }, time);
    }
  });

  const getDocuments = async () => {
    const documents = await request('/documents');
    this.setState({ ...this.state, documents });
  };

  const getDocument = async (id) => {
    const selectedDocument = await request(`/documents/${id}`);
    this.setState({ ...this.state, selectedDocument });
  }

  const postDocumnet = async (parent) => {
    const { id } = await request(`/documents`, {
      method: 'POST',
      body: JSON.stringify({ parent, title: '' })
    });
    getDocuments();
    push(`/documents/${id}`);
  }

  const updateDocument = async ({ id, title, content }) => {
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content })
    });
  }

  const deleteDocument = async (id) => {
    await request(`/documents/${id}`, {
      method: 'DELETE'
    });
    getDocuments();
    if (this.state.selectedDocument.id === id) push('/');
  }

  const route = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      this.setState({ ...this.state, selectedDocument: { ...this.state.selectedDocument, id: null } })
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/');
      if (this.state.selectedDocument.id !== id) getDocument(id);
    }
  }

  (() => {
    getDocuments();
    initRouter(() => route());
  })();
}

import Sidebar from "./Sidebar.js";
import DocumentList from "./DocumentList.js";
import Resizer from "./Resizer.js";
import Content from "./Content.js";
import Editor from "./Editor.js";
import SubDocumentsLink from "./SubDocumentsLink.js";
import Modal from "./Modal.js";

import { request } from "../util/api.js";
import { validateDcouments, validateSelectedDocument } from "../util/validate.js";
import { initRouter, historyPush } from "../util/route.js";
import { CLASS_NAME, STORAGE_KEY } from "../util/constants.js";

const SAVE_NOW_KEYS = ['Enter', '.', 'Tab', undefined];

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

  this.validate = ({ documents, selectedDocument }) => {
    validateDcouments(documents);
    validateSelectedDocument(selectedDocument);
  };

  this.setState = (nextState) => {
    this.validate(nextState);
    this.state = { ...nextState };
    const { documents, selectedDocument } = this.state;
    documentList.setState({ documents, selectedDocument });
    editor.setState(selectedDocument);
    subDocumentsLink.setState(selectedDocument);
  };

  const sidebar = new Sidebar({
    $target: $app,
    onClickHeader: () => {
      historyPush('/')
    },
    onClickAddButton: async () => {
      const id = await postDocument();
      historyPush(`/documents/${id}`);
    }
  });

  const documentList = new DocumentList({
    $target: sidebar.$element,
    initialState: this.state.documents,
    onDocumentClick: async (id) => {
      historyPush(`/documents/${id}`);
    },
    onAddSubDocumentButtonClick: async (parentId) => {
      const id = await postDocument(parentId);
      historyPush(`/documents/${id}`);
    },
    onRemoveDocumentButtonClick: async (id) => {
      await deleteDocument(id);
      if (this.state.selectedDocument.id === id) {
        historyPush('/');
      } else {
        const documents = await getDocuments();
        this.setState({ ...this.state, documents });
      }
    }
  });

  new Resizer({
    $target: sidebar.$element,
    storageKey: STORAGE_KEY.SIDEBAR_WIDTH
  });

  const content = new Content({
    $target: $app
  });

  let editorKeyupTimeoutId = null;

  const editor = new Editor({
    $target: content.$element,
    initialState: this.state.selectedDocument,
    onEdit: (document, key) => {
      const timeout = SAVE_NOW_KEYS.includes(key) ? 0 : 2000;

      if (editorKeyupTimeoutId !== null) clearTimeout(editorKeyupTimeoutId);

      editorKeyupTimeoutId = setTimeout(async () => {
        const { id } = this.state.selectedDocument;
        updateDocument(id, document);
        const documents = await getDocuments();
        this.setState({ ...this.state, documents })
      }, timeout);
    }
  });

  const subDocumentsLink = new SubDocumentsLink({
    $target: content.$element,
    initialState: this.state.selectedDocument,
    onLinkClick: (id) => {
      historyPush(id)
    }
  });

  const createNetworkErrorModal = () => {
    new Modal({
      $target: $app,
      className: CLASS_NAME.NETWORK_ERROR_MODAL,
      text: '네트워크 연결이 해제되었습니다. 네트워크 상태를 확인해주세요!'
    });
  }

  const getDocuments = async () => {
    const documents = await request('/documents');
    return documents;
  };

  const postDocument = async (parent = null) => {
    const { id } = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({ parent, title: '' })
    });
    return id
  }

  const updateDocument = async (id, document) => {
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(document)
    });
  }

  const deleteDocument = async (id) => {
    await request(`/documents/${id}`, {
      method: 'DELETE'
    });
  }

  (async () => {
    const route = async () => {
      const { pathname } = window.location;
      const nextState = {};
      if (pathname === '/') {
        nextState.documents = await request('/documents');
        nextState.selectedDocument = { id: null };
        this.setState({ ...this.state, ...nextState });
      } else if (pathname.indexOf('/documents/') === 0) {
        const [, , id] = pathname.split('/');
        if (this.state.selectedDocument.id !== Number(id)) nextState.selectedDocument = await request(`/documents/${id}`);
        nextState.documents = await request('/documents');
        this.setState({ ...this.state, ...nextState });
      }
    };

    if (!window.navigator.onLine) createNetworkErrorModal();

    window.addEventListener("offline", (e) => {
      createNetworkErrorModal();
    });

    window.addEventListener("online", (e) => {
      const $modal = $app.querySelector(`.${CLASS_NAME.NETWORK_ERROR_MODAL}`)
      if ($modal) $app.removeChild($modal);
      route();
    });

    initRouter(() => route());
  })();
}
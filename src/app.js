import Editor from './components/editor.js';
import Home from './components/home.js';
import Navigator from './components/navigator.js';
import { initRouter, push } from './router.js';
import { request } from './utils/api.js';
import { METHOD, STORAGE_KEY, TEXT, EVENT } from './utils/constants.js';
import { getIdsThroughRoot } from './utils/getWayThroughRoot.js';
import { getItem, removeItem, setItem } from './utils/storage.js';
import { debounce } from './utils/debounce.js';

export default function App({ $target, initialState }) {
  const $wrapper = document.createElement('div');
  $wrapper.classList.add('flex-row', 'full-size');

  let documentLocalSaveKey = '';
  const currentDocument = getItem(documentLocalSaveKey, {
    title: '',
    content: '',
    id: null,
  });

  const fetchDocuments = async () => {
    const documents = await request('/documents');
    if (documents && documents.length) {
      this.setState({ documents });
      navigator.setState({ openedDocuments: getItem(STORAGE_KEY.OPENED_DOCUMENTS, []) });
      editor.setState({ documents });
      navigator.render();
    }
  };

  const fetchDocument = async (documentId) => {
    const fetchedDocument = await request(`/documents/${documentId}`);
    const { document } = this.state;

    if ((document && document.id !== documentId) || !document) {
      documentLocalSaveKey = `temp-document-${documentId}`;
      const tempDocument = getItem(documentLocalSaveKey, {
        title: '',
        content: '',
        id: null,
      });

      if (tempDocument.tempSaveDate && tempDocument.tempSaveDate > fetchedDocument.updatedAt) {
        if (confirm(TEXT.LOAD_UNSAVED_DATA)) {
          this.setState({ document: tempDocument });
          editor.setState({ document: tempDocument });
          editor.render();
          return;
        }
      }
    }

    this.setState({ document: fetchedDocument });
    editor.setState({ document: fetchedDocument });
    editor.render();
  };

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
  };

  const navigator = new Navigator({
    $target: $wrapper,
    initialState: this.state,
    addDocument: async (targetDocumentId) => {
      const newDocument = await request(
        '/documents',
        { method: METHOD.POST },
        { title: TEXT.DEFAULT_TITLE, parent: targetDocumentId },
      );
      if (newDocument) {
        const initializedDocument = await request(
          `/documents/${newDocument.id}`,
          { method: METHOD.PUT },
          { title: newDocument.title, content: '' },
        );
        if (initializedDocument) {
          await fetchDocuments();

          if (parseInt(targetDocumentId) === this.state.document.id) {
            await fetchDocument(targetDocumentId);
          }
        }
      }
    },
    deleteDocument: async (targetDocumentId) => {
      const deletedDocument = await request(`/documents/${targetDocumentId}`, {
        method: METHOD.DELETE,
      });
      if (deletedDocument) {
        await fetchDocuments();
        const { documents, id } = this.state.document;

        if (documents && documents.filter((doc) => doc.id === deletedDocument.id).length) {
          await fetchDocument(id);
        }

        const { pathname } = window.location;
        if (pathname.indexOf('/documents/') === 0) {
          const [, , documentId] = pathname.split('/');
          if (documentId === targetDocumentId) push('/');
        }
      }
    },
    openDocument: async (targetDocumentId) => {
      push(`/documents/${targetDocumentId}`);
    },
  });

  const optimisticTitleUpdate = (document) => {
    const { id, title } = document;
    const $currentNavigatorTitle = $wrapper.querySelector(`#id-${id}`);
    const $currentEditorHeader = $wrapper.querySelector('.editor-header');
    if (typeof title !== 'undefined' && $currentNavigatorTitle.innerHTML !== title) {
      $currentNavigatorTitle.innerHTML = title;
      $currentEditorHeader.lastElementChild.innerHTML = title;
    }
  };

  const editor = new Editor({
    $target: $wrapper,
    initialState: { document: currentDocument, documents: this.state.documents },
    optimisticTitleUpdate,
    onEditing: debounce(async (document) => {
      const { id, title } = document;
      const $currentNavigatorTitle = $wrapper.querySelector(`#id-${id}`);
      const $currentEditorHeader = $wrapper.querySelector('.editor-header');
      if (typeof title !== 'undefined' && $currentNavigatorTitle.innerHTML !== title) {
        $currentNavigatorTitle.innerHTML = title;
        $currentEditorHeader.lastElementChild.innerHTML = title;
      }

      setItem(documentLocalSaveKey, {
        ...document,
        tempSaveDate: new Date(),
      });

      const modifiedDocument = await request(
        `/documents/${id}`,
        {
          method: METHOD.PUT,
        },
        document,
      );

      if (modifiedDocument) {
        if (title !== this.state.document.title) {
          let changedDocuments = getItem(STORAGE_KEY.CHANGED_DOCUMENTS, []);
          changedDocuments = changedDocuments.filter(
            (changedDocument) => changedDocument.id !== id,
          );
          setItem(STORAGE_KEY.CHANGED_DOCUMENTS, [...changedDocuments, { id, title }]);
          editor.handleTitleChangedDocuments();
        }

        editor.setState({ document });
        removeItem(documentLocalSaveKey);
        await fetchDocuments();
      }
    }, 250),
    openDocument: async (targetDocumentId) => {
      const ids = getIdsThroughRoot($wrapper, targetDocumentId);
      setItem(STORAGE_KEY.OPENED_DOCUMENTS, [...getItem(STORAGE_KEY.OPENED_DOCUMENTS, []), ...ids]);
      push(`/documents/${targetDocumentId}`);
    },
  });

  const home = new Home({ $target: $wrapper, initialState: TEXT.DEFAULT_HOME_PAGE });

  this.render = () => {
    $target.appendChild($wrapper);
  };

  initRouter(async () => {
    const $modal = $wrapper.querySelector('.modal-wrapper');
    if ($modal) {
      $wrapper.removeChild($modal);
      $modal.innerHTML = '';
    }

    const { pathname } = window.location;
    await fetchDocuments();

    if (pathname === '/') {
      editor.remove();
      home.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      home.remove();
      await fetchDocument(documentId);
    }

    this.render();
  });
}

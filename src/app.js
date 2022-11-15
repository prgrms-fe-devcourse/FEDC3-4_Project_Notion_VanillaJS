import Navigator from './components/navigator.js';
import Editor from './components/editor.js';
import Blank from './components/home.js';
import { request } from './utils/api.js';
import { initRouter, push } from './router.js';
import { METHOD, TEXT } from './utils/constants.js';
import { setItem, getItem, removeItem } from './utils/storage.js';

export default function App({ target, initialState }) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('flex-row', 'full-size');

  let documentLocalSaveKey = '';
  const currentDocument = getItem(documentLocalSaveKey, {
    title: '',
    content: '',
  });

  const fetchDocuments = async () => {
    const documents = await request('/documents');
    if (documents && documents.length) {
      this.setState({ documents });
      navigator.render();
    }
  };

  const fetchDocument = async (documentId) => {
    const document = await request(`/documents/${documentId}`);

    if ((this.state.document && this.state.document.id !== documentId) || !this.state.document) {
      documentLocalSaveKey = `temp-document-${documentId}`;
      const tempDocument = getItem(documentLocalSaveKey, {
        title: '',
        content: '',
      });

      if (tempDocument.tempSaveDate && tempDocument.tempSaveDate > document.updatedAt) {
        if (confirm(TEXT.LOAD_UNSAVED_DATA)) {
          this.setState({
            document: tempDocument,
          });
          editor.setState({ document: tempDocument });
          editor.render();
          return;
        }
      }

      this.setState({ document });
      editor.setState({ document });
      editor.render();
    }
  };

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
  };

  const navigator = new Navigator({
    target: wrapper,
    initialState: this.state,
    addDocument: async (targetDocumentId) => {
      const document = await request(
        '/documents',
        { method: METHOD.POST },
        {
          title: TEXT.DEFAULT_TITLE,
          parent: targetDocumentId,
        },
      );
      if (document) {
        const initializedDocument = await request(
          `/documents/${document.id}`,
          { method: METHOD.PUT },
          {
            title: document.title,
            content: '',
          },
        );
        if (initializedDocument) {
          await fetchDocuments();
        }
      }
    },
    deleteDocument: async (targetDocumentId) => {
      const document = await request(`/documents/${targetDocumentId}`, { method: METHOD.DELETE });
      if (document) {
        await fetchDocuments();
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

  let timer = null;

  const editor = new Editor({
    target: wrapper,
    initialState: { document: currentDocument },
    onEditing: (document) => {
      const $currentNavigatorTitle = wrapper.querySelector(`#id-${document.id}`);
      const $currentEditorHeader = wrapper.querySelector('.editor-header');
      if (
        typeof document.title !== 'undefined' &&
        $currentNavigatorTitle.innerHTML !== document.title
      ) {
        $currentNavigatorTitle.innerHTML = document.title;
        $currentEditorHeader.innerHTML = document.title;
      }

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        const modifiedDocument = await request(
          `/documents/${document.id}`,
          {
            method: METHOD.PUT,
          },
          document,
        );

        if (modifiedDocument) {
          removeItem(documentLocalSaveKey);
          await fetchDocuments();
        }
      }, 250);
    },
  });

  const blank = new Blank({ $target: wrapper, initialState: TEXT.DEFAULT_HOME_PAGE });

  this.render = () => {
    target.appendChild(wrapper);
  };

  this.route = async () => {
    const { pathname } = window.location;
    await fetchDocuments();

    if (pathname === '/') {
      if (wrapper.querySelector('.editor')) {
        editor.empty();
      }
      blank.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      if (wrapper.querySelector('.home-page')) blank.empty();
      await fetchDocument(documentId);
    }

    this.render();
  };

  this.route();

  window.addEventListener('popstate', () => this.route());

  initRouter(() => this.route());
}

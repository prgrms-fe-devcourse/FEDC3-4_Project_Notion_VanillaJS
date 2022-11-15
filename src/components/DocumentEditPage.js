import Editor from './Editor.js';
import DocumentHeader from './DocumentHeader.js';

import { fetchDocuments } from '../utils/api.js';
import { NEW, NEW_PARENT, ROUTE_DOCUMENTS } from '../utils/constants.js';
import { isNew, setDocumentTitle } from '../utils/helper.js';
import { getItem, removeItem } from '../utils/storage.js';

export default function DocumentEditPage({ $target, initialState }) {
  isNew(new.target);

  const $page = document.createElement('div');
  $page.className = 'document-edit-page';

  this.state = initialState;

  const documentHeader = new DocumentHeader({
    $target: $page,
    initialState: {
      documentId: this.state.documentId,
      title: this.state.document.title,
    },
    onRemove: async (documentId) => {
      if (confirm('페이지를 삭제하시겠습니까?')) {
        await fetchDocuments(documentId, {
          method: 'DELETE',
        });
        // TODO: 로컬스토리지의 opened-item에서 해당 id 삭제해야 함
      }
    },
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: '',
      content: '',
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        if (this.state.documentId === NEW) {
          const createdDocument = await fetchDocuments('', {
            method: 'POST',
            body: JSON.stringify({
              title: document.title,
              parent: getItem(NEW_PARENT, null),
            }),
          });

          history.replaceState(
            null,
            null,
            `${ROUTE_DOCUMENTS}/${createdDocument.id}`
          );
          removeItem(NEW_PARENT);

          this.setState({
            ...this.state,
            documentId: createdDocument.id,
          });
        } else {
          const editedDocument = await fetchDocuments(this.state.documentId, {
            method: 'PUT',
            body: JSON.stringify(document),
          });

          this.setState({
            ...this.state,
            documentId: editedDocument.id,
            document: editedDocument,
          });
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId === nextState.documentId) {
      this.state = { ...this.state, ...nextState };
      editor.setState(
        this.state.document || {
          title: '',
          content: '',
        }
      );
      documentHeader.setState({
        documentId: this.state.documentId,
        title: this.state.document.title || '',
      });
      this.render();
      return;
    }

    this.state = { ...this.state, ...nextState };

    if (this.state.documentId === NEW) {
      editor.setState({
        title: '',
        content: '',
      });
      documentHeader.setState({
        documentId: this.state.documentId,
        title: '',
      });
      this.render();
    } else {
      await loadDocument();
    }
  };

  this.render = () => {
    $target.appendChild($page);
    setDocumentTitle(this.state.document?.title || '');
  };

  const loadDocument = async () => {
    const document = await fetchDocuments(this.state.documentId);

    this.setState({
      ...this.state,
      document,
    });
  };
}

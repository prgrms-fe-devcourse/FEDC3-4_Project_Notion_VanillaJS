import Editor from './Editor.js';
import DocumentHeader from './DocumentHeader.js';
import DocumentFooter from './DocumentFooter.js';

import { fetchDocuments } from '../utils/api.js';
import { NEW } from '../utils/constants.js';
import { isNew, setDocumentTitle } from '../utils/helper.js';

export default function DocumentEditPage({
  $target,
  initialState,
  onDelete,
  onEdit,
}) {
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
    onDelete,
  });

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: '',
      content: '',
    },
    onEdit,
  });

          history.replaceState(
    $target: $page,
    initialState: '자식 요소 렌더링',
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
    } else {
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
    }
  };

  const loadDocument = async () => {
    const document = await fetchDocuments(this.state.documentId);

    this.setState({
      ...this.state,
      document,
    });
  };

  this.render = () => {
    $target.appendChild($page);
    setDocumentTitle(this.state.document?.title || '');
  };
}

import { request, updateDocumentContent } from '../utils/api.js';
import { documentContentDefaultValue } from '../utils/constants.js';
import { debounce } from '../utils/utils.js';
import Editor from './Editor.js';
import EmptyContent from './EmptyContent.js';

/**
 * 관리하는 상태값
 * currentDocumentId: number
 */

export default function DocumentEditorPage({
  $container,
  initialState,
  onEditDocumentTitle,
  onError,
}) {
  const $editor = document.createElement('section');
  $container.appendChild($editor);

  this.currentDocumentId = initialState;

  this.setState = async (nextDocumentId) => {
    if (nextDocumentId === null) {
      this.currentDocumentId = nextDocumentId;
      emptyContent.setIsVisible(true);
      editor.setState({
        ...editor.state,
        isVisible: false,
      });
      return;
    }
    if (nextDocumentId === this.currentDocumentId) {
      return;
    }

    const documentContent = await request(`/${nextDocumentId}`);
    if (!documentContent) {
      onError();
      return;
    }
    this.currentDocumentId = nextDocumentId;
    emptyContent.setIsVisible(false);
    editor.setState({
      ...documentContent,
      isVisible: true,
    });
  };

  const emptyContent = new EmptyContent({
    $container: $editor,
  });

  const updateDocument = async (documentContent) => {
    await updateDocumentContent(documentContent);
    editor.setState(documentContent);
    onEditDocumentTitle();
  };

  const editor = new Editor({
    $container: $editor,
    initialState: documentContentDefaultValue,
    onEdit: debounce(updateDocument, 800),
  });
}

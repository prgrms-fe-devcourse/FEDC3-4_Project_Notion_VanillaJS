import { fetchDocumentContents, request } from '../utils/api.js';
import { documentContentDefaultValue } from '../utils/constants.js';
import Editor from './Editor.js';

/**
 * 관리하는 상태값
 * currentDocumentId: number | "new"
 */

export default function DocumentEditorPage({ $container, initialState, onEditDocumentTitle }) {
  const $editor = document.createElement('section');
  $container.appendChild($editor);

  this.currentDocumentId = initialState;

  this.setState = async (nextDocumentId) => {
    // TODO: 타입 다르지 않나? 잘 작동하는지 체크
    if (nextDocumentId === this.currentDocumentId) return;

    this.currentDocumentId = nextDocumentId;
    const documentContent = await fetchDocumentContents(nextDocumentId);
    editor.setState(documentContent);
  };

  const editor = new Editor({
    $container: $editor,
    initialState: documentContentDefaultValue,
    onEdit: async (documentContent) => {
      const { id, title, content } = documentContent;
      editor.setState(documentContent);

      await request(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
      });
      onEditDocumentTitle();
    },
  });
}

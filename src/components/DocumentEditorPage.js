import { request } from '../utils/api.js';
import { documentContentDefaultValue } from '../utils/constants.js';
import Editor from './Editor.js';
import EmptyContent from './EmptyContent.js';

/**
 * 관리하는 상태값
 * currentDocumentId: number
 */

export default function DocumentEditorPage({ $container, initialState, onEditDocumentTitle }) {
  const $editor = document.createElement('section');
  $container.appendChild($editor);

  this.currentDocumentId = initialState;

  this.setState = async (nextDocumentId) => {
    if (nextDocumentId === null) {
      this.currentDocumentId = nextDocumentId;
      emptyContent.render();
      return;
    }
    if (nextDocumentId === this.currentDocumentId) {
      return;
    }

    this.currentDocumentId = nextDocumentId;
    const documentContent = await request(`/${nextDocumentId}`);
    editor.setState(documentContent);
  };

  const emptyContent = new EmptyContent({
    $container: $editor,
  });

  const editor = new Editor({
    $container: $editor,
    initialState: documentContentDefaultValue,
    onEdit: async (documentContent) => {
      console.log(documentContent); // 애초에 여기서 마지막 변경사항만 오네..! 이벤트 지연 -> 마지막 이벤트만 실행시키기 때문!
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

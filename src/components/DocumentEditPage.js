import Editor from './Editor.js';

import { request } from '../utils/api.js';
import { NEW, NEWPARENT, ROUTE_DOCUMENTS } from '../utils/contants.js';
import { isNew } from '../utils/helper.js';
import { getItem, removeItem, setItem } from '../utils/storage.js';

export default function DocumentEditPage({ $target, initialState }) {
  isNew(new.target);

  const $page = document.createElement('div');
  $page.className = 'document-edit-page';

  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const savedDocument = getItem(documentLocalSaveKey, {
    title: '',
    content: '',
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: savedDocument,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        if (this.state.documentId === NEW) {
          const createdDocument = await request(ROUTE_DOCUMENTS, {
            method: 'POST',
            body: JSON.stringify({
              title: document.title,
              parent: getItem(NEWPARENT, null),
            }),
          });
          removeItem(NEWPARENT);
          history.replaceState(
            null,
            null,
            `${ROUTE_DOCUMENTS}/${createdDocument.id}`
          );
          removeItem(documentLocalSaveKey);

          this.setState({
            documentId: createdDocument.id,
          });
        } else {
          await request(`${ROUTE_DOCUMENTS}/${document.id}`, {
            method: 'PUT',
            body: JSON.stringify(document),
          });
          removeItem(documentLocalSaveKey);
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (
      this.state.documentId === nextState.documentId &&
      !this.state.document
    ) {
      this.state = nextState;
      editor.setState(
        this.state.document || {
          title: '',
          content: '',
        }
      );
      this.render();
      return;
    }

    documentLocalSaveKey = `temp-document-${nextState.documentId}`;
    this.state = nextState;

    if (this.state.documentId === NEW) {
      const document = getItem(documentLocalSaveKey, {
        title: '',
        content: '',
      });
      editor.setState(document);
      this.render();
    } else {
      await fetchDocument();
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;
    const document = await request(`${ROUTE_DOCUMENTS}/${documentId}`);

    const tempDocument = getItem(documentLocalSaveKey, {
      title: '',
      content: '',
    });

    if (
      tempDocument.tempSaveDate &&
      tempDocument.tempSaveDate > document.updatedAt
    ) {
      if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
        this.setState({
          ...this.state,
          document: tempDocument,
        });
        return;
      }
    }

    this.setState({
      ...this.state,
      document,
    });
  };
}

import { isConstructor } from '../../Helpers/checkError.js';
import {
  getDocumentAll,
  getDocumentById,
  postDocument,
  putDocument,
  deleteDocument,
} from '../../Helpers/api.js';
import DocumentList from '../DocumentList/DocumentList.js';
import DocumentDetailedList from '../DocumentList/DocumentDetailedList.js';
import DocumentEditor from '../DocumentEditor/DocumentEditor.js';
import { documentItem } from '../DocumentList/DocumentItem.js';
import { init, routeChange } from '../../Helpers/router.js';

export default function App({ $target }) {
  isConstructor(new.target);
  new DocumentList({
    $target,
    initialState: getDocumentAll(),
    postDocumentEvent: async ({ $target }) => {
      const id = $target.closest('[data-id]').dataset.id;
      const $parant = $target.closest('[data-id]');
      const $detailList = $parant.children[4];
      postDocument({
        title: '새로운 글 생성',
        parent: id,
      });
      if ($detailList) {
        const initialState = await getDocumentById({ id });
        const document = initialState.documents;
        $detailList.insertAdjacentHTML('beforeend', documentItem(document[document.length - 1]));
      }
    },

    deleteDocumentEvent: async ({ $target }) => {
      const id = $target.closest('[data-id]').dataset.id;
      const $parant = $target.closest('[data-id]');
      const $detailList = $parant.children[4];
      const childDocuments = await getDocumentById({ id });
      if (childDocuments.documents) {
        childDocuments.documents.forEach((doc) =>
          deleteDocument({
            id: doc.id,
          })
        );
      }
      deleteDocument({
        id,
      });
      $parant.remove();
    },

    showChildDocumentEvent: async ({ $target }) => {
      const id = $target.closest('[data-id]').dataset.id;
      const initialState = await getDocumentById({ id });
      new DocumentDetailedList({
        $target: $target.closest('[data-id]'),
        initialState: await initialState.documents,
      });
      $target.id = 'hideChildDocumentButton';
      $target.innerText = '🔼';
    },

    hideChildDocumentEvent: async ({ $target }) => {
      const $parant = $target.closest('[data-id]');
      const $detailList = $parant.children[4];
      $parant.removeChild($detailList);
      $target.id = 'showChildDocumentButton';
      $target.innerText = '🔽';
    },

    setEditorEvent: async ({ $target }) => {
      const id = $target.closest('[data-id]').dataset.id;
      const nextState = await getDocumentById({ id });
      documentEditor.setState(nextState);
      routeChange(`/documents/${id}`);
    },
  });

  const documentEditor = new DocumentEditor({
    $target,
    initialState: {
      id: '9999',
      title: '여기에 입력하세요',
      content: '여기에 입력하세요',
    },
    saveDocumentEvent: ({ $target }) => {
      const $editor = $target.closest('[data-id]');
      const id = $editor.dataset.id;
      const arr = $editor.querySelectorAll('[contenteditable=true]');
      putDocument({
        id,
        title: arr[0].innerHTML,
        content: arr[1].innerHTML,
      });
      const $title = document.querySelector(`[data-id="${id}"] SPAN`);
      $title.innerHTML = arr[0].innerHTML;
    },
  });

  this.route = async () => {
    const { pathname } = location;
    if (pathname === '/') {
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentsId] = pathname.split('/');
      // 지운 데이터 접근 시 처리
      const nextState = await getDocumentById({ id: documentsId });
      documentEditor.setState(nextState);
    }
  };

  init(this.route);
  this.route();
}

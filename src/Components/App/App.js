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
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../Helpers/localstorage.js';

export default function App({ $target }) {
  isConstructor(new.target);

  let saveApi = false;

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
      saveApi = true;
    },
    saveLocalStorageEvent: ({ $target }) => {
      const $editor = $target.closest('[data-id]');
      const id = $editor.dataset.id;
      const arr = $editor.querySelectorAll('[contenteditable=true]');
      if (!saveApi) {
      }
      window.addEventListener('beforeunload', () => {
        if (!saveApi) {
          setLocalStorage(
            id,
            JSON.stringify({
              title: arr[0].innerHTML,
              content: arr[1].innerHTML,
              tempSaveDate: new Date(),
            })
          );
        }
      });
    },
  });

  this.route = async () => {
    const { pathname } = location;
    if (pathname === '/') {
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentsId] = pathname.split('/');
      // 지운 데이터 접근 시 처리
      const nextState = await getDocumentById({ id: documentsId });
      const localData = getLocalStorage(documentsId);
      if (localData?.tempSaveDate > nextState.updatedAt) {
        const saveApi = confirm('이전 저장된 임시 글이 있습니다. 업로드 하시겠습니까?');
        if (saveApi) {
          putDocument({
            id: documentsId,
            title: localData.title,
            content: localData.content,
          });
        } else {
          removeLocalStorage(documentsId);
        }
      }
      documentEditor.setState(nextState);
    }
  };

  init(this.route);
  this.route();
}

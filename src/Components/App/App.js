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

  let isSaveApi = false;

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
      const confirmDelete = confirm('글을 삭제하시겠습니까? 하위 폴더는 자동으로 이동됩니다.');
      if (confirmDelete) {
        const id = $target.closest('[data-id]').dataset.id;
        const $parant = $target.closest('[data-id]');
        deleteDocument({
          id,
        });
        $parant.remove();
      }
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
      isSaveApi = false;
      routeChange(`/documents/${id}`);
    },
  });

  const documentEditor = new DocumentEditor({
    $target,
    initialState: {
      id: 'Root',
      title: '여기에 입력하세요',
      content: '여기에 입력하세요',
    },
    saveDocumentEvent: async ({ $target }) => {
      const $editor = $target.closest('[data-id]');
      const id = $editor.dataset.id;
      const arr = $editor.querySelectorAll('[contenteditable=true]');
      let $title;
      if (id === 'Root') {
        const res = await postDocument({
          title: arr[0].innerHTML,
        });
        $title = document.querySelector('#documentList UL');
        console.log(res);
        $title.insertAdjacentHTML(
          'beforeend',
          documentItem({
            id: res.id,
            title: res.title,
          })
        );
      } else {
        putDocument({
          id,
          title: arr[0].innerHTML,
          content: arr[1].innerHTML,
        });
        $title = document.querySelector(`[data-id="${id}"] SPAN`);
        $title.innerHTML = arr[0].innerHTML;
      }
      isSaveApi = true;
    },
    saveLocalStorageEvent: ({ $target }) => {
      const $editor = $target.closest('[data-id]');
      const id = $editor.dataset.id;
      const arr = $editor.querySelectorAll('[contenteditable=true]');
      window.addEventListener('beforeunload', () => {
        if (!isSaveApi) {
          setLocalStorage(
            id,
            JSON.stringify({
              title: arr[0].innerHTML,
              content: arr[1].innerHTML,
              tempSaveDate: new Date(),
            })
          );
          isSaveApi = false;
        }
      });
    },
  });

  this.route = async () => {
    const { pathname } = location;
    if (pathname === '/') {
      const $root = $target.querySelector('#documentList UL');
      $root.className = 'Root';
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentsId] = pathname.split('/');
      const nextState = await getDocumentById({ id: documentsId });
      const localData = getLocalStorage(documentsId);
      if (localData?.tempSaveDate > nextState.updatedAt) {
        const saveApi = confirm(
          '이전 저장된 임시 글이 있습니다. 업로드 하시겠습니까? 저장되지 않은 글은 삭제됩니다.'
        );
        if (saveApi) {
          putDocument({
            id: documentsId,
            title: localData.title,
            content: localData.content,
          });
        }
        removeLocalStorage(documentsId);
      }
      documentEditor.setState(nextState);
    } else {
      alert('올바르지 않은 접속입니다. 최상단 폴더로 돌아갑니다.');
      routeChange('/');
      location.reload();
    }
  };

  init(this.route);
  this.route();
}

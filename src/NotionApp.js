import DocumentEditorPage from './components/DocumentEditorPage.js';
import NavBar from './components/NavBar.js';
import { request } from './utils/api.js';
import { deleteIsOpenState, getRemoveIdList } from './utils/utils.js';

export default function NotionApp({ $container }) {
  this.state = {
    documentList: [],
    currentDocumentId: null,
  };

  this.setState = (newState) => {
    this.state = newState;
    navBar.setState(this.state.documentList);
  };

  const navBar = new NavBar({
    $container,
    initialState: this.state.documentList,
    onSelect: (id) => {
      this.setState({
        ...this.state,
        currentDocumentId: id,
      });
      history.pushState(null, null, `/documents/${id}`);
      route();
    },
    onAdd: async (parentId) => {
      const createDocument = await request('/', {
        method: 'POST',
        body: JSON.stringify({ title: '제목없음', parent: parentId }),
      });
      history.pushState(null, null, `/documents/${createDocument.id}`);
      // FIXME: 제목없음 추가 후, 수정할 때 -> 제목 반영안됨
      fetchDocumentList();
      route();
    },
    onDelete: async (id) => {
      const targetDocument = await request(`/${id}`);
      const removeIdList = getRemoveIdList([targetDocument]);
      if (confirm(`하위문서를 포함해 ${removeIdList.length}개가 삭제됩니다`)) {
        await Promise.all(
          removeIdList.map((id) =>
            request(`/${id}`, {
              method: 'DELETE',
            })
          )
        );
        deleteIsOpenState(removeIdList);
        // TODO: 지우고나서, removeIdList에 route가 있다면? -> route replace 첫번째꺼로?
        fetchDocumentList();
      }
    },
  });

  const documentEditorPage = new DocumentEditorPage({
    $container,
    initialState: this.state.currentDocumentId,
    onEditDocumentTitle: () => {
      // TODO: content 수정 시에도 여기 호출됨 -> title만 수정됐을 때, 호출되도록**
      console.log(`edit title`);
      fetchDocumentList();
    },
  });

  const fetchDocumentList = async () => {
    const documentList = await request('/');
    this.setState({
      ...this.state,
      documentList,
    });
  };

  const route = () => {
    const { pathname } = window.location;

    if (pathname.includes('/documents/')) {
      const [, , documentId] = pathname.split('/');
      documentEditorPage.setState(documentId);
    }
  };

  window.addEventListener('popstate', () => route());

  fetchDocumentList();
  route();
}

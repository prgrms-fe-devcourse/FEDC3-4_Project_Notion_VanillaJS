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
      this.setState({
        ...this.state,
        currentDocumentId: createDocument.id,
      });
      // FIXME: (간헐적)제목없음 추가 후, 수정할 때 -> 제목 반영안됨(간헐적인데..어떤 상황에서 발생하는지 꼼꼼히 뜯어보기)
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

        if (removeIdList.includes(this.state.currentDocumentId)) {
          // TODO: this.state.documentList이 없을 때 => 삭제한 게 유일한 문서였을 때, 어떻게 처리할 건지
          history.replaceState(null, null, `/documents/${this.state.documentList[0].id}`);
          route();
        }
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

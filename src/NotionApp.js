import DocumentEditorPage from './components/DocumentEditorPage.js';
import NavBar from './components/NavBar.js';
import NotFoundPage from './components/NotFoundPage.js';
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
        body: JSON.stringify({ title: '', parent: parentId }),
      });
      history.pushState(null, null, `/documents/${createDocument.id}`);
      this.setState({
        ...this.state,
        currentDocumentId: createDocument.id,
      });
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
        await fetchDocumentList();

        if (removeIdList.includes(this.state.currentDocumentId)) {
          const hasDocumentList = this.state.documentList.length > 0;
          const nextRoute = hasDocumentList ? `/documents/${this.state.documentList[0].id}` : `/`;

          this.setState({
            ...this.state,
            currentDocumentId: hasDocumentList ? this.state.documentList[0].id : null,
          });
          history.replaceState(null, null, nextRoute);
          route();
        }
      }
    },
  });

  const documentEditorPage = new DocumentEditorPage({
    $container,
    initialState: this.state.currentDocumentId,
    onEditDocumentTitle: () => {
      // TODO: content 수정 시에도 여기 호출됨 -> title만 수정됐을 때, 호출되도록**
      fetchDocumentList();
    },
    onError: () => {
      history.replaceState(null, null, '/404');
      route();
    },
  });

  const notFoundPage = new NotFoundPage({
    $container,
    message: '존재하지 않는 페이지입니다',
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
    } else if (pathname === '/') {
      documentEditorPage.setState(null);
    } else {
      notFoundPage.render();
    }
  };

  window.addEventListener('popstate', () => route());

  fetchDocumentList();
  route();
}

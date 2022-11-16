import DocumentEditorPage from './components/DocumentEditorPage.js';
import NavBar from './components/NavBar.js';
import { fetchDocumentList, request } from './utils/api.js';

export default function NotionApp({ $container }) {
  this.state = {
    documentList: [],
    currentDocumentId: null,
  };

  this.setDocumentList = (newState) => {
    this.state = newState;
    navBar.setState(this.state.documentList);
  };

  const navBar = new NavBar({
    $container,
    initialState: this.state.documentList,
    onSelect: (id) => {
      this.setDocumentList({
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
      turnOn();
      route();
    },
  });

  const documentEditorPage = new DocumentEditorPage({
    $container,
    initialState: this.state.currentDocumentId,
    onEditDocumentTitle: () => {
      // TODO: content 수정 시에도 여기 호출됨 -> title만 수정됐을 때, 호출되도록**
      console.log(`edit title`);
      turnOn();
    },
  });

  // * 이름수정 ? documentList 불러오는 로직
  const turnOn = async () => {
    const documentList = await fetchDocumentList();
    this.setDocumentList({
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

  turnOn();
  route();
}

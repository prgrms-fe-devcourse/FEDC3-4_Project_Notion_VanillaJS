import DocumentEditorPage from './components/DocumentEditorPage.js';
import NavBar from './components/NavBar.js';
import { fetchDocumentList } from './utils/api.js';

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
      history.pushState(null, null, `/documents/${id}`);
      route();
    },
    onAdd: (parentId) => {
      console.log(parentId);
      // 실제로 title 글 쓰면 추가하자 -> 빈 editor 페이지 보여야해
      // /documnets/new -> route에서 Editor 페이지연결해야하나?
      // api 호출
    },
  });

  const documentEditorPage = new DocumentEditorPage({
    $container,
    initialState: this.state.currentDocumentId,
    onEditDocumentTitle: () => {
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

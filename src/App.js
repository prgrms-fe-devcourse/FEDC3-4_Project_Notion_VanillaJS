import EditorContainer from './components/editpage/EditorContainer.js';
import Sidebar from './components/sidebar/Sidebar.js';
import { request } from './api.js';
import { initRouter, push } from './router.js';
import { validation } from './validation.js';
import LandingPage from './components/editpage/LandingPage.js';

export default function App({ $target }) {
  validation(new.target, 'App');

  this.state = {
    documentsList: [],
    editorDocument: {
      docId: null,
      doc: {
        title: '',
        content: '',
        documents: [],
      },
    },
  };

  const sidebar = new Sidebar({
    $target,
    initialState: this.state.documentsList,
  });

  new LandingPage({ $target });

  const editContainer = new EditorContainer({
    $target,
    initialState: this.state.editorDocument,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    editContainer.setState(this.state.editorDocument);
  };

  this.init = async () => {
    const docs = await request('/documents');
    this.setState({
      ...this.state,
      documentsList: docs,
    });
    await sidebar.setState(docs);
    this.route();
  };

  this.route = () => {
    const { pathname } = window.location;
    const editArea = document.querySelector('.editContainer');
    const landingPage = document.querySelector('.landingPage');

    if (pathname === '/') {
      editArea.style.display = 'none';
      landingPage.style.display = 'block';
    } else if (pathname.indexOf('/documents/') === 0) {
      editArea.style.display = 'block';
      landingPage.style.display = 'none';
      const [, , docId] = pathname.split('/');
      //같은 문서 두번 클릭시 내용 삭제 방지
      if (this.state.editorDocument.docId === docId) {
        return;
      }
      //뒤로가기 대비 방어코드
      if (docId === null) {
        push('/');
      }
      this.setState({
        ...this.state,
        editorDocument: { docId },
      });
    }
  };

  this.init();

  window.addEventListener('popstate', () => this.route());

  initRouter(() => this.route());
}

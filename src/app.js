import Navigator from './components/navigator.js';
import Editor from './components/editor.js';
import { request } from './utils/api.js';
import { initRouter } from './router.js';
import { METHOD } from './utils/constants.js';

export default function App({ target, initialState }) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('flex-row', 'full-size');

  const fetchDocuments = async () => {
    const documents = await request('/documents');
    if (documents && documents.length) {
      this.setState({ documents: documents });
    }
  };

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
    this.render();
  };

  const navigator = new Navigator({
    target: wrapper,
    initialState: this.state,
    onClickAddDocument: async (targetDocumentId) => {
      console.log(targetDocumentId);
      const document = await request(
        '/documents',
        { method: METHOD.POST },
        {
          title: '제목 없음',
          parent: targetDocumentId,
        },
      );
      console.log(document);
      if (document) {
        await fetchDocuments();
        // this.setState({ documents: [...this.state.documents, document] });
      }
    },
  });
  const editor = new Editor({ target: wrapper, initialState: [] });

  this.render = () => {
    target.appendChild(wrapper);
    navigator.render();
  };

  this.route = () => {
    target.innerHTML = '';
    fetchDocuments();

    // const { pathname } = window.location;
    // if (pathname === '/') {
    // }
  };

  this.route();

  initRouter(() => this.route());
}

import DocumentPage from './pages/DocumentPage.js';
import EditorPage from './pages/EditorPage.js';
import { initRouter } from './utils/router.js';

export default function App({ $target }) {
  const $document = document.createElement('section');
  const $editor = document.createElement('section');

  $document.className = 'document-container';
  $editor.className = 'editor-container';

  $target.appendChild($document);
  $target.appendChild($editor);

  new DocumentPage({ $target: $document });
  const editorPage = new EditorPage({
    $target: $editor,
    initialState: {
      documentId: '',
      post: {
        title: '',
        content: '',
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      editorPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(() => this.route());
}

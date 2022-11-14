import DocumentPage from './pages/DocumentPage.js';
import EditorPage from './pages/EditorPage.js';

export default function App({ $target }) {
  const $document = document.createElement('section');
  const $editor = document.createElement('section');

  $document.className = 'document-container';
  $editor.className = 'editor-container';

  $target.appendChild($document);
  $target.appendChild($editor);

  new DocumentPage({ $target: $document });
  new EditorPage({ $target: $editor });
}

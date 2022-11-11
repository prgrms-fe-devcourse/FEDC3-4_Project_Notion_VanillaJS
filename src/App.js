import DocumentPage from './pages/DocumentPage.js';

export default function App({ $target }) {
  const $document = document.createElement('section');
  $document.className = 'document-container';
  $target.appendChild($document);

  new DocumentPage({ $target: $document });
}

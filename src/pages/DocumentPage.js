import DocumentHeader from '../components/DocumentHeader.js';

export default function DocumentPage({ $target }) {
  const $document = document.createElement('section');
  $document.className = 'document-container';
  $target.appendChild($document);

  new DocumentHeader({
    $target: $document,
  });
}

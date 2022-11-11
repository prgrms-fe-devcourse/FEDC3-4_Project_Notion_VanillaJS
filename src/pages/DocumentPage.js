import DocumentHeader from '../components/DocumentHeader.js';
import DocumentFooter from '../components/DocumentFooter.js';

export default function DocumentPage({ $target }) {
  new DocumentHeader({
    $target,
  });

  new DocumentFooter({
    $target,
  });
}

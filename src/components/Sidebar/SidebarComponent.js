import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import DocumentList from './DocumentList.js';
import RootDocumentAddButton from './RootDocumentAddButton.js';

/**
 * state: array
 */
export default function Sidebar({
  $target,
  initialState,
  onClickRootAddButton,
  onClickDocumentItemAddButton,
  onClickDocumentItemDeleteButton,
  onClickDocumentItemToggleButton,
}) {
  const $nav = createElement({ element: 'nav', $target });
  const header = new Header({ $target: $nav, initialState: 'Metamong' });
  const documentList = new DocumentList({
    $target: $nav,
    onClickDocumentItemAddButton,
    onClickDocumentItemDeleteButton,
    onClickDocumentItemToggleButton,
  });
  const rootDocumentAddButton = new RootDocumentAddButton({
    $target: $nav,
    onClickRootAddButton,
  });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    documentList.setState(this.state);
  };
}

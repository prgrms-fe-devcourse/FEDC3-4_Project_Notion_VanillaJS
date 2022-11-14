import { isConstructor } from '../../Helpers/checkError.js';
import DocumentDetailedList from './DocumentDetailedList.js';

export default function DocumentList({
  $target,
  initialState,
  postDocumentEvent,
  deleteDocumentEvent,
  showChildDocumentEvent,
  hideChildDocumentEvent,
  setEditorEvent,
}) {
  isConstructor(new.target);
  const $documentList = document.createElement('div');
  $documentList.id = 'documentList';
  $target.appendChild($documentList);
  const documentDetailedList = new DocumentDetailedList({
    $target: $documentList,
    initialState,
  });

  this.setState = async (nextState) => {
    documentDetailedList.setState(nextState);
  };

  const setEvent = {
    title: ($target) => setEditorEvent({ $target }),
    postDocumentButton: ($target) => postDocumentEvent({ $target }),
    deleteDocumentButton: ($target) => deleteDocumentEvent({ $target }),
    showChildDocumentButton: ($target) => showChildDocumentEvent({ $target }),
    hideChildDocumentButton: ($target) => hideChildDocumentEvent({ $target }),
  };

  $documentList.addEventListener('click', (e) => {
    if (e.target.id) {
      setEvent?.[e.target.id](e.target);
    }
  });
}

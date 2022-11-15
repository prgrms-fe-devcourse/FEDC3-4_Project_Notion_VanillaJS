import { isConstructor } from '../../Helpers/checkError.js';
import RenderDocumentItems from './RenderDocumentItems.js';
import { documentUser } from './documentUser.js';
import { newPageButton } from './newPageButton.js';

export default function DocumentList({
  $target,
  initialState,
  postDocumentEvent,
  deleteDocumentEvent,
  showChildDocumentEvent,
  hideChildDocumentEvent,
  setEditorEvent,
  changeUserEvent,
  newPageEvent,
}) {
  isConstructor(new.target);
  $target.innerHTML = `
        ${documentUser()}
        <div class="overflow-y-scroll border-t border-b border-gray-400">
          <div class="h-[80vh]">
            <nav class="">
              <ul class="m-0 my-1 p-1" id="documentList">
              </ul>
            </nav>
          </div>
        </div>
        ${newPageButton()}
  `;

  new RenderDocumentItems({
    $target: $target.querySelector('#documentList'),
    initialState,
  });

  const setEvent = {
    title: ($target) => setEditorEvent({ $target }),
    postDocumentButton: ($target) => postDocumentEvent({ $target }),
    deleteDocumentButton: ($target) => deleteDocumentEvent({ $target }),
    showChildDocumentButton: ($target) => showChildDocumentEvent({ $target }),
    hideChildDocumentButton: ($target) => hideChildDocumentEvent({ $target }),
    userNameButton: () => changeUserEvent(),
    newPageButton: () => newPageEvent(),
  };

  $target.addEventListener('click', (e) => {
    if (e.target.id) {
      setEvent?.[e.target.id](e.target);
    }
  });
}

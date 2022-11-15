export const documentItem = ({ id, title }) => {
  return `
          <li data-id="${id}" class="py-1 pl-2">
            <div data-event="setDocumentButton" class="grid grid-flow-col justify-between hover:bg-gray-400">
              <div class="truncate">
                <button data-event="showChildDocumentButton">🔽</button>
                <span data-event="setDocumentButton">${title}</span>
              </div>
              <div>
                <button data-event="postDocumentButton" class="right-0">➕</button>
                <button data-event="deleteDocumentButton" class="right-0">❌</button>
              </div>
            </div>
          </li>`;
};

export const documentItem = ({ id, title }) => {
  return `
          <li data-id="${id}" class="py-1 pl-2">
            <div id="title" class="grid grid-flow-col justify-between hover:bg-gray-400">
              <div class="truncate">
                <button id="showChildDocumentButton">🔽</button>
                <span>${title}</span>
              </div>
              <div>
                <button id="postDocumentButton" class="right-0">➕</button>
                <button id="deleteDocumentButton" class="right-0">❌</button>
              </div>
            </div>
          </li>`;
};

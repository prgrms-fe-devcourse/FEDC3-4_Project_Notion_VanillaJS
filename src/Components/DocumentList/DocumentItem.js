export const documentItem = ({ id, title }) => {
  return `
          <li data-id="${id}" class="p-1 pl-2">
            <div class="grid grid-flow-col justify-between hover:bg-gray-400">
              <div class="col-span-5">
                <button id="showChildDocumentButton">🔽</button>
                <span id="title">${title}</span>
              </div>
              <div>
                <button id="postDocumentButton" class="right-0">➕</button>
                <button id="deleteDocumentButton" class="right-0">❌</button>
              </div>
            </div>
          </li>`;
};

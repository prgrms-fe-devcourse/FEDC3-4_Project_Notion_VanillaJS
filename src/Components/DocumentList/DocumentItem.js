export const documentItem = ({ id, title }) => {
  return `
          <li data-id="${id}" class="py-1 pl-2">
            <div class="hover:bg-gray-400">
              <button id="showChildDocumentButton">🔽</button>
              <span id="title">${title}</span>
              <button id="postDocumentButton">➕</button>
              <button id="deleteDocumentButton">❌</button>
            </div>
          </li>`;
};

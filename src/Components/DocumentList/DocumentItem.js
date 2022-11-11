export const documentItem = ({ id, title }) => {
  return `
          <li data-id="${id}">
            <span id="title">${title}</span>
            <button id="postDocumentButton">➕</button>
            <button id="showChildDocumentButton">🔽</button>
            <button id="deleteDocumentButton">❌</button>
          </li>`;
};

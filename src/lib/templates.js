export const ListItem = (id, title) => {
  return `
  <li id=${id}>
     <div class="list-item">
        <button class="toggler"></button>
          <span data-id="${id}"class="text-title">${title}</span>
        <div class="show list-buttons">
          <button class="add-child-btn">+</button>
          <button class="remove-btn">&#128465;</button>
        </div>
    </div>
  </li>
    `;
};

export const editorContent = (title = '', content = '') => {
  return `
           <input
              class="editor-title"
              type="text"
              name="title"
              id="title"
              value="${title}"
              placeholder="제목 없음"
            />
            <textarea
              class="editor-content"
              name="content"
              id="content"
              placeholder="내용을 입력하세요..😁"
            >${content}</textarea>
      `;
};

export const addDocumentToList = (target, documents) => {
  target.insertAdjacentHTML(
    'beforeend',
    `<ul>
      ${documents.map(({ id, title }) => `${ListItem(id, title)}`).join('')}
    </ul>
    `
  );
};

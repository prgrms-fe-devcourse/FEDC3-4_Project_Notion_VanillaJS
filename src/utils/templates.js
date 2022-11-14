// prettier-ignore
const templates = {
	rootDocumentListItem: (id, title, subDocumentList, openedDocumentItems) => `
    <div class='document-item-container'>
      <div data-id='${id}' data-current-path='${title}' class='document-item'>
        <img data-action='toggle' src='./src/assets/images/toggleButton.svg'>
        <span>${title}</span>
        <img data-action='delete' src='./src/assets/images/deleteButton.svg'>
        <img data-action='add' src='./src/assets/images/addButton.svg'>
      </div>
      ${openedDocumentItems.includes(String(id)) ? makeSubDocumentList([title], subDocumentList, openedDocumentItems) : ''}
    </div>
  `,
};

// prettier-ignore
const makeSubDocumentList = (path, subDocumentList, openedDocumentItems) => {
  let subDocumentListTemplate = `
    <ul class='document-list'>
      ${subDocumentList.map(({ id, title, documents: subSubDocumentList }) => `
        <div class='document-item-container'>
          <div data-id='${id}' data-current-path='${path.join(' > ')} > ${title}' class='document-item'>
            <img data-action='toggle' src='./src/assets/images/toggleButton.svg'>
            <span>${title}</span>
            <img data-action='delete' src='./src/assets/images/deleteButton.svg'>
            <img data-action='add' src='./src/assets/images/addButton.svg'>
          </div>
          ${openedDocumentItems.includes(String(id)) ? makeSubDocumentList([...path, title], subSubDocumentList, openedDocumentItems) : ''}
        </div>
      `).join('')}
    </ul>
  `
  
  return subDocumentListTemplate;
};

export default templates;

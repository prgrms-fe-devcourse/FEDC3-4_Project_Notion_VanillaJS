// prettier-ignore
const templates = {
	rootDocumentListItem: (id, title, subDocumentList, openedDocumentItems) => {
    const isOpen = openedDocumentItems.includes(String(id));
    const [, , currentId] = window.location.pathname.split('/');
    const isSelected = String(id) === currentId;
    
    return (
      `
        <div class='document-item-container' title='${title}'>
          <div data-id='${id}' data-current-path='${title}' class='document-item ${isSelected ? 'selected' : ''}'>
            <img data-action='toggle' src='/src/assets/images/toggleButton.svg' class='${isOpen ? 'toggled' : 'not-toggled'}'>
            <div class='document-item__title'>${title}</div>
            <div class='document-item__buttons'>
              <img data-action='delete' src='/src/assets/images/deleteButton.svg'>
              <img data-action='add' src='/src/assets/images/addButton.svg'>
            </div>
          </div>
          ${isOpen ? makeSubDocumentList([title], subDocumentList, openedDocumentItems) : ''}
          ${(isOpen && !subDocumentList.length) ? '<div class="no-sub-document">하위 페이지가 존재하지 않습니다.</div>' : ''}
        </div>
      `
    )
  },
};

// prettier-ignore
const makeSubDocumentList = (path, subDocumentList, openedDocumentItems) => {
  let subDocumentListTemplate = `
    <ul class='document-list'>
      ${subDocumentList.map(({ id, title, documents: subSubDocumentList }) => {
        const isOpen = openedDocumentItems.includes(String(id));
        const [, , currentId] = window.location.pathname.split('/');
        const isSelected = String(id) === currentId;
        
        return (
          `
            <div class='document-item-container' title='${title}'>
              <div data-id='${id}' data-current-path='${path.join(' > ')} > ${title}' class='document-item ${isSelected ? 'selected' : ''}'>
                <img data-action='toggle' src='/src/assets/images/toggleButton.svg' class='${isOpen ? 'toggled' : 'not-toggled'}'>
                <div class='document-item__title'>${title}</div>
                <div class='document-item__buttons'>
                  <img data-action='delete' src='/src/assets/images/deleteButton.svg'>
                  <img data-action='add' src='/src/assets/images/addButton.svg'>
                </div>
              </div>
              ${isOpen ? makeSubDocumentList([...path, title], subSubDocumentList, openedDocumentItems) : ''}
              ${(isOpen && !subSubDocumentList.length) ? '<div class="no-sub-document">하위 페이지가 존재하지 않습니다.</div>' : ''}
            </div>
          `
        )
      }).join('')}
    </ul>
  `
  
  return subDocumentListTemplate;
};

export default templates;

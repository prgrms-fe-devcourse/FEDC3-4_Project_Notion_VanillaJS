const ADD_SUB_DOCUMENT_BUTTON = 'add-sub-document-button';
const REMOVE_DOCUMENT_BUTTON = 'remove-document-button';

export default function DocumentList({ $target, initialState, onDocumentClick, onAddSubDocumentButtonClick, onRemoveDocumentButtonClick }) {
  const $element = document.createElement('div');

  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = [...nextState];
    this.render();
  }

  $element.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if (!$li) return;

    const { id } = $li.dataset;
    if (e.target.className === ADD_SUB_DOCUMENT_BUTTON) {
      onAddSubDocumentButtonClick(id);
    } else if (e.target.className === REMOVE_DOCUMENT_BUTTON) {
      onRemoveDocumentButtonClick(id);
    } else {
      onDocumentClick(id);
    }

  })
  let template;

  this.render = () => {
    template = ``;
    renderDocuments(this.state);
    $element.innerHTML = template;
  }

  const renderDocuments = (_documents, depth = 0) => {
    template += '<ul>';
    for (const {id, title, documents} of _documents) {
      template += `<li data-id="${id}">`
      template += `<div class="document-item" style="padding-left: ${depth * 20}px">${title.trim() === '' ? 'Untitled' : title}`
      template += `<div><button class="${REMOVE_DOCUMENT_BUTTON}" type="text">x</button>`
      template += `<button class="${ADD_SUB_DOCUMENT_BUTTON}" type="text">+</button></div></div>`
      if (documents.length > 0) renderDocuments(documents, depth + 1);
      template += `</li>`;
    }
    template += '</ul>';
  }

  this.render();
}
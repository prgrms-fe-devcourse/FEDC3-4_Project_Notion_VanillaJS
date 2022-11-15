import { getStorageItem, setStorageItem } from "../util/sotrage.js"

const DROPDOWN_DOCUMENTS_BUTTON = 'dropdown-documents-button'
const DOCUMENT_TITLE = 'document-title';
const DOCUMENT_BUTTON_GROUP = 'document-button-group'
const ADD_SUB_DOCUMENT_BUTTON = 'add-sub-document-button';
const REMOVE_DOCUMENT_BUTTON = 'remove-document-button';
const DOCUMENT_ITEM = 'document-item';
const NO_SUB_DOCUMENTS = 'no-sub-documents'

export default function DocumentList({ $target, initialState, onDocumentClick, onAddSubDocumentButtonClick, onRemoveDocumentButtonClick }) {
  const $element = document.createElement('div');
  $element.style = 'width: 100%;'

  $target.appendChild($element);

  this.state = initialState;

  this.opendSubDocuments = getStorageItem('opendSubDocuments', [])

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  }

  this.setOpendSubDocuments = (nextValue) => {
    this.opendSubDocuments = [...nextValue];
    setStorageItem('opendSubDocuments', this.opendSubDocuments);
  }

  $element.addEventListener('click', (e) => {
    const target = e.target;
    const $li = target.closest('li');
    if (!$li) return;
    if ($li.className === NO_SUB_DOCUMENTS) return;

    const $ul = $li.querySelector('ul');
    const id = Number($li.dataset.id);
    const { className } = target

    if (className.includes(DROPDOWN_DOCUMENTS_BUTTON)) {
      if ($ul.classList.contains('close')) {
        openSubDocuments($ul, $li, id);
      } else if ($ul.classList.contains('open')) {
        closeSubDocuments($ul, $li, id);
      }
      return;
    }

    // TODO: 공통함수로 분리할 수 있는지 확인
    if (className.includes(ADD_SUB_DOCUMENT_BUTTON)) {
      if ($ul && $ul.classList.contains('close')) {
        openSubDocuments($ul, $li, id)
      } else {
        const $button = $li.querySelector(`.${DROPDOWN_DOCUMENTS_BUTTON}`)
        $button.classList.remove('hidden');
        $button.classList.add('rotate-90')
        this.setOpendSubDocuments([...this.opendSubDocuments, id]);
      }
      onAddSubDocumentButtonClick(id);
      return;
    }

    if (className.includes(REMOVE_DOCUMENT_BUTTON)) {
      this.setOpendSubDocuments(this.opendSubDocuments.filter(documentId => documentId !== id));
      onRemoveDocumentButtonClick(id);
      return
    }

    onDocumentClick(id);
  });


  $element.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    const $item = e.target.closest(`.${DOCUMENT_ITEM}`);
    if (!$item) return;
    const $buttonGroup = $item.querySelector(`.${DOCUMENT_BUTTON_GROUP}`)
    $buttonGroup.classList.remove('hidden');
  });

  $element.addEventListener('mouseout', (e) => {
    e.stopPropagation
    const $item = e.target.closest(`.${DOCUMENT_ITEM}`);
    if (!$item) return;
    const $buttonGroup = $item.querySelector(`.${DOCUMENT_BUTTON_GROUP}`);
    $buttonGroup.classList.add('hidden');
  });

  let template;

  this.render = () => {
    template = `<ul class="document-list">`;
    const { documents } = this.state;
    renderDocuments(documents);
    template += `</ul>`
    $element.innerHTML = template;
  }

  const renderDocuments = (_documents, depth = 0) => {
    for (const { id, title, documents } of _documents) {
      const isOpen = this.opendSubDocuments.includes(id);
      template += `
        <li data-id="${id}">
          <div class="${DOCUMENT_ITEM} ${id === this.state.selectedDocument.id ? 'selected' : ''}" style="padding-left: ${depth * 20 + 3}px">
            <div class="${DOCUMENT_TITLE}">
              <span class="icon ${DROPDOWN_DOCUMENTS_BUTTON}${isOpen ? ' rotate-90' : ''}"></span>
              ${title.trim() === '' ? 'Untitled' : title}
            </div>
            <div class="${DOCUMENT_BUTTON_GROUP} hidden">
              <span class="icon ${REMOVE_DOCUMENT_BUTTON}"></span>
              <span class="icon ${ADD_SUB_DOCUMENT_BUTTON}"></span>
            </div>
          </div>
        `;

      template += `<ul class="document-list ${isOpen ? 'open' : 'close'}">`;
      if (documents.length > 0) {
        renderDocuments(documents, depth + 1);
      } else {
        template += `<li class="${NO_SUB_DOCUMENTS}" style="padding-left: ${depth * 20 + 20}px; font-size:0.9rem; color: rgb(100, 100, 100);">No Sub Docmuents</li>`
      }
      template += `</ul>`;
      template += `</li>`;
    }
  }

  const openSubDocuments = ($ul, $li, id) => {
    const $button = $li.querySelector(`.${DROPDOWN_DOCUMENTS_BUTTON}`)
    $button.classList.add('rotate-90');
    if ($ul) {
      $ul.classList.remove('close');
      $ul.classList.add('open');
    }
    this.setOpendSubDocuments([...this.opendSubDocuments, id]);
  }

  const closeSubDocuments = ($ul, $li, id) => {
    const $button = $li.querySelector(`.${DROPDOWN_DOCUMENTS_BUTTON}`)
    $button.classList.remove('rotate-90');
    $ul.classList.remove('open');
    $ul.classList.add('close');
    this.setOpendSubDocuments(this.opendSubDocuments.filter(documentId => documentId !== id));
  }
}
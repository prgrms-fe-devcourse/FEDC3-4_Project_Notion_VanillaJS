import { CLASS_NAME, STORAGE_KEY } from "../util/constants.js";
import { getStorageItem, setStorageItem } from "../util/sotrage.js"

export default function DocumentList({ $target, initialState, onDocumentClick, onAddSubDocumentButtonClick, onRemoveDocumentButtonClick }) {
  this.$element = document.createElement('div');
  this.$element.className = CLASS_NAME.DOCUMENT_LIST;

  $target.appendChild(this.$element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  };

  this.opendSubDocuments = getStorageItem(STORAGE_KEY.OPEND_SUB_DOCUMENTS, []);

  this.setOpendSubDocuments = (nextValue) => {
    this.opendSubDocuments = [...nextValue];
    setStorageItem(STORAGE_KEY.OPEND_SUB_DOCUMENTS, this.opendSubDocuments);
  };

  let template;

  this.render = () => {
    template = `<ul>`;
    const { documents } = this.state;
    renderDocuments(documents);
    template += `</ul>`;
    this.$element.innerHTML = template;
  };

  const renderDocuments = (documents, depth = 0) => {
    for (const { id, title, 'documents': subDocuments } of documents) {
      const isOpen = this.opendSubDocuments.includes(id);
      template += `
        <li data-id="${id}">
          <div class="${CLASS_NAME.DOCUMENT_ITEM} ${id === this.state.selectedDocument.id ? 'selected' : ''}" style="padding-left: ${depth * 20 + 3}px">
            <div class="${CLASS_NAME.DOCUMENT_TITLE}">
              <span class="icon ${CLASS_NAME.DROPDOWN_DOCUMENTS_BUTTON} ${isOpen ? CLASS_NAME.ROTATE_90 : ''}"></span>
              ${title.trim() === '' ? 'Untitled' : title}
            </div>
            <div class="${CLASS_NAME.DOCUMENT_BUTTON_GROUP} ${CLASS_NAME.HIDDEN}">
              <span class="icon ${CLASS_NAME.REMOVE_DOCUMENT_BUTTON}"></span>
              <span class="icon ${CLASS_NAME.ADD_SUB_DOCUMENT_BUTTON}"></span>
            </div>
          </div>
        `;

      template += `<ul class="${isOpen ? CLASS_NAME.OPEN : CLASS_NAME.CLOSE}">`;
      if (subDocuments.length > 0) {
        renderDocuments(subDocuments, depth + 1);
      } else {
        template += `<li class="${CLASS_NAME.NO_SUB_DOCUMENTS}" style="padding-left: ${depth * 20 + 20}px;">No Sub Docmuents</li>`;
      }
      template += `</ul>`;
      template += `</li>`;
    }
  };

  this.$element.addEventListener('click', (e) => {
    const target = e.target;
    const $li = target.closest('li');
    if (!$li) return;

    const $ul = $li.querySelector('ul');
    const id = Number($li.dataset.id);

    if ($li.classList.contains(CLASS_NAME.NO_SUB_DOCUMENTS)) return;
    if (target.classList.contains(CLASS_NAME.DROPDOWN_DOCUMENTS_BUTTON)) {
      if ($ul.classList.contains(CLASS_NAME.CLOSE)) {
        openSubDocuments($ul, $li, id);
      } else if ($ul.classList.contains(CLASS_NAME.OPEN)) {
        closeSubDocuments($ul, $li, id);
      }
      return;
    }

    // TODO: 공통함수로 분리할 수 있는지 검토 필요
    if (target.classList.contains(CLASS_NAME.ADD_SUB_DOCUMENT_BUTTON)) {
      if ($ul && $ul.classList.contains(CLASS_NAME.CLOSE)) {
        openSubDocuments($ul, $li, id)
      } else {
        const $button = $li.querySelector(`.${CLASS_NAME.DROPDOWN_DOCUMENTS_BUTTON}`)
        $button.classList.remove(CLASS_NAME.HIDDEN);
        $button.classList.add(CLASS_NAME.ROTATE_90)
        this.setOpendSubDocuments([...this.opendSubDocuments, id]);
      }
      onAddSubDocumentButtonClick(id);
      return;
    }

    if (target.classList.contains(CLASS_NAME.REMOVE_DOCUMENT_BUTTON)) {
      this.setOpendSubDocuments(...[this.opendSubDocuments.filter(documentId => documentId !== id)]);
      onRemoveDocumentButtonClick(id);
      return;
    }

    onDocumentClick(id);
  });

  this.$element.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    const $item = e.target.closest(`.${CLASS_NAME.DOCUMENT_ITEM}`);
    if (!$item) return;
    const $buttonGroup = $item.querySelector(`.${CLASS_NAME.DOCUMENT_BUTTON_GROUP}`)
    $buttonGroup.classList.remove(CLASS_NAME.HIDDEN);
  });

  this.$element.addEventListener('mouseout', (e) => {
    e.stopPropagation();
    const $item = e.target.closest(`.${CLASS_NAME.DOCUMENT_ITEM}`);
    if (!$item) return;
    const $buttonGroup = $item.querySelector(`.${CLASS_NAME.DOCUMENT_BUTTON_GROUP}`);
    $buttonGroup.classList.add(CLASS_NAME.HIDDEN);
  });

  const openSubDocuments = ($ul, $li, id) => {
    const $button = $li.querySelector(`.${CLASS_NAME.DROPDOWN_DOCUMENTS_BUTTON}`);
    $button.classList.add(CLASS_NAME.ROTATE_90);
    if ($ul) {
      $ul.classList.remove(CLASS_NAME.CLOSE);
      $ul.classList.add(CLASS_NAME.OPEN);
    }
    this.setOpendSubDocuments([...this.opendSubDocuments, id]);
  };

  const closeSubDocuments = ($ul, $li, id) => {
    const $button = $li.querySelector(`.${CLASS_NAME.DROPDOWN_DOCUMENTS_BUTTON}`);
    $button.classList.remove(CLASS_NAME.ROTATE_90);
    $ul.classList.remove(CLASS_NAME.OPEN);
    $ul.classList.add(CLASS_NAME.CLOSE);
    this.setOpendSubDocuments(this.opendSubDocuments.filter(documentId => documentId !== id));
  };
}
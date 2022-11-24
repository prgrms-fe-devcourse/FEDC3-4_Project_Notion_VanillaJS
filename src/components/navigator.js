import { push } from '../router.js';
import { DEGREE, EVENT, ICON, STORAGE_KEY, TEXT } from '../utils/constants.js';
import { setItem } from '../utils/storage.js';
import Icon from './icons/index.js';

export default function Navigator({
  $target,
  initialState = { openedDocuments: {}, documents: [] },
  addDocument,
  deleteDocument,
  openDocument,
}) {
  const $navigator = document.createElement('div');
  $navigator.classList.add('navigator', 'flex-item');

  const documentIcon = Icon({ icon: ICON.DOCUMENT });
  const chevronIcon = Icon({ icon: ICON.CHEVRON });
  const chevronDownIcon = Icon({ icon: ICON.CHEVRON, rotateDegree: DEGREE.OPENED });
  const plusIcon = Icon({ icon: ICON.PLUS });
  const trashIcon = Icon({ icon: ICON.TRASH });

  $target.appendChild($navigator);
  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
  };

  const getDocuments = (documents, depth = 0, opened = false) => {
    if (!documents || documents.length === 0) return '';
    return `
      <div class='flex-column'>
        ${documents
          .map(({ id, title, documents }) => {
            const isOpened = this.state.openedDocuments[id];
            return `
              <div key=${id} class='document-wrapper document document-item flex-row' style='padding-left: ${depth}rem; display: ${
              depth === 0 || opened ? 'flex' : 'none'
            };'>
                <div class='icon-wrapper chevron-button'>${
                  isOpened ? chevronDownIcon : chevronIcon
                }</div>
                <div class='icon-wrapper'>${documentIcon}</div>
                <div class='title-wrapper' id='id-${id}' data-title='${title}'>
                  ${title}
                  <div class='visible-when-hover'>
                    <div class='icon-wrapper document-delete'>${trashIcon}</div>
                    <div class='icon-wrapper document-add'>${plusIcon}</div>
                  </div>
                </div>
              </div>
              ${isOpened ? getDocuments(documents, depth + 1, isOpened) : ''}
            `;
          })
          .join('')}
      </div>
    `;
  };

  this.renderDocuments = () => {
    const documentsWrapper = $navigator.querySelector('.documents-wrapper');
    documentsWrapper.innerHTML = `
      ${getDocuments(this.state.documents)}
    `;
  };

  this.setEvent = () => {
    $navigator.addEventListener(EVENT.CLICK, (e) => {
      const $chevronButton = e.target.closest('.chevron-button');
      const $document = e.target.closest('.document-wrapper');
      const $deleteButton = e.target.closest('.document-delete');
      const $addButton = e.target.closest('.document-add');
      const $header = e.target.closest('.navigator-header');

      if ($chevronButton && $document) {
        const chevron = $chevronButton.querySelector('.chevron');
        const $document = chevron.closest('.document');
        const isClosed = chevron.style.transform === `rotateZ(${DEGREE.CLOSED}deg)`;
        const nextChildren = $document.nextElementSibling;
        const isNotDocument = nextChildren && !nextChildren.classList.value.includes('document');
        const keys = [$document.getAttribute('key')];

        if (isClosed) {
          chevron.style.transform = `rotateZ(${DEGREE.OPENED}deg)`;
          if (isNotDocument) {
            [...nextChildren.children]
              .filter((child) => child.classList.value.includes('document'))
              .map((childDocument) => (childDocument.style.display = ''));
          }
          this.setState({ openedDocuments: { ...this.state.openedDocuments, [keys[0]]: true } });
        } else {
          chevron.style.transform = `rotateZ(${DEGREE.CLOSED}deg)`;
          if (isNotDocument) {
            nextChildren.querySelectorAll('.document').forEach((childDocument) => {
              childDocument
                .querySelectorAll('.chevron')
                .forEach(
                  (childChevron) => (childChevron.style.transform = `rotateZ(${DEGREE.CLOSED}deg)`),
                );
              childDocument.style.display = 'none';
              keys.push(childDocument.getAttribute('key'));
            });
          }
          keys.forEach((key) => delete this.state.openedDocuments[key]);
        }
        setItem(STORAGE_KEY.OPENED_DOCUMENTS, this.state.openedDocuments);
        this.renderDocuments();
      }

      if ($document && !$chevronButton && !$deleteButton && !$addButton) {
        const targetDocumentId = $document.getAttribute('key');
        openDocument(targetDocumentId);
      }

      if ($deleteButton && $document) {
        const targetDocumentId = $document.getAttribute('key');
        
        delete this.state.openedDocuments[targetDocumentId];
        setItem(STORAGE_KEY.OPENED_DOCUMENTS, this.state.openedDocuments);
        deleteDocument(targetDocumentId);
      }

      if ($addButton) {
        const targetDocumentId = $document ? $document.getAttribute('key') : null;
        addDocument(targetDocumentId);
      }

      if ($header) {
        push('/');
      }
    });

    const $scroller = $navigator.querySelector('.scroller');
    $scroller.addEventListener(EVENT.SCROLL, (e) => {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;
      if (scrollTop === 0 || scrollTop + offsetHeight === scrollHeight) {
        $scroller.style.boxShadow = 'transparent 0px 0px 0px inset';
      } else {
        $scroller.style.boxShadow = 'inset 0px 1px 0px rgba(55, 53, 47, 0.09)';
      }
    });

    const $header = $navigator.querySelector('.navigator-header');
    $header.addEventListener(EVENT.CLICK, (e) => push('/'));
  };

  this.render = () => {
    $navigator.innerHTML = `
        <div class='navigator-header'>${TEXT.DEFAULT_HEADER}</div>
        <div class='scroller'>
          <div class='documents-wrapper'></div>
          <div class='document document-add flex-row'>
            ${plusIcon}
            <div class='document-add-text'>${TEXT.DOCUMENT_ADD}</div>
          </div>
        </div>
        `;
    this.renderDocuments();
  };

  this.render();
  this.setEvent();
}

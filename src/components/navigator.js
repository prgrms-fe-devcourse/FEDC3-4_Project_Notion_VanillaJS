import Icon from './icons/index.js';
import { setItem } from '../utils/storage.js';
import { STORAGE_KEY, TEXT, DEGREE, ICON, EVENT } from '../utils/constants.js';
import { push } from '../router.js';

export default function Navigator({
  target,
  initialState = { openedDocuments: [], documents: [] },
  addDocument,
  deleteDocument,
  openDocument,
}) {
  const navigator = document.createElement('div');
  navigator.classList.add('navigator', 'flex-item');

  const documentIcon = Icon({ icon: ICON.DOCUMENT });
  const chevronIcon = Icon({ icon: ICON.CHEVRON });
  const chevronDownIcon = Icon({ icon: ICON.CHEVRON, rotateDegree: DEGREE.OPENED });
  const plusIcon = Icon({ icon: ICON.PLUS });
  const trashIcon = Icon({ icon: ICON.TRASH });

  target.appendChild(navigator);
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
            const isOpened = this.state.openedDocuments.map((key) => parseInt(key)).includes(id);
            return `
              <div key=${id} class='document document-item flex-row' style='padding-left: ${depth}rem; display: ${
              depth === 0 || isOpened || opened ? 'flex' : 'none'
            };'>
                <div class='icon-wrapper'>${isOpened ? chevronDownIcon : chevronIcon}</div>
                <div class='icon-wrapper'>${documentIcon}</div>
                <div class='title-wrapper' id='id-${id}'>
                  ${title}
                  <div class='visible-when-hover'>
                    <div class='icon-wrapper document-delete'>${trashIcon}</div>
                    <div class='icon-wrapper document-add'>${plusIcon}</div>
                  </div>
                </div>
              </div>
              ${getDocuments(documents, depth + 1, isOpened)}
            `;
          })
          .join('')}
      </div>
    `;
  };

  this.setEvent = () => {
    const chevrons = navigator.querySelectorAll('.chevron');
    [].forEach.call(chevrons, (chevron) => {
      chevron.addEventListener(EVENT.CLICK, (e) => {
        e.stopPropagation();
        const currentDocument = chevron.closest('.document');
        const isClosed = chevron.style.transform === `rotateZ(${DEGREE.CLOSED}deg)`;
        const nextChildren = currentDocument.nextElementSibling;
        const isNotDocument = nextChildren && !nextChildren.classList.value.includes('document');
        const keys = [currentDocument.getAttribute('key')];

        if (isClosed) {
          chevron.style.transform = `rotateZ(${DEGREE.OPENED}deg)`;
          if (isNotDocument) {
            [...nextChildren.children]
              .filter((child) => child.classList.value.includes('document'))
              .map((childDocument) => (childDocument.style.display = ''));
          }
          this.setState({
            openedDocuments: [...new Set([...this.state.openedDocuments, keys[0]])],
          });
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
          const difference = this.state.openedDocuments.filter((key) => !keys.includes(key));
          this.setState({ openedDocuments: difference });
        }
        setItem(STORAGE_KEY.OPENED_DOCUMENTS, this.state.openedDocuments);
      });
    });

    const $addDocuments = navigator.querySelectorAll('.document-add');
    [].forEach.call($addDocuments, ($addDocument) => {
      $addDocument.addEventListener(EVENT.CLICK, (e) => {
        e.stopPropagation();
        const targetDocumentId = e.target.closest('.document').getAttribute('key');
        addDocument(targetDocumentId);
      });
    });

    const $deleteDocuments = navigator.querySelectorAll('.document-delete');
    [].forEach.call($deleteDocuments, ($deleteDocument) => {
      $deleteDocument.addEventListener(EVENT.CLICK, (e) => {
        e.stopPropagation();
        const targetDocumentId = e.target.closest('.document').getAttribute('key');
        const openedDocuments = this.state.openedDocuments.filter(
          (key) => key !== targetDocumentId,
        );
        this.setState({ openedDocuments });
        setItem(STORAGE_KEY.OPENED_DOCUMENTS, this.state.openedDocuments);
        deleteDocument(targetDocumentId);
      });
    });

    const $documents = navigator.querySelectorAll('.document.document-item');
    [].forEach.call($documents, ($document) => {
      $document.addEventListener(
        EVENT.CLICK,
        (e) => {
          e.stopImmediatePropagation();
          const targetDocumentId = $document.getAttribute('key');
          openDocument(targetDocumentId);
        },
        false,
      );
    });

    const $scroller = navigator.querySelector('.scroller');
    $scroller.addEventListener(EVENT.SCROLL, (e) => {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;
      if (scrollTop === 0 || scrollTop + offsetHeight === scrollHeight) {
        $scroller.style.boxShadow = 'transparent 0px 0px 0px inset';
      } else {
        $scroller.style.boxShadow = 'inset 0px 1px 0px rgba(55, 53, 47, 0.09)';
      }
    });

    const $header = navigator.querySelector('.navigator-header');
    $header.addEventListener(EVENT.CLICK, (e) => push('/'));
  };

  this.render = () => {
    navigator.innerHTML = `
        <div class='navigator-header'>${TEXT.DEFAULT_HEADER}</div>
        <div class='scroller'>
          <div class='documents-wrapper'>
            ${getDocuments(this.state.documents)}
          </div>
          <div class='document document-add flex-row'>
            ${plusIcon}
            <div class='document-add-text'>${TEXT.DOCUMENT_ADD}</div>
          </div>
        </div>
      `;
    this.setEvent();
  };

  this.render();
}

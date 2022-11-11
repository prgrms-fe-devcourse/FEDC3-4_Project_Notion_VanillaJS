import Icon from './icons/index.js';
import { setItem } from '../utils/storage.js';
import { STORAGE_KEY, TEXT, DEGREE } from '../utils/constants.js';

export default function Navigator({
  target,
  initialState = { openedDocuments: [], documents: [] },
}) {
  const navigator = document.createElement('div');
  navigator.classList.add('navigator', 'flex-item');

  const documentIcon = Icon({ icon: 'document' });
  const chevronIcon = Icon({ icon: 'chevron' });
  const chevronDownIcon = Icon({ icon: 'chevron', rotateDegree: DEGREE.OPENED });

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
              <div key=${id} class='document flex-row' style='padding-left: ${depth}rem; display: ${
              depth === 0 || isOpened || opened ? 'flex' : 'none'
            };'>
                <div class='icon-wrapper'>${isOpened ? chevronDownIcon : chevronIcon}</div>
                <div class='icon-wrapper'>${documentIcon}</div>
                ${title}
              </div>
              ${getDocuments(documents, depth + 1, isOpened)}
            `;
          })
          .join('')}
      </div>
    `;
  };

  this.render = () => {
    navigator.innerHTML = `
      <div class='navigator-header'>${TEXT.DEFAULT_HEADER}</div>
      <div class='documents-wrapper'>
        ${getDocuments(this.state.documents)}
      </div>
    `;
  };

  this.render();

  const chevrons = navigator.querySelectorAll('.chevron');
  [].forEach.call(chevrons, (chevron) => {
    chevron.addEventListener('click', (e) => {
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
}

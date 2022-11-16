import { createDOMElement } from '../../util/createDomeElem.js';

export function DocumentAdd({ $target, onAddDocument }) {
    const $documentAdd = createDOMElement({
        tagName: 'button',
        attrs: [
            { attr: 'class', value: 'document-add-btn' },
            { attr: 'textContent', value: '+ 새 페이지' }]
    });

    const removeEventListener = () => {
        $documentAdd.addEventListener('click', async () => {
            await onAddDocument({ docId: null });
        });
    }

    this.render = () => {
        $target.appendChild($documentAdd);
    }

    removeEventListener();
}

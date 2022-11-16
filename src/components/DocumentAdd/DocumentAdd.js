import { createDOMElement } from '../../util/createDomeElem.js';

/**
 * DocumentAdd
 *
 * 문서 추가 컴포넌트
 *
 * @param {*} param0
 */
export function DocumentAdd({ $target, onAddDocument }) {
	const $documentAdd = createDOMElement({
		tagName: 'button',
		attrs: [
			{ attr: 'class', value: 'document-add-btn' },
			{ attr: 'textContent', value: '+ 새 페이지' },
		],
	});

	const addEvents = () => {
		$documentAdd.addEventListener('click', async () => {
			await onAddDocument({ docId: null });
		});
	};

	this.render = () => {
		$target.appendChild($documentAdd);
	};

	addEvents();
}

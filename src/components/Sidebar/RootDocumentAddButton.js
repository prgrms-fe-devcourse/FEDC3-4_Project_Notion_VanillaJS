import { createElement } from '../../utils/createElement.js';

export default function RootDocumentAddButton({ $target, onClickAddButton }) {
	const $div = createElement({
		element: 'div',
		$target,
		className: 'root-document-add-button',
	});

	this.render = () => {
		$div.innerHTML = `
			<img data-action='add' src='./src/assets/images/addButton.svg'>
			<div>새 문서 만들기</div>
		`;
	};

	this.render();

	$div.addEventListener('click', () => {
		onClickAddButton()
	});
}

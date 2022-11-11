import { createElement } from '../../utils/createElement.js';

export default function DocumentList({ $target, initialState }) {
	const $documentList = createElement({
		element: 'div',
		$target,
		className: 'document-list',
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$documentList.innerHTML = `
      ${this.state.map((document) => `<div>${document.title}</div>`).join('')}
    `;
	};
}

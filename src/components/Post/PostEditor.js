import { createElement } from '../../utils/createElement.js';

export default function PostEditor({ $target, initialState }) {
	const $div = createElement({ element: 'div', $target, className: 'editor' });
	const $title = createElement({
		element: 'input',
		$target: $div,
		className: 'editor-title',
		attributes: {
			type: 'text',
			name: 'title',
		},
	});
	const $content = createElement({
		element: 'div',
		$target: $div,
		className: 'editor-content',
		attributes: {
			contentEditable: true,
			name: 'content',
		},
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
		// $title.focus();
	};

	this.render = () => {};

	// this.init = () => {
	// 	$title.focus();
	// };

	// this.init();
}

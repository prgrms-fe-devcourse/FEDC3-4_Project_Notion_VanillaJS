import { createElement } from '../../utils/createElement.js';

export default function Header({ $target, initialState }) {
	const $header = createElement({element: 'header', $target, content: 'Metamong'})

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {};
}

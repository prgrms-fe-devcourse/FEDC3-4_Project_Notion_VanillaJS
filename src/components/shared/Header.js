import { createElement } from '../../utils/createElement.js';
import { push } from '../../utils/router.js';

export default function Header({ $target, initialState }) {
	const $header = createElement({element: 'header', $target, content: initialState || 'Metamong'})

	this.state = initialState

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$header.innerHTML = `
			${this.state}
		`
	};
	
	if ($target.tagName === 'NAV') {
		$header.addEventListener('click', () => {
			push('/');
		})
	}
}

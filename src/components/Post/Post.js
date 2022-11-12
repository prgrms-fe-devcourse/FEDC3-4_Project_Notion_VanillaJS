import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';

export default function Post({ $target, initialState }) {
	const $article = createElement({
		element: 'article',
		$target,
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		console.log(this.state.currentPath);
		header.setState(this.state.currentPath);
	};

	this.render = () => {};

	const header = new Header({
		$target: $article,
		initialState: this.state?.currentPath,
	});
}

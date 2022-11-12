import { createElement } from '../../utils/createElement.js';

export default function Post({ $target, initialState }) {
	const $article = createElement({
		element: 'article',
		$target,
	});
	
	this.state = initialState;
	
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	}
	
	this.render = () => {
		$article.textContent = this.state;
	}
}

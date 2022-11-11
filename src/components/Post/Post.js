import { createElement } from '../../utils/createElement.js';

export default function Post({ $target, initialState }) {
	const $article = createElement({
		element: 'article',
		$target,
		content: 'Post',
	});
}

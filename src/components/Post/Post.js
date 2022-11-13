import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import PostEditor from './PostEditor.js';

export default function Post({ $target, initialState }) {
	const $article = createElement({
		element: 'article',
		$target,
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		header.setState(this.state.currentPath);
		postEditor.setState(this.state.id);
	};

	const header = new Header({
		$target: $article,
		initialState: this.state?.currentPath,
	});

	const postEditor = new PostEditor({ $target: $article });
}

import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import NotFound from './NotFound.js';
import PostEditor from './PostEditor.js';

export default function Post({ $target, initialState }) {
	const $article = createElement({
		element: 'article',
		$target,
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		const { currentPath, id } = this.state;
		header.setState(currentPath);

		// todo : 야매로 한 것 같다...
		if (id) {
			document.querySelector('.editor').style.display = 'flex';
			document.querySelector('.not-found').style.display = 'none';
			postEditor.setState(id);
		} else {
			document.querySelector('.editor').style.display = 'none';
			document.querySelector('.not-found').style.display = 'block';
			notFound.render();
		}
	};

	const header = new Header({
		$target: $article,
		initialState: this.state?.currentPath,
	});

	const postEditor = new PostEditor({ $target: $article });

	const notFound = new NotFound({ $target: $article });
}

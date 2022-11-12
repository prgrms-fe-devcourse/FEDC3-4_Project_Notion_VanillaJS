import Post from './components/Post/Post.js';
import Sidebar from './components/SideBar/SideBar.js';
import { createElement } from './utils/createElement.js';
import { initRouter } from './utils/router.js';

export default function App({ $target, initialState }) {
	const $main = createElement({ element: 'main', $target });

	this.state = initialState;

	this.route = () => {
		const { pathname, search } = window.location;
		const [, id] = pathname.split('/');
		const queryString = new URLSearchParams(search);

		post.setState({
			id,
			currentPath: queryString.get('currentPath') || 'Metamong',
		});
	};

	this.init = async () => {
		this.route();
	};

	const sidebar = new Sidebar({ $target: $main });
	const post = new Post({ $target: $main, initialState });

	this.init();
	initRouter(() => {
		this.route();
	});
}

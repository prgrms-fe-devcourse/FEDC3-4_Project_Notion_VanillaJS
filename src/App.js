import Post from './components/Post/Post.js';
import Sidebar from './components/SideBar/SideBar.js';
import { getContentOfDocument, getRootDocuments } from './utils/api/apis.js';
import { createElement } from './utils/createElement.js';
import { initRouter } from './utils/router.js';

/**
 * state: {
 * 	rootDocuments: array,
 * 	currentPath: string,
 * 	id: string | number
 * }
 */
export default function App({ $target, initialState }) {
	const $main = createElement({ element: 'main', $target });

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		sidebar.setState(this.state.rootDocuments);
	};

	this.route = async () => {
		// todo : 모듈화 필요
		const { pathname, search } = window.location;
		const [, id] = pathname.split('/');
		const queryString = new URLSearchParams(search);
		const { title, content } = await getContentOfDocument(id);

		post.setState({
			id,
			currentPath: queryString.get('currentPath') || 'Metamong',
			title,
			content,
		});
	};

	this.init = async () => {
		this.route();
		const rootDocuments = await getRootDocuments();
		sidebar.setState(rootDocuments);
	};

	const sidebar = new Sidebar({ $target: $main });
	const post = new Post({
		$target: $main,
		initialState,
		onChangeTitle: async () => {
			const nextRootDocuments = await getRootDocuments();
			this.setState({
				...this.state,
				rootDocuments: nextRootDocuments,
			});
		},
	});

	this.init();
	initRouter(async () => {
		this.route();
	});
}

import Post from './components/Post/Post.js';
import Sidebar from './components/SideBar/SideBar.js';
import {
	createDocument,
	getContentOfDocument,
	getRootDocuments,
} from './utils/api/apis.js';
import { createElement } from './utils/createElement.js';
import { initRouter, historyReplace } from './utils/router.js';

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
		const { pathname, search } = window.location;
		const [, id] = pathname.split('/');
		// todo : 모듈화 필요
		const queryString = new URLSearchParams(search);
		const { title, content } = await getContentOfDocument(id);

		post.focus();
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

	const sidebar = new Sidebar({
		$target: $main,
		onClickAddButton: async () => {
			await createDocument({ title: '제목 없음' });
			const nextRootDocuments = await getRootDocuments();
			this.setState({
				...this.state,
				rootDocuments: nextRootDocuments,
			});
		},
	});
	const post = new Post({
		$target: $main,
		initialState,
		onChangeTitle: async (id, changedCurrentPath) => {
			const nextRootDocuments = await getRootDocuments();
			this.setState({
				...this.state,
				rootDocuments: nextRootDocuments,
			});
			historyReplace(`${id}?currentPath=${changedCurrentPath}`);
		},
	});

	this.init();
	initRouter(async () => {
		this.route();
	});
}

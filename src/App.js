import Post from './components/Post/Post.js';
import Sidebar from './components/SideBar/SideBar.js';
import {
	createDocument,
	getContentOfDocument,
	getRootDocuments,
} from './utils/api/apis.js';
import { createElement } from './utils/createElement.js';
import { initRouter, historyReplace, historyPush } from './utils/router.js';

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
		// todo : 이 부분 좀 억지같다...
		const [, id] = pathname.split('/');
		// todo : 모듈화 필요
		const queryString = new URLSearchParams(search);

		// todo : 존재하지 않는 id이면 Home으로 리다이렉팅 필요
		if (id) {
			const {
				title,
				content,
				documents: subDocuments,
			} = await getContentOfDocument(id);

			post.focus();
			post.setState({
				id,
				currentPath: queryString.get('currentPath'),
				title,
				content,
				subDocuments,
			});
		} else {
			post.setState({
				...post.state,
				id: undefined,
				currentPath: 'Metamong',
				subDocuments: [],
			});
		}
		
		// console.log(document.querySelector(`[data-id='${id}']`))
		document.querySelector('.selected')?.classList.remove('selected');
		if (pathname === '/') document.querySelector('header').classList.add('selected');
		else document.querySelector(`[data-id='${id}']`).classList.add('selected');
	};

	this.init = async () => {
		const rootDocuments = await getRootDocuments();
		sidebar.setState(rootDocuments);
		this.route();
	};

	const sidebar = new Sidebar({
		$target: $main,
		onClickRootAddButton: async () => {
			const createdDocument = await createDocument({ title: '제목 없음' });
			const nextRootDocuments = await getRootDocuments();
			this.setState({
				...this.state,
				rootDocuments: nextRootDocuments,
			});
			historyPush(`${createdDocument.id}?currentPath=${createdDocument.title}`);
		},
		onClickDocumentItem: (nextRootDocuments) => {
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

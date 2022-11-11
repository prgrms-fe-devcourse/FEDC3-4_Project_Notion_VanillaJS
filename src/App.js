import Post from './components/Post/Post.js';
import Sidebar from './components/SideBar/SideBar.js';
import { getContentOfDocument } from './utils/api/api.js';
import { createElement } from './utils/createElement.js';

export default function App({ $target, initialState }) {
	const $main = createElement({ element: 'main', $target });

	this.state = initialState;

	this.route = () => {
		const { pathname } = window.location;
		const [, documentId] = pathname.split('/');

		if (documentId.length > 0) document.setState(documentId);
	};

	this.init = async () => {
		this.route();
    
		const rootDocuments = await getContentOfDocument();
    sidebar.setState(rootDocuments);
	};

	const sidebar = new Sidebar({ $target: $main });
	const post = new Post({ $target: $main });

	this.init();
}

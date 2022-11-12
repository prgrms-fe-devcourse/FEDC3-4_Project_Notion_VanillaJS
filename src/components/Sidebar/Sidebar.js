import { getRootDocuments } from '../../utils/api/api.js';
import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import DocumentList from './DocumentList.js';

/**
 *
 * @param {{$target: HTMLElement, initialState: Array}}
 */
export default function Sidebar({ $target, initialState }) {
	const $nav = createElement({ element: 'nav', $target });
	const header = new Header({ $target: $nav });
	const documentList = new DocumentList({
		$target: $nav,
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = async () => {
		const rootDocuments = await getRootDocuments();
		documentList.setState(rootDocuments);
	};

	this.render();
}

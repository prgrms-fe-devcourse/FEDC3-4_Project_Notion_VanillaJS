import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import DocumentList from './DocumentList.js';
import RootDocumentAddButton from './RootDocumentAddButton.js';

/**
 * state: array
 */
export default function Sidebar({ $target, initialState, onClickAddButton }) {
	const $nav = createElement({ element: 'nav', $target });
	const header = new Header({ $target: $nav });
	const documentList = new DocumentList({
		$target: $nav,
	});
	const rootDocumentAddButton = new RootDocumentAddButton({
		$target: $nav,
		onClickAddButton,
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		documentList.setState(this.state);
	};
}

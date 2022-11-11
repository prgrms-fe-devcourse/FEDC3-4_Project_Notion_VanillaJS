import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import DocumentList from './DocumentList.js';

export default function Sidebar({ $target, initialState }) {
	const $nav = createElement({ element: 'nav', $target });
	const header = new Header({ $target: $nav });
	const documentList = new DocumentList({ $target: $nav });

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		
		documentList.setState(this.state);	
	};
}

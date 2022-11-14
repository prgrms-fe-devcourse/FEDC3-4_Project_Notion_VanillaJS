import { createDocument } from '../../utils/api/apis.js';
import { getRootDocuments } from '../../utils/api/apis.js';
import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import DocumentList from './DocumentList.js';
import RootDocumentAddButton from './RootDocumentAddButton.js';

/**
 * state: array
 */
export default function Sidebar({ $target, initialState }) {
	const $nav = createElement({ element: 'nav', $target });
	const header = new Header({ $target: $nav });
	const documentList = new DocumentList({
		$target: $nav,
	});
	const rootDocumentAddButton = new RootDocumentAddButton({
		$target: $nav,
		onClickAddButton: async () => {
			// todo : 모듈화 필요
			await createDocument({ title: '제목 없음' });
			const nextRootDocuments = await getRootDocuments();
			documentList.setState(nextRootDocuments);
		},
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		documentList.setState(this.state);
	};
}

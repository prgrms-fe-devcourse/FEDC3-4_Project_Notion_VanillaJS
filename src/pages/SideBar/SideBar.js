import { DocumentList, DocumentAdd } from '../../components/index.js';
import { createDOMElement } from '../../util/createDomeElem.js';

/**
 * SideBar
 *
 * 사이드바 컴포넌트, App에서 받아온 document의 목록을 랜더링
 *
 * @param {HTMLDivElement} $target
 * @param {Object} initialState
 * @param {Function} onClickDocument,
 * @param {Function} onAddDocument
 * @param {Function} onDeleteDocument
 *
 *
 */
export function SideBar({
	$target,
	documents,
	onClickDocument,
	onAddDocument,
	onDeleteDocument,
}) {
	let state = documents;
	const $sideBar = createDOMElement({ tagName: 'aside' });
	const documentList = new DocumentList({
		$target: $sideBar,
		onClickDocument,
		onAddDocument,
		onDeleteDocument,
	});
	const documentAdd = new DocumentAdd({
		$target: $sideBar,
		onAddDocument,
	});

	this.render = () => {
		$target.appendChild($sideBar);
		documentList.render({ document: state });
		documentAdd.render();
	};

	this.setState = ({ nextState, openState }) => {
		state = nextState;
		documentList.setState({ nextState: state, openState });
	};
}

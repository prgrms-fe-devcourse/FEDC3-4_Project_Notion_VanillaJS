import {
	DocumentEdit,
	DocumentRoot,
	NotFound,
} from '../../components/index.js';
import { initRouter } from '../../router.js';
import { createDOMElement } from '../../util/createDomeElem.js';

/**
 * DocumentPage
 *
 * App에서 받아온 document를 랜더링하는 컴포넌트
 *
 * @param {HTMLDivElement} $target
 * @param {Object} initialState
 * @param {Function} onGetOneDocument
 * @param {Function} onEditDocument
 *
 */
export function DocumentPage({ $target, onGetOneDocument, onEditDocument }) {
	const $documentPage = createDOMElement({ tagName: 'section' });
	const documentRoot = new DocumentRoot({ $target: $documentPage });
	const documentEdit = new DocumentEdit({
		$target: $documentPage,
		onEditDocument,
	});
	const notFound = new NotFound({ $target: $documentPage });

	const router = async () => {
		const { pathname } = window.location;

		// 가장 기본 페이지
		if (pathname === '/') {
			documentRoot.render();
			return;
		}

		// /documents/:id에 해당한다면 해당 id의 문서를 랜더링
		if (pathname.includes('/documents/')) {
			const documentId = pathname.split('/').at(-1);
			const document = await onGetOneDocument({ docId: documentId });

			if (document) {
				documentEdit.render({ state: document });
				return;
			}

			// 없는 문서라면 notFound를 랜더링
			notFound.render();
			return;
		}

		// 위의 경우가 아니라면 notFound를 랜더링
		notFound.render();
	};

	this.render = () => {
		$target.appendChild($documentPage);
		router();
		initRouter({ router: () => router() });
	};
}

import { createDOMElement } from '../../util/index.js';
import { push } from '../../router.js';
import img from '../../public/images/document.png';

/**
 * DocumentList
 *
 * 문서 목록을 랜더링하는 컴포넌트
 *
 * @param {HTMLDivElement} $target
 * @param {Object} initialState
 * @param {Function} onClickDocument
 * @param {Function} onAddDocument
 * @param {Function} onDeleteDocument
 */
export function DocumentList({
	$target,
	onClickDocument,
	onAddDocument,
	onDeleteDocument,
}) {
	let state = [];
	const $documentList = createDOMElement({
		tagName: 'div',
		attrs: [{ attr: 'class', value: 'document-list' }],
	});

	const makeDocumentTree = ({ id, title, documents, margin }) => {
		return `
            <details id="detail-${id}" style="margin-left:${margin}px" ${
			state.includes(String(id)) && 'open'
		}>
                <summary class="toggle" data-index="${id}">
                <img class="doc-img" src="${img}" alt="doc-img"/>
                <span>${title ? title : '제목 없음'}</span>
                <span class="option-container">
                    <input type="button" class="option-btn remove" />
                    <input type="button" class="option-btn add" />
                </span>
                </summary>
                ${
									documents.length
										? documents
												.map(({ id, title, documents }) =>
													makeDocumentTree({
														id,
														title,
														documents,
														margin: margin + 10,
													}),
												)
												.join('')
										: `<p style="margin-left:${
												margin + 5
										  }px">하위 페이지가 없습니다.</p>`
								}
            </details>
        `;
	};

	const generateHTML = ({ document }) => {
		return `
            <h1>Documents</h1>
            ${document
							.map(({ id, title, documents }) => {
								let margin = 0;
								return makeDocumentTree({ id, title, documents, margin });
							})
							.join('')}
        `;
	};

	/**
	 * registerEvents 이벤트 핸들러
	 *
	 * documentList에서 일어나는 이벤트를 처리하는 함수
	 */
	const registerEvents = () => {
		/**
		 * 문서를 클릭했을 때 발생하는 이벤트
		 */
		$documentList.addEventListener('click', async e => {
			const { target } = e;
			const tagName = target.tagName;
			const summary = target.closest('summary');

			// 상단 Documents 클릭 시 루트 페이지로 이동
			if (tagName === 'H1') {
				push({ nextUrl: '/' });
				return;
			}

			// 문서 클릭시 해당 문서로 이동
			if (summary && tagName !== 'INPUT') {
				const { index } = summary.dataset;
				push({ nextUrl: `/documents/${index}` });

				await onClickDocument({ docId: index });
				return;
			}

			// 문서 추가 버튼 또는 삭제 버튼 클릭 시
			if (tagName === 'INPUT') {
				const { classList } = target;
				const { index } = summary.dataset;

				// 문서 삭체 버튼시
				if (classList.contains('remove')) {
					if (confirm('삭제하시겠습니까?')) {
						await onDeleteDocument({ docId: index });

						const rootParent = summary.closest('details').parentNode?.id;

						alert('삭제되었습니다.');

						// 상위 문서가 남아 있다면 상위 문서를 열어준다 아니라면 루트 페이지로 이동
						if (rootParent) {
							const routePath = rootParent.split('-').at(-1);
							push({ nextUrl: `/documents/${routePath}` });
						} else {
							push({ nextUrl: '/' });
						}
					}
					return;
				}

				// 문서 추가 버튼시
				if (classList.contains('add')) {
					await onAddDocument({ docId: index });
					return;
				}
			}
		});
	};

	this.render = ({ document }) => {
		$documentList.innerHTML = generateHTML({ document });
		$target.appendChild($documentList);
	};

	this.setState = ({ nextState, openState }) => {
		state = [...openState];
		$documentList.innerHTML = generateHTML({ document: nextState });
	};

	registerEvents();
}

import { createDOMElement } from '../../util/index.js';
import { push } from '../../router.js';
import img from '../../public/images/document.png';

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

	const registerEvents = () => {
		$documentList.addEventListener('click', async e => {
			const { target } = e;
			const tagName = target.tagName;
			const summary = target.closest('summary');

			if (tagName === 'H1') {
				push({ nextUrl: '/' });
				return;
			}

			if (summary && tagName !== 'INPUT') {
				const { index } = summary.dataset;
				push({ nextUrl: `/documents/${index}` });

				await onClickDocument({ docId: index });
				return;
			}

			if (tagName === 'INPUT') {
				const { classList } = target;
				const { index } = summary.dataset;

				if (classList.contains('remove')) {
					if (confirm('삭제하시겠습니까?')) {
						await onDeleteDocument({ docId: index });

						const rootParent = summary.closest('details').parentNode?.id;

						alert('삭제되었습니다.');

						if (rootParent) {
							const routePath = rootParent.split('-').at(-1);
							push({ nextUrl: `/documents/${routePath}` });
						} else {
							push({ nextUrl: '/' });
						}
					}
					return;
				}

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

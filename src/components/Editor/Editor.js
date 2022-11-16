import { $ } from '../../util/index.js';
import { push } from '../../router.js';
import img from '../../public/images/document.png';

export function Editor({
	$target,
	compareStateWithStoredState,
	storeAtStorageWhileInput,
	onEditDocument,
}) {
	let isRendered = false;
	let state = { title: '', content: '' };

	const generateHTML = () => {
		return `
            <input type="text" name="title" class="document-edit-input" placeholder="제목 없음" autofocus />
            <textarea class="document-edit-textarea" name="content" placeholder="내용 없음"></textarea>
            <div class="sub-document"></div>
        `;
	};

	const registerInputEvent = () => {
		$target.addEventListener('input', async e => {
			state = {
				...state,
				[e.target.name]: e.target.value,
				updatedAt: new Date(),
			};
			await storeAtStorageWhileInput({ state });
			await onEditDocument({ docId: state.id, content: state });
		});

		$target.addEventListener('click', ({ target }) => {
			const { tagName } = target;

			if (tagName === 'BUTTON') {
				const id = target.dataset.index;
				push({ nextUrl: `/documents/${id}` });
			}
		});
	};

	const refelectDocumentValue = async ({ nextState }) => {
		if (!isRendered) {
			$target.innerHTML = generateHTML();
			isRendered = true;
		}

		const $title = $({ selector: '.document-edit-input' });
		const $content = $({ selector: '.document-edit-textarea' });
		const $subDocument = $({ selector: '.sub-document' });

		state = await compareStateWithStoredState({
			nextState,
			state,
		});

		const { title, content, documents } = state;

		$title.value = title;
		$content.value = content ? content : '';
		$subDocument.innerHTML = documents
			.map(({ id, title }) => {
				return `
            <button class="sub-document-item" data-index="${id}">
                <img class="doc-img" src="${img}" altx="doc-img"/>
                ${title ? title : '제목없음'}
            </button>`;
			})
			.join('');
	};

	this.render = ({ state }) => {
		$target.innerHTML = generateHTML();
		refelectDocumentValue({ nextState: state });
	};

	registerInputEvent();
}

import { Editor } from '../Editor/Editor.js';
import { getDocument, setDocument, removeDocument } from '../../util/index.js';
import { debounce } from '../../util/index.js';

/**
 * DocumentEdit
 *
 * 문서를 수정하는 컴포넌트
 *
 * @param {HTMLDivElement} $target
 * @param {Function} onEditDocument
 */
export function DocumentEdit({ $target, onEditDocument }) {
	/**
	 * compareStateStoredState
	 *
	 * 현재 state와 저장된 state를 비교하여 state를 최신화 해줌
	 *
	 * @param {HTMLDivElement} $target
	 * @param {Function} onEditDocument
	 * @returns
	 */
	const compareStateWithStoredState = async ({ nextState, state }) => {
		const { id } = nextState;
		const key = `document-${id}`;

		const storedState = getDocument(key);

		if (
			storedState &&
			storedState.updatedAt > nextState.updatedAt &&
			confirm('이미 저장된 내용이 있습니다. 저장하시겠습니까?')
		) {
			const { id, title, content } = storedState;

			await onEditDocument({ docId: id, content: { title, content } });

			removeDocument(key);

			return { ...state, ...storedState };
		}

		return { ...state, ...nextState };
	};

	const storeAtStorageWhileInput = ({ state }) => {
		const { id } = state;
		const key = `document-${id}`;

		setDocument(key, state);
	};

	const editor = new Editor({
		$target,
		compareStateWithStoredState,
		storeAtStorageWhileInput: debounce(storeAtStorageWhileInput, 800),
		onEditDocument: debounce(onEditDocument, 1000),
	});

	this.render = ({ state }) => {
		editor.render({ state });
	};
}

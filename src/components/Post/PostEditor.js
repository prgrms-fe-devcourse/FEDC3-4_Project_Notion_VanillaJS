import { updateDocument } from '../../utils/api/apis.js';
import { createElement } from '../../utils/createElement.js';
import {
	historyPush,
	historyReplace,
	ROUTE_CHANGE_EVENT_NAME,
} from '../../utils/router.js';

/**
 * state: {
 *  title: string,
 *  content: string
 * }
 */
export default function PostEditor({
	$target,
	initialState,
	onChangeTitleAndCurrentPath,
}) {
	const $div = createElement({ element: 'div', $target, className: 'editor' });
	const $title = createElement({
		element: 'input',
		$target: $div,
		className: 'editor-title',
		attributes: {
			type: 'text',
			name: 'title',
		},
	});
	const $content = createElement({
		element: 'div',
		$target: $div,
		className: 'editor-content',
		attributes: {
			contentEditable: true,
			name: 'content',
		},
	});

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { title, content } = this.state;
		$title.value = title;
		$content.innerHTML = content;
	};

	this.focus = () => {
		$title.focus();
	};

	$title.addEventListener('input', async (event) => {
		event.preventDefault();
		const changedTitle = $title.value;
		const { id } = this.state;
		// todo : 모듈화 필요
		const queryString = new URLSearchParams(window.location.search);
    // ' > '로 split 하면 title을 완전히 지웠을 떄 마지막 요소가 사라져서 이전의 것이 변경된다.
    // 따라서 ' >' 으로 뒤에 ' '과 같이 공백을 한 개 남겨놔야 한다.
		const currentPath = queryString.get('currentPath').split(' >');
		currentPath[currentPath.length - 1] = changedTitle;
		const changedCurrentPath = `${currentPath.join(' > ')}`;

		await updateDocument(id, { title: changedTitle });
		onChangeTitleAndCurrentPath(id, changedCurrentPath);
	});

	$content.addEventListener('keyup', async (event) => {
		await updateDocument(this.state.id, { content: $content.innerHTML });
	});
}

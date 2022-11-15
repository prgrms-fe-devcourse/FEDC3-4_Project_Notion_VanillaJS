import { updateDocument } from '../../utils/api/apis.js';
import changeCurrentPath from '../../utils/changeCurrentPath.js';
import { createElement } from '../../utils/createElement.js';
import debounce from '../../utils/debounce.js';

const INIT_DEBOUNCE_TIME = 750;

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

	$title.addEventListener(
		'input',
		debounce(async () => {
			const changedTitle = $title.value;
			const { id } = this.state;
			const changedCurrentPath = changeCurrentPath(changedTitle);

			await updateDocument(id, { title: changedTitle });
			onChangeTitleAndCurrentPath(id, changedCurrentPath);
		}, INIT_DEBOUNCE_TIME)
	);

	$content.addEventListener(
		'input',
		debounce(async () => {
			await updateDocument(this.state.id, { content: $content.innerHTML });
		}, INIT_DEBOUNCE_TIME)
	);
}

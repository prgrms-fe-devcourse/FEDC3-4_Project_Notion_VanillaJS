import { updateDocument } from '../../utils/api/apis.js';
import { createElement } from '../../utils/createElement.js';
import { push, replace, ROUTE_CHANGE_EVENT_NAME } from '../../utils/router.js';

/**
 * state: {
 *  title: string,
 *  content: string
 * }
 */
export default function PostEditor({ $target, initialState, onChangeTitle }) {
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
    const {title, content} = this.state;
    $title.value = title;
    $content.innerHTML = content;
  };

  $title.addEventListener('keyup', async (event) => {
    // const [, id] = window.location.pathname.split('/');
    // await updateDocument(id, {title: $title.value});
    // onChangeTitle();
    // const splitedQueryString = decodeURI(window.location.search).split('>');
    // splitedQueryString[splitedQueryString.length - 1] = ` ${$title.value}`;
    // replace(`${splitedQueryString.join(' > ')}`)
    await updateDocument(this.state.id, {title: $title.value});
    onChangeTitle();
  })
  
  $content.addEventListener('keyup', async (event) => {
    await updateDocument(this.state.id, {content: $content.innerHTML});
  })
}

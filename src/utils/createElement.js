const INIT_PADDING_LEFT = 14;

export const createElement = ({
	element,
	$target,
	className = '',
	content = '',
}) => {
	const $element = document.createElement(element);
	$element.textContent = content;

	if (className) $element.className = className;
	if ($target) $target.appendChild($element);

	return $element;
};

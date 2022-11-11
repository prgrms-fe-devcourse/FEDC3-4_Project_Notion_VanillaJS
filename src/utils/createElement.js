export const createElement = ({
	element,
	$target,
	className = '',
	content = '',
}) => {
	const $element = document.createElement(element);
	$element.innerHTML = content;

	if (className) $element.className = className;
	if ($target) $target.appendChild($element);

	return $element;
};

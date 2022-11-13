const createElement = ({
	element,
	$target,
	className = '',
	content = '',
	attributes,
}) => {
	const $element = document.createElement(element);
	$element.textContent = content;

	if (className) $element.className = className;
	if ($target) $target.appendChild($element);
	if (attributes) {
		Object.entries(attributes).forEach(([key, value]) => {
			$element.setAttribute(key, value);
		});
	}

	return $element;
};

export { createElement };

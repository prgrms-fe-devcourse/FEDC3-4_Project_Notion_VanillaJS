export const createElement = ({element, $target, className = '', content = ''}) => {
	const $element = document.createElement(element);
	$element.className = className;
	$element.innerHTML = content;
  
  if ($target) $target.appendChild($element);

	return $element;
};

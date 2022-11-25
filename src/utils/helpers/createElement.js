const createElement = ({
  element,
  $target,
  className = '',
  id = '',
  content = '',
  attributes,
}) => {
  const $element = document.createElement(element);

  if ($target) $target.appendChild($element);
  if (className) $element.className = className;
  if (id) $element.id = id;
  if (content) $element.textContent = content;
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      $element.setAttribute(key, value);
    });
  }

  return $element;
};

export { createElement };

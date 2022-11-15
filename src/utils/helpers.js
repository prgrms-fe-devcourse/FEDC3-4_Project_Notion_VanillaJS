const createElementHelper = (tagName, ...options) => {
  const $element = document.createElement(tagName);

  if (options.length) {
    options.forEach(option => {
      const attributeName = option.substring(1);

      if (option[0] === '#') {
        $element.setAttribute('id', attributeName);
      } else {
        $element.classList.add(attributeName);
      }
    });
  }

  return $element;
};

export default createElementHelper;

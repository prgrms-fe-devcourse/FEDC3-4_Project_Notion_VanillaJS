export const createDOMElement = ({ tagName, attrs = null }) => {
  const element = document.createElement(tagName);
  attrs &&
    attrs.forEach(({ attr, value }) => {
      attr !== 'textContent'
        ? element.setAttribute(attr, value)
        : (element.textContent = value);
    });
  return element;
};

export const removeElementBySelector = ($selector) => {
  const $element = document.querySelector($selector);
  if ($element) {
    $element.remove();
  }
};

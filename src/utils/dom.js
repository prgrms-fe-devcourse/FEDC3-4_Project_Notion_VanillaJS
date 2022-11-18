const findDocumentElement = (id) => {
  return document.querySelector(`[data-document-id="${id}"]`);
};

const removeElementClass = (selector, className) => {
  document.querySelectorAll(selector).forEach((item) => item.classList.remove(className));
};

export { findDocumentElement, removeElementClass };

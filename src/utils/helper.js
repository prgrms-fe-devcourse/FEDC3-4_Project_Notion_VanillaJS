const findDocumentElement = (id) => {
  return document.querySelector(`[data-document-id="${id}"]`);
};

const removeElementClass = (selector, className) => {
  document.querySelectorAll(selector).forEach((item) => item.classList.remove(className));
};

const createRootDocumentsElement = (documents) => {
  return documents
    .map(({ id }) => `<div id="document-root" data-document-id=${id}></div>`)
    .join("");
};

const createDocumentsListElement = (documents) => {
  return documents.length
    ? documents.map(({ id }) => `<li data-document-id=${id}></li>`).join("")
    : `<span id="document-item" class="nopage">No pages inside</span>`;
};

export {
  findDocumentElement,
  removeElementClass,
  createRootDocumentsElement,
  createDocumentsListElement,
};

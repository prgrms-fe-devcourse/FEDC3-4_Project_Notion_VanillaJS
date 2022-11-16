const $rootDocuments = (documents) => {
  return documents
    .map(({ id }) => `<div id="document-root" data-document-id=${id}></div>`)
    .join("");
};

const $documentsList = (documents) => {
  return documents.length
    ? documents.map(({ id }) => `<li data-document-id=${id}></li>`).join("")
    : `<span id="document-item" class="nopage">No pages inside</span>`;
};

export { $rootDocuments, $documentsList };

const findDocumentElement = (id) => {
  return document.querySelector(`[data-document-id="${id}"]`);
};

export { findDocumentElement };

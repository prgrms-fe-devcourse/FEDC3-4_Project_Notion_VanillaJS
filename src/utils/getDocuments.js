export const getDocumentsByKeyword = (array, documents, keyword) => {
  if (documents.length === 0) return array;
  documents.map((document) => {
    if (document.title.includes(keyword)) array.push({ id: document.id, title: document.title });
    if (document.documents.length > 0) getDocumentsByKeyword(array, document.documents, keyword);
  });
  return array;
};

export const getLowerDocuments = (from, documents) => {
  if (!documents || documents.length === 0) {
    from.querySelector('[name=footer]').style.display = 'none';
    return '';
  }

  from.querySelector('[name=footer]').style.display = 'flex';
  return `
      ${documents
        .map(({ id, title }) => {
          return `<div key=${id} class='document-link'>${title}</div>`;
        })
        .join('')}
    `;
};

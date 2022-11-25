export const getDocumentsByKeyword = (array, childDocuments, keyword) => {
  if (childDocuments.length === 0) return array;
  childDocuments.map(({ title, id, documents }) => {
    if (title.includes(keyword)) array.push({ id, title });
    if (documents.length > 0) getDocumentsByKeyword(array, documents, keyword);
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

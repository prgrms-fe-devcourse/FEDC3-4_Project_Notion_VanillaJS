const DocumentList = (documentList = []) => {
  return documentList
    .map(
      ({ id, title, documents, isOpen }) =>
        `
				<li data-id=${id}>
					<button id="toggle">></button>
					<span>${title}</span>
					<button id="delete">X</button>
					<button id="add">+</button>
					<ul class=${isOpen ? '' : 'hide'}>
						${documents.length ? DocumentList(documents) : '<span>하위 페이지 없음</span>'}
					</ul>
				</li>
				`
    )
    .join('');
};

export default DocumentList;

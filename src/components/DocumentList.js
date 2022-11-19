const DocumentList = (documentList = []) => {
  return documentList
    .map(
      ({ id, title, documents, isOpen }) =>
        `
				<li data-id=${id} class="document">
					<div class="document-preview">
						<div>
							<button id="toggle" class=${isOpen ? 'clicked' : ''}>▶</button>
							<span class="document-title">${title}</span>
						</div>
						<div class="document-buttons">
							<button id="delete">X</button>
							<button id="add">+</button>
						</div>
					</div>
					<ul class=${isOpen ? '' : 'hide'}>
						${documents.length ? DocumentList(documents) : '<span class="document">하위 페이지 없음</span>'}
					</ul>
				</li>
				`
    )
    .join('');
};

export default DocumentList;

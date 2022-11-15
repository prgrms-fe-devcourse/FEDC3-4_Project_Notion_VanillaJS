export default function NavBar({ $container, initialState, onSelect }) {
  const $nav = document.createElement('nav');
  $container.appendChild($nav);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    $nav.innerHTML = `
		<h1>suhwa Notion document</h1>
		${getDocumentList(this.state)}
	`;
  };

  const getDocumentList = (documentList = []) => {
    return documentList
      .map(
        ({ id, title, documents }) =>
          `
		<details data-id=${id} style="padding: 0 0 0 10px">
		  <summary>${title}
		    <button id="delete-btn">X</button>
		    <button id="add-btn">+</button>
		  </summary>
		  ${documents.length > 0 ? getDocumentList(documents) : '하위 페이지가 없습니다'}
	  </details>
		`
      )
      .join('');
  };

  this.render();

  $nav.addEventListener('click', (e) => {
    const $document = e.target.closest('details');
    if (!$document) return;

    const { id } = $document.dataset;
    if (!id) return;

    const eventType = e.target.id;
    switch (eventType) {
      case 'add-btn':
        console.log('추가예정', id);
        // onAdd(id);
        break;
      case 'delete-btn':
        console.log('삭제예정', id);
        // onDelete(id);
        break;
      default:
        console.log('세부컨텐츠 보여줌', id);
        onSelect(id);
    }
  });
}

export default function NavBar({ $container, initialState }) {
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
		<details data-id=${id}>
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
}

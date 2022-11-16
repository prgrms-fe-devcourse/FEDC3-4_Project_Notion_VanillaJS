export default function SubDocumentsLink({ $target, initialState, onLinkClick }) {
  const $element = document.createElement('div');
  $element.className = 'sub-documents-link';

  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  }

  $element.addEventListener('click', (e) => {
    e.preventDefault();
    const { id } = e.target.dataset;
    if (id) onLinkClick(Number(id));  
  })

  this.render = () => {
    const { documents } = this.state;
    if (documents.length === 0) {
      $element.innerHTML = '';
      return;
    };
    $element.innerHTML = `<h1>Sub Documents</h1>
      ${documents.map(({ id, title }) => `
        <div><a data-id="${id}" href="/documents/${id}" rel="noopener noreferrer">${title.trim() ==='' ? 'Untitled' : title}</a></div>
      `).join('')}
    `
  }
}
export default function SubDocumentsLink({ $target, initialState, onLinkClick }) {
  this.$element = document.createElement('div');
  this.$element.className = 'sub-documents-link';

  $target.appendChild(this.$element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  };

  this.render = () => {
    const { id, documents } = this.state;
    if (id === null || documents.length === 0) {
      this.$element.innerHTML = '';
    } else {
      this.$element.innerHTML = `
        <h1>Sub Documents</h1>
        ${documents.map(({ id, title }) => `
          <div><a data-id="${id}" href="/documents/${id}" rel="noopener noreferrer">${title.trim() === '' ? 'Untitled' : title}</a></div>
        `).join('')}
      `;
    }
  };

  this.$element.addEventListener('click', (e) => {
    e.preventDefault();
    const { id } = e.target.dataset;
    if (id) onLinkClick(Number(id));
  });
}
export default function DocumentList({ $target, initialState, onDocumentClick }) {
  const $element = document.createElement('div');
  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  $element.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { id } = $li.dataset;
      onDocumentClick(id);
    }
  })

  this.render = () => {
    $element.innerHTML = `
      <ul>
        ${this.state.map(({ id, title }) => `
          <li data-id="${id}">${title}</li>
        `).join('')}
      </ul>
    `;
  }

  this.render();
}
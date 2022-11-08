export default function DocumentList({ $target, initialState }) {
  const $element = document.createElement('div');
  $target.appendChild($element);

  this.state = initialState;

  console.log(this.state);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

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
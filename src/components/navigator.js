export default function Navigator({ target, initialState = [] }) {
  const navigator = document.createElement('div');
  navigator.classList.add('navigator');
  navigator.classList.add('flex-item');
  target.appendChild(navigator);

  this.state = initialState;

  this.setState = () => {};

  this.render = () => {
    navigator.innerHTML = `
    navigator
        `;
  };

  this.render();
}

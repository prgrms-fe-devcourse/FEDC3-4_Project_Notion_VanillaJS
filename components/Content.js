export default function Content({ $target, initialState }) {
  const $element = document.createElement('div');
  $element.className = 'content';

  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...nextState };
  }

  this.getElement = () => $element;
}
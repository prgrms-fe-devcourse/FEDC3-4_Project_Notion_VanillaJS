export default function Content({ $target, initialState }) {
  const $element = document.createElement('div');
  $element.className = 'content';
  $target.appendChild($element);
  console.log($element.previousElementSibling)
  $element.style.marginLeft = parseInt(window.getComputedStyle($element.previousElementSibling).width);
  

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...nextState };
  }

  this.getElement = () => $element;
}
import { getElementWidth } from "../util/common.js";

export default function Content({ $target, initialState }) {
  this.$element = document.createElement('div');
  this.$element.className = 'content';

  $target.appendChild(this.$element);

  this.$element.style.marginLeft = getElementWidth(this.$element.previousElementSibling);
  
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...nextState };
  }
}
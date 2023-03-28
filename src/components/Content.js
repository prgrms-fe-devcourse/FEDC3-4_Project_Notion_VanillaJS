import { getElementWidth } from "../util/common.js";
import { CLASS_NAME } from "../util/constants.js";

export default function Content({ $target, initialState }) {
  this.$element = document.createElement('div');
  this.$element.className = `content ${CLASS_NAME.HIDDEN}`;

  $target.appendChild(this.$element);

  this.$element.style.marginLeft = getElementWidth(this.$element.previousElementSibling);
  
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  }

  this.render = () => {
    const { id } = this.state;
    if (!id) {
      this.$element.classList.add(CLASS_NAME.HIDDEN);
    } else {
      this.$element.classList.remove(CLASS_NAME.HIDDEN);
    }
  }
}
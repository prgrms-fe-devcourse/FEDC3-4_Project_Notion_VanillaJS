import { getElementWidth } from "../util/common.js";
import { setStorageItem } from "../util/sotrage.js";

export default function Resizer({ $target, storageKey }) {
  this.$element = document.createElement('div')
  this.$element.className = 'resizer'

  $target.appendChild(this.$element);

  this.state = {
    x: 0,
    width: 0,
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
  }

  this.$element.addEventListener('mousedown', (e) => {
    const x = e.clientX
    const width = getElementWidth($target);
    this.setState({ x, width });

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  });

  window.addEventListener('resize', (e) => {
    const { x, width } = this.state;
    const dx = this.$element.clientX - x;

    $target.style.width = `${width+dx}px`;
    $target.nextElementSibling.style.marginLeft = getElementWidth($target);
  })

  const onMouseMove = (e) => {
    const { x, width } = this.state;
    const dx = e.clientX - x;

    $target.style.width = `${width+dx}px`;
    $target.nextElementSibling.style.marginLeft = getElementWidth($target);
  }

  const onMouseUp = (e) => {
    setStorageItem(storageKey, getElementWidth($target));
    
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}
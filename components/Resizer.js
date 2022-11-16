import { setStorageItem } from "../util/sotrage.js";

export default function Resizer({ $target, storageKey }) {
  const $element = document.createElement('div')
  $element.className = 'resizer'
  $element.innerHTML = `<div> </div>`
  $target.appendChild($element);

  this.state = {
    x: 0,
    width: 0,
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
  }

  $element.addEventListener('mousedown', (e) => {
    const x = e.clientX
    const width = getTargetWidth()
    this.setState({ x, width });

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  });

  window.addEventListener('resize', (e) => {
    const { x, width } = this.state;
    const dx = $element.clientX - x;
    $target.style.width = `${width+dx}px`;
    $target.nextElementSibling.style.marginLeft = getTargetWidth();
  })

  const onMouseMove = (e) => {
    const { x, width } = this.state;
    const dx = e.clientX - x;
    $target.style.width = `${width+dx}px`;
    $target.nextElementSibling.style.marginLeft = getTargetWidth();
  }

  const onMouseUp = (e) => {
    setStorageItem(storageKey, getTargetWidth());
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  const getTargetWidth = () => {
    return parseInt(window.getComputedStyle($target).width);
  }

}
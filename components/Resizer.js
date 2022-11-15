import { setStorageItem } from "../util/sotrage.js";

export default function Resizer({ $target, storageKey }) {
  // TODO: 리사이저 작성
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
    const x = e.clientX;
    // console.log($target, $target.style)
    // const width = Number($target.style.width);
    const styles = window.getComputedStyle($target);
    const width = parseInt(styles.width);
    this.setState({ x, width });

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  });

  const onMouseMove = (e) => {
    const { x, width } = this.state;
    const dx = e.clientX - x;
    $target.style.width = `${width+dx}px`;
  }

  const onMouseUp = (e) => {
    setStorageItem(storageKey, $target.style.width);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

}
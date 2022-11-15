export default function Modal({ $target, className, text }) {
  const $element = document.createElement('div');
  $element.className = `modal ${className}`
  $target.appendChild($element);

  this.render = () => {
    $element.innerHTML = `
      <div class="modal-content">
        ${text}
      </div>
    `;
  }

  this.render();
}
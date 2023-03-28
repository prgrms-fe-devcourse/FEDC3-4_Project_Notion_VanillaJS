export default function Modal({ $target, className, text }) {
  this.$element = document.createElement('div');
  this.$element.className = `modal ${className}`
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <div class="modal-content">
        ${text}
      </div>
    `;
  }

  this.render();
}
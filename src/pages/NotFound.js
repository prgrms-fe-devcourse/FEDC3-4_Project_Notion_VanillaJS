export default function NotFound({ $target }) {
  this.$target = $target;

  this.init = () => {
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      404 Not Found
    `;
  };

  this.init();
}

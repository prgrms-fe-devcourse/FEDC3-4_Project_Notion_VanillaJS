export default function Component({ $target, initialState }) {
  this.$target = $target;
  this.state = { ...initialState };

  this.init = () => {
    this.render();
  };

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
    `;
    this.mounted();
  };

  this.mounted = () => {};

  this.setEvent = () => {};

  this.init();
}

import Router from "./Router.js";

export default function App({ $target }) {
  this.$target = $target;

  this.init = () => {
    new Router(this.$target);
  };

  this.init();
}

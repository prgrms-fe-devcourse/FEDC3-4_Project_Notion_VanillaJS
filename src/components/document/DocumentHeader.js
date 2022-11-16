import { DEFAULT } from "../../config.js";

export default function DocumentHeader({
  $target,
  initialState = {
    title: "",
  },
}) {
  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.render();
  };

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    const { title } = this.state;

    this.$target.innerHTML = `
      <input type="text" name="title" placeholder=${DEFAULT.DOCUMENT_NAME} value="${title}"/>
    `;
  };

  this.init();
}

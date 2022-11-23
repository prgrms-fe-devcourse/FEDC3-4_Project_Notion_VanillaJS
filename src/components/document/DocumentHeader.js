import { DEFAULT } from "../../constants/config.js";
import { addEvent } from "../../utils/event.js";

export default function DocumentHeader({
  $target,
  initialState = {
    title: "",
  },
  onEdit,
}) {
  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.setEvent();
    this.render();
  };

  this.render = () => {
    const { title } = this.state;

    this.$target.innerHTML = `
    <div class="title" name="title" placeholder=${DEFAULT.DOCUMENT_NAME} contenteditable="true">${
      title === DEFAULT.DOCUMENT_NAME ? "" : title
    }</div>`;
  };

  this.setEvent = () => {
    addEvent(this.$target, "keyup", "[name=title]", (event) => {
      onEdit(event.target.innerText, "title");
    });
  };

  this.init();
}

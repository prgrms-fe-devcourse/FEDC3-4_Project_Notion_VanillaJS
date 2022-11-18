import { addEvent } from "../../utils/event.js";
import { parseNewline } from "../../utils/index.js";

export default function DocumentContent({
  $target,
  initialState = {
    content: "",
  },
  onEdit,
}) {
  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.setEvent();
    this.render();
  };

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.render = () => {
    const { content } = this.state;

    this.$target.innerHTML = `
      <div id="document-editor" name="content" contenteditable="true" placeholder="Type for creating new document">${parseNewline(
        content ?? ""
      )}</div>
    `;
  };

  this.setEvent = () => {
    addEvent(this.$target, "keyup", "[name=content]", (event) => {
      onEdit(event.target.innerText, "content");
    });
  };
  this.init();
}

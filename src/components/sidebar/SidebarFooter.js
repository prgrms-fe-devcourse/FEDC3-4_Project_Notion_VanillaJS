import { addEvent } from "../../utils/event.js";

export default function SidebarFooter({ $target, onAddButtonClick }) {
  this.$target = $target;

  this.init = () => {
    this.setEvent();
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <div class="new-post-btn">+ New page</div>
    `;
  };

  this.setEvent = () => {
    addEvent(this.$target, "click", ".new-post-btn", onAddButtonClick);
  };

  this.init();
}

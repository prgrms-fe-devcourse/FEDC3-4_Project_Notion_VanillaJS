import { addEvent } from "../utils/event.js";
import { navigate } from "../utils/navigate.js";

export default function NotFoundPage({ $target }) {
  this.$target = $target;

  this.init = () => {
    this.setEvent();
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <div class="center-container">
        <h1>존재하지 않는 페이지예요.</h1>
        <button id="home-btn">Notion 홈으로 돌아가기</button>
      </div>
    `;
  };

  this.setEvent = () => {
    addEvent(this.$target, "click", "#home-btn", (event) => {
      navigate("/");
    });
  };

  this.init();
}

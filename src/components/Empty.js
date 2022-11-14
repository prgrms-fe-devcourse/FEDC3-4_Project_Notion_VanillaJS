import { push } from "../router";

export default function Empty({ $target }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.$div = $target;

  this.render = () => {
    this.$div.innerHTML = `
      <div class="empty">내용이 없습니다</div>
    `;
  };

  this.render();
}

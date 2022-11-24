import { push } from "../Router";

export default function Empty({ $target }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  const $div = $target;

  this.render = () => {
    $div.innerHTML = `
      <div class="empty">내용이 없습니다</div>
    `;
  };

  this.render();
}

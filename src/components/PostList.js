import { renderPost } from "../util/renderPost.js";
import { push } from "../util/router.js";

export default function PostList({ $target, initialState, onAdd, onDelete }) {
  const $postList = document.createElement("div");
  $postList.className = "postList";
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `
      <ul>
        ${renderPost(this.state)}
      </ul>      
    `;
  };

  $postList.addEventListener("click", (e) => {
    const { className } = e.target;
    const $li = e.target.closest("li");

    if (!$li) return;
    const { id } = $li.dataset;

    switch (className) {
      case "toggleBtn":
        const child = $li.childNodes[3]; // 하위 리스트
        if (child) {
          const isToggled = $li.querySelector(".isToggled");
          if (isToggled) child.classList.remove("isToggled");
          else child.classList.add("isToggled");
        }
        return;
      case "title":
        push(`/documents/${id}`);
        return;
      case "add":
        onAdd(id);
        return;
      case "del":
        if (confirm("정말로 삭제하시겠습니까?")) onDelete(id);
        return;
    }
  });

  this.render();
}

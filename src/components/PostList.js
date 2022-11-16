import { push } from "../utils/router.js";
import { renderPosts } from "../utils/renderPosts.js";

export default function PostList({
  $target,
  initialState,
  onCreate,
  onDelete,
}) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = "";
    this.state.length && renderPosts($postList, this.state, false);
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;
      if (className === "post-delete") {
        onDelete(id);
      } else if (className === "post-create") {
        onCreate(id);
      } else {
        push(`/posts/${id}`);
      }
    }
  });
}

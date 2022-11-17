import { push } from "../utils/router.js";
import { renderPosts } from "../utils/renderPosts.js";
import { toggle } from "../utils/toggle.js";

export default function PostList({
  $target,
  initialState,
  onCreate,
  onDelete,
}) {
  const $postList = document.createElement("div");
  $postList.classList.add("post-list");

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
    const { className, classList } = e.target;
    if (className === "no-sub-page") {
      return;
    }

    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;

      if (classList.contains("toggle-button")) {
        toggle(e.target, $li);
      } else if (className === "post-delete") {
        onDelete(id);
      } else if (className === "post-create") {
        onCreate(id);
      } else {
        const $active = $postList.querySelector(".active-post");
        if ($active) {
          $active.classList.remove("active-post");
        }
        
        const $div = $li.querySelector(".post");
        $div.classList.add("active-post");

        push(`/posts/${id}`);
      }
    }
  });
}

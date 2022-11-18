import { push } from "../utils/router.js";
import { renderPosts } from "../utils/renderPosts.js";
import { toggle } from "../utils/toggle.js";

export default function SubPostList({ $target, initialState }) {
  const $subPostList = document.createElement("div");
  $subPostList.classList.add("sub-post-list");
  $target.appendChild($subPostList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $subPostList.innerHTML = "<p>하위 문서 링크</p>";
    this.state.length && renderPosts($subPostList, this.state, true);
  };

  this.render();

  $subPostList.addEventListener("click", (e) => {
    const { className, classList } = e.target;
    if (className === "no-sub-page") {
      return;
    }

    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;

      if (classList.contains("toggle-button")) {
        toggle(e.target, $li);
      } else {
        push(`/posts/${id}`);
      }
    }
  });
}

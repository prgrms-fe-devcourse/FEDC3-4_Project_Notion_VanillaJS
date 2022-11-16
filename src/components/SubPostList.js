import { push } from "../utils/router.js";
import { renderPosts } from "../utils/renderPosts.js";

export default function SubPostList({ $target, initialState }) {
  const $subPostList = document.createElement("div");
  $target.appendChild($subPostList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $subPostList.innerHTML = "";
    this.state.length && renderPosts($subPostList, this.state, true);
  };

  this.render();

  $subPostList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      push(`/posts/${id}`);
    }
  });
}

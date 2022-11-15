import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function PostList({ $target, initialState, onDelete }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;
    this.render();
  };

  const renderPosts = (root, posts) => {
    let $ul = document.createElement("ul");
    root.appendChild($ul);

    posts.forEach((post) => {
      let $li = document.createElement("li");
      $li.setAttribute("data-id", post.id);
      $li.innerHTML = `
        ${post.title ? post.title : "제목 없음"}
        <button class="post-delete">x</button>
      `;

      $ul.appendChild($li);
      if (post.documents.length) {
        renderPosts($li, post.documents);
      }
    });
  };

  this.render = () => {
    $postList.innerHTML = "";
    this.state.length && renderPosts($postList, this.state);
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;
      if (className === "post-delete") {
        onDelete(id);
        return;
      }
      push(`/posts/${id}`);
    }
  });
}

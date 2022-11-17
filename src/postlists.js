import Editor from "./Editor/editor.js";
import { createPost, removePost, renderLogic } from "./postListUtil.js";

export default function PostLists({ $target, initialState = [] }) {
  const $postslist = document.createElement("div");
  $postslist.setAttribute("class", "postList");

  $target.appendChild($postslist);

  this.state = [
    {
      id: 1,
      title: "아이우에요",
    },
  ];

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.handlePlus = (e) => {
    const targetId = e.target.dataset.id;
    const plusEvent = new CustomEvent("@CreateChildDoc", {
      detail: { id: targetId },
    });
    $postslist.dispatchEvent(plusEvent);
  };

  this.handleRemove = (e) => {
    const targetId = e.target.dataset.id;
    const minusEvent = new CustomEvent("@RemoveDoc", {
      detail: { id: targetId },
    });
    $postslist.dispatchEvent(minusEvent);
  };

  this.handleNewPost = () => {
    const createNewPostEvent = new CustomEvent("@CreateNewDoc");
    $postslist.dispatchEvent(createNewPostEvent);
  };

  this.handleEditPost = (e) => {
    const targetId = e.target.dataset.id;
    const editEvent = new CustomEvent("@EditDoc", {
      detail: { id: targetId },
    });
    $postslist.dispatchEvent(editEvent);
  };

  this.render = () => {
    $postslist.innerHTML =
      renderLogic(this.state) +
      `<button class="new-post" data-name="createNewPostBtn"> + 페이지 추가 </button>`;
  };

  $postslist.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const id = parseInt($postslist.dataset.id);
    const name = e.target.dataset.name;

    if (name === "plus") this.handlePlus(e);
    if (name === "minus") this.handleRemove(e);
    if (name === "createNewPostBtn") this.handleNewPost(e);
    if (name === "list" || name === "span-list") this.handleEditPost(e);
  });

  this.render();
}

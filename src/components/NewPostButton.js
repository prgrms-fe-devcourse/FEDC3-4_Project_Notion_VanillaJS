import { push } from "../util/router.js";
import { createPost } from "../util/api.js";

export default function NewPostButton({ $target, onUpdate }) {
  const $newPostButton = document.createElement("div");
  $newPostButton.className = "newPostButton";

  $target.appendChild($newPostButton);
  this.render = () => {
    $newPostButton.innerHTML = "+ 새로운 페이지 추가";
  };

  $newPostButton.addEventListener("click", async () => {
    const newPost = await createPost(null);
    push(`/documents/${newPost.id}`);
    onUpdate();
  });

  this.render();
}

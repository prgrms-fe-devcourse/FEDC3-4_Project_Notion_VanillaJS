export default function NewPostBtn({ $target, addPost }) {
  const $button = document.createElement("button");
  $button.textContent = "+ 새 페이지";

  $target.appendChild($button);

  $button.addEventListener("click", (e) => {
    addPost();
  });
}

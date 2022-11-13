export default function NewPostBtn({ $target, addPost }) {
  const $newButton = document.createElement("div");
  $newButton.className = "notion-newpage-button";
  $newButton.role = "button";

  $target.appendChild($newButton);

  this.render = () => {
    $newButton.innerHTML = `
      <div class="notion-focusable" role="button">
        <div class="new-wrapper">
          <div class="new-plus-button">+</div>
          <div>새 페이지</div>
        </div>
      </div>
    `;
  };

  $newButton.addEventListener("click", (e) => {
    addPost();
  });

  this.render();
}

export default function PostList({ $target, initialState, onToggleClick }) {
  const $postList = document.createElement("div");
  $postList.className = "notion-list";

  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      this.render();
    }
  };

  const Rendering = (postLists) => {
    return `
      <ul style="display:none">
      ${postLists
        .map(
          ({ id, title, documents }) => `
          <li data-id="${id}" class="close">
          <span>
            <button class="toggle">토글</button>${title}
          </span>
          <span>
            <button>+</button><button>-</button>
          </span>
            ${
              documents.length !== 0
                ? `${Rendering(documents)}`
                : `<ul style="display:none">하위 페이지 없음</ul>`
            }
          </li>
        `
        )
        .join("")}
      </ul>
    `;
  };

  this.render = () => {
    $postList.innerHTML = Rendering(this.state);
    $postList.children[0].style.display = "block";
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $btn = e.target.closest(".toggle");
    const { id } = $li.dataset;

    onToggleClick(id);

    if ($li.className === "open") {
      $li.className = "close";
    } else if ($li.className === "close") {
      $li.className = "open";
    }
    const isDisplay = $li.className === "open" ? "block" : "none";
    $li.children[2].style.display = isDisplay;
  });
}

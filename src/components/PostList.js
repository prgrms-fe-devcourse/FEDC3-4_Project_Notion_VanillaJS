import { getItem, removeItem, setItem } from "../storage.js";

export default function PostList({
  $target,
  initialState,
  onSelect,
  onAdd,
  onDelete,
}) {
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
    ${postLists
      .map(({ id, title, documents }) => {
        const display = getItem(`notion-${id}`) || "none";

        return `
          <li data-id="${id}" name="notionListOne" class="close">
          <span>
            <button class="toggle">토글</button>${title}
          </span>
          <span>
            <button class="add">+</button> <button class="delete">-</button>
          </span>
            ${
              documents.length !== 0
                ? `<ul data-id="${id}" style="display:${display}">${Rendering(
                    documents
                  )}</ul>`
                : `<ul style="display:${display}">하위 페이지 없음</ul>`
            }
          </li>
        `;
      })
      .join("")}
    `;
  };

  this.render = () => {
    $postList.innerHTML = `<ul>${Rendering(this.state.documents)}</ul>`;
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $toggleBtn = e.target.closest(".toggle");
    const $addBtn = e.target.closest(".add");
    const $deleteBtn = e.target.closest(".delete");
    const { id } = $li.dataset;

    if ($toggleBtn) {
      if (!getItem(`notion-${id}`)) {
        console.log(id);
      }
      if ($li.className === "open") {
        removeItem(`notion-${id}`);
        $li.className = "close";
      } else if ($li.className === "close") {
        setItem(`notion-${id}`, "block");
        $li.className = "open";
      }
      const isDisplay = $li.className === "open" ? "block" : "none";
      $li.children[2].style.display = isDisplay;
    }
    if ($li) {
      onSelect(id);
    }
    if ($addBtn) {
      setItem(`notion-${id}`, "block");
      onAdd(id);
    }
    if ($deleteBtn) {
      if ($li.parentElement.dataset) {
        const { id } = $li.parentElement.dataset;
        removeItem(`notion-${id}`);
      }
      removeItem(`notion-${id}`);
      onDelete(id);
    }
  });
}

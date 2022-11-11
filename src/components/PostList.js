import { getItem, removeItem, setItem } from "../storage.js";
import { push } from "../router.js";

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
              <button name="toggle">토글</button><span data-id="${id}" name="text">${title}</span>
            </span>
            <span>
              <button name="add">+</button> <button name="delete">-</button>
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
    const { id } = $li.dataset;
    const name = e.target.closest("[name]");
    if (name) {
      const attribute = name.getAttribute("name");
      if (attribute === "toggle") {
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
      if (attribute === "text") {
        onSelect(id);
        push(`/documents/${id}`);
      }
      if (attribute === "add") {
        setItem(`notion-${id}`, "block");
        onAdd(id);
      }
      if (attribute === "delete") {
        if ($li.parentElement.dataset) {
          const { id } = $li.parentElement.dataset;
          push(`/documents/${id}`);
          removeItem(`notion-${id}`);
        }
        removeItem(`notion-${id}`);
        onDelete(id);
      }
    }
  });
}

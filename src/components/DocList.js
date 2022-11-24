import { getItem, removeItem, setItem } from "../storage.js";
import { push } from "../router.js";

export default function DocList({ $target, initialState, onAdd, onDelete }) {
  const $docList = document.createElement("div");
  $docList.className = "notion-list";

  $target.appendChild($docList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const Rendering = (notionList) => {
    return `
    ${notionList
      .map(({ id, title, documents }) => {
        const display = getItem(`notion-${id}`) || "none";
        return `
          <li data-id="${id}" name="notionListItem" id="close" class="listItem">
            <p>
              <span>
                <button name="toggle" class="toggleBtn">&#9654;</button>
                <span data-id="${id}" name="text" class="title">  ${title}</span>
              </span>
              <span class="plus-minus-wrapper">
                <button name="add">➕</button> <button name="delete">➖</button>
              </span>
            </p>
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
    $docList.innerHTML = `
    <ul class="postList">${Rendering(this.state.documents)}</ul>
    `;
  };

  this.render();

  $docList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    const name = e.target.closest("[name]");
    if (name) {
      const attribute = name.getAttribute("name");
      if (attribute === "toggle") {
        if ($li.id === "open") {
          removeItem(`notion-${id}`);
          $li.id = "close";
        } else if ($li.id === "close") {
          setItem(`notion-${id}`, "block");
          $li.id = "open";
        }
        const isDisplay = $li.id === "open" ? "block" : "none";
        $li.children[1].style.display = isDisplay;
      }
      if (attribute === "text") {
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

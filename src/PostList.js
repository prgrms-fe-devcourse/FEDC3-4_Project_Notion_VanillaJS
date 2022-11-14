import { push } from "./router.js";

export default function PostList({
  $target,
  initialState,
  onRemove,
  onAddDocument,
}) {
  const $postList = document.createElement("div");
  $postList.className = "postList";
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const markUpDocumentList = (list, text) => {
    text += `
      <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
      <li data-id="${id}">${title}
      <button name="add"> + </button>
      <button name="remove"> - </button>
      ${documents
        .map((document) => markUpDocumentList([document], text))
        .join("")}
      </li>
      
      `
        )
        .join("")}
      </ul>
      `;

    return text;
  };

  this.render = () => {
    const documentsList = markUpDocumentList(this.state, "");
    const documentAddBtn = `<button name="add"> + 페이지 추가하기 </button>`;
    $postList.innerHTML = `<div>${documentsList}${documentAddBtn}</div>`;
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { name } = e.target;
    const id = $li?.dataset.id ? $li.dataset.id : null;
    if (name) {
      if (name === "remove") {
        const node = $li.querySelector("ul");
        if (node) {
          node.querySelectorAll("li").forEach((e) => onRemove(e?.dataset.id));
        }
        onRemove(id);
        return;
      } else {
        onAddDocument(id, name);
      }
    }

    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

import { push } from "../../utils/router.js";

export default function PostList({
  $target,
  initialState,
  onRemove,
  onAddDocument,
}) {
  const $postList = document.createElement("div");
  $postList.classList.add("postList");
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
      <div class='documentsTree'>
        <li data-id="${id}">
        <img class="svg" src="../icon/chevron-right-solid.svg" />
        ${title}
        <button name="add" class="addBtn"> + </button>
        <button name="remove"class="removeBtn"> - </button>
        </li>
        ${documents
          .map((document) => markUpDocumentList([document], text))
          .join("")}
      </div>
      `
        )
        .join("")}
      </ul>
      `;

    return text;
  };

  this.render = () => {
    const documentsList = markUpDocumentList(this.state, "");
    const documentAddBtn = `<button name="add" class="pageBtn"> + 페이지 추가하기 </button>`;
    $postList.innerHTML = `<div class="list">${documentsList}${documentAddBtn}</div>`;
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { name } = e.target;
    const id = $li?.dataset.id;

    if (name) {
      if (name === "remove") {
        onRemove(id);
        return;
      } else {
        onAddDocument(id, name);
        return;
      }
    }

    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

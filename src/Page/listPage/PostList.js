import { push } from "../../utils/router.js";
import instanceCheck from "../../utils/instanceCheck.js";

/**list를 그리는 컴포넌트 */
export default function PostList({
  $target,
  initialState,
  onRemove,
  onAddDocument,
}) {
  instanceCheck(new.target);

  const $postList = document.createElement("div");
  $postList.classList.add("postList");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const markUpDocumentList = (list) => {
    const text = `
      <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
      <div class='documentsTree'>
        <li data-id="${id}">
        <img class="svg" src="../icon/chevron-right-solid.svg" />
        ${title}
        <button data-name="add" class="addBtn"> + </button>
        <button data-name="remove"class="removeBtn"> - </button>
        </li>
        ${documents.map((document) => markUpDocumentList([document])).join("")}
      </div>
      `
        )
        .join("")}
      </ul>
      `;

    return text;
  };

  this.render = () => {
    const documentsList = markUpDocumentList(this.state);
    const documentAddBtn = `<button data-name="add" class="pageBtn"> + 페이지 추가하기 </button>`;
    $postList.innerHTML = `<div class="list">${documentsList}${documentAddBtn}</div>`;
  };

  this.render();

  $postList.addEventListener("click", ({ target }) => {
    const $li = target.closest("li");
    const { name } = target.dataset;
    const id = $li?.dataset.id;

    if (name) {
      if (name === "remove") {
        onRemove(id);
        return;
      }
      onAddDocument(id, name);
      return;
    }

    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

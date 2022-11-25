import { push } from "../../utils/router.js";
import instanceCheck from "../../utils/instanceCheck.js";

/**편집기 아래에 해당 document의 하위 documents를 그리는 컴포넌트 */
export default function MarkUpList({ $target, initialState }) {
  instanceCheck(new.target);

  const $markUpList = document.createElement("div");
  $markUpList.classList.add("markUpList");
  $target.appendChild($markUpList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = [nextState];

    this.render();
  };

  const markUpList = (list) => {
    const text = `
      <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
      <div class='documentsTree'>
        <li data-id="${id}">
        <img class="svg" src="../icon/chevron-right-solid.svg" />
        ${title}
        </li>
        ${documents.map((document) => markUpList([document])).join("")}
      </div>
      `
        )
        .join("")}
      </ul>
      `;

    return text;
  };

  this.render = () => {
    const documentsList = markUpList(this.state);
    $markUpList.innerHTML = `<div class="list">${documentsList}</div>`;
  };

  this.render();

  $markUpList.addEventListener("click", ({ target }) => {
    const $li = target.closest("li");
    const id = $li.dataset.id;
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

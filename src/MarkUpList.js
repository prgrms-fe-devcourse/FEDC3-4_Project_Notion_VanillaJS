import { push } from "./router.js";

export default function MarkUpList({ $target, initialState }) {
  const $markUpList = document.createElement("div");
  $markUpList.classList.add("MarkUpList");
  $target.appendChild($markUpList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = [nextState];
    this.render();
  };

  const markUpList = (list, text) => {
    text += `
      <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
      <div class='documentsTree'>
        <li data-id="${id}">
        ${title}
        </li>
        ${documents.map((document) => markUpList([document], text)).join("")}
      </div>
      `
        )
        .join("")}
      </ul>
      `;

    return text;
  };

  this.render = () => {
    const documentsList = markUpList(this.state, "");
    $markUpList.innerHTML = `<div class="list">${documentsList}</div>`;
  };

  this.render();

  $markUpList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const id = $li.dataset.id;
    console.log($li);
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

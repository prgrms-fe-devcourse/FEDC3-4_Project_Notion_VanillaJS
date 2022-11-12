import { push } from "../../router/router.js";

export default function DocumentList({
  $documentListPage,
  initialState,
  onPlus,
  onRootPlus,
  onRemove,
}) {
  const $listPage = document.createElement("div");

  $documentListPage.appendChild($listPage);

  this.listState = initialState;

  this.listSetState = (nextState) => {
    this.listState = nextState;
    this.render();
  };

  const listMarkUp = (list, width) => {
    return `<li data-id="${list.id}" class="list" style="margin-left: ${width}px;">
    <i class="fa-solid fa-arrow-right" data-id="${list.id}"></i>${list.title}</li>
    <button class="plus" data-id="${list.id}">Plus</button>
    <button class="remove" data-id="${list.id}">Remove</button>`;
  };

  const listRender = (list) => {
    const stack = [{ list, width: 0 }];
    let $renderHTML = ``;

    while (stack.length > 0) {
      const popList = stack.pop();
      const nextList = popList.list;
      const nextWidth = popList.width;

      $renderHTML += listMarkUp(nextList, nextWidth);

      if (nextList.documents) {
        for (let i = nextList.documents.length - 1; i >= 0; i--) {
          stack.push({
            list: nextList.documents[i],
            width: nextWidth + 30,
          });
        }
      }
    }

    return $renderHTML;
  };

  this.render = () => {
    if (Array.isArray(this.listState)) {
      $listPage.innerHTML = `<ul>
        ${this.listState.map((list) => listRender(list)).join("")}
        <button class="rootplus" data-id="null">페이지 추가</button>
        </ul>
        `;
    }
    console.log("list render");
  };

  $documentListPage.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $button = e.target.closest("button");

    if ($li) {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }
    if ($button) {
      const { id } = $button.dataset;
      const className = $button.getAttribute("class");
      if (className === "plus") {
        onPlus(id);
      } else if (className === "rootplus") {
        onRootPlus(id);
      } else if (className === "remove") {
        onRemove(id);
      }
    }
  });

  this.render();
}

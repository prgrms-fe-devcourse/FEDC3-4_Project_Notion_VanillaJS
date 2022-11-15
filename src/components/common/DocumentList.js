import { push } from "../../router/router.js";

export default function DocumentList({
  $documentListPage,
  initialState,
  onPlus,
  onRootPlus,
  onRemove,
}) {
  const $listPage = document.createElement("div");
  $listPage.classList.add("list-container__lists");

  $documentListPage.appendChild($listPage);

  this.listState = initialState;

  this.listSetState = (nextState) => {
    this.listState = nextState;
    this.render();
  };

  const listMarkUp = (list, width) => {
    const { pathname } = location;
    const [, , pathId] = pathname.split("/");
    const containerClassName =
      parseInt(pathId) === list.id
        ? "list-container__list select"
        : "list-container__list";

    return `<div class="${containerClassName}" data-id="${list.id}">
      <li class="list" style="margin-left: ${width}px;">
        <i class="fa-solid fa-chevron-right" data-id="${list.id}"></i>
        <i class="fa-brands fa-pagelines" style="color: green;"></i>
        <span class="list-container__lists--txt">${list.title}<span>
      </li>
      <div data-id="${list.id}"> 
        <i class="fa-solid fa-plus plus" data-id="${list.id}"></i>
        <i class="fa-solid fa-trash remove" data-id="${list.id}"></i>
      </div>
    </div>`;
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
            width: nextWidth + 15,
          });
        }
      }
    }

    return $renderHTML;
  };

  this.render = () => {
    if (Array.isArray(this.listState)) {
      $listPage.innerHTML = `
        <a href="/index.html" class="home">
          <i class="fa-solid fa-user"></i>
          <div>민형 박의 Notion</div>
        </a>
        <ul>
          ${this.listState.map((list) => listRender(list)).join("")}
            <div class="list-container__list rootplus" data-id="no-router">
              <i class="fa-solid fa-plus"></i>
              <span>페이지 추가</span>
            </div>
        </ul>
        `;
    }
    // console.log("list render");
  };

  $documentListPage.addEventListener("click", (e) => {
    const $i = e.target.closest("i");
    const $div = e.target.closest("div");

    if ($i) {
      const { id } = $i.dataset;
      const className = $i.classList.item(2);
      if (className === "plus") {
        onPlus(id);
      } else if (className === "remove") {
        onRemove(id);
      }
    } else if ($div) {
      const { id } = $div.dataset;
      if (id === "not render") {
        const className = $div.classList.item(1);
        if (className === "rootplus") onRootPlus(className);
      } else if (id) {
        push(`/documents/${id}`);
      }
    }
  });

  this.render();
}

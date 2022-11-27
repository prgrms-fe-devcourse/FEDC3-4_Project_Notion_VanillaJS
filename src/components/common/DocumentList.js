import { push } from "../../router/router.js";
import { changeFold } from "../../js/folder.js";
import { NOT_TITLE } from "../../js/constants.js";

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

  this.listState = {
    originEdit: initialState.originEdit,
    updateEdit: initialState.updateEdit,
  };

  this.listSetState = (nextState) => {
    this.listState.originEdit = nextState.originEdit;
    this.listState.updateEdit = nextState.updateEdit;
    this.render();
  };

  let foldData;
  let selectIndex;
  const listMarkUp = (list, width) => {
    // by 민형, fold 기능 구현을 위한 작업_221116
    selectIndex += 1;
    foldData.push({ width });

    // by 민형, 실시간으로 list tile을 수정하는 기능 구현을 위한 작업_221116
    let title;
    if (this.listState.updateEdit && this.listState.updateEdit.id === list.id) {
      title = this.listState.updateEdit.title;
    } else {
      title = list.title;
    }

    // by 민형, 현재 선택된 document를 구별하기 위한 작업_221116
    const { pathname } = location;
    const [, , pathId] = pathname.split("/");
    const containerClassName =
      parseInt(pathId) === list.id
        ? "list-container__list select"
        : "list-container__list";

    return `<div class="${containerClassName}" data-id="${list.id}">
      <li class="list" style="margin-left: ${width}px;">
        <i class="fa-solid fa-chevron-down fold" data-id="${
          list.id
        }" data-index-id="${selectIndex}"></i>
        <i class="fa-brands fa-pagelines fa-lg"></i>
        <span class="list-container__lists--txt">${
          title === "" ? NOT_TITLE : title
        }<span>
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

      if (!nextList.documents) continue;
      for (let i = nextList.documents.length - 1; i >= 0; i--) {
        stack.push({
          list: nextList.documents[i],
          width: nextWidth + 15,
        });
      }
    }

    return $renderHTML;
  };

  this.render = () => {
    foldData = [0];
    selectIndex = 0;
    if (!Array.isArray(this.listState.originEdit)) return;
    $listPage.innerHTML = `
      <a href="/" class="home">
        <i class="fa-solid fa-user"></i>
        <div>민형 박의 Notion</div>
      </a>
      <ul>
        ${this.listState.originEdit.map((list) => listRender(list)).join("")}
        <div class="list-container__list rootplus" data-id="no-router">
          <i class="fa-solid fa-plus"></i>
          <span>페이지 추가</span>
        </div>
      </ul>
      `;
  };

  $documentListPage.addEventListener("click", (e) => {
    const $i = e.target.closest("i");
    const $div = e.target.closest("div");

    if ($i) {
      // by 민형, id는 추가 및 삭제 기능 구현에 이용, indexId는 fold 기능 구현에 이용_221116
      const { id, indexId } = $i.dataset;
      const className = $i.classList.item(2);

      if (className === "fold") {
        $i.setAttribute("class", "fa-solid fa-chevron-right unfold");
        changeFold({ foldData, indexId, status: "none" });
      } else if (className === "unfold") {
        $i.setAttribute("class", "fa-solid fa-chevron-down fold");
        changeFold({ foldData, indexId, status: "flex" });
      } else if (className === "plus") {
        onPlus(id);
      } else if (className === "remove") {
        onRemove(id);
      }
    } else if ($div) {
      const { id } = $div.dataset;
      if (id === "no-router") {
        const className = $div.classList.item(1);
        if (className === "rootplus") onRootPlus(className);
      } else if (id) {
        push(`/documents/${id}`);
      }
    }
  });

  this.render();
}

export default function DocumentList({ $documentListPage, initialState }) {
  const $listPage = document.createElement("div");

  $documentListPage.appendChild($listPage);

  this.listState = initialState;

  this.listSetState = (nextState) => {
    this.listState = nextState;
    this.render();
  };

  const listMarkUp = (list, width) => {
    return `<li data-id="${list.id}" class="list" style="margin-left: ${width}px;">
    <i class="fa-solid fa-arrow-right" data-id="${list.id}"></i>${list.title}</li>`;
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
        <li>페이지 추가</li>
        </ul>
        `;
    }
  };

  $documentListPage.addEventListener("click", (e) => {});

  this.render();
}

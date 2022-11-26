import { validation } from "../../validation.js";

export default function DocList({ $target, initialState, onClick, onNewSubDoc, onDelete }) {
  validation(new.target, "DocList");

  const $docList = document.createElement("nav");
  $docList.className = "docList";
  $target.appendChild($docList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocList = (docs) => {
    return docs
      .map(
        ({ id, title, documents }, i) => `
        <li id=${id} data-id=${id} class="docItem">
          <p class="forHover">
            <button class="toggleFold">►</button>
            <span class="docTitle">${title}</span>
            <span class="controlBtns">
              <button class="newSubDoc">➕</button> 
              <button class="delete">X</button>
            </span>
            ${
              documents.length > 0
                ? `<ul class='child'>${renderDocList(documents)}</ul>`
                : `<ul class='child'><li class="isEnd">하위 페이지가 없습니다.</li></ul>`
            }
          </p>
        </li>`
      )
      .join("");
  };

  this.render = () => {
    $docList.innerHTML = `
        <ul>
          ${renderDocList(this.state)}
        </ul>
      `;
  };

  this.render();

  $docList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    if (!$li) return;
    const { id } = $li.dataset;
    const { className } = e.target;

    if (className === "toggleFold") {
      const $childUl = $li.getElementsByTagName("ul");
      if ($childUl) {
        const toggleDisplay = $childUl[0].classList.contains("child");
        $childUl[0].className = toggleDisplay ? "child--show" : "child";
        $li.querySelector(".toggleFold").innerText = toggleDisplay ? "▼" : "►";
      }
      return;
    }
    if (className === "newSubDoc") {
      const $childUl = $li.getElementsByTagName("ul");
      const $isEnd = $childUl[0].querySelector(".isEnd");
      const $newSubDoc = document.createElement("li");

      if ($childUl.length > 0) {
        $childUl[0].className = "child--show";
        $li.querySelector(".toggleFold").innerText = "▼";
      }

      if ($isEnd) {
        $isEnd.remove();
      }
      $newSubDoc.id = "newSubDoc";
      $newSubDoc.className = "docItem";

      $childUl[0].appendChild($newSubDoc);
      $newSubDoc.innerHTML = `
        <p class="forHover">
          <button class="toggleFold">►</button>
          <span class="docTitle">제목 없음</span>
          <span class="controlBtns">
            <button class="newSubDoc">➕</button> 
            <button class="delete">X</button>
          </span>
          <ul class='child'><li class="isEnd">하위 페이지가 없습니다.</li></ul>
        </p>
      `;
      onNewSubDoc(id);
      return;
    }
    if (className === "delete") {
      if (confirm("이 문서를 삭제하시겠습니까?")) {
        $li.remove();
        onDelete(id);
      }
      return;
    }
    onClick(id);
  });
}

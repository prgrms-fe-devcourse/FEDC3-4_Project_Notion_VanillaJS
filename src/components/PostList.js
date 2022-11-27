import { push } from "../util/router.js";

export default function PostList({ $target, initialState, onAdd, onDelete }) {
  const $postList = document.createElement("div");
  $postList.className = "postList";
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const postListHandler = (lists) => {
    return lists
      .map(
        (list) => `
            <li data-id=${list.id} class="parentList">
              <div class="content">
                <div class="left-box">
                  <img src="/src/img/arrow_right_icon.svg" class="toggleBtn"/>
                  <div class="title" >${list.title}</div>
                </div>
                <div class="right-box">
                  <img src="/src/img/minus_icon.svg" class="del" />
                  <img src="/src/img/plus_icon.svg" class="add" />
                </div>  
              </div>
              ${
                list.documents.length !== 0
                  ? `
              <ul class="childList" style="display: block">
                ${postListHandler(list.documents)}
              </ul>   
              `
                  : ""
              }              
            </li>
          `
      )
      .join("");
  };

  this.render = () => {
    $postList.innerHTML = `
      <ul>
        ${postListHandler(this.state)}
      </ul>      
    `;
  };

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $title = e.target.closest(".title");
    const $toggle = e.target.closest(".toggleBtn");
    const $add = e.target.closest(".add");
    const $del = e.target.closest(".del");

    if ($toggle) {
      const child = $li.childNodes[3];
      if (child) {
        if (child.style.display === "none") {
          child.style.display = "block";
          $toggle.src = "/src/img/arrow_down_icon.svg";
        } else {
          child.style.display = "none";
          $toggle.src = "/src/img/arrow_right_icon.svg";
        }
      }
    }

    const { id } = $li.dataset;

    if ($title) {
      push(`/documents/${id}`);
    }

    if ($add) {
      onAdd(id);
      const $tmpul = document.createElement("ul");
      $tmpul.innerHTML = `<li  class="parentList">
        <div class="content" style="background-color: #f1f1f0;">
          <div class="left-box">
            <img src="/src/img/arrow_right_icon.svg" class="toggleBtn"/>
            <span class="title" >하위 페이지</span>
          </div>
          <div class="right-box">
            <img src="/src/img/minus_icon.svg" class="del" />
            <img src="/src/img/plus_icon.svg" class="add" />
          </div>  
        </div>
      </li>`;
      $li.appendChild($tmpul);
    }

    if ($del) {
      if (confirm("정말로 삭제하시겠습니까?")) onDelete(id);
    }
  });

  this.render();
}

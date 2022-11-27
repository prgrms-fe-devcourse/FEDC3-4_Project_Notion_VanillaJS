import { renderPost } from "../util/renderPost.js";
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

  this.render = () => {
    $postList.innerHTML = `
      <ul>
        ${renderPost(this.state)}
      </ul>      
    `;
  };

  $postList.addEventListener("click", (e) => {
    const { className } = e.target;
    const $li = e.target.closest("li");

    if (!$li) return;
    const { id } = $li.dataset;

    switch (className) {
      case "toggleBtn":
        const child = $li.childNodes[3]; // 하위 리스트
        console.log(child);
        if (child) {
          if (child.style.display === "none") {
            child.style.display = "block";
            $toggle.src = "/src/img/arrow_down_icon.svg";
          } else {
            child.style.display = "none";
            $toggle.src = "/src/img/arrow_right_icon.svg";
          }
        }
        return;
      case "title":
        push(`/documents/${id}`);
        return;
      case "add":
        onAdd(id);
        // const $tmpul = document.createElement("ul");
        // $tmpul.innerHTML = `<li  class="parentList">
        //   <div class="content" style="background-color: #f1f1f0;">
        //     <div class="left-box">
        //       <img src="/src/img/arrow_right_icon.svg" class="toggleBtn"/>
        //       <span class="title" >하위 페이지</span>
        //     </div>
        //     <div class="right-box">
        //       <img src="/src/img/minus_icon.svg" class="del" />
        //       <img src="/src/img/plus_icon.svg" class="add" />
        //     </div>
        //   </div>
        // </li>`;
        // $li.appendChild($tmpul);
        return;
      case "del":
        if (confirm("정말로 삭제하시겠습니까?")) onDelete(id);
        return;
    }
  });

  this.render();
}

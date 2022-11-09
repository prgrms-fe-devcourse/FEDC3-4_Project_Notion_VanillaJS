import { push } from "../router";

export default function SideBar({ $target, initialState }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }
  this.state = initialState;

  this.$sideBar = document.createElement("nav");
  this.$sideBar.className = "sideBar";

  $target.appendChild(this.$sideBar);

  this.setState = (nextState, isRender) => {
    this.state = nextState;
    if(isRender){
      this.render();
    }
  };

  this.makeChildLi = ($nodes,depth=0) => {
    return $nodes.map((res) => {
      return `
        <li class ="fold" data-id="${res.id}">
          <span class="title" style="${this.state.res_content.id===res.id ? "font-weight:bold" : ""}"> ${res.title}</span>
          ${res.documents.length ? `<ul class="depth${++depth}" style="display:none">${this.makeChildLi(res.documents,depth)}</ul>` : ""}
        </li>
      `;
    }).join("");
  }

  this.render = () => {
    this.$sideBar.innerHTML = `
      <header>김성현의 Notion</header>
      <ul class="depth0">${this.makeChildLi(this.state.res_doument)}</ul>
    `
  };
  this.render();
  this.$sideBar.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const $li = e.target;

    if($li){
      if ($li.tagName ==="LI") {
        const $ul = $li.childNodes[3]

        if($ul && $ul.tagName === "UL"){
          const targetStyle = $ul.style.display
          const $targetClassName = $li.className

          $ul.style.display = (targetStyle === "none" ? "block" : "none")
          $li.className = `${$targetClassName==="fold" ? "unfold": "fold"}`
        }
      } else if($li.tagName ==="SPAN"){
        const prev_id = this.state.res_content.id
        const prev_node = document.querySelector(`li[data-id="${prev_id}"]`).childNodes[1]

        prev_node.style.fontWeight = "normal"
        $li.style.fontWeight = "bold"

        const {id} = $li.closest("li").dataset;

        push(`/posts/${id}`);
      }
    }
  })
}

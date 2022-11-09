import { push } from "../router";
import { storage } from "../storage";

export default function SideBar({ $target, initialState,onClickAdd }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }
  this.state = initialState;
  this.onClickAdd = onClickAdd;
  this.lastHover = null;

  this.$sideBar = document.createElement("nav");
  this.$sideBar.className = "sideBar";

  $target.appendChild(this.$sideBar);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getFoldState = (id) => {
    const foldState = storage.getItem("foldState")
    const targetFoldState = foldState.find(fold => fold.id === id.toString()) ||{state:true}

    return targetFoldState.state
  }

  this.setFoldState = (id) => {
    const foldState = storage.getItem("foldState")
    const targetFoldState = foldState.find(fold => fold.id === id.toString()) ||{state:true}
    //false = block, unfold
  
    const nextFoldState = foldState.filter(fold => fold.id !== id.toString())
  
    storage.setItem("foldState", JSON.stringify([
      ...nextFoldState,
      {
        id,
        state:!targetFoldState.state
      }
    ]));
  }

  this.makeChildLi = ($nodes,depth=0) => {
    return $nodes.map((res) => {
      const foldState = this.getFoldState(res.id)

      return `
        <li class=${foldState ? "fold" : "unfold"} data-id="${res.id}" style="padding-left:${depth*8+10}px">
          <span class="title" style="${this.state.res_content.id===res.id ? "font-weight:bold;color:#000" : ""}"> ${res.title}</span>
          <img src="${require("../assets/img/plus.png")}">
          ${res.documents.length ? `<ul class="depth${depth+1}" style="display:${foldState ? "none" : "block"};">${this.makeChildLi(res.documents,depth+1)}</ul>` : ""}
        </li>
      `;
    }).join("");
  }

  this.render = () => {
    this.$sideBar.innerHTML = `
      <header>김성현의 Notion</header>
      <ul class="depth0">${this.makeChildLi(this.state.res_document)}</ul>
    `
  };

  this.render();

  this.hoverEvent = ($li = null) => {
    if(this.lastHover !== null){
      const lastHoverImg = this.lastHover.childNodes[3]

      lastHoverImg.style.display = "none";
    }

    if($li !== null){
      const hoverImg = $li.childNodes[3]

      hoverImg.style.display = "inline"
      this.lastHover = $li
    }
  }

  this.$sideBar.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const $li = e.target;

    if($li){
      const {id} = $li.closest("li").dataset;

      if ($li.tagName ==="LI") {
        const $ul = $li.childNodes[5]

        if($ul && $ul.tagName === "UL"){
          const foldState = this.getFoldState(id)

          $ul.style.display = foldState ? "block" : "none"
          $li.className = foldState ? "unfold" : "fold"

          this.setFoldState(id)
        }
      } else if($li.tagName ==="SPAN"){
        const prev_id = this.state.res_content.id
        const prev_node = document.querySelector(`li[data-id="${prev_id}"]`).childNodes[1]

        prev_node.style.fontWeight = "normal"
        prev_node.style.color = "#A3A29E"
        $li.style.fontWeight = "bold"
        $li.style.color = "#000"

        push(`/posts/${id}`);
      } else if($li.tagName === "IMG"){
        const foldState = this.getFoldState(id)

        if(foldState){
          $li.className = "unfold" 
          this.setFoldState(id)
        }
       
        onClickAdd(id) 
      }
    }
  })

  this.$sideBar.addEventListener("mouseover", (e) => {
    e.stopImmediatePropagation();
    const $li = e.target;

    if($li){
      const isLi = $li.closest("li") || null;

      if (isLi !==null) {
        this.hoverEvent(isLi)
      } else {
        this.hoverEvent()
      }
    }
  })
}

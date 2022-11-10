import { push } from "../router";
import { storage } from "../storage";

export default function SideBar({ $target, initialState, onClickAdd }) {
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
    const foldState = storage.getItem("foldState");
    const targetFoldState = foldState.find((fold) => fold.id === id.toString()) || { state: true };

    return targetFoldState.state;
  };

  this.setFoldState = (id) => {
    const foldState = storage.getItem("foldState");
    const targetFoldState = foldState.find((fold) => fold.id === id.toString()) || { state: true };
    //false = block, unfold

    const nextFoldState = foldState.filter((fold) => fold.id !== id.toString());

    storage.setItem(
      "foldState",
      JSON.stringify([
        ...nextFoldState,
        {
          id,
          state: !targetFoldState.state,
        },
      ])
    );
  };

  this.makeChildLi = ($nodes, depth = 0) => {
    return $nodes
      .map((res) => {
        const foldState = this.getFoldState(res.id);

        //prettier-ignore
        return `
          <li class=${foldState ? "fold" : "unfold"} data-id="${res.id}" style="padding-left:10px">
            <div 
              class="title" 
              style="${this.state.res_content.id===res.id ? "font-weight:bold;color:#000" : ""}; width:${275-depth*10-60}px"> 
                ${res.title || "제목 없음"}
            </div>
            <img src="${require("../assets/img/plus.png")}" class="plus_btn">
            ${res.documents.length ? `<ul style="display:${foldState ? "none" : "block"};">${this.makeChildLi(res.documents,depth+1)}</ul>` : ""}
          </li>
        `
      })
      .join("");
  };

  this.render = () => {
    this.$sideBar.innerHTML = `
      <header>
        <span>김성현의 Notion</span>
      </header>
      <div class="classification">
        <ul>
          <li data-id="parent">
            <span>개인 페이지 </span>
            <img src="${require("../assets/img/plus.png")}" class="plus_btn">
          </li>
        </ul>
        <ul id="personal" class="depth0">${this.makeChildLi(this.state.res_document)}</ul>
      </div>
      
    `;
  };

  this.hoverEvent = ($li = null) => {
    if (this.lastHover !== null) {
      const lastHoverImg = this.lastHover.childNodes[3];

      lastHoverImg.style.display = "none";
    }

    if ($li !== null) {
      const hoverImg = $li.childNodes[3];

      hoverImg.style.display = "inline";
      this.lastHover = $li;
    }
  };

  this.$sideBar.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const $div = e.target;
    const $classification = $div.closest(".classification");

    if ($div && $classification !== null) {
      const { id } = $div.closest("li").dataset;

      if ($div.tagName === "LI") {
        const $ul = $div.childNodes[5];

        if ($ul && $ul.tagName === "UL") {
          // click fold
          const foldState = this.getFoldState(id);

          $ul.style.display = foldState ? "block" : "none";
          $div.className = foldState ? "unfold" : "fold";

          this.setFoldState(id);
        }
      } else if ($div.tagName === "DIV") {
        //click text
        if (id === "parent") {
          const dis = document.querySelector("#personal").style.display;
          document.querySelector("#personal").style.display = !dis;
        } else {
          const prev_id = this.state.res_content.id;
          const prev_node = document.querySelector(`li[data-id="${prev_id}"]`).childNodes[1];

          prev_node.style.fontWeight = "normal";
          prev_node.style.color = "#A3A29E";
          $div.style.fontWeight = "bold";
          $div.style.color = "#000";

          push(`/posts/${id}`);
        }
      } else if ($div.tagName === "IMG") {
        //click plus
        const foldState = this.getFoldState(id);

        if (foldState) {
          $div.className = "unfold";
          this.setFoldState(id);
        }
        if (id === "parent") {
          onClickAdd(null);
        } else {
          onClickAdd(id);
        }
      }
    }
  });

  this.$sideBar.addEventListener("mouseover", (e) => {
    e.stopImmediatePropagation();
    const $div = e.target;
    const $classification = $div.closest(".classification");

    if ($div && $classification !== null) {
      const $li = $div.closest("li") || null;

      if ($li !== null) {
        this.hoverEvent($li);
      } else {
        this.hoverEvent();
      }
    }
  });
}

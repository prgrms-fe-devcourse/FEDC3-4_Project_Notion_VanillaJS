import { push } from "../router";
import { getItem, setItem } from "../storage";

export default function SideBar_personal({ $target, initialState, onClickAdd }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.$personal = $target;
  this.state = initialState;
  this.onClickAdd = onClickAdd;
  this.lastHover = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getFoldState = (id) => {
    const foldState = getItem("foldState");
    const targetFoldState = foldState.find((fold) => fold.id === id.toString())?.state;

    return targetFoldState == null ? true : targetFoldState;
  };

  this.setFoldState = (id) => {
    const foldState = getItem("foldState");
    const nextFoldState = foldState.filter((fold) => fold.id !== id.toString());

    if (this.getFoldState(id)) {
      setItem("foldState", [
        ...nextFoldState,
        {
          id,
          state: false,
        },
      ]);
    } else {
      setItem("foldState", [...nextFoldState]);
    }
  };

  this.hoverEvent = ($li = null) => {
    //hover evnet js로 구현
    if (this.lastHover !== null) {
      const lastHoverImg = this.lastHover.childNodes[3];
      const lastHoverText = this.lastHover.childNodes[1];

      lastHoverImg.style.display = "none";
      lastHoverText.style.backgroundColor = "#fbfbfa";
    }

    if ($li !== null) {
      const hoverImg = $li.childNodes[3];
      const hoverText = $li.childNodes[1];

      hoverImg.style.display = "inline";
      hoverText.style.backgroundColor = "#ebebea";
      this.lastHover = $li;
    }
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
              style="${this.state.res_content.id===res.id ? "font-weight:bold;color:#000;" : ""}; width:${275-depth*10-60}px"> 
                ${res.title || "제목 없음"}
            </div>
            <img src="${require("../assets/img/plus.png")}" class="plus_btn">
            <ul style="display:${foldState ? "none" : "block"};">${res.documents.length ? this.makeChildLi(res.documents,depth+1): this.lastChild()}</ul>
          </li>
        `
      })
      .join("");
  };

  this.lastChild = () => {
    return `<li class="lastChild"><span>하위 페이지 없음</span></li>`;
  };

  this.render = () => {
    this.$personal.innerHTML = `
      <ul>
        <li data-id="parent">
          <span>개인 페이지 </span>
          <img src="${require("../assets/img/plus.png")}" class="plus_btn">
        </li>
      </ul>
      <ul class="depth0">${this.makeChildLi(this.state.res_document)}</ul>
    `;
  };

  this.$personal.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const { target } = e;

    if (target) {
      const $classification = target.closest(".classification");

      if ($classification !== null) {
        const { id } = target.closest("li").dataset;

        if (target.tagName === "LI") {
          const $ul = target.childNodes[5];

          if ($ul && $ul.tagName === "UL") {
            // click fold

            const foldState = this.getFoldState(id);

            $ul.style.display = foldState ? "block" : "none";
            target.className = foldState ? "unfold" : "fold";

            this.setFoldState(id);
          }
        } else if (target.tagName === "DIV") {
          //click text
          if (id === "parent") {
            const dis = document.querySelector("#personal").style.display;

            document.querySelector("#personal").style.display = !dis;
          } else {
            const prev_id = this.state.res_content.id;
            const prev_node = document.querySelector(`li[data-id="${prev_id}"]`).childNodes[1];

            prev_node.style.fontWeight = "normal";
            prev_node.style.color = "#A3A29E";
            target.style.fontWeight = "bold";
            target.style.color = "#000";

            push(`/posts/${id}`);
          }
        } else if (target.tagName === "IMG") {
          //click plus
          const foldState = this.getFoldState(id);

          if (foldState) {
            target.className = "unfold";
            this.setFoldState(id);
          }
          if (id === "parent") {
            onClickAdd(null);
          } else {
            onClickAdd(id);
          }
        }
      }
    }
  });

  this.$personal.addEventListener("mouseover", (e) => {
    e.stopImmediatePropagation();
    const { target } = e;

    if (target) {
      const $classification = target.closest(".classification");

      if ($classification !== null) {
        const $li = target.closest("li");

        if ($li !== null && $li.className !== "lastChild") {
          this.hoverEvent($li);
        } else {
          this.hoverEvent();
        }
      }
    }
  });
}

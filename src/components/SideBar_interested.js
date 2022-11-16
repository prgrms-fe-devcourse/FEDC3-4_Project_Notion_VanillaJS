import { push } from "../router";
import { getItem } from "../storage";

export default function SideBar_interested({ $target, initialState }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.$interested = $target;
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.makeChildLi = ($nodes) => {
    //prettier-ignore
    return $nodes.map((res) => {
      return `
        <li class="fold" data-id="${res.id}" style="padding-left:7px">
          <div 
            class="title" 
            style="${this.state.res_content.id===res.id ? "font-weight:bold;color:#000;" : ""} width:210px"> 
              ${res.title || "제목 없음"}
          </div>
        </li>
      `;
    }).join("");
  };

  this.render = () => {
    const favoritesList = getItem("favoritesList", []);

    this.$interested.innerHTML = `
      <ul>
        <li data-id="parent">
          <span>즐겨 찾기</span>          
        </li>
      </ul>
      <ul class="depth0">${this.makeChildLi(favoritesList)}</ul>
    `;
  };

  this.$interested.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const { target } = e;
    const $li = target.closest(".fold");

    if (target && $li !== null) {
      const { id } = target.closest("li").dataset;

      push(`/posts/${id}`);
    }
  });
}

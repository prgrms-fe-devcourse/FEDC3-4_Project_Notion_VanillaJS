import SideBarItem from "./SideBarItem.js";
import { request } from "../../api/api.js";
import { push } from "../../utils/router.js";

export default function SideBarList({ $target, initialState }) {
  const $sideBarList = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $sideBarList.innerHTML = `
      <ul class="sidebar-list-ul">
        ${this.state.map((item) => SideBarItem(item)).join("")}
      </ul>
    `;

    $target.appendChild($sideBarList);
  };

  this.render();

  $sideBarList.addEventListener("click", async (e) => {
    const $item = e.target;
    const { id } = $item.parentElement.dataset;

    if ($item.className === "item-load") {
      push(`/documents/${id}`);

      return;
    }

    if ($item.className === "item-remove") {
      await request(`/documents/${id}`, {
        method: "delete",
      });

      push(`/`);

      return;
    }

    if ($item.className === "item-add") {
      const tempPost = {
        title: "",
        parent: id,
      };
      const createdPost = await request("/documents", {
        method: "post",
        body: JSON.stringify(tempPost),
      });

      // this.setState()
      push(`/documents/${createdPost.id}`);
    }
  });
}

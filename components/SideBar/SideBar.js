import SideBarList from "./SideBarList.js";
import { request } from "../../api/api.js";

export default function SideBar({ $target }) {
  const $sideBar = document.createElement("div");
  $sideBar.classList.add("layout-sidebar");

  const sideBarList = new SideBarList({
    $target: $sideBar,
    initialState: [],
  });

  this.setState = async () => {
    const documents = await request("/documents", {
      method: "get",
    });

    sideBarList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($sideBar);
  };
}

import SidebarHeader from "./SidebarHeader.js";
import SidebarBody from "./SidebarBody.js";
import SidebarFooter from "./SidebarFooter.js";
import { request } from "../../utils/api.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";
  const $sidebarHeader = document.createElement("div");
  const $sidebarBody = document.createElement("div");
  const $sidebarFooter = document.createElement("div");
  $target.appendChild($sidebar);

  this.init = async () => {
    this.state = await request("/documents", {
      method: "GET",
    });
    sidebarBody.setState(this.state);
    console.log("data GET", this.state);
  };

  this.init();

  new SidebarHeader({
    $target: $sidebarHeader,
  });

  const sidebarBody = new SidebarBody({
    $target: $sidebarBody,
    initialState: this.state,
  });

  sidebarBody.setState(this.state);

  new SidebarFooter({
    $target: $sidebarFooter,
  });

  this.render = () => {
    $target.appendChild($sidebar);
    $sidebar.appendChild($sidebarHeader);
    $sidebar.appendChild($sidebarBody);
    $sidebar.appendChild($sidebarFooter);
    console.log("sidebar render");
    console.log(this.state);
  };

  this.render();
}

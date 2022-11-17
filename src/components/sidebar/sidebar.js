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

  const sidebarBody = new SidebarBody({
    $target: $sidebarBody,
  });

  this.setState = () => {
    sidebarBody.setState();
  };

  new SidebarHeader({
    $target: $sidebarHeader,
    setState: this.setState(),
  });

  new SidebarFooter({
    $target: $sidebarFooter,
    setState: this.setState(),
  });

  this.render = () => {
    $target.appendChild($sidebar);
    $sidebar.appendChild($sidebarHeader);
    $sidebar.appendChild($sidebarBody);
    $sidebar.appendChild($sidebarFooter);
  };

  this.render();
}

import sidebarHeader from "./sidebarHeader.js";
import sidebarBody from "./sidebarBody.js";
import sidebarFooter from "./sidebarFooter.js";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";
  const $sidebarHeader = document.createElement("div");
  const $sidebarBody = document.createElement("div");
  const $sidebarFooter = document.createElement("div");
  $target.appendChild($sidebar);

  this.state = initialState;

  new sidebarHeader({
    $target: $sidebarHeader,
  });

  new sidebarBody({
    $target: $sidebarBody,
  });

  new sidebarFooter({
    $target: $sidebarFooter,
  });

  this.render = () => {
    $target.appendChild($sidebar);
    $sidebar.appendChild($sidebarHeader);
    $sidebar.appendChild($sidebarBody);
    $sidebar.appendChild($sidebarFooter);
    console.log("sidebar render");
  };

  this.render();
}

import { push } from "../../utils/router.js";

export default function SidebarHeader({ $target, setState }) {
  const $sidebarHeader = document.createElement("div");
  $sidebarHeader.className = "sidebar-header";
  $target.appendChild($sidebarHeader);

  this.render = () => {
    $sidebarHeader.innerHTML = `
    <div>
        <h4>최별의 Notion</h4>
    </div>
    `;
  };

  this.render();

  $sidebarHeader.addEventListener("click", (e) => {
    setState;
    push("/");
  });
}

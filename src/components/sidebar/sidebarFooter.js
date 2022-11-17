import { request } from "../../utils/api.js";
import { push } from "../../utils/router.js";

export default function SidebarFooter({ $target }) {
  const $sidebarFooter = document.createElement("div");
  $sidebarFooter.className = "sidebar-footer";
  $target.appendChild($sidebarFooter);

  this.render = () => {
    $sidebarFooter.innerHTML = `
    <div>
    + 새 페이지
    </div>
    `;
  };

  this.render();

  const addNewDocument = async () => {
    push("/documents/new");
  };

  $sidebarFooter.addEventListener("click", addNewDocument);
}

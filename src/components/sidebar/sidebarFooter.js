import { request } from "../../utils/api.js";
import { push } from "../../utils/router.js";

export default function SidebarFooter({ $target, setState }) {
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
    const newDocument = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목",
        parent: null,
      }),
    });
    setState;
    push("/");
    push(`/documents/${newDocument.id}`);
  };

  $sidebarFooter.addEventListener("click", addNewDocument);
}

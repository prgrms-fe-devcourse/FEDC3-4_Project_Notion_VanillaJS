import { request } from "../../utils/api.js";

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

  $sidebarFooter.addEventListener("click", async (e) => {
    await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "test",
        parent: null,
      }),
    });
    console.log("sidebarFooter clicked");
  });
}

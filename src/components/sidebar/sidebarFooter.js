export default function sidebarFooter({ $target }) {
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
}

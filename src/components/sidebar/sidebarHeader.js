export default function sidebarHeader({ $target }) {
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
}

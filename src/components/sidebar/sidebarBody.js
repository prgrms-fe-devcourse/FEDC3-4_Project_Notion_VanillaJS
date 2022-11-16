export default function sidebarBody({ $target }) {
  const $sidebarBody = document.createElement("div");
  $sidebarBody.className = "sidebar-body";
  $target.appendChild($sidebarBody);

  this.render = () => {
    $sidebarBody.innerHTML = `
    <div>document 로딩 예정</div>
    `;
  };

  this.render();
}

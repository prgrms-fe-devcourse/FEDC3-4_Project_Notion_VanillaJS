export default function SideBar_add({ $target, onClickAdd }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  const $add = $target;
  this.onClickAdd = onClickAdd;

  this.render = () => {
    $add.innerHTML = `
      <div class="bottomContainer"> 
        <img src="${require("../../assets/img/plus.png")}" class="plus_btn_bottom">
        <span>새 페이지</span>
      </div>
    `;
  };

  this.render();

  $add.addEventListener("click", (e) => {
    const $div = e.target.closest(".sideBarAdd");
    if ($div) {
      this.onClickAdd(null);
    }
  });
}

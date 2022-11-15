export default function StartPage({ $target }) {
  const $startPage = document.createElement("div");
  $startPage.classList.add("startPage");

  this.render = () => {
    $target.appendChild($startPage);
    $startPage.innerHTML = `
        <h1 class="startTitle">시작하기</h1>
        <h3>노션 클로닝 프로젝트</h3>
        <ul class="startList">
            <li> <b>+ 페이지 추가하기 버튼</b>을 눌러서 페이지를 추가하세요!</li>
            <li> 페이지를 클릭해서 글을 작성해보세요.</li>
            <li> <b>+ 버튼</b>을 눌러서 하위 목록을 추가해보세요!</li>
            <li> <b>- 버튼</b>을 눌러서 페이지를 삭제할 수 있어요.</li>
            <li> 노션 로고 또는 user 를 클릭하면 시작 화면으로 돌아올 수 있어요.</li>
        </ulc>

        `;
  };

  this.render();
}

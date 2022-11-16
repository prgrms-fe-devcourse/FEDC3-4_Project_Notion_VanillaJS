export default function Home({ $target }) {
  const $home = document.createElement("div");
  $home.className = "home";

  $target.appendChild($home);

  this.render = () => {
    if (window.location.pathname !== "/") $home.style.display = "none";
    else $home.style.display = "flex";

    $home.innerHTML = `
        <div class="title">
        안녕하세요, BeNI의 노션 클로닝 프로젝트 입니다.
        <a href="https://github.com/beni1026/FEDC3-4_Project_Notion_VanillaJS">전체 소스코드(링크)</a>
        </div>

        <div>
        <ul>
          <li>왼쪽 리스트는 Notion과 마찬가지로 각 Post들이 트리구조로 이루어져
          루트나 하위 디렉토리에 새 Post를 생성/수정/삭제가 가능합니다.
          </li>
          <li>에디터에는 저장버튼이 없고, 입력할 시 자동으로 서버에 저장됩니다.
          만약에 저장이 안됐을 시, 로컬 스토리지에 저장되어 불러올 수 있습니다.</li>
          <li>
          웹 페이지는 SPA 형태로, /document/{documentId} 로 접속할시 해당 id를 가진 post가 랜더링 됩니다.
          </li>
        </ul>

        </div>
         
        <div class="sub">
        아래 이미지는 이해를 돕기위한 컴포넌트 구조입니다.
          <img src="/src/img/components.PNG" />
        </div>
      `;
  };

  this.render();
}

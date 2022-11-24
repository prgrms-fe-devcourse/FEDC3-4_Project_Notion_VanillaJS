import Router from "../../Router";

export default function PostSublinks({ $target, initialState }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  const router = new Router();

  const $footer = $target;
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const target = this.state.res_content.documents || [];
    //prettier-ignore
    $footer.innerHTML = `
    <span>하위 디렉토리 ${target.length>0 ? "" : " 없음"}</span>
      <ul>
        ${target.map((doc) => {
          return `
            <li class="footer_li" data-id="${doc.id}">→ ${doc.title || "제목 없음"}</li>
          `;
          }).join("")}
      </ul>
    `;
  };

  $footer.addEventListener("click", (e) => {
    const { target } = e;

    if (target) {
      const { classList } = e.target;

      if (classList.contains("footer_li")) {
        const { id } = e.target.dataset;

        if (id) {
          router.push(`/posts/${id}`);
        }
      }
    }
  });
}

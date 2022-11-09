export default function PostPage({ $target, initialState }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.state = initialState;

  this.$div = document.createElement("div");
  this.$div.className = "postPage";

  $target.appendChild(this.$div);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$div.innerHTML = `
      <header>
        <span class="header_title">${this.state.title}</span>
        <div class="header_action_btns">
          <button type="button">공유</button>
          <button type="button">댓글</button>
          <button type="button">시간</button>
          <button type="button">별</button>
          <button type="button">설정</button>
        </div>
      </header>
      <setcion class="editor">
        <h1 class="setction_title">${this.state.title}</h1>
        <div class="setcion_content">${this.state.content ? this.state.content : "내용 없음"}</div>
      </section>
    `;
  };
  this.render();
}

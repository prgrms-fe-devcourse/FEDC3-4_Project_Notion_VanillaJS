function DocumentEditor({ $target, initialState, onChange }) {
  const $editor = document.createElement("section");
  $editor.className = "document-editor";
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content, documents } = this.state.data;

    // 로딩 처리 해주기

    console.log(content, "내용 수정됨");
    $editor.innerHTML = `
      <input class="editor-document-title" value="${
        title ? title : "제목을 입력하세요."
      }"/>
      <textarea class="editor-text" autofocus="true">${
        content ? content : "아직 내용이 없습니다."
      }</textarea>
    `;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const $textarea = e.target.closest("textarea");

    if ($textarea) {
      const $title = document.querySelector(".editor-document-title");

      onChange($title.value, $textarea.value);
      return;
    }

    const $input = e.target.closest("input");

    if ($input) {
      const $content = document.querySelector(".editor-text");

      onChange($input.value, $content.value);
    }
  });
}

export default DocumentEditor;

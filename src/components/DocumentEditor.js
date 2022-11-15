function DocumentEditor({ $target, initialState, onChange }) {
  const $editor = document.createElement("section");
  $editor.className = "document-editor";
  $target.appendChild($editor);

  this.debounce = null;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content, documents } = this.state.data;

    if (!title && !content) {
      $editor.innerHTML = `
        <h1>loading..</h1>
      `;
      return;
    }

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

      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.debounce = setTimeout(() => {
        onChange($title.value, $textarea.value);
      }, 5000);

      return;
    }

    const $input = e.target.closest("input");

    if ($input) {
      const $content = document.querySelector(".editor-text");
      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.debounce = setTimeout(() => {
        onChange($input.value, $content.value);
      }, 5000);
    }
  });
}

export default DocumentEditor;

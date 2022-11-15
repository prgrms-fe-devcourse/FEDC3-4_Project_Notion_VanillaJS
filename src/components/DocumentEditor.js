import { parseMarkdown } from "../utils/parseMarkdown.js";

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

  const parseContent = (text) => {
    console.log(text);
    const a = text.replace("/n", "<br />");
    console.log(text, "변경후");
    return a;
  };

  this.render = () => {
    const { title, content, documents } = this.state.data;
    console.log(content);

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
      <article class="eidtor-wrapper">
        <div class="editor-text" autofocus="true" contenteditable="true">${
          content ? parseContent(content) : "아직 내용이 없습니다."
        }</div>
        <div>
          ${parseMarkdown(content)}
        </div>
      </article>

      <div class="child-documents-wrapper">
        <p>📌하위 문서 목록</p>
          ${documents
            .map(({ id, title }) => `<a href="/documents/${id}">${title}</a>`)
            .join("")}
      </div>
    `;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const $div = e.target.closest("div");

    if ($div) {
      const $title = document.querySelector(".editor-document-title");

      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.debounce = setTimeout(() => {
        console.log($div.innerText);
        onChange($title.value, $div.innerText);
      }, 2000);

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
      }, 2000);
    }
  });
}

export default DocumentEditor;

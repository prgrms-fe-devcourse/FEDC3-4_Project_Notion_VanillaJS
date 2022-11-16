import { navigate } from "../utils/router.js";
import EditorPreview from "./EditorPreview.js";

function DocumentEditor({ $target, initialState, onChange }) {
  const $editor = document.createElement("section");
  $editor.className = "document-editor";
  $target.appendChild($editor);

  this.debounce = null;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    editorPreview.setState({
      data: this.state.data,
    });
  };

  const editorPreview = new EditorPreview({
    $target,
    initialState: {
      data: this.state.data,
    },
  });

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
      <article class="eidtor-wrapper">
        <div class="editor-text" autofocus="true" contenteditable="true">${
          content ? content : ""
        }</div>
      </article>
      ${
        documents.length > 0
          ? `<div class="child-documents-wrapper">
          <p>📌하위 문서 목록</p>
            ${documents
              .map(({ id, title }) => `<a href="/documents/${id}">${title}</a>`)
              .join("")}
        </div>`
          : ""
      }
    `;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const $div = e.target.closest("div");

    if ($div) {
      const $title = document.querySelector(".editor-document-title");
      const $content = document.querySelector(".editor-text");

      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.debounce = setTimeout(() => {
        onChange($title.value, $content.innerText);
      }, 500);

      return;
    }
  });

  $editor.addEventListener("click", (e) => {
    e.preventDefault();

    const $a = e.target.closest("a");

    if ($a) {
      console.log($a.href);
      const [, , , , documentId] = $a.href.split("/");
      navigate(`/document/${documentId}`);
    }
  });
}

export default DocumentEditor;

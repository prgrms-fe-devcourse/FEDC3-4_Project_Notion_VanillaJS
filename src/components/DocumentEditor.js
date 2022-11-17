import { navigate } from "../utils/router.js";
import EditorPreview from "./EditorPreview.js";
import { className } from "../utils/constants.js";

function DocumentEditor({ $target, initialState, onChange }) {
  const { editorDocumentTitle, editorDocumentContent } = className;

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

    if (!title) {
      $editor.innerHTML = `
        <h1>loading..</h1>
      `;
      return;
    }

    $editor.innerHTML = `
      <input class="${editorDocumentTitle}" value="${
      title ? title : "제목을 입력하세요."
    }"/>
      <article class="eidtor-wrapper">
        <div class="${editorDocumentContent}" autofocus="true" contenteditable="true">${
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

  const updateDocument = () => {
    const $title = document.querySelector(`.${editorDocumentTitle}`);
    const $content = document.querySelector(`.${editorDocumentContent}`);

    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      onChange($title.value, $content.innerText);
    }, 500);
  };

  $editor.addEventListener("keyup", (e) => {
    const $div = e.target.closest("div");

    if ($div) {
      updateDocument();
      return;
    }
  });

  $editor.addEventListener("click", (e) => {
    e.preventDefault();

    const $a = e.target.closest("a");

    if ($a) {
      const [, , , , documentId] = $a.href.split("/");
      navigate(`/document/${documentId}`);
    }
  });
}

export default DocumentEditor;

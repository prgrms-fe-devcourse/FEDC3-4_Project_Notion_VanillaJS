import {
  removeSameDocument,
  editorRender,
  subDocumentRender,
  sameDocumentRender,
} from "../../js/relatedEditor.js";
import { NOT_RENDER } from "../../js/constants.js";

export default function Editor({ $editorPageTarget, onEditing }) {
  const $editor = document.createElement("div");

  $editor.innerHTML = `
    <img name="icon" class="editor-icon" src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" />
    <input type="text" name="title" class="editor-input" placeholder="제목 없음" />
    <textarea name="content" class="editor-textarea" placeholder="내용 없음"></textarea>
    <div name="editor-subdocuments" class="editor-subdocuments"></div>
    <div name="samelink" class="editor-same__link">
      <i class="fa-solid fa-link"></i>
      <a href="#" name="documentlink"></a>
    </div>
  `;

  $editorPageTarget.appendChild($editor);

  this.editorState = {
    editorData: { id: 0, title: NOT_RENDER },
    documentIdData: [],
    documentTitleData: [],
  };

  this.editorSetState = (nextState) => {
    removeSameDocument(this.editorState.editorData.id, nextState.editorData.id);

    this.editorState.editorData = nextState.editorData;
    this.editorState.documentIdData = nextState.documentIdData;
    this.editorState.documentTitleData = nextState.documentTitleData;
    this.render();
  };

  this.render = () => {
    if (!this.editorState.editorData) return;

    const { title, content, documents } = this.editorState.editorData;

    $editorPageTarget.querySelector(
      "[name=editor-subdocuments]"
    ).innerHTML = ``;

    // by 민형, index 페이지 일 경우_221113
    title === NOT_RENDER
      ? editorRender($editorPageTarget, "none")
      : editorRender($editorPageTarget, "block");

    // by 민형, 처음 페이지를 추가했을 때 title을 제목 없음으로 넘겨주는데 "제목 없음"을 value로 설정하면 placeholder가 작동 안 함_221115
    // "제목 없음" document로 왔을 때도 tile이 ""로 수정되어야 함, 수정되지 않으면 이전 document의 title이 render
    $editorPageTarget.querySelector("[name=title]").value = title;
    $editorPageTarget.querySelector("[name=content]").value = content;

    if (documents) subDocumentRender($editorPageTarget, documents);
  };

  this.render();

  $editorPageTarget
    .querySelector("[name=title]")
    .addEventListener("keyup", (e) => {
      const newTitle = e.target.value;
      if (newTitle === undefined) return;

      document.querySelector(".editor-same__link").style.display = "none";
      // by 민형, 기존의 title과 동일한 document title을 입력했을 경우_221116
      if (this.editorState.documentTitleData.includes(newTitle)) {
        const coinCildeIndex =
          this.editorState.documentTitleData.indexOf(newTitle);
        const coinCildeId = this.editorState.documentIdData[coinCildeIndex];
        sameDocumentRender($editorPageTarget, newTitle, coinCildeId);
      }

      const nextState = {
        editorData: {
          ...this.editorState.editorData,
          title: newTitle || "",
        },
        documentIdData: this.editorState.documentIdData,
        documentTitleData: this.editorState.documentTitleData,
      };
      this.editorSetState(nextState);
      onEditing(nextState);
    });

  $editorPageTarget
    .querySelector("[name=content]")
    .addEventListener("keyup", (e) => {
      const newContent = e.target.value;
      if (newContent === undefined) return;

      const nextState = {
        editorData: { ...this.editorState.editorData, content: newContent },
        documentIdData: this.editorState.documentIdData,
        documentTitleData: this.editorState.documentTitleData,
      };
      this.editorSetState(nextState);
      onEditing(nextState);
    });
}

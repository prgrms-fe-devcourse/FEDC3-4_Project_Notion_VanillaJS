export default function Editor({ $editorPageTarget, initialState, onEditing }) {
  const $editor = document.createElement("div");

  $editor.innerHTML = `
    <img name="icon" class="editor-icon" src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" />
    <input type="text" name="title" class="editor-input" />
    <textarea name="content" class="editor-textarea">안녕</textarea>
    <div name="editor-subdocuments" class="editor-subdocuments"></div>
    <div name="samelink" class="editor-same__link">
      <i class="fa-solid fa-link"></i>
      <a href="#" name="documentlink"></a>
    </div>
  `;

  $editorPageTarget.appendChild($editor);

  this.editorState = {
    editorData: undefined,
    documentIdData: [],
    documentTitleData: [],
  };

  this.editorSetState = (nextState) => {
    this.editorState.editorData = nextState.editorData;
    this.editorState.documentIdData = nextState.documentIdData;
    this.editorState.documentTitleData = nextState.documentTitleData;
    this.render();
  };

  const indexRender = (status) => {
    $editorPageTarget.querySelector("[name=title]").style.display = status;
    $editorPageTarget.querySelector("[name=content]").style.display = status;
    $editorPageTarget.querySelector("[name=icon]").style.display = status;
  };

  this.render = () => {
    if (this.editorState.editorData) {
      const { title, content, documents } = this.editorState.editorData;

      $editorPageTarget.querySelector(
        "[name=editor-subdocuments]"
      ).innerHTML = ``;
      // by 민형, index 페이지 일 경우_221113
      if (title === "not render") {
        indexRender("none");
      } else {
        indexRender("block");

        $editorPageTarget.querySelector("[name=title]").value =
          title || "제목 없음";
        $editorPageTarget.querySelector("[name=content]").value =
          content || "내용 없음";

        documents.forEach((doc) => {
          const $linkDiv = document.createElement("div");
          $linkDiv.classList.add("editor-subdocument");

          const $i = document.createElement("i");
          $i.innerHTML = `<i class="fa-solid fa-link"></i>`;

          const $link = document.createElement("a");
          $link.textContent = doc.title;
          $link.href = `/documents/${doc.id}`;

          $linkDiv.appendChild($i);
          $linkDiv.appendChild($link);

          $editorPageTarget
            .querySelector("[name=editor-subdocuments]")
            .appendChild($linkDiv);
        });
      }
    }
    // by 민형, 서버에서 데이터를 먼저 불러오므로 먼저 render_221112
    // console.log("ediotr render");
  };

  this.render();

  $editorPageTarget
    .querySelector("[name=title]")
    .addEventListener("keyup", (e) => {
      const newTitle = e.target.value;
      if (newTitle) {
        document.querySelector(".editor-same__link").style.display = "none";

        if (this.editorState.documentTitleData.includes(newTitle)) {
          const coinCildeIndex =
            this.editorState.documentTitleData.indexOf(newTitle);
          const coinCildeId = this.editorState.documentIdData[coinCildeIndex];
          $editorPageTarget.querySelector(
            "[name=documentlink]"
          ).href = `/documents/${coinCildeId}`;
          $editorPageTarget.querySelector(
            "[name=documentlink]"
          ).textContent = `기존 "${newTitle}" document가 있으니 해당 text 클릭을 통해 이동 부탁드립니다!`;
          document.querySelector(".editor-same__link").style.display = "block";
        }

        const nextState = {
          editorData: { ...this.editorState.editorData, title: newTitle },
          documentIdData: this.editorState.documentIdData,
          documentTitleData: this.editorState.documentTitleData,
        };
        this.editorSetState(nextState);
        onEditing(nextState);
      }
    });

  $editorPageTarget
    .querySelector("[name=content]")
    .addEventListener("keyup", (e) => {
      const newContent = e.target.value;
      if (newContent) {
        const nextState = {
          editorData: { ...this.editorState.editorData, content: newContent },
          documentIdData: this.editorState.documentIdData,
          documentTitleData: this.editorState.documentTitleData,
        };
        this.editorSetState(nextState);
        onEditing(nextState);
      }
    });
}

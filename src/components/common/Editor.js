export default function Editor({ $editorPageTarget, initialState, onEditing }) {
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
    editorData: { id: 0, title: "not render" },
    documentIdData: [],
    documentTitleData: [],
  };

  // by 민형, 다른 페이지로 이동 시 same document 알림 text 제거_221115
  const removeSameDocument = (prevId, nextId) => {
    if (prevId !== nextId)
      document.querySelector(".editor-same__link").style.display = "none";
  };

  this.editorSetState = (nextState) => {
    removeSameDocument(this.editorState.editorData.id, nextState.editorData.id);

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

        // by 민형, 처음 페이지를 추가했을 때 title을 제목 없음으로 넘겨주는데 "제목 없음"을 value로 설정하면 placeholder가 작동 안 함_221115
        // "제목 없음" document로 왔을 때도 tile이 ""로 수정되어야 함, 수정되지 않으면 이전 document의 title이 render
        $editorPageTarget.querySelector("[name=title]").value =
          title === "제목 없음" ? "" : title;
        $editorPageTarget.querySelector("[name=content]").value = content;

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
      if (newTitle !== undefined) {
        document.querySelector(".editor-same__link").style.display = "none";
        if (this.editorState.documentTitleData.includes(newTitle)) {
          const coinCildeIndex =
            this.editorState.documentTitleData.indexOf(newTitle);
          const coinCildeId = this.editorState.documentIdData[coinCildeIndex];
          const { pathname } = location;
          const [, , pathId] = pathname.split("/");

          if (parseInt(pathId) !== coinCildeId) {
            $editorPageTarget.querySelector(
              "[name=documentlink]"
            ).href = `/documents/${coinCildeId}`;
            $editorPageTarget.querySelector(
              "[name=documentlink]"
            ).textContent = `기존 "${newTitle}" document가 있으니 해당 text 클릭을 통해 이동 부탁드립니다!`;

            document.querySelector(".editor-same__link").style.display = "flex";
            document.querySelector(".editor-same__link i").style.display =
              "block";
          }
        }

        const nextState = {
          editorData: {
            ...this.editorState.editorData,
            title: newTitle || "제목 없음",
          },
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
      if (newContent !== undefined) {
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

export default function Editor({ $editorPageTarget, initialState, onEditing }) {
  const $editor = document.createElement("div");

  $editor.innerHTML = `
    <input type="text" name="title" style="width: 600px; display:none;"/>
    <textarea name="content" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px; display:none;">안녕</textarea>
    <div name="subdocument" class="subdocument"></div>
    <a href="#" name="documentlink"></a>
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
  };

  this.render = () => {
    if (this.editorState.editorData) {
      const { title, content, documents } = this.editorState.editorData;

      $editorPageTarget.querySelector("[name=subdocument]").innerHTML = ``;
      // by 민형, index 페이지 일 경우_221113
      if (title === "not render") {
        indexRender("none");
      } else {
        indexRender("block");

        $editorPageTarget.querySelector("[name=title]").value = title;
        $editorPageTarget.querySelector("[name=content]").value = content;

        documents.forEach((doc) => {
          const $link = document.createElement("a");
          $link.textContent = doc.title;
          $link.href = `/documents/${doc.id}`;
          $link.style.marginRight = "30px";

          $editorPageTarget
            .querySelector("[name=subdocument]")
            .appendChild($link);
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
        $editorPageTarget.querySelector("[name=documentlink]").textContent = "";

        if (this.editorState.documentTitleData.includes(newTitle)) {
          const coinCildeIndex =
            this.editorState.documentTitleData.indexOf(newTitle);
          const coinCildeId = this.editorState.documentIdData[coinCildeIndex];
          $editorPageTarget.querySelector(
            "[name=documentlink]"
          ).href = `/documents/${coinCildeId}`;
          $editorPageTarget.querySelector(
            "[name=documentlink]"
          ).textContent = `기존 ${newTitle} document가 있으니 이동 부탁드립니다!`;
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

import { isConstructor } from "../../Helpers/checkError.js";

export default function DocumentEditor({ $target, initialState }) {
  isConstructor(new.target);
  const $documentEditor = document.createElement("div");
  $target.appendChild($documentEditor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentEditor.innerHTML = `
    <div class="editor-menu">
    <button id="btnBold">
        <b>B</b>
    </button>
    <button id="btnItalic">
        <i>I</i>
    </button>
    <button id="btnUnderline">
        <u>U</u>
    </button>
    <button id="btnStrike">
        <s>S</s>
    </button>
    <button id="btnOrderedList">
        OL
    </button>
    <button id="btnUnorderedList">
        UL
    </button>
</div>
<div id="editor" contenteditable="true"></div>
`;
  };

  const setStyle = (style) => {
    document.execCommand(style);
    document.querySelector("#editor").focus({ preventScroll: true });
  };

  $documentEditor.addEventListener("click", (e) => {
    if (e.target && e.target.id === "btnBold") {
      setStyle("bold");
    }

    if (e.target && e.target.id === "btnItalic") {
      setStyle("italic");
    }

    if (e.target && e.target.id === "btnUnderline") {
      setStyle("underline");
    }

    if (e.target && e.target.id === "btnStrike") {
      setStyle("strikeThrough");
    }

    if (e.target && e.target.id === "btnOrderedList") {
      setStyle("insertOrderedList");
    }

    if (e.target && e.target.id === "btnUnorderedList") {
      setStyle("insertUnorderedList");
    }
  });

  this.render();
}

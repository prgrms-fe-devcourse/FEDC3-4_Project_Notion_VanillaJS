import { isConstructor } from "../../Helpers/checkError.js";

export default function DocumentEditor({
  $target,
  initialState,
  saveDocumentEvent,
}) {
  isConstructor(new.target);
  const $documentEditor = document.createElement("div");
  $documentEditor.id = "documentEditor";
  $target.appendChild($documentEditor);

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = await nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    $documentEditor.innerHTML = `
    <div data-id="${this.state.id}">
      <div id="editorTitle" contenteditable="true">${this.state.title}</div>
      <div id="editorMenu">
        <button id="bold">
            <b>B</b>
        </button>
        <button id="italic">
            <i>I</i>
        </button>
        <button id="underline">
            <u>U</u>
        </button>
        <button id="strikeThrough">
            <s>S</s>
        </button>
        <button id="insertOrderedList">
            OL
        </button>
        <button id="insertUnorderedList">
            UL
        </button>
      </div>
      <div id="editorContent" contenteditable="true">${this.state.content}</div>
      <div id="editorSave">
        <button id="saveDocumentButton">
            Save
        </button>
      </div>
    </div>
`;
  };

  const setStyle = (style) => {
    document.execCommand(style);
  };

  $documentEditor.addEventListener("click", (e) => {
    if (e.target.closest("#editorMenu") && e.target.id) {
      setStyle(e.target.id);
    }

    if (
      e.target.closest("#editorSave") &&
      e.target.id === "saveDocumentButton"
    ) {
      saveDocumentEvent({ $target: e.target });
    }
  });

  this.render();
}

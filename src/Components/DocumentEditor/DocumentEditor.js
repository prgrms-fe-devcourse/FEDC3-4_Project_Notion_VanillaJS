import { isConstructor } from '../../Helpers/checkError.js';

export default function DocumentEditor({
  $target,
  initialState,
  saveDocumentEvent,
  saveLocalStorageEvent,
}) {
  isConstructor(new.target);

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = await nextState;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
    <div data-id="${this.state.id}" class="p-6">
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
      </div>
    </div>
`;
  };

  const setStyle = (style) => {
    document.execCommand(style);
  };

  $target.addEventListener('click', (e) => {
    if (e.target.closest('#editorMenu') && e.target.id) {
      setStyle(e.target.id);
    }
  });

  let setDebounce;
  $target.addEventListener('input', (e) => {
    saveLocalStorageEvent({ $target: e.target });

    if (setDebounce) {
      clearTimeout(setDebounce);
    }

    setDebounce = setTimeout(() => {
      saveDocumentEvent({ $target: e.target });
    }, 1000);
  });

  this.render();
}

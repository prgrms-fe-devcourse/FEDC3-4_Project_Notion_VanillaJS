import { isConstructor } from '../../Helpers/checkError.js';
import { debounceFunction } from '../../Helpers/debounce.js';

export default function DocumentEditor({ $target, initialState, saveApi, saveLocalStorage }) {
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
        <button class="w-12" data-event="bold">
            <b>BB</b>
        </button>
        <button class="w-12" data-event="italic">
            <i>I</i>
        </button>
        <button class="w-12" data-event="underline">
            <u>U</u>
        </button>
        <button class="w-12" data-event="strikeThrough">
            <s>S</s>
        </button>
        <button class="w-12" data-event="insertOrderedList">
            OL
        </button>
        <button class="w-12" data-event="insertUnorderedList">
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

  debounceFunction({
    $target,
    type: 'input',
    cycle: 1000,
    callback: saveApi,
  });

  $target.addEventListener('click', (e) => {
    const event = e.target.closest(['button'])?.dataset.event;
    if (event) {
      setStyle(event);
    }
  });

  $target.addEventListener('input', (e) => {
    saveLocalStorage({ $target: e.target });
  });

  this.render();
}

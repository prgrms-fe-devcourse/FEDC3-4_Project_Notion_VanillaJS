import { checkConstructor } from '../../Helpers/checkError.js';
import { debounceFunction } from '../../Helpers/debounce.js';
import { editorButton } from './editorButton.js';

export default function DocumentEditor({ $target, initialState, saveApi, saveLocalStorage }) {
  checkConstructor(new.target);

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = await nextState;
    this.render();
  };
  editorButton({ color: 'gray', text: '<b>B</b>', event: 'bold' });
  editorButton({ color: 'green', text: '<i>I</i>', event: 'italic' });
  editorButton({ color: 'blue', text: '<u>U</u>', event: 'underline' });
  editorButton({ color: 'purple', text: '<s>S</s>', event: 'strikeThrough' });
  editorButton({ color: 'yellow', text: 'OL', event: 'insertOrderedList' });
  editorButton({ color: 'red', text: 'UL', event: 'insertUnorderedList' });

  this.render = () => {
    $target.innerHTML = `
    <div data-id="${this.state.id}" class="p-6">
      <div id="editorTitle" contenteditable="true" class="block p-1 m-4 w-2/3 h-8 text-gray-900 hover:bg-stone-100 focus:bg-stone-100 rounded-lg border border-stone-300">${
        this.state.title
      }</div>
      <div class="ml-8" id="editorMenu">
        ${editorButton({ color: 'gray', text: '<b>B</b>', event: 'bold' })}
        ${editorButton({ color: 'green', text: '<i>I</i>', event: 'italic' })}
        ${editorButton({ color: 'blue', text: '<u>U</u>', event: 'underline' })}
        ${editorButton({ color: 'purple', text: '<s>S</s>', event: 'strikeThrough' })}
        ${editorButton({ color: 'yellow', text: 'OL', event: 'insertOrderedList' })}
        ${editorButton({ color: 'red', text: 'UL', event: 'insertUnorderedList' })}
      </div>
      <div id="editorContent" contenteditable="true" class="block p-1 m-4 w-2/3 h-1/2 text-lg text-gray-900 hover:bg-stone-100 focus:bg-stone-100 rounded-lg border border-stone-300">${
        this.state.content
      }</div>
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

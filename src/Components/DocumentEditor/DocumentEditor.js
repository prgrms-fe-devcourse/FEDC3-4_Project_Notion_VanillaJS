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
      <div id="editorTitle" contenteditable="true" class="block p-1 m-4 w-2/3 h-8 text-gray-900 hover:bg-stone-100 focus:bg-stone-100 rounded-lg border border-stone-300">${this.state.title}</div>
      <div id="editorMenu">
        <button class="ml-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-1 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        data-event="bold">
            <b>B</b>
        </button>
        <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-1 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        data-event="italic">
            <i>I</i>
        </button>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-1 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        data-event="underline">
            <u>U</u>
        </button>
        <button class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        data-event="strikeThrough">
            <s>S</s>
        </button>
        <button class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-1 ml-2 mb-2 dark:focus:ring-yellow-900"
        data-event="insertOrderedList">
            OL
        </button>
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-1 ml-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        data-event="insertUnorderedList">
            UL
        </button>
      </div>
      <div id="editorContent" contenteditable="true" class="block p-1 m-4 w-2/3 h-1/2 text-lg text-gray-900 hover:bg-stone-100 focus:bg-stone-100 rounded-lg border border-stone-300">${this.state.content}</div>
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

import { hasContent, hasNewTarget } from "../utils/error.js";
import { classNameObj, DEFAULT_CONTENT, DISABLED_ID, ERROR_NEW_KEYWORD_MISSING } from "../utils/constants.js";

export default function Editor({ $target, initialState, onEditing }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $editor = document.createElement("div");
  $editor.setAttribute("class", classNameObj.EDOTOR_EDITOR);
  $target.appendChild($editor);

  let isInit = false;

  const isValidState = (state) => {
    if (!state || !hasContent(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { content: "" };

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    const { id, content } = this.state;
    const textarea = $editor.querySelector("textarea");

    if (!content || content === DEFAULT_CONTENT) {
      textarea.value = "";
      textarea.placeholder = id === DISABLED_ID ? "" : DEFAULT_CONTENT;
    } else {
      textarea.value = this.state.content;
    }

    this.state.id === DISABLED_ID ? (textarea.disabled = true) : (textarea.disabled = false);
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
        <textarea class="${classNameObj.SCROLLBAR}">${this.state.content}</textarea>
      `;
    }
  };

  this.render();

  $editor.addEventListener("input", (e) => {
    const { value } = e.target;

    onEditing(value);
  });

  $editor.querySelector("textarea").addEventListener("focus", (e) => {
    e.target.placeholder = "";
  })
}

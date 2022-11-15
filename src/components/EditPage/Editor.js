import { hasContent, hasNewTarget } from "../utils/error.js";
import { DISABLED_ID, ERROR_NEW_KEYWORD_MISSING } from "../utils/constants.js";

export default function Editor({ $target, initialState, onEditing }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editor");
  $target.appendChild($editor);

  let isInit = false;

  //validation
  const isValidContent = (state) => {
    if (!state || !hasContent(state)) return false;
    return true;
  };

  //state
  this.state = isValidContent(initialState) ? initialState : { content: "" };

  this.setState = (nextState) => {
    if (!isValidContent(nextState)) return;

    this.state = nextState;
    const textarea = $editor.querySelector("textarea");
    textarea.value = this.state.content;

    this.state.id === DISABLED_ID
      ? (textarea.disabled = true)
      : (textarea.disabled = false);
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
        <textarea>${this.state.content}</textarea>
      `;
    }
  };

  this.render();

  //event handler
  $editor.addEventListener("input", (e) => {
    const { value } = e.target;

    onEditing(value);
  });
}

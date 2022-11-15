import { hasContent, isValidateString, hasNewTarget } from "../../utils/error.js";
import { ERROR_NEW_KEYWORD_MISSING } from "../../utils/constants.js";

export default function Editor({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editor");
  $target.appendChild($editor);

  let isInit = false;

  //method
  const isValidateContent = (state) => {
    if (hasContent(state) && isValidateString(state.content)) return true;
    return false;
  };

  //state
  this.state = isValidateContent(initialState) ? initialState : { content: "" };

  this.setState = (nextState) => {
    if (!isValidateContent(nextState)) return;

    this.state = nextState;
    $editor.querySelector("textarea").value = this.state.content;
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
    const { target } = e;
    const { value } = target;

    this.setState({
      content: value,
    });
  });
}

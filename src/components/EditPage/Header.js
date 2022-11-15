import {
  ERROR_NEW_KEYWORD_MISSING,
  DEFAULT_TITLE,
  DISABLED_ID,
  ROOT_TITLE,
} from "../utils/constants.js";
import { hasId, hasNewTarget, hasTitle } from "../utils/error.js";

export default function Header({ $target, initialState, onEditing }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  //tags
  const $header = document.createElement("header");
  $target.appendChild($header);

  let isInit = false;

  //validation
  const isValidState = (state) => {
    if (!state) return false;
    if (!hasId(state) || !hasTitle(state)) return false;
    return true;
  };

  //state
  this.state = isValidState(initialState) ? initialState : { title: "" };

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;
    this.state = nextState;

    const { title } = this.state;
    const input = $header.querySelector("input");

    if (title === DEFAULT_TITLE || title === ROOT_TITLE) {
      input.value = "";
      input.placeholder = title;
    } else {
      input.value = title;
    }

    this.state.id === DISABLED_ID
      ? (input.disabled = true)
      : (input.disabled = false);
  };

  this.render = () => {
    if (!isInit) {
      const { title } = this.state;
      $header.innerHTML = `
        <input type="text"${
          !title.length ? `placeholder="${DEFAULT_TITLE}"` : `value="${title}"`
        }/>
      `;
      isInit = true;
    }
  };

  this.render();

  //event handler
  $header.addEventListener("input", (e) => {
    const { value } = e.target;

    onEditing(value);
  });
}

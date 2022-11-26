import { ERROR_NEW_KEYWORD_MISSING, DEFAULT_TITLE, DISABLED_ID, ROOT_TITLE } from "../utils/constants.js";
import { hasId, hasNewTarget, hasTitle } from "../utils/error.js";
import { setHeaderChange } from "../utils/router.js";
import { classNameObj } from "../utils/constants.js";

export default function Header({ $target, initialState, onEditing }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $header = document.createElement("header");
  $target.appendChild($header);

  const isValidState = (state) => {
    if (!state || !hasId(state) || !hasTitle(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { title: "" };

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    const { title } = this.state;
    const input = $header.querySelector("input");

    if (!title || title === DEFAULT_TITLE || title === ROOT_TITLE) {
      input.value = "";
      input.placeholder = !title ? DEFAULT_TITLE : title;
    } else {
      input.value = title;
    }

    input.disabled = this.state.id === DISABLED_ID;
  };

  this.render = () => {
    const { title } = this.state;
    $header.innerHTML = `
      <div class="${classNameObj.INPUT_WRAPPER}">
        <input type="text"${!title.length ? `placeholder="${DEFAULT_TITLE}"` : `value="${title}"`}/>
      </div>
    `;
  };

  const init = () => {
    this.render();

    $header.addEventListener("input", (e) => {
      const { value } = e.target;

      setHeaderChange({
        id: this.state.id,
        title: value,
      });

      onEditing(value);
    });

    $header.querySelector("input").addEventListener("focus", (e) => {
      const { value } = e.target;

      e.target.placeholder = "";

      setHeaderChange({
        id: this.state.id,
        title: value,
      });
    });
  };

  init();
}

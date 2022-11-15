import { ERROR_NEW_KEYWORD_MISSING, HEADER_DEFAULT_TITLE } from "../../utils/constants.js";
import { hasNewTarget, hasTitle, isValidateString } from "../../utils/error.js";

export default function Header({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  //tags
  const $header = document.createElement("header");
  $target.appendChild($header);

  let isInit = false;

  //method
  const isValidateTitle = (state) => {
    if (hasTitle(state) && isValidateString(state.title)) return true;
    return false;
  };

  //state
  this.state = isValidateTitle(initialState) ? initialState : { title: "" };

  this.setState = (nextState) => {
    if (!isValidateTitle(nextState)) return;

    this.state = nextState;

    const { title } = this.state;
    if (title.length) {
      $header.querySelector("input").value = title;
    } else {
      $header.querySelector("input").placeholder = HEADER_DEFAULT_TITLE;
    }
  };

  this.render = () => {
    if (!isInit) {
      const { title } = this.state;
      $header.innerHTML = `
        <input type="text"${!title.length ? `placeholder="${HEADER_DEFAULT_TITLE}"` : `value="${title}"`}/>
      `;
      isInit = true;
    }
  };

  this.render();

  //event handler
  $header.addEventListener("input", (e) => {
    const { target } = e;

    const { value } = target;
    this.setState({
      title: value,
    });
  });
}

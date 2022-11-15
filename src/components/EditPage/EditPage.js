import { ERROR_NEW_KEYWORD_MISSING } from "../../utils/constants.js";
import { hasContent, hasNewTarget, hasTitle, isValidateString } from "../utils/error.js";
import Editor from "./Editor.js";
import Header from "./Header.js";

export default function EditPage({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  //tags
  const $page = document.createElement("div");
  $page.setAttribute("id", "editor-container");

  //method
  const isValidateState = (state) => {
    if (!state) return false;
    if (!hasTitle(state) || !isValidateString(state.title)) return false;
    if (!hasContent(state) || !isValidateString(state.content)) return false;
    return true;
  };

  //state
  this.state = isValidateState(initialState)
    ? initialState
    : {
        title: "",
        content: "",
      };

  //components
  new Header({
    $target: $page,
    initialState: { title: this.state.title },
  });

  new Editor({
    $target: $page,
    initialState: {
      content: this.state.content,
    },
  });

  this.setState = (nextState) => {
    if (!isValidateState(nextState)) return;

    this.state = nextState;

    //header, editor 변화?

    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  this.render();
  //event handler
}

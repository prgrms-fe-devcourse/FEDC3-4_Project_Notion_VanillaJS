import { hasNewTarget, hasId } from "../utils/error.js";
import {
  DELETE_BUTTON_TEXT,
  ERROR_NEW_KEYWORD_MISSING,
} from "../utils/constants.js";
import { routeRemoveDocument } from "../utils/router.js";

export default function DeleteButton({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  //tags
  const $button = document.createElement("button");
  $target.appendChild($button);

  const isValidState = (state) => {
    if (!state || !hasId(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : {};

  this.setState = (initialState) => {
    this.state = initialState;
  };

  this.render = () => {
    $button.textContent = DELETE_BUTTON_TEXT;
  };

  this.render();

  //event handler
  $button.addEventListener("click", async () => {
    const { id, parentId } = this.state;
    routeRemoveDocument({
      id,
      parentId,
    });
  });
}

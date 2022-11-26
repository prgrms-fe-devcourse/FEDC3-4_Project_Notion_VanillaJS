import { hasNewTarget, hasId } from "../utils/error.js";
import { DISABLED_ID, ERROR_NEW_KEYWORD_MISSING } from "../utils/constants.js";
import { routeRemoveDocument } from "../utils/router.js";

export default function DeleteButton({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $button = document.createElement("div");
  $button.setAttribute("class", "none");
  $target.appendChild($button);

  const isValidState = (state) => {
    if (!state || !hasId(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : {};

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.id === DISABLED_ID) {
      $button.classList.remove("block");
      $button.classList.add("none");
    } else {
      $button.classList.remove("none");
      $button.classList.add("block");
    }
  };

  $button.addEventListener("click", async () => {
    const { id, parentId } = this.state;

    routeRemoveDocument({ id, parentId });
  });
}

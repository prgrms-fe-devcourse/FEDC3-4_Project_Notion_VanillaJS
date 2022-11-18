import { HISTORY_CHANGE } from "../constants/routes.js";

const navigate = (to, isReplace = false, state = {}) => {
  window.dispatchEvent(
    new CustomEvent(HISTORY_CHANGE, {
      detail: { to, state, isReplace },
    })
  );
};

export { navigate };

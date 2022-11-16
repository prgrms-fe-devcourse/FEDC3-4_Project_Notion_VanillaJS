import { HISTORY_CHANGE_EVENT_NAME } from "../constants/routes.js";

const navigate = (to, isReplace = false) => {
  window.dispatchEvent(
    new CustomEvent(HISTORY_CHANGE_EVENT_NAME, {
      detail: { to, isReplace },
    })
  );
};

export { navigate };

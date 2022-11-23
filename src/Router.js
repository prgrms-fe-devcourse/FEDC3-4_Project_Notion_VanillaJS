import { HISTORY_CHANGE, POP_STATE } from "./constants/routes.js";

export default function Router({ onRoute }) {
  this.init = () => {
    window.addEventListener(HISTORY_CHANGE, ({ detail }) => {
      const { to, isReplace, state } = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(state, "", to);
      } else {
        history.pushState(state, "", to);
      }

      onRoute();
    });

    window.addEventListener(POP_STATE, () => {
      onRoute();
    });

    onRoute();
  };

  this.init();
}

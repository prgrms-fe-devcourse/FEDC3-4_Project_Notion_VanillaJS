import NotFound from "./pages/NotFound.js";

import { HISTORY_CHANGE_EVENT_NAME, routes } from "./constants/routes.js";

export default function Router({ $target, onRoute }) {
  this.$target = $target;
  this.state = { currentPage: null };

  this.init = () => {
    window.addEventListener(HISTORY_CHANGE_EVENT_NAME, ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, "", to);
      } else {
        history.pushState(null, "", to);
      }

      onRoute();
    });

    window.addEventListener("popstate", () => {
      onRoute();
    });
  };

  this.init();
  onRoute();
}

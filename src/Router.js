import NotFound from "./pages/NotFound.js";

import { HISTORY_CHANGE_EVENT_NAME, routes } from "./constants/routes.js";

export default function Router($target) {
  this.$target = $target;

  const findMatchedRoute = () => routes.find((route) => route.path.test(location.pathname));

  this.route = () => {
    const Page = findMatchedRoute()?.element || NotFound;
    new Page({ $target: this.$target });
  };

  this.init = () => {
    window.addEventListener(HISTORY_CHANGE_EVENT_NAME, ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, "", to);
      } else {
        history.pushState(null, "", to);
      }

      this.route();
    });

    window.addEventListener("popstate", () => {
      this.route();
    });
  };

  this.init();
  this.route();
}

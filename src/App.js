import MainPage from "./pages/MainPage.js";
import NotFound from "./pages/NotFound.js";
import Router from "./Router.js";

import { routes } from "./constants/routes.js";

export default function App({ $target }) {
  this.$target = $target;
  this.state = { currentPage: null };

  this.init = () => {
    this.currentPage = new MainPage({ $target: this.$target });
    new Router({ $target: this.$target, onRoute: this.route.bind(this) });
  };

  this.route = () => {
    const findMatchedRoute = () => routes.find((route) => route.path.test(location.pathname));
    const Page = findMatchedRoute()?.element || NotFound;
    const [, , documentId] = location.pathname.split("/");

    if (documentId) {
      this.currentPage.setState({ documentId });
    }

    console.log(window.location.pathname);
    console.log(/^\/documents\//.test(location.pathname));
  };

  this.init();
}

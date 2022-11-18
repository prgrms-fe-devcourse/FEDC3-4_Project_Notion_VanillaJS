import NotFoundPage from "./pages/NotFoundPage.js";

import Router from "./Router.js";
import { routes } from "./constants/routes.js";
import { navigate } from "./utils/navigate.js";

export default function App({ $target }) {
  const findMatchedRoute = (pathname) => routes.find((route) => route.path.test(pathname));

  this.$target = $target;
  this.state = { currentPage: null };

  this.init = () => {
    new Router({ onRoute: this.route.bind(this) });
  };

  this.route = () => {
    const { pathname } = location;
    const { currentPage } = this.state;
    const nextPage = findMatchedRoute(pathname)?.element || NotFoundPage;

    const { state } = history;
    const documentIdFromHistory = state ? state.documentId : null;
    const documentIdFromPath = pathname.split("/documents/")[1];

    if (documentIdFromPath != documentIdFromHistory) {
      navigate("/404", true);
      return;
    }

    if (!currentPage || !(currentPage instanceof nextPage)) {
      this.setState({
        currentPage: new nextPage({
          $target: this.$target,
          initialState: { documentId: documentIdFromHistory },
        }),
      });
      return;
    }

    this.state.currentPage.setState({ documentId: documentIdFromHistory });
  };

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
  };

  this.init();
}

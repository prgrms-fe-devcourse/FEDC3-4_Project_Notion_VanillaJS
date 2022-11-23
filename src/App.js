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
    const nextPage = findMatchedRoute(pathname)?.page;

    const documentIdFromPath = pathname.split("/documents/")[1];
    const documentIdFromHistory = history.state?.documentId || null;

    if (documentIdFromPath != documentIdFromHistory || !nextPage) {
      navigate("/404", true);
      return;
    }

    const needNewPage =
      !currentPage || !(currentPage instanceof nextPage) || !documentIdFromHistory;

    if (needNewPage) {
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

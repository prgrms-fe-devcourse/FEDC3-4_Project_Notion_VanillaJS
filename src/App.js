import DocListPage from "./components/Aside/DocListPage.js";
import DocEditPage from "./components/Main/DocEditPage.js";
import { initRouter, ROOT } from "./components/router.js";

export default function App({ $target }) {

  const docListPage = new DocListPage({
    $target
  })

  const docEditPage = new DocEditPage({
    $target
  })

  this.route = () => {
    const { pathname } = window.location;
    const [, id] = pathname.split('/');

    if(pathname === ROOT) {
      docListPage.setState(ROOT);
      docEditPage.setState(ROOT);
    } else if (pathname.includes(id)) {
      docEditPage.setState(id);
      docListPage.setState(id);
    }
  }

  this.route()

  initRouter(() => this.route())
  window.addEventListener('popstate', () => this.route());
}

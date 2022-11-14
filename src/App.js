import DocListPage from "./components/Aside/DocListPage.js";
import DocEditPage from "./components/Main/DocEditPage.js";
import { initRouter } from "./components/router.js";

export default function App({ $target }) {

  const docListPage = new DocListPage({
    $target,
    initialState: []
  })

  const docEditPage = new DocEditPage({
    $target
  })

  this.route = () => {
    // $target.innerHTML = '';
    const { pathname } = window.location;
    const [, id] = pathname.split('/');

    if(pathname === '/') {
      docListPage.setState();
      docEditPage.setState();
    } else if (pathname.includes(id)) {
      docEditPage.setState(id);
      docListPage.setState(id);
    }
  }

  this.route()

  initRouter(() => this.route())
}
import Navbar from './Navbar/Navbar.js';
import { documentsUrl } from './utils/util.js';
import { initRouter } from './utils/route.js';

function App({ target }) {
  const navbarPage = new Navbar({ target });

  this.route = async () => {
    target.innerHTML = '';
    const { pathname } = location;

    if (pathname === '/') {
      navbarPage.setState();
    } else if (pathname.indexOf(`${documentsUrl}/`) === 0) {
      const [, , postId] = pathname.split('/');

      await navbarPage.setState();
      console.log(postId);
    }
  };

  this.route();
  initRouter(() => this.route());
}

export default App;

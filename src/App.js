import DoucumentsPage from './pages/DoucumentsPage.js';
import PostEditPage from './components/posts/PostEditPage.js';
import { initRouter } from './utils/router.js';

export default function App({ $target }) {
  const page = new DoucumentsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: '',
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      $target.innerHTML = '';
      page.setState();
      return;
    }

    if (pathname.indexOf('/posts/') !== 0) return;

    if ($target.innerHTML === '') {
      page.setState();
    }
    const [, , postId] = pathname.split('/');
    postEditPage.setState({ postId });
  };

  this.route();

  initRouter(() => this.route());
}

import PostEditPage from './pages/PostEditPage.js';
import PostsPage from './pages/PostsPage.js';

export default function App({ $target }) {
  $target.setAttribute('style', 'display:flex;');

  const postsPage = new PostsPage({
    $target,
    props: {
      onPostClick: (id) => {
        history.pushState(null, null, `/posts/${id}`);
        this.route();
      },
    },
  });
  const postEditPage = new PostEditPage({ $target, props: { postId: 'new' } });

  this.route = () => {
    const { pathname } = window.location;

    postsPage.render();
    if (pathname.indexOf('/posts/') === 0) {
      const [, , postId] = pathname.split('/');
      postEditPage.setState({ postId });
    }
  };

  this.route();
}

import PostsPage from './pages/PostsPage.js';

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });

  postsPage.render();
}

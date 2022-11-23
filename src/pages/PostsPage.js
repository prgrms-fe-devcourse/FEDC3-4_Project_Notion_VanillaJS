import { request } from './api.js';
import PostList from './components/PostList.js';

export default function PostsPage({ $target }) {
  const $page = document.createElement('div');

  let isMounted = false;
  this.initialRender = () => {
    $target.appendChild($page);
    isMounted = true;
  };
  this.render = async () => {
    if (!isMounted) initialRender();
    await getPosts();
  };

  const postList = new PostList({ $target, props: { postList: [] } });

  const getPosts = async () => {
    const response = await request('/documents');
    postList.setState({ postList: response });
  };
}

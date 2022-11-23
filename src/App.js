import { request } from './api.js';
import PostList from './components/PostList.js';

export default function App({ $target }) {
  const postList = new PostList({ $target, props: { postList: [] } });

  const getPosts = async () => {
    const response = await request('/documents');
    postList.setState({ postList: response });
  };

  getPosts();
}

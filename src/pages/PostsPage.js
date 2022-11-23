import { request } from '../api.js';
import PostList from '../components/PostList.js';

export default function PostsPage({ $target }) {
  const $page = document.createElement('div');
  const $newPostButton = document.createElement('button');
  $newPostButton.textContent = '+';
  $page.appendChild($newPostButton);

  let isMounted = false;
  this.initialRender = () => {
    // TODO 상단에 빼놓으면 안되는지, 꼭 render() 안에서 해줘야 하는 것인지 고민
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

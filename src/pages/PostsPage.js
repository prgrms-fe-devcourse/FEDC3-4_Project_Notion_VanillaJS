import { request } from '../api.js';
import PostList from '../components/PostList.js';

export default function PostsPage({ $target }) {
  const $page = document.createElement('div');
  const $newPostButton = document.createElement('button');
  $newPostButton.textContent = '+';
  $page.appendChild($newPostButton);

  let isMounted = false;
  this.initialRender = () => {
    // MEMO 상단에 빼놓으면 안되는지, 꼭 render() 안에서 해줘야 하는 것인지 고민
    // page만 이렇게 하는 듯함 애초에 render의 제어권을 아예 사용하는 측에 넘김
    $target.appendChild($page);
    isMounted = true;
  };
  this.render = async () => {
    if (!isMounted) this.initialRender();
    await getPosts();
  };

  const postList = new PostList({ $page, props: { postList: [] } });

  const getPosts = async () => {
    const response = await request('/documents');
    // TODO setState는 외부로 빼기 (관심사 분리)
    postList.setState({ postList: response });
  };
}

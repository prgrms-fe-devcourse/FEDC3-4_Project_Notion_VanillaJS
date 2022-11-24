import { request } from '../api.js';
import Editor from '../components/Editor.js';
import { getItem, setItem } from '../storage.js';

export default function PostEditPage({ $target, props }) {
  const { postId } = props;

  const $page = document.createElement('div');

  this.state = { postId, post: {} };
  this.setState = async (nextState) => {
    this.state = { ...this.state, ...nextState };
    // MEMO 꼭 setState 안에 있어야 할지 고민하기. setState의 역할에서 벗어나는 것 같기도 함.
    // useEffect 같은 것이 필요한 듯
    if (nextState.postId) {
      this.state.post = await getPost();
    }
    editor.setState({ ...this.state.post });
    this.render();
  };

  let isMounted = false;
  this.initialRender = async () => {
    $target.appendChild($page);
    const post = await getPost();
    this.setState({ post });
    isMounted = true;
  };
  this.render = async () => {
    if (!isMounted) this.initialRender();
  };

  const TEMP_POST_SAVE_KEY = `temp-post-${this.state.postId}`;
  const tempPost = getItem(TEMP_POST_SAVE_KEY, { title: '', content: '' });
  let timer = null;

  const getPost = async () => {
    if (this.state.postId !== 'new') {
      return await request(`/documents/${this.state.postId}`);
    }
  };

  const editor = new Editor({
    $target: $page,
    props: {
      ...tempPost,
      onEdit: (post) => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          setItem(TEMP_POST_SAVE_KEY, { ...post, tempSaveDate: new Date() });
        }, 1000);
      },
    },
  });
}

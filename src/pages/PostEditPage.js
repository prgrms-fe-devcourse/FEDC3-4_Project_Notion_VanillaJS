import { request } from '../api.js';
import Editor from '../components/Editor.js';
import { DEFAULT_POST } from '../constants.js';
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
      tempPostSaveKey = `temp-post-${this.state.postId}`;
    }
    editor.setState({ ...this.state.post });
    this.render();
  };

  let isMounted = false;
  this.initialRender = async () => {
    isMounted = true;
    $target.appendChild($page);
    const post = await getPost();
    const tempPost = getItem(tempPostSaveKey, DEFAULT_POST);
    if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
      if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
        this.setState({ post: tempPost });
      }
    } else {
      this.setState({ post });
    }
  };
  this.render = async () => {
    if (!isMounted) this.initialRender();
  };

  let tempPostSaveKey = `temp-post-${this.state.postId}`;
  const tempPost = getItem(tempPostSaveKey, DEFAULT_POST);
  let timer = null;

  const getPost = async () => {
    if (this.state.postId !== 'new') {
      return await request(`/documents/${this.state.postId}`);
    }
  };

  const editor = new Editor({
    $target: $page,
    props: {
      ...DEFAULT_POST,
      onEdit: (post) => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          setItem(tempPostSaveKey, { ...post, tempSaveDate: new Date() });
        }, 1000);
      },
    },
  });
}

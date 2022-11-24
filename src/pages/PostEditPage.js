import { request } from '../api.js';
import Editor from '../components/Editor.js';
import { DEFAULT_POST } from '../constants.js';
import * as storage from '../storage.js';

export default function PostEditPage({ $target, props }) {
  const { postId } = props;

  const $page = document.createElement('div');

  this.state = { postId, post: DEFAULT_POST };
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
    const tempPost = storage.getItem(tempPostSaveKey, DEFAULT_POST);
    if (tempPost.tempSaveDate) {
      if (post) {
        if (
          tempPost.tempSaveDate > post.updatedAt &&
          confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')
        ) {
          this.setState({ post: tempPost });
        }
      } else {
        if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
          this.setState({ post: tempPost });
        }
      }
    } else {
      this.setState(post ? { post } : { post: DEFAULT_POST });
    }
  };
  this.render = async () => {
    if (!isMounted) this.initialRender();
  };

  let tempPostSaveKey = `temp-post-${this.state.postId}`;
  const tempPost = storage.getItem(tempPostSaveKey, DEFAULT_POST);
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
        timer = setTimeout(async () => {
          storage.setItem(tempPostSaveKey, {
            ...post,
            tempSaveDate: new Date(),
          });

          this.setState({ post });

          if (this.state.postId === 'new') {
            if (this.state.post.title) {
              const createdPost = await request('/documents', {
                method: 'POST',
                body: JSON.stringify({
                  title: this.state.post.title,
                  parent: null,
                }),
              });
              history.replaceState(null, null, `/posts/${createdPost.id}`);
              storage.removeItem('temp-post-new');
              this.setState({ postId: createdPost.id });
            }
          } else {
            await request(`/documents/${this.state.postId}`, {
              method: 'PUT',
              body: JSON.stringify(this.state.post),
            });
            storage.removeItem(tempPostSaveKey);
          }
        }, 2000);
      },
    },
  });
}

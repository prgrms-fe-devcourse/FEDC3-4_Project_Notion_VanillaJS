import { fetchDocuments } from '../utils/fetchDocuments.js';
import { getItem, removeItem, setItem } from '../utils/storage.js';
import Editor from '../components/Editor.js';

export default function PostEditPage({ $target, initialState }) {
  const $postEditPage = document.createElement('div');
  $postEditPage.className = 'post-edit-page';

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: '',
    content: '',
  });

  let timer = null;

  const editor = new Editor({
    $target: $postEditPage,
    initialState: post,

    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === 'new';
        if (isNew) {
          const createdPost = await fetchDocuments('/documents', {
            method: 'POST',
            body: JSON.stringify(post),
          });
          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            postId: createdPost.id,
          });
        } else {
          await fetchDocuments(`/documents/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;

      if (this.state.postId === 'new') {
        const post = getItem(postLocalSaveKey, {
          title: '',
          content: '',
        });
        this.render();
        editor.setState(post);
      } else {
        await fetchPost();
      }
      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(
      this.state.post || {
        title: '',
        content: '',
      }
    );
  };

  this.render = () => {
    $target.appendChild($postEditPage);
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== 'new') {
      const post = await fetchDocuments(`/documents/${[postId]}`);

      const tempPost = getItem(postLocalSaveKey, {
        title: '',
        content: '',
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
          this.setState({
            ...this.state,
            post: tempPost,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        post,
      });
    }
  };
}

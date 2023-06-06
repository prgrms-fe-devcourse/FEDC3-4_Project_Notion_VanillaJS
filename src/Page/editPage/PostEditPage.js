import { request } from "../../utils/api.js";
import Editor from "./Editor.js";
import MarkUpList from "./MarkUpList.js";
import { getItem, removeItem, setItem } from "../../utils/storage.js";
import instanceCheck from "../../utils/instanceCheck.js";
import debounce from "../../utils/debounce.js";

/**편집기의 내용을 서버에 저장하고 불러오는 컴포넌트 */
export default function PostEditPage({ $target, initialState, updateList }) {
  instanceCheck(new.target);

  const $page = document.createElement("div");
  $page.classList.add("editPage");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (post) => {
      saveStorage(post);
      saveServer(post);
    },
  });

  const markupList = new MarkUpList({
    $target: $page,
    initialState: [],
  });

  const saveStorage = debounce((post) => {
    setItem(postLocalSaveKey, {
      ...post,
      tempSaveDate: new Date(),
    });
  }, 500);

  const saveServer = debounce(async (newpost) => {
    await request(`/documents/${newpost.id}`, {
      method: "PUT",
      body: JSON.stringify(newpost),
    });

    removeItem(postLocalSaveKey);
    updateList();

    const post = await fetchRequest(newpost.id);
    markupList.setState(post);
  }, 1000);

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;
      await fetchPost();
      return;
    }

    this.state = nextState;
    this.render();
    if (this.state.post) {
      markupList.setState(this.state.post);
      editor.setState(this.state.post);
    }
  };

  const fetchPost = async () => {
    const { postId } = this.state;
    const post = await fetchRequest(postId);
    const tempPost = getItem(postLocalSaveKey, {
      title: "",
      content: "",
    });

    if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
      if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러오시겠습니까?")) {
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
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchRequest = async (postId) => {
    const post = await request(`/documents/${postId}`);

    return post;
  };
}

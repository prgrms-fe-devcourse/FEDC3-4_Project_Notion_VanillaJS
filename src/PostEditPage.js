import { request } from "./api.js";
import Editor from "./Editor.js";
import MarkUpList from "./MarkUpList.js";
import { getItem, removeItem, setItem } from "./storage.js";

export default function PostEditPage({ $target, initialState, listUpdate }) {
  const $page = document.createElement("div");
  $page.classList.add("editPage");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;
  let serveTimer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {
      storageSave(post);
      serverSave(post);
    },
  });

  const storageSave = (post) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setItem(postLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });
    }, 500);
  };

  const markupList = new MarkUpList({
    $target: $page,
    initialState: [],
  });

  const serverSave = (post) => {
    if (serveTimer !== null) {
      clearTimeout(serveTimer);
    }

    serveTimer = setTimeout(async () => {
      const newDoc = await request(`/documents/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(post),
      });

      removeItem(postLocalSaveKey);
      listUpdate();

      const data = await request(`/documents/${newDoc.id}`);
      markupList.setState(data);
    }, 1000);
  };

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;
      await fetchPost();
      return;
    }
    this.state = nextState;
    markupList.setState(this.state.post);
    this.render();

    if (this.state.post) {
      editor.setState(this.state.post);
    }
  };

  const fetchPost = async () => {
    const { postId } = this.state;
    const post = await request(`/documents/${postId}`);
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
}

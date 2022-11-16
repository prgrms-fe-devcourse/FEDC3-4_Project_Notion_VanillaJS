import Empty from "../components/Empty";
import PostPage_editor from "../components/PostPage_editor";
import PostPage_header from "../components/PostPage_header";
import PostPage_sublinks from "../components/PostPage_sublinks";
import { getItem } from "../storage";

export default function PostPage({ $target, initialState, onEditing, onDelete }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.state = initialState;
  this.onEditing = onEditing;
  this.onDelete = onDelete;

  this.$postPage = document.createElement("div");
  this.$postPage.className = "postPage";

  this.$header = document.createElement("header");

  this.$section = document.createElement("setcion");
  this.$section.className = "editor";
  this.$footer = document.createElement("footer");

  this.$empty = document.createElement("div");
  this.$empty.className = "empty";

  $target.appendChild(this.$postPage);

  this.setState = (nextState) => {
    this.state = nextState;

    if (nextState.res_document.length < 1) {
      this.$postPage.innerHTML = "";
      this.renderEmpty();
    } else {
      postPage_header.setState(this.state);
      postPage_editor.setState(this.state);
      postPage_sublinks.setState(this.state);
      this.render();
    }
  };

  this.render = () => {
    const { isNeedRender } = getItem("currentContentId", null);

    this.$postPage.appendChild(this.$header);

    if (isNeedRender) {
      //글을 작성중인 경우 렌더링을 다시 하지 않음. 포커스를 잃기 때문에
      this.$postPage.appendChild(this.$section);
    }

    this.$postPage.appendChild(this.$footer);
  };

  this.renderEmpty = () => {
    //데이터가 없는 경우, 보여줄 view 렌더링
    this.$postPage.appendChild(this.$empty);
  };

  const postPage_header = new PostPage_header({
    $target: this.$header,
    initialState: this.state,
    onDelete: this.onDelete,
  });

  const postPage_editor = new PostPage_editor({
    $target: this.$section,
    initialState: this.state,
    onEditing: this.onEditing,
  });

  const postPage_sublinks = new PostPage_sublinks({
    $target: this.$footer,
    initialState: this.state,
  });

  new Empty({
    $target: this.$empty,
    initialState: this.state,
  });
}

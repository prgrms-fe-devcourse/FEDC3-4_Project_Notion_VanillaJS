import Empty from "../components/Empty";
import PostEditor from "../components/PostEditor";
import PostPageHeader from "../components/PostPageHeader";
import PostSublinks from "../components/PostSublinks";
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
      this.$postPage.innerHTML = "";
      postPageHeader.setState(this.state);
      postEditor.setState(this.state);
      postSublinks.setState(this.state);
      this.render();
    }
  };

  this.render = () => {
    const { isNeedRender } = getItem("currentContentId", null);

    this.$postPage.appendChild(this.$header);

    if (isNeedRender) {
      this.$postPage.appendChild(this.$section);
    }

    this.$postPage.appendChild(this.$footer);
  };

  this.renderEmpty = () => {
    this.$postPage.appendChild(this.$empty);
  };

  const postPageHeader = new PostPageHeader({
    $target: this.$header,
    initialState: this.state,
    onDelete: this.onDelete,
  });

  const postEditor = new PostEditor({
    $target: this.$section,
    initialState: this.state,
    onEditing: this.onEditing,
  });

  const postSublinks = new PostSublinks({
    $target: this.$footer,
    initialState: this.state,
  });

  new Empty({
    $target: this.$empty,
    initialState: this.state,
  });
}

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

  this.$div = document.createElement("div");
  this.$div.className = "postPage";

  $target.appendChild(this.$div);

  this.$header = document.createElement("header");

  this.$section = document.createElement("setcion");
  this.$section.className = "editor";

  this.$footer = document.createElement("footer");

  this.setState = (nextState) => {
    this.state = nextState;
    postPageHeader.setState(this.state);
    postEditor.setState(this.state);
    postSublinks.setState(this.state);

    this.render();
  };

  this.render = () => {
    const { isNeedRender } = getItem("currentContentId", null);

    this.$div.appendChild(this.$header);

    if (isNeedRender) {
      this.$div.appendChild(this.$section);
    }

    this.$div.appendChild(this.$footer);
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
}
